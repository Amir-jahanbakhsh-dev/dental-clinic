import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        // در محیط توسعه (بدون تنظیمات SMTP) لینک بازیابی در کنسول سرور و همچنین در پاسخ نمایش داده می‌شود
        if (data.devResetUrl) {
          console.log("لینک بازیابی رمز عبور (فقط حالت توسعه):", data.devResetUrl);
        }
        Swal.fire({
          icon: "success",
          title: "درخواست ثبت شد",
          text: data.message || "اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی برای شما ارسال می‌شود.",
        });
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
            <h1 className="text-2xl font-[Btitr] text-gray-800 mb-2">فراموشی رمز عبور</h1>
            <p className="text-gray-500 text-sm">
              ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">
                در صورتی که این ایمیل در سیستم ثبت شده باشد، لینک بازیابی ارسال شد.
              </p>
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                بازگشت به صفحه ورود
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-[Btitr] py-2 rounded-lg transition duration-300`}
              >
                {isLoading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              بازگشت به ورود
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
