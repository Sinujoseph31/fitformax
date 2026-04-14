import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, X, ShieldCheck, Trash2, UserCog, Check, Ban, Clock } from 'lucide-react';
import { apiCall } from '../../utils/api';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const [tab, setTab] = useState('users');
    const [plans, setPlans] = useState({ workouts: [], diets: [] });
    const [loadingPlans, setLoadingPlans] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await apiCall('/admin/users');
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlans = async () => {
        setLoadingPlans(true);
        try {
            const data = await apiCall('/admin/plans');
            setPlans(data);
        } catch (err) {
            console.error('Failed to load plans', err);
        } finally {
            setLoadingPlans(false);
        }
    };

    useEffect(() => {
        if (tab === 'users') fetchUsers();
        if (tab === 'library') fetchPlans();
    }, [tab]);

    const handleViewUser = async (user) => {
        setSelectedUser(user);
        setLoadingDetail(true);
        try {
            const data = await apiCall(`/admin/users/${user._id}`);
            setUserDetail(data);
        } catch (err) {
            console.error('Failed to load user detail', err);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Permanently delete this user and all their data?')) return;
        try {
            await apiCall(`/admin/users/${userId}`, 'DELETE');
            setUsers(prev => prev.filter(u => u._id !== userId));
            setSelectedUser(null);
        } catch (err) {
            console.error('Failed to delete user', err);
        }
    };

    const handleToggleRole = async (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        if (!window.confirm(`Set ${user.name}'s role to "${newRole}"?`)) return;
        try {
            await apiCall(`/admin/users/${user._id}/role`, 'PUT', { role: newRole });
            setUsers(prev => prev.map(u => u._id === user._id ? { ...u, role: newRole } : u));
        } catch (err) {
            console.error('Failed to update role', err);
        }
    };

    const handleUpdateStatus = async (type, id, status) => {
        try {
            await apiCall(`/admin/plans/${type}/${id}/status`, 'PUT', { status });
            fetchPlans(); // Refresh list
        } catch (err) {
            console.error('Failed to update plan status', err);
        }
    };

    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const recentUsers = users.filter(u => {
        const daysAgo = (Date.now() - new Date(u.createdAt)) / (1000 * 60 * 60 * 24);
        return daysAgo <= 7;
    }).length;

    return (
        <div className="admin-page fade-in">
            <div className="admin-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <h1>⚙ Protocol Governance</h1>
                   <span className="admin-badge">ADMIN MODE</span>
                </div>
                <div className="admin-tabs">
                    <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users</button>
                    <button className={tab === 'library' ? 'active' : ''} onClick={() => setTab('library')}>Library Approvals</button>
                </div>
            </div>

            {tab === 'users' ? (
                <>
                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <div className="stat-num">{users.length}</div>
                            <div className="stat-lbl">Total Users</div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="stat-num">{totalAdmins}</div>
                            <div className="stat-lbl">Admins</div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="stat-num">{recentUsers}</div>
                            <div className="stat-lbl">New (7 days)</div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        {loading ? (
                            <div style={{ padding: '3rem', textAlign: 'center' }}>
                                <div className="fx-spinner" style={{ margin: '0 auto' }} />
                            </div>
                        ) : (
                            <table className="admin-user-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>BMI</th>
                                        <th>Goal</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td style={{ fontWeight: 600 }}>{user.name}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                                            <td>{user.bmi || '--'}</td>
                                            <td>{user.goal || '--'}</td>
                                            <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                                            <td>
                                                <button className="admin-action-btn" onClick={() => handleViewUser(user)}>View</button>
                                                <button className="admin-action-btn" onClick={() => handleToggleRole(user)}><UserCog size={14} /></button>
                                                <button className="admin-action-btn danger" onClick={() => handleDeleteUser(user._id)}><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            ) : (
                <div className="admin-library-view">
                    <div className="library-sect">
                        <h3>Training Protocols</h3>
                        <div className="glass-card" style={{ padding: '0' }}>
                            <table className="admin-user-table">
                                <thead>
                                    <tr>
                                        <th>Plan Name</th>
                                        <th>Creator</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plans.workouts.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No protocols submitted</td></tr>}
                                    {plans.workouts.map(p => (
                                        <tr key={p._id}>
                                            <td>{p.name}</td>
                                            <td>{p.user?.name}</td>
                                            <td><span className={`status-badge ${p.status}`}>{p.status}</span></td>
                                            <td>
                                                {p.status === 'pending' && (
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <button className="admin-btn-verify approve" onClick={() => handleUpdateStatus('workout', p._id, 'approved')}><Check size={14} /> Approve</button>
                                                        <button className="admin-btn-verify reject" onClick={() => handleUpdateStatus('workout', p._id, 'rejected')}><Ban size={14} /> Reject</button>
                                                    </div>
                                                )}
                                                {p.status !== 'pending' && <button className="admin-action-btn" onClick={() => handleUpdateStatus('workout', p._id, 'pending')}>Reset</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="library-sect" style={{ marginTop: '2.5rem' }}>
                        <h3>Nutrition Protocols</h3>
                        <div className="glass-card" style={{ padding: '0' }}>
                            <table className="admin-user-table">
                                <thead>
                                    <tr>
                                        <th>Diet Plan</th>
                                        <th>Creator</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plans.diets.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No nutrition plans submitted</td></tr>}
                                    {plans.diets.map(p => (
                                        <tr key={p._id}>
                                            <td>{p.name}</td>
                                            <td>{p.user?.name}</td>
                                            <td><span className={`status-badge ${p.status}`}>{p.status}</span></td>
                                            <td>
                                                {p.status === 'pending' && (
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <button className="admin-btn-verify approve" onClick={() => handleUpdateStatus('diet', p._id, 'approved')}><Check size={14} /> Approve</button>
                                                        <button className="admin-btn-verify reject" onClick={() => handleUpdateStatus('diet', p._id, 'rejected')}><Ban size={14} /> Reject</button>
                                                    </div>
                                                )}
                                                {p.status !== 'pending' && <button className="admin-action-btn" onClick={() => handleUpdateStatus('diet', p._id, 'pending')}>Reset</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {selectedUser && (
                    <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { if (e.target.classList.contains('admin-modal-overlay')) { setSelectedUser(null); setUserDetail(null); } }}>
                        <motion.div className="admin-modal" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}>
                            <div className="admin-modal-header">
                                <div><h2>{selectedUser.name}</h2><p>{selectedUser.email}</p></div>
                                <button className="icon-btn" onClick={() => { setSelectedUser(null); setUserDetail(null); }}><X size={22} /></button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                {[{ label: 'BMI', value: selectedUser.bmi || '--' }, { label: 'Goal', value: selectedUser.goal || '--' }, { label: 'Weight', value: selectedUser.weight ? `${selectedUser.weight} kg` : '--' }].map(item => (
                                    <div key={item.label} className="admin-stat-card"><div className="stat-lbl">{item.label}</div><div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{item.value}</div></div>
                                ))}
                            </div>
                            <h3>BCA Logs</h3>
                            {loadingDetail ? <div className="fx-spinner" style={{ margin: '2rem auto' }} /> : userDetail?.compositionLogs?.length > 0 ? (
                                userDetail.compositionLogs.map(log => (
                                    <div key={log._id} className="comp-log-row"><span>{new Date(log.date).toLocaleDateString()}</span><span>{log.weight} kg</span><span>{log.bodyFatPercent}%</span></div>
                                ))
                            ) : <p>No logs found.</p>}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
