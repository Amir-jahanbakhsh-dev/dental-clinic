import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import dbConnect from '@/lib/mongodb'; // فرض بر وجود فایل اتصال به دیتابیس
import Service from '@/models/Service';   // مدل مدل سرویس شما

// تابع کمکی برای دریافت اطلاعات از دیتابیس در سمت سرور
async function getServiceBySlug(slug) {
    try {
        await dbConnect();
        return await Service.findOne({ slug: slug });
    } catch (error) {
        console.error("Database Error:", error);
        return null;
    }
}

// استفاده از getServerSideProps برای سئو و سرعت بالا
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            notFound: true, // اگر سرویس پیدا نشد، صفحه 404 نمایش داده شود
        };
    }

    return {
        props: {
            service: JSON.parse(JSON.stringify(service)), // تبدیل به JSON برای انتقال از سرور به کلاینت
        },
    };
}

export default function ServiceDetailPage({ service }) {
    return (
        <>
            {/* --- بخش سئو (SEO Optimized) --- */}
            <Head>
                <title>{service.title} | نام برند شما</title>
                <meta name="description" content={service.description.substring(0, 160)} />
                <meta name="keywords" content={`${service.title}, ${service.category}, نام برند`} />

                {/* Open Graph برای نمایش زیبا در تلگرام و واتس‌اپ */}
                <meta property="og:title" content={service.title} />
                <meta property="og:description" content={service.shortDescription || service.description.substring(0, 150)} />
                <meta property="og:image" content={service.image} />
                <meta property="og:type" content="article" />
            </Head>

            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20 min-h-screen" dir="rtl">
                <div className="max-w-5xl mx-auto">

                    {/* --- بخش تصویر اصلی (Hero Section) --- */}
                    <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-10">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            priority // بارگذاری سریع تصویر اصلی
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white">
                                {service.title}
                            </h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* --- ستون اصلی: توضیحات (Content Area) --- */}
                        <div className="lg:col-span-2 space-y-8">
                            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-blue-900 mb-6 border-r-4 border-blue-600 pr-4">
                                    درباره این خدمت
                                </h2>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                    {service.description}
                                </div>
                            </section>

                            {/* بخش ویژگی‌ها یا مزایا (اختیاری - اگر در دیتابیس دارید) */}
                            {service.features && (
                                <section className="bg-blue-50 p-6 rounded-2xl">
                                    <h3 className="text-xl font-bold text-blue-800 mb-4">مزایای این سرویس:</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="text-blue-500 ml-2">✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {/* --- ستون کناری: باکس اطلاعات و قیمت (Sidebar) --- */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 sticky top-32">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">جزئیات رزرو</h3>

                                <div className="space-y-5">
                                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                        <span className="text-gray-500">دسته‌بندی:</span>
                                        <span className="font-medium text-gray-800">{service.category || 'عمومی'}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                        <span className="text-gray-500">وضعیت:</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            موجود
                                        </span>
                                    </div>

                                    <div className="pt-4 text-center">
                                        <span className="text-gray-500 block mb-1 text-sm">قیمت نهایی:</span>
                                        <span className="text-3xl font-extrabold text-blue-600">
                                            {service.price.toLocaleString()} <small className="text-sm font-normal text-gray-500">تومان</small>
                                        </span>
                                    </div>

                                    <Link href='/rezerv'>
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 mt-4">
                                            ثبت سفارش / رزرو آنلاین
                                        </button>

                                    </Link>

                                    <Link
                                        href="/services"
                                        className="block text-center text-sm text-gray-400 hover:text-blue-500 transition-colors mt-4"
                                    >
                                        ← بازگشت به لیست خدمات
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
