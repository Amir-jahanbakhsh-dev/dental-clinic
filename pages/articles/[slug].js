import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';

// تابع کمکی برای دریافت مقاله از دیتابیس در سمت سرور
async function getArticleBySlug(slug) {
    try {
        await dbConnect();
        return await Article.findOne({ slug: slug });
    } catch (error) {
        console.error("Database Error:", error);
        return null;
    }
}

// استفاده از getServerSideProps (سازگار با Pages Router) به‌جای async/params که باعث خطا می‌شد
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            article: JSON.parse(JSON.stringify(article)),
        },
    };
}

export default function ArticleDetailPage({ article }) {
    return (
        <>
            <Head>
                <title>{article.title} | کلینیک دندان پزشکی</title>
                <meta name="description" content={(article.metaDescription || article.summary || article.content || "").substring(0, 160)} />
                {article.metaTitle && <meta name="keywords" content={article.metaTitle} />}
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={(article.summary || article.content || "").substring(0, 150)} />
                {article.image && <meta property="og:image" content={article.image} />}
                <meta property="og:type" content="article" />
            </Head>

            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20 min-h-screen" dir="rtl">
                <div className="max-w-4xl mx-auto">

                    {article.image && (
                        <div className="relative w-full h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl mb-10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                                <h1 className="text-2xl md:text-4xl font-bold text-white font-[Btitr]">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    )}

                    {!article.image && (
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 font-[Btitr]">
                            {article.title}
                        </h1>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                        {article.author && <span>نویسنده: {article.author}</span>}
                        {article.category && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                                {article.category}
                            </span>
                        )}
                    </div>

                    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg font-[Bnazanin]">
                            {article.content}
                        </div>
                    </section>

                    <div className="mt-10 text-center">
                        <Link
                            href="/articles"
                            className="inline-block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            ← بازگشت به لیست مقالات
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
