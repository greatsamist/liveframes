"use client";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import React from "react";

const UserAvatar = () => {
  const { user } = usePrivy();
  return (
    <div className="w-[100px] h-[100px] overflow-hidden">
      <Image
        className="rounded-[9999999px] h-full w-full"
        src={user?.farcaster?.pfp!}
        alt={user?.farcaster?.displayName!}
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default UserAvatar;
