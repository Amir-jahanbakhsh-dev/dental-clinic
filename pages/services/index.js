import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ServicesListPage() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services'); // API عمومی که برای گرفتن همه سرویس‌ها ساختیم
                const result = await res.json();
                if (result.success) {
                    setServices(result.data);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <>
            <Head>
                <title>خدمات تخصصی ما | نام برند شما</title>
                <meta name="description" content="لیست کامل خدمات و سرویس‌های تخصصی ما را اینجا مشاهده کنید. بهترین کیفیت و قیمت مناسب." />
                <meta name="keywords" content="خدمات، سرویس، نام برند، مشاوره، زیبایی" />
                <meta property="og:title" content="لیست خدمات ما" />
                <meta property="og:description" content="مشاهده و انتخاب بهترین خدمات از میان لیست جامع ما" />
                <meta property="og:type" content="website" />
            </Head>

            <Header />

            <div className="container mx-auto p-8 pt-32 min-h-screen" dir="rtl">
                <h1 className="text-4xl font-[Btitr] mb-10 text-center text-blue-900">لیست خدمات ما</h1>
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <Link href={`/services/${service.slug}`} key={service._id} className="group">
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                        {/* بخش تصویر */}
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* بخش محتوا */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {service.title}
                                                </h2>
                                                <span className="text-blue-600 font-bold text-lg">
                                                    {service.price.toLocaleString()} <small className="text-xs">تومان</small>
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                {service.shortDescription || "توضیحات کوتاهی برای این خدمت در دسترس نیست..."}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <span className="text-blue-500 text-sm font-medium">مشاهده جزئیات ←</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-20">
                                متاسفانه فعلاً خدمتی ثبت نشده است.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
