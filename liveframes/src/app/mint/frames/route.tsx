/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";

const frames = createFrames({
  basePath: "/mint",
});

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://liveframes.vercel.app/live?id=27c5kyopnlcayyyj&address=0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea`}
        >
          Go to stream
        </Button>,
      ],
    };
  }

  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full justify-center items-center">
        Mint LiveframeNFT to join
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button
        action="tx"
        target={`/txdata?playbackId=27c5kyopnlcayyyj&address=0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea`}
        post_url="https://liveframes.vercel.app/live?id=27c5kyopnlcayyyj&address=0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea"
      >
        Mint
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
