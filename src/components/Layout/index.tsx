import { ReactNode } from "react";
import { Footer } from "..";
import { Header } from "..";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
