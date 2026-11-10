import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import './AddCategory.css'

const AddCategory = () => {
    const userName = localStorage.getItem('adminUser')
    const [name, setName] = useState('');
    const [status, setStatus] = useState('1');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) {
            navigate('/admin-login');
        } else {
            fetchCategories();
        }
    }, [userName]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/fetchCategories/');
            setCategories(response.data);
        }
        catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/addCategory/', {
                name,
                status
            });
            if (response.status === 201) {
                toast.success(response.data.message);
                setName('');
                setStatus('1');
                fetchCategories();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('An error occurred while adding the category.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="category-page">
            <ToastContainer position="top-right" style={{ top: '76px', zIndex: 1100 }} autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="category-shell">
                <header className="category-heading">
                    <span className="category-eyebrow"><i className="fa-solid fa-book-open" aria-hidden="true"></i> LIBRARY COLLECTIONS</span>
                    <h1>Make room for <span>every story.</span></h1>
                    <p>Organize your library with thoughtful categories, all in one place.</p>
                </header>
                <div className="category-grid">
                    <section className="category-card category-form-card" aria-labelledby="create-category-title">
                        <div className="category-card-heading">
                            <span className="category-icon"><i className="fa-solid fa-folder-plus" aria-hidden="true"></i></span>
                            <div>
                                <span className="category-step">01 / NEW COLLECTION</span>
                                <h2 id="create-category-title">Create a category</h2>
                            </div>
                        </div>
                        <p className="category-card-intro">Give books a new home by creating a category.</p>

                        <form onSubmit={addCategory} className="category-form">
                            <div className="category-field">
                                <label htmlFor="name">Category name</label>
                                <div className="category-input-wrap">
                                    <i className="fa-solid fa-tag" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Modern Fiction"
                                        maxLength="100"
                                        required
                                    />
                                </div>
                            </div>

                            <fieldset className="category-status">
                                <legend>Availability</legend>
                                <div className="category-status-options">
                                    <label className={status === '1' ? 'selected' : ''}>
                                        <input type="radio" name="status" value="1" checked={status === '1'} onChange={(e) => setStatus(e.target.value)} />
                                        <span className="status-dot status-dot-active"></span>
                                        Active
                                    </label>
                                    <label className={status === '0' ? 'selected' : ''}>
                                        <input type="radio" name="status" value="0" checked={status === '0'} onChange={(e) => setStatus(e.target.value)} />
                                        <span className="status-dot status-dot-inactive"></span>
                                        Inactive
                                    </label>
                                </div>
                            </fieldset>

                            <button type="submit" className="category-submit" disabled={loading}>
                                {loading ? (
                                    <><span className="category-spinner" aria-hidden="true"></span> Adding category...</>
                                ) : (
                                    <>Create category <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></>
                                )}
                            </button>
                        </form>
                        <p className="category-form-note"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> You can change availability at any time.</p>
                    </section>

                    <section className="category-card category-list-card" aria-labelledby="existing-categories-title">
                        <div className="category-list-heading">
                            <div className="category-card-heading">
                                <span className="category-icon category-icon-soft"><i className="fa-solid fa-layer-group" aria-hidden="true"></i></span>
                                <div>
                                    <span className="category-step">02 / YOUR LIBRARY</span>
                                    <h2 id="existing-categories-title">Existing categories</h2>
                                </div>
                            </div>
                            <span className="category-count">{categories.length}</span>
                        </div>
                        <p className="category-card-intro">A quick look at the shelves you’ve created.</p>

                        {categories.length > 0 ? (
                            <div className="category-table-wrap">
                                <table className="category-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category, index) => {
                                            const isActive = category.is_active === true;
                                            return (
                                                <tr key={category.id}>
                                                    <td className="category-table-index">{String(index + 1).padStart(2, '0')}</td>
                                                    <th scope="row" className="category-table-name">{category.name}</th>
                                                    <td>
                                                        <span className={`category-table-status ${isActive ? 'is-active' : 'is-inactive'}`}>
                                                            <span></span>{isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="category-table-date">
                                                        {category.created_at ? new Date(category.created_at).toLocaleDateString() : '—'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        ) : (
                            <div className="category-empty">
                                <span className="category-empty-icon"><i className="fa-solid fa-box-open" aria-hidden="true"></i></span>
                                <h3>Your shelves are waiting</h3>
                                <p>Your categories will show up here once you create the first one.</p>
                            </div>
                        )}
                        <div className="category-list-footer">
                            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                            <span>Every great library starts with a single shelf.</span>
                        </div>
                    </section>
                </div>
                <footer className="category-welcome">Signed in as <strong>{userName}</strong></footer>
            </div>
        </main>
    )
}

export default AddCategory
