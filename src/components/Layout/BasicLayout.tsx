import React, { ReactNode } from "react";
import Navigation from "../Header/Navigation";
import Footer from "../Footer";

type Props = {
  children: ReactNode;
  className?: string;
};

const BasicLayout = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`${className} max-w-3xl mx-auto min-h-screen flex flex-col`}
    >
      <Navigation />
      <main className="flex-1 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default BasicLayout;
