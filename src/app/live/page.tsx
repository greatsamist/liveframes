import React from "react";
import { PlayerWithControls } from "../components/Player";

const Live = () => {
  return (
    <div className="flex flex-col w-full h-full lg:w-[75%] gap-2 ">
      <PlayerWithControls
        src={[
          {
            src: `https://livepeercdn.studio/hls/f680226qqu7hgwai/index.m3u8`,
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
