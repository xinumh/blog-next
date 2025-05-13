import React from "react";
import { Logo } from "@/components/Logo";
import CopyRight from "@/components/CopyRight";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="bg-black/90 text-white w-full relative">
      <div className="relative z-[2] h-full">
        <Logo className="m-auto h-16 py-4" color="#ffffff" />

        <main
          className="md:max-w-4xl w-full m-auto md:px-8 px-4 py-5 overflow-hidden font-pingfang-sc "
          style={{ height: "calc(100vh - 128px)" }}
        >
          {children}
        </main>
        <div className="text-sm flex h-16 items-center justify-center text-white/80 font-normal tracking-wide leading-5">
          <CopyRight />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
