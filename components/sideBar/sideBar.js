import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Sidebar() {
  const [doctors, setDoctors] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // تعریف توابع برای خوانایی بهتر
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/admin/doctors");
        const result = await res.json(); // نام را از data به result تغییر دادم تا با داخلش قاطی نشود

        if (result.success && Array.isArray(result.data)) {
          setDoctors(result.data); // فقط آرایه را ذخیره می‌کنیم
        } else {
          console.error("ساختار داده ارسالی از API درست نیست یا موفقیت‌آمیز نیست", result);
          setDoctors([]);
        }
      } catch (err) {
        console.error("خطا در لود پزشکان:", err);
        setDoctors([]);
      }
    };


    const fetchComments = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("خطا در لود نظرات:", err);
      }
    };

    // فراخوانی همزمان
    fetchDoctors();
    fetchComments();
  }, []);
  console.log('doctor:' , doctors)



  return (
    <aside className="w-full lg:w-[40%] lg:flex-1  bg-gray-50 p-6 rounded-lg shadow space-y-10">
      {/* 1️⃣ رزرو نوبت */}
      <Link href='/rezerv'>
        <section className="space-y-5">
          <h3 className="text-xl font-semibold text-gray-700 border-b font-[Btitr] pb-2"> رزرو نوبت</h3>

          <form className="space-y-4">
            <div>
              <label htmlFor="service" className="block mb-1 text-sm font-[Btitr] text-gray-600">
                انتخاب خدمت
              </label>
              <select
                id="service"
                name="service"
                className="w-full border font-[Bnazanin] border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">لطفاً انتخاب کنید</option>
                <option value="cleaning">جرم گیری</option>
                <option value="implant">ایمپلنت</option>
                <option value="orthodontics">ارتودنسی</option>
                <option value="composite">کامپوزیت</option>
              </select>
            </div>

            <div>
              <label htmlFor="doctor" className="block mb-1 font-[Btitr] text-sm text-gray-600">
                انتخاب دکتر
              </label>
              <select
                id="doctor"
                name="doctor"
                className="w-full border border-gray-300 font-[Bnazanin] rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block mb-1 font-[Btitr] text-sm text-gray-600">
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
              <label htmlFor="time" className="block mb-1 font-[Btitr] text-sm text-gray-600">
                انتخاب ساعت
              </label>
              <select
                id="time"
                name="time"
                className="w-full border border-gray-300 rounded-lg p-2 font-[Bnazanin] text-sm focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-[Btitr] font-medium hover:bg-blue-700 transition"
            >
              ثبت درخواست نوبت
            </button>
          </form>
        </section>
      </Link>

      {/* 2️⃣ پزشکان ما */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 border-b font-[Btitr] pb-2">پزشکان ما</h3>

        {/* بررسی اینکه حتما آرایه باشد */}
        {Array.isArray(doctors) && doctors.length > 0 ? (
          doctors.map((dr, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white p-3 rounded-lg border hover:shadow transition"
            >
              <Image
                src={dr.image || "/default-doctor.png"} // یک عکس پیش‌فرض در صورت نبود عکس
                width={70}
                height={70}
                alt={dr.name || "پزشک"}
                className="rounded-full"
              />
              <div>
                <h4 className="font-[Btitr] text-gray-800">{dr.name}</h4>
                <p className="text-sm text-gray-500">{dr.specialty}</p>
                <Link href={`/doctors/${dr.id}`} className="text-blue-600 text-sm hover:underline">
                  مشاهده پروفایل
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">در حال دریافت لیست پزشکان...</p>
        )}
      </section>

      {/* 3️⃣ نظرات بیماران */}
      <section section className="space-y-5" >
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 font-[Btitr]">
          نظرات بیماران
        </h3>

        {
          comments.length > 0 ? (
            comments.map((c, i) => (
              <div
                key={i}
                className="bg-white p-3 border rounded-lg shadow-sm font-[Bnazanin] hover:shadow transition"
              >
                <p className="text-gray-600 text-sm">{c.message}</p>
                <span className="text-sm text-gray-800 block mt-2 font-bold">— {c.sender}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">در حال دریافت نظرات...</p>
          )
        }
      </section>
    </aside>
  );
}
