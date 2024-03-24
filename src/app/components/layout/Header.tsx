import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Link href="/">
        <Image src="/liveframeslogo.png" alt="logo" width={100} height={50} />
      </Link>
      {children}
    </div>
  );
};

export default Header;
