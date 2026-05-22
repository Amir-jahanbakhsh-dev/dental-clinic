import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;

    return (
        <>
            <Header/>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold">جزئیات خدمت: {slug}</h1>
                <p className="mt-4">توضیحات مربوط به {slug} اینجا قرار می‌گیرد.</p>
            </div>
            <Footer/>
        </>
    );
}