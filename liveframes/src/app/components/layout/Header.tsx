"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";

const Header = ({ children }: { children: ReactNode }) => {
  const { authenticated, login, user, logout } = usePrivy();
  const router = useRouter();
  useEffect(() => {
    if (user?.farcaster || user?.wallet) {
      router.push(`/${user?.farcaster?.username ?? user?.wallet?.address}`);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Link href="/">
          <Image src="/liveframeslogo.png" alt="logo" width={100} height={50} />
        </Link>

        <Button onClick={authenticated ? logout : login}>
          {authenticated ? "log out" : "log in"}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default Header;
