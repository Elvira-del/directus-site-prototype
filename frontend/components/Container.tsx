import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto my-0">{children}</div>;
};
