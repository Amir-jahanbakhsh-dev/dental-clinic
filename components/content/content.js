import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Content() {
  const [services, setServices] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        setServices(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    // مقالات صفحه اصلی اکنون از دیتابیس واقعی خوانده می‌شوند (قبلاً داده‌های ثابت و ساختگی بودند)
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles?status=منتشر شده");
        const data = await res.json();
        setArticles(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchServices();
    fetchArticles();
  }, []);
  return (
    <section className="w-full lg:w-[60%] lg:flex-3 bg-white py-16 px-4 md:px-8">

      {/* TEXT CONTENT */}
      <div
        data-aos="fade-up"
        className="max-w-7xl mx-auto text-center p-10 rounded-2xl bg-cover bg-no-repeat bg-center space-y-4"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/img/bg-head.jpg')"
        }}>
        <span className="text-blue-600 font-medium">
          لبخند زیبا، اعتماد به نفس بیشتر
        </span>

        <h2 className="text-xl md:text-2xl font-[Btitr]">
          ارائه بهترین خدمات
        </h2>

        <h1 className="text-3xl md:text-4xl font-extrabold font-[Btitr]">
          دندان پزشکی برای شما
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 leading-7 font-[Bnazanin]">
          ما با استفاده از جدید ترین تکنولوژی و بهترین مواد در کنار شما هستیم
          تا با خیالی راحت لبخند زیبایی داشته باشید
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/rezerv">
            <button className="flex items-center font-[Btitr] gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
            <button className="flex items-center gap-2 px-6 py-3 border font-[Btitr] border-gray-300 rounded-lg hover:bg-gray-100 transition">
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
      <section className="mt-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <Link href="/services" className="inline-block">
            <h2 className="text-2xl font-bold font-[Btitr] mb-2">خدمات ما</h2>
          </Link>
          <p className="text-gray-600 text-md font-[Bnazanin]">
            با بهترین تجهیزات و پزشکان متخصص، خدمات کامل دندانپزشکی را ارائه می‌دهیم.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.slice(0, 6)?.map((service, index) => (
            <div
              key={service._id || service.slug}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              className="p-6 border rounded-xl text-center hover:shadow-xl hover:scale-105 transition bg-white"
            >
              <div className="flex justify-center mb-4">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                    🦷
                  </div>
                )}
              </div>

              <h3 className="font-bold font-[Btitr] mb-2 text-lg">
                {service.title}
              </h3>

              <p className="text-gray-600 font-[Bnazanin] text-md mb-4 line-clamp-3">
                {service.shortDescription || service.description?.slice(0, 120)}
              </p>

              {service.price && (
                <p className="text-blue-600 font-bold mb-4">
                  {service.price.toLocaleString()} تومان
                </p>
              )}

              <Link
                href={`/services/${service.slug}`}
                className="text-blue-600 font-[Btitr] text-sm font-medium hover:text-blue-800 transition"
              >
                مشاهده بیشتر
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            مشاهده همه خدمات
          </Link>
        </div>
      </section>

      <hr className="mt-5 mb-5" />
      <section className="mt-20 max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <Link href="/articles">
            <h2 className="text-2xl font-bold font-[Btitr] mb-2">مقالات ما</h2>
          </Link>
          <p className="text-gray-600 text-md font-[Bnazanin]">
            لیستی از اطلاعات عمومی در زمینه دندانپزشکی
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* کارت‌های مقالات - اکنون از دیتابیس واقعی خوانده می‌شود (قبلاً داده ثابت بود) */}
          {articles?.slice(0, 6)?.map((article, index) => (
            <div
              key={article._id}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              className="p-6 border rounded-xl text-center hover:shadow-xl hover:scale-105 transition"
            >
              <h3 className="font-bold font-[Btitr] mb-2">{article.title}</h3>
              <p className="text-gray-600 font-[Bnazanin] text-md mb-4 line-clamp-3">
                {article.summary || article.content?.slice(0, 100)}
              </p>
              <Link href={`/articles/${article.slug}`} className="text-blue-600 text-sm font-medium">
                مشاهده بیشتر
              </Link>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              در حال حاضر مقاله‌ای منتشر نشده است.
            </div>
          )}
        </div>
      </section>

    </section>
  );
}
