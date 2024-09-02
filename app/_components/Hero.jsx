import React from 'react'
import Image from 'next/image'
function Hero() {
  return (
    <div>
      <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Manage Your Money
        <strong className="font-extrabold text-primary sm:block"> Control Your  Expense </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Expense Ease: Your smart and secure e-wallet solution. Manage, track, and simplify your finances with ease, all in one place
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-300 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>

       
      </div>
    </div>
  </div>
  <Image src="/dashboard.png" alt="dashboard" height={700} width={1000} className='mt-5 rounded-xl' />

</section>
    </div>
  )
}

export default Hero
