import Navbar from "@/components/navbar/navbar";
import Content from "@/components/content/content";
import Sidebar from "@/components/sideBar/sideBar";
import Image from "next/image";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className=" flex gap-2 flex-wrap">
     <Content />
      <Sidebar />
    </div>
    <Footer/>
    </>
  );
}
