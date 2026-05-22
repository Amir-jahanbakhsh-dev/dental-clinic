import Image from "next/image";
import Link from "next/link";

export default function Content() {
  return (
    <section className="w-full lg:w-[60%] lg:flex-3 bg-white py-16 px-4 md:px-8">

      {/* TEXT CONTENT */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <span className="text-blue-600 font-medium">
          لبخند زیبا، اعتماد به نفس بیشتر
        </span>

        <h2 className="text-xl md:text-2xl font-[b-titr]">
          ارائه بهترین خدمات
        </h2>

        <h1 className="text-3xl md:text-4xl font-extrabold font-[b-titr]">
          دندان پزشکی برای شما
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 leading-7">
          ما با استفاده از جدید ترین تکنولوژی و بهترین مواد در کنار شما هستیم
          تا با خیالی راحت لبخند زیبایی داشته باشید
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/rezerv">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Image
                src="/icons/thin-0024_calendar_month_day_planner_events.png"
                width={20}
                height={20}
                alt="calendar"
              />
              رزرو نوبت
            </button>
          </Link>

          <Link href="/services">
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <Image
                src="/icons/thin-0159_arrow_back_left.png"
                width={20}
                height={20}
                alt="arrow"
              />
              مشاهده خدمات
            </button>
          </Link>
        </div>
      </div>

      {/* SERVICES */}
      <section className="mt-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">خدمات ما</h2>
          <p className="text-gray-600">
            با بهترین تجهیزات و پزشکان متخصص، خدمات کامل دندانپزشکی را ارائه می‌دهیم.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARDS */}
          {[
            { icon: "🦷", title: "ایمپلنت دندان", desc: "جایگزینی دائمی دندان‌های از دست رفته با بهترین متریال." },
            { icon: "✨", title: "جرم گیری", desc: "پاکسازی جرم و پلاک‌های دندانی برای سلامت لثه." },
            { icon: "😁", title: "کامپوزیت", desc: "اصلاح طرح لبخند با کامپوزیت‌های طبیعی و بادوام." },
            { icon: "📐", title: "ارتودنسی", desc: "مرتب‌سازی دندان‌ها با جدیدترین روش‌های درمانی." },
            { icon: "💡", title: "بلیچینگ", desc: "سفید کردن دندان‌ها با روش‌های ایمن و حرفه‌ای." },
            { icon: "🩺", title: "عصب کشی", desc: "درمان ریشه با تجهیزات مدرن و بدون درد." },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
              <Link href="/services" className="text-blue-600 text-sm font-medium">
                مشاهده بیشتر
              </Link>
            </div>
          ))}
        </div>
      </section>

    </section>
  );
}
