import React from 'react'

const AdminDashboard = () => {
    const userName = localStorage.getItem('adminUser')
    return (
        <div className='container-fluid py-3' style={{ background: 'linear-gradient(135deg, #f3f4ff , #fbfbff)', minHeight: '100vh' }}>
            <div className="container">
                <h1>Admin Dashboard</h1>
                <p>Welcome, {userName}!</p>
            </div>
        </div>
    )
}

export default AdminDashboard
