// app/services/[slug]/page.jsx  (یا مسیر مشابهی که دارید)
import Footer from "@/components/footer/footer"; // فرض می‌کنیم این مسیرها درست هستند
import Header from "@/components/navbar/navbar";

// این کامپوننت به صورت پیش‌فرض یک Server Component است
export default async function ServiceDetailPage({ params }) {
    // params به صورت خودکار توسط Next.js پاس داده می‌شود
    // و شامل پارامترهای داینامیک URL است.
    // مثلاً اگر URL: /services/my-service باشد، params.slug برابر "my-service" خواهد بود.
    const { slug } = params; 

    // شما می‌توانید اینجا داده‌های مربوط به slug را از دیتابیس یا فایل بخوانید
    // const serviceData = await fetchServiceData(slug); // مثال

    return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                {/* نمایش slug که از URL گرفته شده */}
                <h1 className="text-3xl font-[Btitr]">جزئیات خدمت: {slug}</h1>
                <p className="mt-4">توضیحات مربوط به خدمت {slug} اینجا قرار می‌گیرد.</p>
                {/* اینجا می‌توانید داده‌های خوانده شده را نمایش دهید */}
                {/* {serviceData && <p>{serviceData.description}</p>} */}
            </div>
            <Footer />
        </>
    );
}

