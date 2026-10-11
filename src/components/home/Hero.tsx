'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  imageUrl?: string;
}

export function Hero({ imageUrl = '/bazar-hero.png' }: HeroProps) {
  const scrollToProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById('সব-পণ্য');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

return (
    <section className="relative bg-gradient-to-b from-primary-50 via-white to-white py-14 lg:py-24" aria-labelledby="hero-heading">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <p className="text-body-sm font-medium text-primary-600 mb-3" aria-hidden="true">
              আজকের বাজারের দাম
            </p>
            <h1 id="hero-heading" className="text-display-sm lg:display-md font-bold text-neutral-900 mb-4 leading-tight">
              প্রতিদিনের বাজার দাম<br />
              <span className="text-primary-600">এক নজরে জানুন</span>
            </h1>
            <p className="text-body-lg text-neutral-600 mb-7 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              বাংলাদেশের সব বাজারের আজকের পণ্যের দাম, দামের পরিবর্তন এবং ট্রেন্ডসহ এক জায়গায়। স্মার্ট কেনাকাটা করুন।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button size="lg" onClick={scrollToProducts} className="w-full sm:w-auto">
                সব পণ্য দেখুন
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center hidden lg:block">
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/3] bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-neutral-100 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="বাজার দর - তাজা পণ্য ও দাম"
                  width={480}
                  height={360}
                  className="w-full h-full object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden order-first w-full max-w-md mx-auto">
            <div className="aspect-[4/3] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-100 overflow-hidden">
              <Image
                src={imageUrl}
                alt="বাজার দর - তাজা পণ্য ও দাম"
                width={360}
                height={270}
                className="w-full h-full object-contain p-4"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}