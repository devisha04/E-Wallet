"use client"; // Ensure this file is treated as a client component in Next.js

import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  const { user, isSignedIn } = useUser() || {};

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image
        src='/logo.svg' // Ensure this file is located in the public directory
        alt='logo'
        width={160}
        height={200}
      />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href='/sign-in'> {/* Closing tag for Link added */}
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
