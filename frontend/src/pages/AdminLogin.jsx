import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post('http://localhost:8000/api/admin-login/', {
                username: username,
                password: password
            });
            toast.success(response.data.message);
            localStorage.setItem('adminUser', response.data.username)
            navigate('/admin-dashboard')
        }
        catch (error) {
            if (error.response) {
                toast.error(
                    error.response.data.message || 'Login failed! please check your credentials and try again.'
                );
            }
            else if (error.request) {
                toast.error('Server is not responding!');
            }
            else {
                toast.error(error.message);
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='container-fluid py-3' style={{ background: 'linear-gradient(135deg, #f3f4ff , #fbfbff)', minHeight: '100vh' }}>
            <ToastContainer />
            <div className='container py-3' style={{ marginTop: '50px' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center">
                        <h4 className="fw-semibold mb-1">
                            <i className="fa-solid fa-shield-alt me-1 text-primary"></i>
                            Admin Sign In</h4>
                        <p className="text-muted mb-4">Use the admin account created via <code>createuperuser</code></p>
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body text-start ">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Enter username" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                            <input type={isPassword ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password" minLength="6" maxLength="10" required />
                                            <div className="input-group-text"><i className={`fa-solid ${isPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setIsPassword(!isPassword)}></i></div>
                                        </div>
                                    </div>
                                    <button type="submit" style={{ width: '100%' }} className="btn btn-primary" disabled={loading}>
                                        {loading ? (<>
                                            {/* make spinner center */}
                                            <div class="spinner-border spinner-border-sm ms-auto" >
                                                <span class="visually-hidden">Sighning in...</span>
                                            </div>
                                        </>) : (<>
                                            <i className="fa-solid fa-sign-in-alt me-1"></i>Sign In

                                        </>)}
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
