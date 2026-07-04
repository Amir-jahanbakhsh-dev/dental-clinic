import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

export default function ArticlesListPage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // فقط مقالات منتشر شده در صفحه عمومی نمایش داده می‌شوند
                const res = await fetch('/api/articles?status=منتشر شده');
                const result = await res.json();
                if (result.success) {
                    setArticles(result.data);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <>
            <Head>
                <title>مقالات ما | کلینیک دندان پزشکی</title>
                <meta name="description" content="جدیدترین مقالات و اطلاعات تخصصی دندان‌پزشکی را در این بخش مطالعه کنید." />
            </Head>

            <Header />

            <div className="container mx-auto p-8 pt-32 min-h-screen" dir="rtl">
                <h1 className="text-3xl md:text-4xl font-[Btitr] mb-10 text-center text-blue-900">لیست مقالات ما</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <Link href={`/articles/${article.slug}`} key={article._id} className="group">
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                                            {article.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-5xl">📄</div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 font-[Btitr]">
                                                {article.title}
                                            </h2>

                                            {article.author && (
                                                <p className="text-sm text-gray-400 mb-2">نویسنده: {article.author}</p>
                                            )}

                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 font-[Bnazanin]">
                                                {article.summary || article.content?.slice(0, 120)}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <span className="text-blue-500 text-sm font-medium">مطالعه مقاله ←</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-20">
                                در حال حاضر مقاله‌ای منتشر نشده است.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
