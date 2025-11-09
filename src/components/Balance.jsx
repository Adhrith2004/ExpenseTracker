import React, { useEffect, useState } from 'react'
import { onSnapshot, query, orderBy } from 'firebase/firestore'
import { userTransactionsRef } from '../firebase'
import { useAuth } from '../hooks/useAuth'

export default function Balance(){
  const [transactions, setTransactions] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if(!user) {
      setTransactions([])
      return
    }
    const q = query(userTransactionsRef(user.uid), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      const tx = []
      snap.forEach(doc => tx.push({ id: doc.id, ...doc.data() }))
      setTransactions(tx)
    })
    return () => unsub()
  }, [user])

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  const balance = income - expense

  return (
    <div className="balance-card">
      <div>
        <h2>Balance</h2>
        <p className="big">₹{balance.toFixed(2)}</p>
      </div>
      <div className="row small-cards">
        <div className="card">Income<br/>₹{income.toFixed(2)}</div>
        <div className="card">Expense<br/>₹{expense.toFixed(2)}</div>
      </div>
    </div>
  )
}
