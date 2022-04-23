import React from 'react'
//COMPONENTS
import OperationForm from '../../Components/Form/OperationForm'
import OperationsTable from '../../Components/OperationsTable/OperationsTable';
//STYLE
import './Operations.css'
//PAGE 'Operations'
const Operations = () => {
return (
<div className='Operations'>
  <OperationForm />
  <OperationsTable />
</div>
)
}

export default Operations