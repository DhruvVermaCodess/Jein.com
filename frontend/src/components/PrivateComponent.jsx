import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
const PrivateComponent = ({children}) => {
  const {isAdmin} = useContext(AuthContext)
  return (
    isAdmin ? children : <Navigate to="/" />
  )
}

export default PrivateComponent