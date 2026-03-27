import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, X, ShieldCheck, Trash2, UserCog } from 'lucide-react';
import { apiCall } from '../../utils/api';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiCall('/admin/users');
                setUsers(data);
            } catch (err) {
                console.error('Failed to load users', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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

    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const recentUsers = users.filter(u => {
        const daysAgo = (Date.now() - new Date(u.createdAt)) / (1000 * 60 * 60 * 24);
        return daysAgo <= 7;
    }).length;

    return (
        <div className="admin-page fade-in">
            <div className="admin-page-header">
                <h1>⚙ Admin Panel</h1>
                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} /> Secure Area
                </span>
            </div>

            {/* Summary Stats */}
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
                <div className="admin-stat-card">
                    <div className="stat-num">{users.length - totalAdmins}</div>
                    <div className="stat-lbl">Members</div>
                </div>
            </div>

            {/* Users Table */}
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
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td style={{ fontWeight: 600 }}>{user.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                                    <td>{user.bmi ? `${user.bmi} (${user.bmiCategory})` : '--'}</td>
                                    <td>{user.goal || '--'}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>{user.role}</span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button className="admin-action-btn" onClick={() => handleViewUser(user)}>
                                            View
                                        </button>
                                        <button className="admin-action-btn" onClick={() => handleToggleRole(user)}>
                                            <UserCog size={14} />
                                        </button>
                                        <button className="admin-action-btn danger" onClick={() => handleDeleteUser(user._id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* User Detail Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        className="admin-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => { if (e.target.classList.contains('admin-modal-overlay')) { setSelectedUser(null); setUserDetail(null); } }}
                    >
                        <motion.div
                            className="admin-modal"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                        >
                            <div className="admin-modal-header">
                                <div>
                                    <h2>{selectedUser.name}</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedUser.email}</p>
                                </div>
                                <button className="icon-btn" onClick={() => { setSelectedUser(null); setUserDetail(null); }}>
                                    <X size={22} />
                                </button>
                            </div>

                            {/* User Profile Summary */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                {[
                                    { label: 'BMI', value: selectedUser.bmi || '--' },
                                    { label: 'Category', value: selectedUser.bmiCategory || '--' },
                                    { label: 'Gender', value: selectedUser.gender || '--' },
                                    { label: 'Goal', value: selectedUser.goal || '--' },
                                    { label: 'Height', value: selectedUser.height ? `${selectedUser.height} cm` : '--' },
                                    { label: 'Weight', value: selectedUser.weight ? `${selectedUser.weight} kg` : '--' },
                                ].map(item => (
                                    <div key={item.label} className="admin-stat-card">
                                        <div className="stat-lbl">{item.label}</div>
                                        <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Composition Logs */}
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={18} /> BCA / Composition Logs
                            </h3>
                            {loadingDetail ? (
                                <div className="fx-spinner" style={{ margin: '2rem auto' }} />
                            ) : userDetail?.compositionLogs?.length > 0 ? (
                                userDetail.compositionLogs.map(log => (
                                    <div key={log._id} className="comp-log-row">
                                        <div className="comp-log-item">
                                            <label>Date</label>
                                            <span>{new Date(log.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="comp-log-item">
                                            <label>Weight</label>
                                            <span>{log.weight ? `${log.weight} kg` : '--'}</span>
                                        </div>
                                        <div className="comp-log-item">
                                            <label>BMI</label>
                                            <span>{log.bmi || '--'}</span>
                                        </div>
                                        <div className="comp-log-item">
                                            <label>Body Fat</label>
                                            <span>{log.bodyFatPercent ? `${log.bodyFatPercent}%` : '--'}</span>
                                        </div>
                                        <div className="comp-log-item">
                                            <label>Muscle</label>
                                            <span>{log.skeletalMuscle ? `${log.skeletalMuscle} kg` : '--'}</span>
                                        </div>
                                        <div className="comp-log-item">
                                            <label>Method</label>
                                            <span style={{ textTransform: 'capitalize' }}>{log.entryMethod?.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-secondary)' }}>No composition logs recorded yet.</p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
