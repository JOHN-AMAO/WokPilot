import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { HeroTransitions, HeroTransitions2 } from "./HeroTransitions";
import { BorderBeam } from "@/components/magicui/border-beam";
import ShimmerButton from "./magicui/shimer-button";
import SparklesText from "./magicui/sparkles-text";
import { BentoGridSecondDemo } from "./Bento";

export function Landingpage() {
  return (
    <div className='flex flex-col  text-white bg-black'>
      <div className='flex flex-col  '>
        <div className='absolute inset-0 z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'>
          <header className=' pt-2 lg:px-24 px-2 mb-8 h-14 flex sm:justify-between justify-between items-center mt-2 '>
            <Link
              className='flex flex-col items-center justify-center'
              href='/'
            >
              <h1 className='text-2xl font-extrabold'>WorkPilot</h1>
            </Link>
            <div className='flex justify-between '>
              <nav className='ml-auto sm:flex justify-center items-center gap-4 sm:gap-6 hidden'>
                <Link
                  href='/sign-in'
                  className='relative inline-flex h-10 overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
                >
                  <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                  <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
                    Login
                  </span>
                </Link>
              </nav>
              <MobileNav />
            </div>
          </header>
          <main className='flex-1'>
            <section className='w-full py-4 md:py-4 lg:py-4 xl:py-8 px-6'>
              <div className='container px-4 md:px-6 '>
                <div className='flex flex-col text-center justify-center items-center'>
                  <div
                    className="relative z-10 flex place-items-center 
  before:absolute before:h-[400px] before:w-full before:-translate-x-1/2 before:rounded-full 
  before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] 
  after:absolute after:z-[-20] after:h-[480px] after:w-full after:translate-x-1/3 
  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] 
  before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 
  before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] 
  after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
                  >
                    <div className='flex flex-col justify-center space-y-4 text-center items-center '>
                      <div className='flex flex-col text-center items-center justify-center'>
                        <Link
                          href={"https://github.com/JOHN-AMAO/WokPilot"}
                          target='_blank'
                          className='whitespace-pre-wrap bg-black rounded-xl text-center text-sm font-medium leading-none tracking-tight text-foreground from-foreground to-muted-foreground lg:text-lg'
                        >
                          <ShimmerButton className='shadow-2xl h-10 text-white bg-background'>
                            Introducing WorkPilot V1
                          </ShimmerButton>
                        </Link>
                        <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl/none '>
                          <span className='bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'>
                            WorkPilot
                          </span>{" "}
                          is a better way
                        </h1>
                        <div>
                          <HeroTransitions />
                        </div>
                      </div>
                      <p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                        WorkPilot is the way future teams build projucts, start
                        projects, do great work
                      </p>

                      <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                        <Link
                          href='/sign-up'
                          className='relative inline-flex h-10 overflow-hidden rounded-sm p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
                        >
                          <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
                            Try it Now
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='relative rounded-xl mt-10 mb-30 overflow-hidden'>
                  <Image
                    src='/perfectview.jpg'
                    width={2344}
                    className='border rounded-xl'
                    height={1100}
                    alt='workpilot ui'
                  />
                  <BorderBeam
                    duration={12}
                    delay={9}
                  />
                </div>
              </div>
            </section>

            <section className='bg-black w-full pt-10'>
              <div className='flex flex-col justify-center items-center text-center space-y-4'>
                <SparklesText text='WorkPilot.' />
                <div className='flex flex-col gap-2'>
                  <div className='flex  items-center justify-center gap-2 text-center'>
                    <h1 className='text-xl'>One Platform</h1>
                    <HeroTransitions2 />
                  </div>
                  <div>
                    <h1 className='text-2xl'>
                      Boosting{" "}
                      <span className='text-2xl bg-gradient-to-r from-[#30df48] via-[#b609a7] to-[#077e64] text-transparent bg-clip-text animation-text font-bold'>
                        {" "}
                        Productivity
                      </span>
                    </h1>
                  </div>
                </div>

                <BentoGridSecondDemo />
              </div>
            </section>

            <section className='w-full py-12 md:py-24 lg:py-32 bg-black '>
              <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                    Trusted by Businesses Worldwide
                  </h2>
                  <p className='max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                    Our platform is used by businesses of all sizes, from
                    startups to enterprise-level organizations.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row lg:justify-end'>
                  <Link
                    className='inline-flex h-10 items-center justify-center rounded-md bg-[#0070f3] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#0070f3]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0070f3] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#0070f3] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                    href='#'
                  >
                    Contact Sales
                  </Link>
                  <Link
                    className='inline-flex h-10 items-center justify-center rounded-md border border-[#0070f3] px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-[#0070f3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0070f3] disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
                    href='#'
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </section>
          </main>
          <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              © 2024 WorkPilot Platform. All rights reserved.
            </p>
            <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
              <Link
                className='text-xs hover:underline underline-offset-4'
                href='#'
              >
                Terms of Service
              </Link>
              <Link
                className='text-xs hover:underline underline-offset-4'
                href='#'
              >
                Privacy
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
