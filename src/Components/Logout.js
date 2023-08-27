import React from 'react'
import { useSignOut } from 'react-auth-kit'

export default function Logout() {
    const signOut = useSignOut()
    const handleSignOut  = () => {
      signOut();
      window.location.replace('http://127.0.0.1:3000/login')
    }
    
  return (
    <>
      <span onClick={ handleSignOut}>Sign Out</span>
    </>
  )
}
