import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import { Header } from "../../components/Header";

function DefaultPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}

export default DefaultPage;
