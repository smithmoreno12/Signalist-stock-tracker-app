import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = (inngest as any).createFunction(
  {
    id: "sign-up-email",
    event: "app/user.created",
  },
  async ({ event, step }: { event: any; step: any }) => {
    const userProfile = `
      - Country: ${event?.data?.country}
      - Investment goals: ${event?.data?.investmentGoals}
      - Risk tolerance: ${event?.data?.riskTolerance}
      - Preferred industry: ${event?.data?.preferredIndustry}
    `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    const introText =
      response?.candidates?.[0]?.content?.parts?.find(
        (part: { text?: string }): part is { text: string } =>
          typeof (part as { text?: string }).text === "string",
      )?.text ??
      "Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.";

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText = part && "text" in part ? part.text : null;
      const {
        data: { email, name },
      } = event;
      return await sendWelcomeEmail({ email, name, intro: introText });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  },
);
