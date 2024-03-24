import React from "react";
import { PlayerWithControls } from "../components/Player";
import { notFound } from "next/navigation";

const Live = ({ searchParams }: { searchParams: { id: string } }) => {
  if (!searchParams.id) return notFound();
  return (
    <div className="flex flex-col w-full h-full lg:w-[75%] gap-2 ">
      <PlayerWithControls
        src={[
          {
            src: `https://livepeercdn.studio/hls/${searchParams.id}/index.m3u8`,
            width: 1920,
            height: 1080,
            mime: "application/vnd.apple.mpegurl",
            type: "hls",
          },
        ]}
      />
    </div>
  );
};

export default Live;
