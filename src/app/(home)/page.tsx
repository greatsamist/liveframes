// import React from "react";
// import { EnableVideoIcon, StopIcon } from "@livepeer/react/assets";
// import * as Broadcast from "@livepeer/react/broadcast";
// import { getIngest } from "@livepeer/react/external";
// import { createBroadcastAction } from "@/lib/actions/createBrodcastAction";
// import { notFound } from "next/navigation";
// // import { streamKey } from "./stream-key";

// const Home = () => {
//   // const createStream = await createBroadcastAction({ name: "Test Broadcast" });
//   // console.log("createStream", createStream);
//   // if (!createStream) return notFound();
//   return (
//     <Broadcast.Root ingestUrl={getIngest("f680-atv6-2sd1-v4fc")}>
//       <Broadcast.Container className="h-full w-full bg-gray-950">
//         <Broadcast.Video title="Current livestream" className="h-full w-full" />

//         <Broadcast.Controls className="flex items-center justify-center">
//           <Broadcast.EnabledTrigger className="w-10 h-10 hover:scale-105 flex-shrink-0">
//             <Broadcast.EnabledIndicator asChild matcher={false}>
//               <EnableVideoIcon className="w-full h-full" />
//             </Broadcast.EnabledIndicator>
//             <Broadcast.EnabledIndicator asChild>
//               <StopIcon className="w-full h-full" />
//             </Broadcast.EnabledIndicator>
//           </Broadcast.EnabledTrigger>
//         </Broadcast.Controls>

//         <Broadcast.LoadingIndicator asChild matcher={false}>
//           <div className="absolute overflow-hidden py-1 px-2 rounded-full top-1 left-1 bg-black/50 flex items-center backdrop-blur">
//             <Broadcast.StatusIndicator
//               matcher="live"
//               className="flex gap-2 items-center"
//             >
//               <div className="bg-red-500 animate-pulse h-1.5 w-1.5 rounded-full" />
//               <span className="text-xs select-none">LIVE</span>
//             </Broadcast.StatusIndicator>

//             <Broadcast.StatusIndicator
//               className="flex gap-2 items-center"
//               matcher="pending"
//             >
//               <div className="bg-white/80 h-1.5 w-1.5 rounded-full animate-pulse" />
//               <span className="text-xs select-none">LOADING</span>
//             </Broadcast.StatusIndicator>

//             <Broadcast.StatusIndicator
//               className="flex gap-2 items-center"
//               matcher="idle"
//             >
//               <div className="bg-white/80 h-1.5 w-1.5 rounded-full" />
//               <span className="text-xs select-none">IDLE</span>
//             </Broadcast.StatusIndicator>
//           </div>
//         </Broadcast.LoadingIndicator>
//       </Broadcast.Container>
//     </Broadcast.Root>
//   );
// };

// export default Home;

import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "@/lib/debug";
import { currentURL } from "@/lib/utils";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
// import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "./debug";

type State = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
  };
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/");
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>{" "}
      or see{" "}
      <Link href="/examples" className="underline">
        other examples
      </Link>
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage aspectRatio="1.91:1">
          <div tw="w-full h-full bg-slate-700 text-white justify-center items-center flex flex-col">
            <div tw="flex flex-row">
              {frameMessage?.inputText ? frameMessage.inputText : "Hello world"}
            </div>
            {frameMessage && (
              <div tw="flex flex-col">
                <div tw="flex">
                  Requester is @{frameMessage.requesterUserData?.username}{" "}
                </div>
                <div tw="flex">
                  Requester follows caster:{" "}
                  {frameMessage.requesterFollowsCaster ? "true" : "false"}
                </div>
                <div tw="flex">
                  Caster follows requester:{" "}
                  {frameMessage.casterFollowsRequester ? "true" : "false"}
                </div>
                <div tw="flex">
                  Requester liked cast:{" "}
                  {frameMessage.likedCast ? "true" : "false"}
                </div>
                <div tw="flex">
                  Requester recasted cast:{" "}
                  {frameMessage.recastedCast ? "true" : "false"}
                </div>
              </div>
            )}
          </div>
        </FrameImage>
        <FrameInput text="put some text here" />
        <FrameButton>
          {state?.active === "1" ? "Active" : "Inactive"}
        </FrameButton>
        <FrameButton>
          {state?.active === "2" ? "Active" : "Inactive"}
        </FrameButton>
        <FrameButton action="link" target={`https://www.google.com`}>
          External
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
