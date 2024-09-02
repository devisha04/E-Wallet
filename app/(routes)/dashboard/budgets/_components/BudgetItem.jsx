import React from 'react';
import Link from 'next/link'; // Import from next/link

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    if (!budget.totalSpend || !budget.amount) return 0;
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  };

  if (!budget) {
    return null; // Return null if the budget is undefined
  }

  return (
   
    <Link href={'/dashboard/expenses/'+budget?.id} >
       <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]"> 
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl bg-slate-100 p-3 px-4 rounded-full">{budget.icon || '😊'}</h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItems} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">₹{budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">₹{budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
          <h2 className="text-xs text-slate-400">₹{budget.amount - budget.totalSpend} Remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`
            }}
          ></div>
        </div>
      </div>
      </div>
    </Link>
   
  );
}

export default BudgetItem;
