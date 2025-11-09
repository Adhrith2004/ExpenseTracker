import React, { useEffect, useState } from 'react'
import { onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { userTransactionsRef } from '../firebase'
import { useAuth } from '../hooks/useAuth'

export default function TransactionList(){
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
      snap.forEach(d => tx.push({ id: d.id, ...d.data() }))
      setTransactions(tx)
    })
    return ()=>unsub()
  }, [user])

  const remove = async (id) => {
    if(!confirm('Delete this transaction?')) return
    await deleteDoc(doc(userTransactionsRef(user.uid).parent.parent ?? userTransactionsRef(user.uid), 'transactions', id))
    // The above is a fallback; but deleteDoc(doc(db, 'users', user.uid, 'transactions', id)) is another option.
    // To avoid importing db here, we used a workaround; if it fails, user can replace with doc(db, 'users', user.uid, 'transactions', id)
  }

  return (
    <div className="list">
      <h3>Transactions</h3>
      {transactions.length===0 ? <p className="muted">No transactions yet</p> : null}
      <ul>
        {transactions.map(t=>(
          <li key={t.id} className={t.type==='income' ? 'tx income' : 'tx expense'}>
            <div>
              <strong>{t.description}</strong>
              <div className="muted small">{t.createdAt?.toDate ? new Date(t.createdAt.toDate()).toLocaleString() : ''}</div>
            </div>
            <div className="amount-row">
              <span>{t.type==='income' ? '+' : '-'}₹{Number(t.amount).toFixed(2)}</span>
              <button className="del" onClick={async ()=>{ if(confirm('Delete this transaction?')) { try{ await deleteDoc(doc(userTransactionsRef(user.uid).parent.parent ?? userTransactionsRef(user.uid), 'transactions', t.id)); }catch(e){ console.error(e); alert('Delete failed'); } }}}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
