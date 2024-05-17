//@ts-nocheck
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TimerIcon, SaveIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function Landingpage() {
  return (
    <>
      <header className='w-full bg-gradient-to-r from-[#0077B6] to-[#00A8E8] py-6 px-4 md:px-8 lg:px-12'>
        <div className='container mx-auto flex items-center justify-between'>
          <Link
            href='/'
            className='flex gap-2'
          >
            <BriefcaseMedicalIcon className='h-8 w-8 text-white' />
            <h1 className='text-blue-800 font-mono text-2xl font-extrabold'>
              Diagonal
            </h1>
            <span className='sr-only'>Medical AI Diagnostics</span>
          </Link>
          <nav className='hidden space-x-6 md:flex'>
            <Link
              className='text-white hover:underline'
              href='#'
            >
              Features
            </Link>
            <Link
              className='text-white hover:underline'
              href='#'
            >
              Pricing
            </Link>
            <Link
              className='text-white hover:underline'
              href='#'
            >
              About
            </Link>
            <Link
              className='text-white hover:underline'
              href='#'
            >
              Contact
            </Link>
          </nav>
          <div>
            <Link href='/sign-up'>
              <Button
                className='text-white'
                variant='outline'
              >
                Get Started
              </Button>
            </Link>
            <Link href='/sign-in'>
              <Button
                className='text-white'
                variant='outline'
              >
                Login
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </header>
      <main>
        <section className='bg-gradient-to-r from-[#0077B6] to-[#00A8E8] py-20 px-4 md:px-8 lg:px-12'>
          <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='space-y-6 text-white'>
              <h1 className='text-4xl font-bold leading-tight md:text-5xl lg:text-6xl'>
                Revolutionize Your Medical Practice with AI-Powered Diagnostics
              </h1>
              <p className='text-lg md:text-xl'>
                Streamline your workflow, improve diagnostic accuracy, and save
                valuable time with our cutting-edge medical AI tool.
              </p>
              <Button
                className='bg-white text-[#0077B6] hover:bg-gray-200'
                variant='solid'
              >
                Try It Now
              </Button>
            </div>
            <div className='flex justify-center'>
              <Image
                alt='Medical AI Diagnostics'
                className='rounded-lg shadow-lg'
                height='400'
                src='/placeholder.svg'
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width='400'
              />
            </div>
          </div>
        </section>
        <section className='py-20 px-4 md:px-8 lg:px-12'>
          <div className='container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-4'>
              <ClockIcon className='h-12 w-12 text-[#0077B6]' />
              <h3 className='text-2xl font-bold'>Save Hours</h3>
              <p className='text-gray-600'>
                Our AI-powered diagnostics tool streamlines your workflow,
                reducing the time spent on manual record-keeping and analysis.
              </p>
            </div>
            <div className='space-y-4'>
              <AccessibilityIcon className='h-12 w-12 text-[#0077B6]' />
              <h3 className='text-2xl font-bold'>Improved Accuracy</h3>
              <p className='text-gray-600'>
                Benefit from our advanced AI algorithms that provide highly
                accurate diagnoses, helping you deliver better patient care.
              </p>
            </div>
            <div className='space-y-4'>
              <WorkflowIcon className='h-12 w-12 text-[#0077B6]' />
              <h3 className='text-2xl font-bold'>Streamlined Workflow</h3>
              <p className='text-gray-600'>
                Seamlessly integrate our tool into your existing workflow,
                enabling you to focus on what matters most - your patients.
              </p>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                Improve Diagnostic Accuracy and Efficiency
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Our AI-powered diagnostics tool helps you save time and money
                while providing more accurate and reliable insights for your
                patients.
              </p>
            </div>
            <div className='grid gap-4'>
              <div className='rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950'>
                <div className='flex items-center space-x-3'>
                  <TimerIcon className='h-8 w-8 text-[#0077B6]' />
                  <h3 className='text-lg font-semibold'>Time Savings</h3>
                </div>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  Streamline your diagnostic workflow and reduce the time spent
                  on manual tasks, allowing you to see more patients.
                </p>
              </div>
              <div className='rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950'>
                <div className='flex items-center space-x-3'>
                  <SaveIcon className='h-8 w-8 text-[#0077B6]' />
                  <h3 className='text-lg font-semibold'>Cost Savings</h3>
                </div>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  Reduce unnecessary testing and improve diagnostic accuracy,
                  leading to significant cost savings for your practice.
                </p>
              </div>
              <div className='rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950'>
                <div className='flex items-center space-x-3'>
                  <AccessibilityIcon className='h-8 w-8 text-[#0077B6]' />
                  <h3 className='text-lg font-semibold'>Improved Accuracy</h3>
                </div>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  Our AI-powered diagnostics tool provides highly accurate
                  insights to help you make more informed decisions for your
                  patients.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-gray-100 py-20 px-4 md:px-8 lg:px-12'>
          <div className='container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2'>
            <div className='space-y-4'>
              <Image
                alt='Testimonial'
                className='rounded-lg shadow-lg w-full'
                height='400'
                src='/doctor.png'
                width={200}
              />
            </div>
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold'>What Doctors Are Saying</h2>
              <blockquote className='space-y-4'>
                <p className='text-lg font-medium text-gray-800'>
                  This tool has revolutionized my practice. The time-saving
                  features and improved diagnostic accuracy have been a
                  game-changer for me and my patients.
                </p>
                <cite className='text-gray-600'>
                  - Dr. Emily Wilkins, Family Medicine Practitioner
                </cite>
              </blockquote>
              <blockquote className='space-y-4'>
                <p className='text-lg font-medium text-gray-800'>
                  I highly recommend this AI diagnostics tool to any medical
                  professional looking to streamline their workflow and provide
                  better patient care.
                </p>
                <cite className='text-gray-600'>
                  - Dr. Michael Nguyen, Internal Medicine Specialist
                </cite>
              </blockquote>
            </div>
          </div>
        </section>
        <section className='bg-gradient-to-r from-[#0077B6] to-[#00A8E8] py-20 px-4 md:px-8 lg:px-12'>
          <div className='container mx-auto text-center text-white'>
            <h2 className='text-3xl font-bold'>
              Ready to Transform Your Practice?
            </h2>
            <p className='mt-4 text-lg'>
              Experience the power of AI-powered diagnostics and streamline your
              workflow today.
            </p>
            <Button
              className='mt-8 bg-white text-[#0077B6] hover:bg-gray-200'
              variant='solid'
            >
              Try It Now
            </Button>
          </div>
        </section>
      </main>
      <footer className='bg-gray-900 py-8 px-4 md:px-8 lg:px-12'>
        <div className='container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
          <div className='flex items-center space-x-4'>
            <BriefcaseMedicalIcon className='h-8 w-8 text-white' />
            <span className='text-white'>Medical AI Diagnostics</span>
          </div>
          <nav className='flex space-x-6 text-white'>
            <Link
              className='hover:underline'
              href='#'
            >
              Features
            </Link>
            <Link
              className='hover:underline'
              href='#'
            >
              Pricing
            </Link>
            <Link
              className='hover:underline'
              href='#'
            >
              About
            </Link>
            <Link
              className='hover:underline'
              href='#'
            >
              Contact
            </Link>
          </nav>
          <p className='text-gray-500'>
            © 2024 Medical AI Diagnostics. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function AccessibilityIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle
        cx='16'
        cy='4'
        r='1'
      />
      <path d='m18 19 1-7-6 1' />
      <path d='m5 8 3-3 5.5 3-2.36 3.5' />
      <path d='M4.24 14.5a5 5 0 0 0 6.88 6' />
      <path d='M13.76 17.5a5 5 0 0 0-6.88-6' />
    </svg>
  );
}

function BriefcaseMedicalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 11v4' />
      <path d='M14 13h-4' />
      <path d='M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' />
      <path d='M18 6v14' />
      <path d='M6 6v14' />
      <rect
        width='20'
        height='14'
        x='2'
        y='6'
        rx='2'
      />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
      />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}

function WorkflowIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect
        width='8'
        height='8'
        x='3'
        y='3'
        rx='2'
      />
      <path d='M7 11v4a2 2 0 0 0 2 2h4' />
      <rect
        width='8'
        height='8'
        x='13'
        y='13'
        rx='2'
      />
    </svg>
  );
}
