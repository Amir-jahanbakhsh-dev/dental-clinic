import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-[40%] lg:flex-1  bg-gray-50 p-6 rounded-lg shadow space-y-10">
      {/* 1️⃣ رزرو نوبت */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2"><Link  href="/rezerv"> رزرو نوبت</Link></h3>

        <form className="space-y-4">
          <div>
            <label htmlFor="service" className="block mb-1 text-sm text-gray-600">
              انتخاب خدمت
            </label>
            <select
              id="service"
              name="service"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">لطفاً انتخاب کنید</option>
              <option value="cleaning">جرم گیری</option>
              <option value="implant">ایمپلنت</option>
              <option value="orthodontics">ارتودنسی</option>
              <option value="composite">کامپوزیت</option>
            </select>
          </div>

          <div>
            <label htmlFor="doctor" className="block mb-1 text-sm text-gray-600">
              انتخاب دکتر
            </label>
            <select
              id="doctor"
              name="doctor"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">لطفاً انتخاب کنید</option>
              <option value="dr-ahmadi">دکتر احمدی</option>
              <option value="dr-moradi">دکتر مرادی</option>
              <option value="dr-rezaei">دکتر رضایی</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block mb-1 text-sm text-gray-600">
              انتخاب تاریخ
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="time" className="block mb-1 text-sm text-gray-600">
              انتخاب ساعت
            </label>
            <select
              id="time"
              name="time"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">لطفاً انتخاب کنید</option>
              {["09:00", "10:00", "11:00", "12:00", "16:00", "17:00"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            ثبت درخواست نوبت
          </button>
        </form>
      </section>

      {/* 2️⃣ پزشکان ما */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">پزشکان ما</h3>

        {[
          {
            name: "دکتر احمدی",
            specialty: "متخصص ایمپلنت",
            image: "/img/bg-header.jpg",
          },
          {
            name: "دکتر مرادی",
            specialty: "متخصص ارتودنسی",
            image: "/img/bg-header.jpg",
          },
          {
            name: "دکتر رضایی",
            specialty: "متخصص زیبایی دندان",
            image: "/img/bg-header.jpg",
          },
        ].map((dr, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white p-3 rounded-lg border hover:shadow transition"
          >
            <Image
              src={dr.image}
              width={70}
              height={70}
              alt={dr.name}
              className="rounded-full"
            />
            <div>
              <h4 className="font-[Btitr] text-gray-800">{dr.name}</h4>
              <p className="text-sm text-gray-500">{dr.specialty}</p>
              <Link href="#" className="text-blue-600 text-sm hover:underline">
                مشاهده پروفایل
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* 3️⃣ نظرات بیماران */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">نظرات بیماران</h3>

        {[
          {
            text: "برخورد پزشکان بسیار عالی بود و روند درمانم خیلی خوب پیش رفت.",
            author: "سارا محمدی",
          },
          {
            text: "کلینیک بسیار تمیز و منظم بود و از نتیجه درمانم کاملاً راضی هستم.",
            author: "علی رضایی",
          },
          {
            text: "نوبت‌دهی سریع و رفتار پرسنل خیلی حرفه‌ای بود.",
            author: "نگار کریمی",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white p-4 border rounded-lg shadow-sm hover:shadow transition"
          >
            <p className="text-gray-600 text-sm">{c.text}</p>
            <span className="text-sm text-gray-800 block mt-2">— {c.author}</span>
          </div>
        ))}
      </section>
    </aside>
  );
}
