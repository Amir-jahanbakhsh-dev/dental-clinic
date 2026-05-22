import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ایجاد حساب کاربری</h1>
          <p className="text-gray-500 text-sm">برای استفاده از خدمات ما ثبت نام کنید.</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* نام و نام خانوادگی */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          {/* ایمیل */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ایمیل</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="example@email.com"
            />
          </div>

          {/* رمز عبور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="رمز عبور قوی انتخاب کنید"
            />
          </div>

          {/* تکرار رمز عبور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">تکرار رمز عبور</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="رمز عبور را تکرار کنید"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 mt-2"
          >
            ثبت نام
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          قبلاً ثبت نام کرده‌اید؟{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            وارد شوید
          </Link>
        </div>
      </div>
    </div>
  );
}
