import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return Swal.fire({ icon: "error", title: "خطا", text: "لینک بازیابی نامعتبر است." });
    }

    if (password !== confirmPassword) {
      return Swal.fire({ icon: "error", title: "خطا", text: "رمز عبور و تکرار آن یکسان نیستند." });
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "موفقیت‌آمیز",
          text: "رمز عبور شما با موفقیت تغییر کرد. اکنون می‌توانید وارد شوید.",
          timer: 2500,
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
            <h1 className="text-2xl font-[Btitr] text-gray-800 mb-2">تعیین رمز عبور جدید</h1>
            <p className="text-gray-500 text-sm">رمز عبور جدید خود را وارد کنید.</p>
          </div>

          {!token ? (
            <div className="text-center space-y-4">
              <p className="text-red-600 font-medium">لینک بازیابی نامعتبر یا ناقص است.</p>
              <Link href="/forgot-password" className="text-blue-600 font-semibold hover:underline">
                درخواست لینک جدید
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">رمز عبور جدید</label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="حداقل ۶ کاراکتر"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">تکرار رمز عبور</label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="رمز عبور جدید را تکرار کنید"
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-[Btitr] py-2 rounded-lg transition duration-300`}
              >
                {isLoading ? "در حال ذخیره..." : "ثبت رمز عبور جدید"}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
