import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <div className="container mx-auto my-32">{children}</div>;
}
