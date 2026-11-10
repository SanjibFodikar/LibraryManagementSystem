import React, { useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

function Header() {
    const userName = localStorage.getItem('adminUser')
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => {
        return location.pathname === path ? 'active text-primary fw-semibold' : '';
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm">
            <div className="container">

                <Link className="navbar-brand fw-bold d-flex gap-2" to="/">
                    <span className='rounded-circle' style={{ background: '#4f46e5', color: '#fff', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa-solid fa-book-open-reader"></i>
                    </span>

                    Smart Library
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMenu">

                    <ul className="navbar-nav ms-auto">
                        {!userName && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/')}`} to="/"><i className='fa-solid fa-home me-1'></i>Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/user-login')}`} to="/user-login"><i className='fa-solid fa-user me-1'></i> User Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/user-signup')}`} to="/user-signup"><i className='fa-solid fa-user-plus me-1'></i>User Signup</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`btn btn-outline-primary`} to="/admin-login"><i className='fa-solid fa-user-shield me-1'></i>Admin Login</Link>
                                </li>

                            </>
                        )}

                        {userName && (
                            <>
                                <li className="nav-item ms-1">
                                    <Link className={`nav-link ${isActive('/admin-dashboard')}`} to="/admin-dashboard"><i className='fa-solid fa-gear me-1'></i>Dashboard</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <button className='nav-link dropdown-toggle btn btn-link' data-bs-toggle="dropdown">
                                        <i className='fa-solid fa-layer-group'></i> Categories
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/add-category"><i className='fa-solid fa-plus me-1'></i>Add Category</Link></li>
                                        <li><Link className="dropdown-item" to="/categories/manage"><i className='fa-solid fa-edit me-1'></i>Manage Category</Link></li>
                                    </ul>
                                </li>

                                 <li className="nav-item dropdown">
                                    <button className='nav-link dropdown-toggle btn btn-link' data-bs-toggle="dropdown">
                                        <i className='fa-solid fa-layer-group'></i> Books
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/add-book"><i className='fa-solid fa-plus me-1'></i>Add Book</Link></li>
                                        <li><Link className="dropdown-item" to="/books/manage"><i className='fa-solid fa-edit me-1'></i>Manage Book</Link></li>
                                        <li><Link className="dropdown-item" to="/books/issued"><i className='fa-solid fa-arrow-right-arrow-left me-1'></i>Issued Book</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <button className={`btn btn-outline-danger`} onClick={() => {
                                        localStorage.removeItem('adminUser')
                                        navigate('/admin-login')
                                    }}>
                                        <i className='fa-solid fa-sign-out-alt me-1'></i>Logout
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
