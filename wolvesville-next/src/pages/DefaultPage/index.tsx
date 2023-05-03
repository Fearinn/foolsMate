import { Outlet } from "react-router";
import { Footer } from "../../components";
import { Header } from "../../components";

function DefaultPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultPage;
