/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import Stars from "@/components/Stars";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-8 lg:pt-20 lg:pb-52">
          <div className="px-6 col-span-2 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center flex flex-col items-center lg:text-left lg:items-start">
              <div className="w-28 lg:block">
                <img src="/snake-1.png" alt="snake" className="w-full" />
              </div>

              <h1 className="w-fit relative tracking-tight text-balance font-bold !leading-tight text-gray-900 text-5xl">
                Your Image on a <span className="bg-green-600 text-white px-2">Custom</span> Phone Case
              </h1>

              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Capture your favorite memories with your own,{' '}
                <span className='font-semibold'>one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">

                <li className="flex gap-1 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600"/>
                  High quality, durable material.
                </li>
                
                <li className="flex gap-1 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600"/>
                  2 years print guaranteed.
                </li>

                <li className="flex gap-1 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600"/>
                  All modern phone models supported.
                </li>

                </div>
              </ul>

              <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                <div className="flex -space-x-4">
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-200"
                    src="/users/user-1.png" 
                    alt="user image" 
                  />

                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-200"
                    src="/users/user-1.png" 
                    alt="user image" 
                  />

                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-200"
                    src="/users/user-1.png" 
                    alt="user image" 
                  />
                  
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-200"
                    src="/users/user-1.png" 
                    alt="user image" 
                  />
                  
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-200"
                    src="/users/user-1.png" 
                    alt="user image" 
                  />
                </div>

                <div className="flex gap-0.5">
                  <Stars count={5} />
                </div>

                <p className="-mt-4">
                  <span className="font-semibold">1,250</span> happy customers.
                </p>
                
              </div>
            </div>
          </div>

          <div className="w-full h-fit col-span-full lg:col-span-1 flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 lg:mx-0 xl:-ml-12">
            <div className="relative md:max-w-xl">
              <img 
                src="/your-image.png" 
                alt="hero image" 
                className="absolute w-40 lg:w-52 left-52 -top-20 select-none sm:block lg:hidden xl:block" 
              />

              <img 
                src="/line.png" 
                alt="hero line image" 
                className="w-20 absolute select-none -left-6 -bottom-6" 
              />

              <Phone imgSrc="/testimonials/1.jpg" className="w-64" />
            </div>
          </div>
          
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='bg-slate-100 grainy-dark py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              What our{' '}
              <span className='relative px-2'>
                customers{' '}
                <Icons.underline className='sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
              </span>{' '}
              say
            </h2>
            <img src='/snake-2.png' className='w-24 order-0 lg:order-2' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:px-0 lg:max-w-none lg:grid-cols-3 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Stars count={5} />
              </div>

              <div className='text-lg leading-8'>
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Stars count={4} />
              </div>

              <div className='text-lg leading-8'>
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
              <Stars count={3} />
              </div>
              
              <div className='text-lg leading-8'>
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </MaxWidthWrapper>

          <div className="pt-16">
            <Reviews />
          </div>
        </section>

        <section>
          <MaxWidthWrapper className="py-24">
            <div className="px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Upload your photo or design and get{' '}
                <span className='relative px-2 bg-green-600'>
                  your own case{' '}
                  <Icons.underline className='hidden md:block pointer-events-none absolute inset-x-0 -bottom-9 text-green-500' />
                </span>{' '}
                now.
                </h2>
              </div>
            </div>

            <div className="mt-20 mx-auto max-w-6xl px-6 lg:px-8">
              <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                <img 
                  src="/arrow.png" 
                  alt="arrow image" 
                  className="absolute top-[37.5rem] md:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 rotate-90 md:rotate-0"
                />
                <div className="relative h-[520px] md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                  <img 
                    src="/horse.jpg" 
                    alt="horse image"
                    className="w-full h-full bg-white rounded-md object-cover shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>

                <Phone imgSrc="/horse_phone.jpg" className="w-60"/>
              </div>
            </div>

            <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              High-quality silicone material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Scratch- and fingerprint resistant coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul>
          
          </MaxWidthWrapper>
        </section>
    </div>
  );
}
