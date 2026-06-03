import Footer from '@/components/footer/footer';
import Header from '@/components/navbar/navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 pt-30">
        
        {/* بخش تصویر */}
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0 relative">
          <Image
            src="/images/about-us.jpg" // مسیر تصویر درباره ما را اینجا قرار دهید
            alt="درباره ما"
            width={700} // اندازه تصویر را تنظیم کنید
            height={500} // اندازه تصویر را تنظیم کنید
            className="rounded-lg shadow-xl w-full h-auto object-cover"
            // placeholder="blur" // اگر تمایل به استفاده از blurDataURL دارید
            // blurDataURL="..."
          />
        </div>

        {/* بخش متن */}
        <div className="lg:w-1/2 w-full">
          <h1 className="text-4xl font-[Btitr] text-gray-800 mb-6">درباره ما</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">
            ما یک تیم پرشور و خلاق هستیم که با هدف [بیان هدف اصلی شرکت/پروژه] گرد هم آمده‌ایم. از سال [سال تاسیس]، ما متعهد به ارائه [محصولات/خدمات اصلی] با بالاترین کیفیت به مشتریان خود بوده‌ایم.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            داستان ما از یک ایده ساده در [محل شروع ایده] آغاز شد؛ ایده‌ای که به تدریج با تلاش و پشتکار تیم ما به واقعیت پیوست. ما باور داریم که [بیان یک ارزش کلیدی، مثلا: نوآوری، رضایت مشتری، کیفیت].
          </p>
          
          <h2 className="text-3xl font-[Btitr] text-gray-800 mb-4 mt-8">ماموریت و چشم‌انداز</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>ماموریت ما:</strong> [بیان ماموریت اصلی شرکت]. ما تلاش می‌کنیم تا با [روش‌های انجام کار]، بهترین تجربه را برای کاربرانمان فراهم کنیم.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>چشم‌انداز ما:</strong> تبدیل شدن به [بیان چشم‌انداز بلندمدت، مثلا: رهبر بازار در حوزه X، شناخته‌شده‌ترین نام در Y]. ما برای رسیدن به این هدف، همواره در حال یادگیری و به‌روزرسانی دانش و خدمات خود هستیم.
          </p>

          {/* بخش تیم (اختیاری) */}
          <div className="mt-10">
            <h2 className="text-3xl font-[Btitr] text-gray-800 mb-4">تیم ما</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              پشتوانه اصلی ما، تیمی از متخصصان با تجربه و علاقه‌مند در حوزه‌های مختلف است. ما با همکاری یکدیگر، فضایی پویا و حمایتی را برای رشد و نوآوری ایجاد کرده‌ایم.
            </p>
            {/* می‌توانید اینجا عکس اعضای تیم را هم اضافه کنید */}
          </div>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
}
