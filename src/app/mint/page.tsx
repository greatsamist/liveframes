import { DEFAULT_DEBUGGER_HUB_URL } from "@/lib/debug";
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
export default async function Mint({ searchParams }: NextServerPageProps) {
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

  return (
    <div className="p-4">
      <FrameContainer
        postUrl="/frames"
        pathname="/mint"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src={searchParams?.image as string} />

        {/* <FrameInput text="put some text here" /> */}

        <FrameButton action="mint" target={searchParams?.link as string}>
          Mint
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
