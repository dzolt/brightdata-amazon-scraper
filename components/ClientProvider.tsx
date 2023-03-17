"use client";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const ClientProvider = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ClientProvider;
