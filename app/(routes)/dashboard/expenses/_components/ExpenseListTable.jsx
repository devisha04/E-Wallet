import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TrashIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList = [], refreshData }) {
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast('Expense Deleted!');
            refreshData();
        }
    };

    return (
        <div className="mt-3">
            <div className="grid grid-cols-4 bg-slate-300 p-2 ">
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>By</h2>
                <h2 className='font-bold'>Action</h2>
            </div>

            {expensesList.length > 0 ? (
                expensesList.map((expense, index) => (
                    <div key={index} className="grid grid-cols-4 bg-slate-100 p-2 mt-3">
                        <h2>{expense.name}</h2>
                        <h2>{expense.amount}</h2>
                        <h2>{expense.createdAt}</h2>
                        <h2>
                            <TrashIcon className='text-red-600 cursor-pointer' onClick={() => deleteExpense(expense)} />
                        </h2>
                    </div>
                ))
            ) : (
                <div className="p-2">No expenses found.</div>
            )}
        </div>
    );
}

export default ExpenseListTable;
