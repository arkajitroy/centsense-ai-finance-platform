import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex justify-center pt-40">{children}</div>;
}
