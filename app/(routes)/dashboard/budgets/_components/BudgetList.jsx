"use client"
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      user&&getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),  // Cast amount to numeric
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id);
       

      setBudgetList(result);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CreateBudget
      refreshData={()=>getBudgetList()} />
        {budgetList?.length>0?budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} /> // Make sure to add a key prop
        ))
      :[1,2,3,4].map((item,index)=>(
        <div key={index}
        className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
        >
          </div>
      ))}
      </div>
    </div>
  );
}

export default BudgetList;
