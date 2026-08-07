import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";

const Header = ({ user }: { user: User }) => {
  return (
    <header className=" sticky top-0 header">
      <div className=" conatiner header-wrapper">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>

        <nav className=" hidden sm:block">
          <NavItem />
        </nav>
        <UserDropdown user={user} />
      </div>
      r
    </header>
  );
};

export default Header;
