import { Resend } from "resend";
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Mientras no verifiques tu propio dominio en Resend, tienes que usar
// esta dirección de prueba como remitente ("from").
const FROM_ADDRESS = "Signalist <onboarding@resend.dev>";

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro,
  );

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: `Welcome to Signalist - your stock market toolkit is ready!`,
      text: "Thanks for joining Signalist",
      html: htmlTemplate,
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      throw error;
    }

    console.log("Welcome email sent:", data?.id);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    throw err;
  }
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
    "{{date}}",
    date,
  ).replace("{{newsContent}}", newsContent);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: `📈 Market News Summary Today - ${date}`,
      text: `Today's market news summary from Signalist`,
      html: htmlTemplate,
    });

    if (error) {
      console.error("Failed to send news summary email:", error);
      throw error;
    }

    console.log("News summary email sent:", data?.id);
  } catch (err) {
    console.error("Failed to send news summary email:", err);
    throw err;
  }
};
