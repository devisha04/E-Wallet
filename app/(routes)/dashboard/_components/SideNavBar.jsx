"use client"
import { UserButton } from '@clerk/nextjs';
import { Layout, LayoutGrid, PiggyBank, Receipt, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const menuList = [
  {
    id: 1,
    name: 'Dashboard',
    icon: LayoutGrid,
    path: '/dashboard',
  },
  {
    id: 2,
    name: 'Budgets',
    icon: PiggyBank,
    path: '/dashboard/budgets',
  },
  {
    id: 3,
    name: 'Expenses',
    icon: Receipt,
    path: '/dashboard/expenses',
  },
  {
    id: 4,
    name: 'Upgrades',
    icon: ShieldCheck,
    path: '/dashboard/upgrades',
  },
];

function SideNavBar() {
  const path = usePathname(); // Call usePathname inside the component

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='h-screen p-5 shadow-sm'>
      <Image src='/logo.svg' width={160} height={100} alt='Logo' />
      <div className='mt-5'>
        {menuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-md hover:bg-blue-100 ${path === menu.path ? 'text-primary bg-blue-100' : ''}`}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2'>
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNavBar;
