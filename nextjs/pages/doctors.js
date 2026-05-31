import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

// app/doctors/page.jsx
export default function DoctorsPage() {
  return (
    <>
      <Header/>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-[Btitr] mb-6">لیست پزشکان ما</h1>
        {/* کارت‌های پزشکان  */}
      </div>
      <Footer/>
    </>
  );
}
