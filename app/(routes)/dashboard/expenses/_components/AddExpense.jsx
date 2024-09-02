import React, { useState } from "react";

import { toast } from "sonner"; 
import { db } from "@/utils/dbConfig";
import { Budgets,Expenses } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment/moment";

function AddExpense({budgetId, user,refreshData }) {
    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const addNewExpense = async () => {
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning({ insertedId: Budgets.id }); 

        console.log(result);
        if (result) {
            refreshData();
            toast('New Expense Added');
        }
    };

    return (
        <div className="border p-5 rounded-lg mb-8"> {/* Added `mb-8` to add margin-bottom */}
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Books"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    placeholder="e.g. 1000"
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount)}
                className="mt-3 w-full"
                onClick={() => addNewExpense()}
            >
                Add New Expense
            </Button>
            <div className="mt-5">
                {/* Here you can map and display your expenses */}
            </div>
        </div>
    );
}

export default AddExpense;
