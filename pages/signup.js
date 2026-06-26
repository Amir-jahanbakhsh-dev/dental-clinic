import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

export default function SignupPage() {
  const router = useRouter();
  
  // اضافه کردن فیلدهای جدید به state
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    phone: "", 
    nationalId: "", 
    lastVisit: "" 
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({ icon: "error", title: "خطا", text: "رمز عبور و تکرار آن یکسان نیستند!" });
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,           // ارسال فیلدهای جدید
          nationalId: formData.nationalId, // ارسال فیلدهای جدید
          lastVisit: formData.lastVisit,   // ارسال فیلدهای جدید
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "موفقیت‌آمیز",
          text: "ثبت‌ نام با موفقیت انجام شد.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => router.push("/login"));
      } else {
        Swal.fire({ icon: "error", title: "خطا", text: data.message || "خطایی رخ داد" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "خطای شبکه", text: "ارتباط با سرور برقرار نشد." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-30">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-[Btitr] text-gray-800 mb-2">ایجاد حساب کاربری</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* نام */}
            <div>
              <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
              <input required type="text" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            {/* ایمیل */}
            <div>
              <label className="block text-sm font-medium text-gray-700">ایمیل</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            {/* شماره تلفن (جدید) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">شماره تلفن</label>
              <input required type="tel" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>

            {/* کد ملی (جدید) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">کد ملی</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })} />
            </div>

            {/* رمز عبور */}
            <div>
              <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
              <input required type="password" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>

            {/* تکرار رمز عبور */}
            <div>
              <label className="block text-sm font-medium text-gray-700">تکرار رمز عبور</label>
              <input required type="password" className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            </div>

            <button disabled={isLoading} type="submit" 
              className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-600"} text-white py-3 rounded-lg`}>
              {isLoading ? "در حال ثبت..." : "ثبت نام"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
