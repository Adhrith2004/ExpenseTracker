import React from 'react'
import { auth, signInWithGoogle, signOut } from '../firebase'
import { useAuth } from '../hooks/useAuth'

export default function Auth(){
  const { user } = useAuth()

  const onSignIn = async () => {
    try{
      await signInWithGoogle()
    }catch(e){
      console.error('Sign-in error', e)
      alert('Sign-in failed: ' + e.message)
    }
  }

  const onSignOut = async () => {
    try{
      await signOut()
    }catch(e){
      console.error('Sign-out error', e)
    }
  }

  if(user){
    return (
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <img src={user.photoURL} alt="avatar" style={{width:32,height:32,borderRadius:16}} />
        <div style={{fontSize:13}}>
          <div style={{fontWeight:600}}>{user.displayName}</div>
          <div style={{fontSize:12,color:'#666'}}>{user.email}</div>
        </div>
        <button onClick={onSignOut} style={{marginLeft:12,padding:'6px 10px',borderRadius:8,border:'none',cursor:'pointer'}}>Sign out</button>
      </div>
    )
  }

  return <button onClick={onSignIn} style={{padding:'8px 12px',borderRadius:8,border:'none',cursor:'pointer'}}>Sign in with Google</button>
}
