"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import DashboardLayout from './layout';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id);

      setBudgetList(result);
      getAllExpenses(); // Ensure this function is called properly
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
      console.log(result); // Check the console to verify the result
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Discover the Journey of Your Money: Where It Goes and How It Grows!</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()} />
        </div>
        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
