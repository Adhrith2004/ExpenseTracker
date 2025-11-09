import React from 'react'
import Auth from './components/Auth'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import Balance from './components/Balance'
import { useAuth } from './hooks/useAuth'

export default function App(){
  const { user } = useAuth()

  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <h1 style={{margin:0}}>Expense Tracker</h1>
        <Auth />
      </header>

      {user ? (
        <>
          <Balance />
          <AddTransaction />
          <TransactionList />
        </>
      ) : (
        <div className="card" style={{padding:16, marginTop:12}}>
          <p>Please sign in to view and manage your transactions.</p>
        </div>
      )}

      <footer className="footer">
        Built with React + Firestore
      </footer>
    </div>
  )
}
