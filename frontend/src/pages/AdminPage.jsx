import React from 'react'
import {Link, Outlet} from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-gray-900 text-white shadow-lg'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center space-x-8 h-16 px-4'>
            <Link 
              to='/admin/dashboard' 
              className='hover:text-yellow-400 transition-colors font-medium'
            >
              Dashboard
            </Link>
            <Link 
              to='/admin/product' 
              className='hover:text-yellow-400 transition-colors font-medium'
            >
              Create Product
            </Link>
            <Link 
              to='/admin/editAndDelete' 
              className='hover:text-yellow-400 transition-colors font-medium'
            >
              Manage Products
            </Link>
            <Link 
              to='/admin/user' 
              className='hover:text-yellow-400 transition-colors font-medium'
            >
              Users
            </Link>
          </div>
        </div>
      </nav>
      <main className='max-w-7xl mx-auto py-6 px-4'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPage