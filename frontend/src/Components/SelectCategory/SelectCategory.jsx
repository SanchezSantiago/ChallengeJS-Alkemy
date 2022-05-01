import React from 'react'
import {Select} from 'antd'
const SelectCategory = () => {
    const { Option } = Select;
    function handleChange(value) {
        return value;
      }
  return (
    <Select defaultValue ='none' style={{ width: '100%' }} onChange={handleChange}>
        <Option value="none">None</Option>
        <Option value="Shopping">Shopping</Option>
        <Option value="Entertainment">Entertainment</Option>
        <Option value="Restaurants and bars">Restaurants and bars</Option>
        <Option value="Health and sports">Health and sports</Option>
        <Option value="Services">Services</Option>
        <Option value="Supermarket">Supermarket</Option>
        <Option value="Transports">Transports</Option>
        <Option value="Vacations">Vacations</Option>
    </Select>
  )
}

export default SelectCategory