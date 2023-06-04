import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export { Layout };
