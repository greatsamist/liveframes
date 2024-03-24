"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/Dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createBroadcastAction } from "@/lib/actions/createBrodcastAction";
import { LiveframesFactoryAddress } from "@/lib/contracts";
import { FactoryAbi } from "@/lib/contracts/FactoryAbi";

import { useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { encodeFunctionData } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";

interface IFramecast {
  playbackId: string;
  streamKey: string;
  name: string;
}

const CreateBroadcast = () => {
  const [framecastName, setFramecastName] = useState("");
  const [mintFee, setMintFee] = useState("0");
  const [coverUrl, setCoverUrl] = useState("");
  const [contractAddress, setContractAddress] = useState(
    "0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea"
  );
  const [framecast, setFramecast] = useState<IFramecast>();
  const [txhash, setTxhash] = useState("");
  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet

  const data = encodeFunctionData({
    abi: FactoryAbi,
    functionName: "createERC721",
    args: [framecastName, "LF", mintFee],
  });

  const transactionRequest = {
    from: wallet?.address,
    to: LiveframesFactoryAddress,
    data: data,
  };
  const result = useWaitForTransactionReceipt({
    hash: txhash as `0x${string}`,
  });

  console.log(result?.data);
  //
  // console.log("createStream", createStream);
  // if (!createStream) return notFound();

  const handleCreateBroadcast = async (e: any) => {
    e.preventDefault();
    if (wallet.address) {
      try {
        const frameCast = await createBroadcastAction({ name: framecastName });
        console.log(frameCast);
        setFramecast(frameCast);

        const provider = await wallet.getEthereumProvider();

        const transactionHash = await provider.request({
          method: "eth_sendTransaction",
          params: [transactionRequest],
        });
        setTxhash(transactionHash);
        console.log(transactionHash);

        toast.success("Liveframe created successfully");
      } catch (error) {
        toast.error("Failed to create  Liveframe");
      }
    }
  };
  console.log(framecast);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Liveframe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {framecast ? "Liveframe created" : "Create a Liveframe"}
          </DialogTitle>
          <DialogDescription>
            {framecast ? "" : "Enter Liveframe details and go live."}
          </DialogDescription>
        </DialogHeader>
        <div>
          {framecast && txhash !== "" ? (
            <div>
              {/* <h2>Framecast created successfully</h2> */}
              <p>
                Share LiveFrame url:{" "}
                {`https://liveframes.vercel.app/mint/frames?id=${framecast?.playbackId}&addr=${contractAddress}/`}
              </p>
              <Link
                href={`/broadcast?&key=${"27c5-ji06-t3bu-mdoq"}&name=${
                  framecast.name
                }`}
              >
                <Button>Start LiveFrame</Button>
              </Link>
            </div>
          ) : (
            <form className="flex flex-col gap-3">
              <Label>Liveframe name</Label>
              <Input
                placeholder="name"
                onChange={(e) => setFramecastName(e.target.value)}
              />

              <Label>Mint Fee</Label>
              <Input
                placeholder="Enter Mint Fee"
                onChange={(e) => setMintFee(e.target.value)}
              />

              <Label>Cover url</Label>
              <Input
                placeholder="https://your-cover-url"
                onChange={(e) => setCoverUrl(e.target.value)}
              />

              <Button onClick={handleCreateBroadcast}>Create</Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBroadcast;
// {
//   playbackId: "27c5kyopnlcayyyj",
//   streamKey: "27c5-ji06-t3bu-mdoq",
//   name: "Eric Stream",
// }
