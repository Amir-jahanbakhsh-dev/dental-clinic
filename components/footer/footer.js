import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* 1️⃣ معرفی کلینیک */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-400">کلینیک دندان پزشکی</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            ارائه دهنده خدمات تخصصی دندانپزشکی با بهره‌گیری از
            تجهیزات مدرن و پزشکان مجرب. هدف ما لبخند سالم شماست.
          </p>
        </div>

        {/* 2️⃣ لینک های سریع */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-400">لینک های سریع</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-300 transition text-sm">صفحه اصلی</Link></li>
            <li><Link href="/services" className="hover:text-blue-300 transition text-sm">خدمات ما</Link></li>
            <li><Link href="/doctors" className="hover:text-blue-300 transition text-sm">پزشکان</Link></li>
            <li><Link href="/rezerv" className="hover:text-blue-300 transition text-sm">رزرو نوبت</Link></li>
            <li><Link href="/contact" className="hover:text-blue-300 transition text-sm">تماس با ما</Link></li>
          </ul>
        </div>

        {/* 3️⃣ اطلاعات تماس */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-400">اطلاعات تماس</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="text-blue-400">📍</span>
              تهران، خیابان نمونه، پلاک ۱۲۳
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-blue-400">📞</span>
              021-12345678
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-blue-400">📱</span>
              09123456789
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-blue-400">✉</span>
              info@clinic.com
            </li>
          </ul>
        </div>

        {/* 4️⃣ شبکه های اجتماعی */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-400">ما را دنبال کنید</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-300 transition text-sm">اینستاگرام</Link>
            <Link href="#" className="hover:text-blue-300 transition text-sm">تلگرام</Link>
            <Link href="#" className="hover:text-blue-300 transition text-sm">واتساپ</Link>
          </div>
        </div>

      </div>

      {/* کپی رایت */}
      <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-gray-700">
        © 2026 تمامی حقوق برای کلینیک محفوظ است.
      </div>
    </footer>
  );
}
