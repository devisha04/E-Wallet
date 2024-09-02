"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditBudget({ budgetInfo = {} ,refreshData}) {  // Default value for budgetInfo
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false); // Fixed to boolean
    const [name, setName] = useState(budgetInfo?.name || ''); // Default to empty string
    const [amount, setAmount] = useState(budgetInfo?.amount || ''); // Default to empty string

    const { user } = useUser();

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result) {
            refreshData();
            toast('Budget Updated!')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='flex gap-2'> <PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant='outline'
                                    className='text-lg'
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >{emojiIcon}
                                </Button>
                                <div className='absolute z-20'>
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input placeholder='e.g. Home Decor'
                                        defaultValue={budgetInfo.name || ''} // Default to empty string
                                        type='text'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input placeholder='e.g. ₹ 500'
                                        defaultValue={budgetInfo.amount || ''} // Default to empty string
                                        type='number'
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <Button
                                    disabled={!(name && amount)}
                                    className='mt-5'
                                    onClick={() => onUpdateBudget()}
                                >
                                    Update Budget
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget;
