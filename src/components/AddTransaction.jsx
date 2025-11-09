import React, { useState } from 'react'
import { serverTimestamp, addDoc } from 'firebase/firestore'
import { userTransactionsRef } from '../firebase'
import { useAuth } from '../hooks/useAuth'

export default function AddTransaction(){
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const { user } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    if(!user) return alert('Sign in first')
    if(!description || !amount) return alert('Enter description and amount')
    try{
      await addDoc(userTransactionsRef(user.uid), {
        description,
        amount: Number(amount),
        type,
        createdAt: serverTimestamp()
      })
      setDescription('')
      setAmount('')
    }catch(e){
      console.error(e)
      alert('Failed to add transaction: ' + e.message)
    }
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <h3>Add Transaction</h3>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
      <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount (numbers only)" type="number" step="0.01" />
      <div className="type-row">
        <label><input type="radio" checked={type==='expense'} onChange={()=>setType('expense')} /> Expense</label>
        <label><input type="radio" checked={type==='income'} onChange={()=>setType('income')} /> Income</label>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}
