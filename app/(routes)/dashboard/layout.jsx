"use client";

import React, { useEffect } from 'react';
import SideNavBar from './_components/SideNavBar';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { Budgets } from '@/utils/schema'; // Ensure Budgets is imported
import { useRouter } from 'next/navigation'; // Ensure this import is correct

function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter(); // Initialize router here

  useEffect(() => {
    const checkUserBudgets = async () => {
      if (isLoaded && user) {
        try {
          const result = await db
            .select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

          console.log(result);
          if (result?.length === 0) {
            router.replace('/dashboard/budgets'); // Ensure the route is correct
          }
        } catch (error) {
          console.error("Error fetching budgets:", error);
        }
      }
    };

    checkUserBudgets();
  }, [isLoaded, user, router]); // Added router to the dependency array

  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SideNavBar />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
