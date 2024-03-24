"use client";
import { usePrivy } from "@privy-io/react-auth";

import React from "react";
import { Button } from "../components/ui/button";

type State = {
  active: string;
  total_button_presses: number;
};

const Home = () => {
  const { authenticated, login, logout } = usePrivy();
  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col">
      <h1 className="text-4xl text-green-600 font-bold">
        Welcome to Liveframes
      </h1>

      <Button className="mt-10" onClick={authenticated ? logout : login}>
        {authenticated ? "log out" : "log in"}
      </Button>
    </div>
  );
};

export default Home;
