import React from 'react'
import BudgetList from './_components/BudgetList'
import CreateBudget from './_components/CreateBudget'

function Budget() {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>My Budgets</h2>
      <BudgetList/>
      
    </div>
  )
}

export default Budget
