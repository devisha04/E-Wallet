import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
      <div className='flex-grow'>
        {/* Replace 'seach bar' with an actual input element for better UX */}
        <input 
          type='text' 
          placeholder='Search...' 
          className='border rounded px-4 py-2 w-full' 
        />
      </div>
      <div className='ml-4'>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
