/* eslint-disable react/jsx-key */
import { Button, createFrames } from "frames.js/next";

const frames = createFrames({
  basePath: "/mint/frames",
});

const handleRequest = frames(async (ctx) => {
  const link = ctx.searchParams?.link;
  const image = ctx.searchParams?.image;
  return {
    image: image,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="mint" target={link}>
        Mint
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
