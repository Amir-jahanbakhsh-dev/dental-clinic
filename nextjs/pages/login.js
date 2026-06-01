import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-[Btitr] text-gray-800 mb-2">ورود به حساب کاربری</h1>
          <p className="text-gray-500 text-sm">برای ورود، نام کاربری و رمز عبور خود را وارد کنید.</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-[Btitr] py-2 rounded-lg transition duration-300"
          >
            ورود
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            ثبت نام کنید
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
