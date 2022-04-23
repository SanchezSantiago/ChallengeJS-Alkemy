import React from 'react'
//COMPONENTS
import OperationForm from '../../Components/Form/OperationForm'
import IncomeOperationsTable from '../../Components/IncomeOperationsTable/IncomeOperationsTable'
import ExpenseOperationsTable from '../../Components/ExpenseOperationsTable/ExpenseOperationsTable'
//STYLE
import './Operations.css'
//PAGE 'Operations'
const Operations = () => {
return (
<div className='Operations'>

  <OperationForm />

  <div className='table-container'>

    <div className='incomes'>
      <h3>Incomes</h3>
      <IncomeOperationsTable/>
    </div>
    
    <div className='expenses'>
      <h3>Expenses</h3>
      <ExpenseOperationsTable/>
    </div>

  </div>
</div>
)
}

export default Operations