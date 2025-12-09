import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import { 
  getAllUsers, 
  getFormSubmissions, 
  updateServicePrice,
  updateFormSubmissionStatus,
  supabase 
} from '../../lib/supabase';
import type { Service, Profile, FormSubmission } from '../../types/database';
import './dashboard.css';

export function AdminDashboard() {
  const { isAdmin, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'users' | 'submissions'>('overview');
  
  // Edit modal state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;
      
      try {
        const [servicesData, usersData, submissionsData] = await Promise.all([
          supabase.from('services').select('*').order('display_order'),
          getAllUsers(),
          getFormSubmissions()
        ]);
        
        setServices(servicesData.data || []);
        setUsers(usersData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const handleUpdatePrice = async () => {
    if (!editingService) return;
    
    setSaving(true);
    try {
      await updateServicePrice(editingService.id, parseFloat(newPrice));
      setServices(services.map(s => 
        s.id === editingService.id ? { ...s, price: parseFloat(newPrice) } : s
      ));
      setEditingService(null);
      setNewPrice('');
    } catch (error) {
      console.error('Error updating price:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (submissionId: string, newStatus: string) => {
    try {
      await updateFormSubmissionStatus(submissionId, newStatus);
      setSubmissions(submissions.map(s =>
        s.id === submissionId ? { ...s, status: newStatus as FormSubmission['status'] } : s
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Custom';
    return `$${price.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'status-pending',
      reviewed: 'status-reviewed',
      in_progress: 'status-progress',
      completed: 'status-completed',
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  if (authLoading || loading) {
    return (
      <MainLayout>
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <MainLayout>
      <div className="dashboard admin-dashboard">
        {/* Header */}
        <div className="dashboard-header admin-header">
          <div className="dashboard-header-content">
            <div className="user-welcome">
              <h1>Admin Dashboard</h1>
              <p>Manage services, users, and submissions</p>
            </div>
            <button onClick={signOut} className="logout-button">
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services & Pricing
          </button>
          <button 
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button 
            className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions ({submissions.length})
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="admin-overview">
              <div className="overview-grid">
                <div className="stat-card">
                  <div className="stat-icon services-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{services.filter(s => s.is_active).length}</span>
                    <span className="stat-label">Active Services</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon users-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{users.length}</span>
                    <span className="stat-label">Total Users</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon submissions-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{submissions.length}</span>
                    <span className="stat-label">Form Submissions</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon pending-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">
                      {submissions.filter(s => s.status === 'pending').length}
                    </span>
                    <span className="stat-label">Pending Review</span>
                  </div>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="recent-section">
                <h2>Recent Submissions</h2>
                <div className="recent-list">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="recent-item">
                      <div className="recent-info">
                        <strong>{submission.form_type.replace(/-/g, ' ')}</strong>
                        <span>{submission.email}</span>
                      </div>
                      <div className="recent-meta">
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status}
                        </span>
                        <span className="recent-date">{formatDate(submission.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-section admin-services">
              <div className="section-header">
                <h2>Services & Pricing</h2>
                <p>Update service pricing and details</p>
              </div>
              
              <div className="services-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Price Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td>
                          <div className="service-name">
                            <strong>{service.name}</strong>
                            <span>{service.short_description}</span>
                          </div>
                        </td>
                        <td>{service.category}</td>
                        <td className="price-cell">{formatPrice(service.price)}</td>
                        <td>{service.price_type}</td>
                        <td>
                          <span className={`status-badge ${service.is_active ? 'status-completed' : 'status-pending'}`}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="edit-button"
                            onClick={() => {
                              setEditingService(service);
                              setNewPrice(service.price?.toString() || '');
                            }}
                          >
                            Edit Price
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h2>All Users</h2>
                <p>View and manage user accounts</p>
              </div>
              
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.full_name || '-'}</td>
                        <td>{user.email}</td>
                        <td>{user.company_name || '-'}</td>
                        <td>
                          <span className={`role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{formatDate(user.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="submissions-section admin-submissions">
              <div className="section-header">
                <h2>Form Submissions</h2>
                <p>Review and manage intake form submissions</p>
              </div>
              
              <div className="submissions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="form-type">
                          {submission.form_type.replace(/-/g, ' ')}
                        </td>
                        <td>{submission.email}</td>
                        <td>
                          <select
                            value={submission.status}
                            onChange={(e) => handleUpdateStatus(submission.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td>{formatDate(submission.created_at)}</td>
                        <td>
                          <button 
                            className="view-button"
                            onClick={() => {
                              // Show form data in a modal or expand
                              console.log('Form data:', submission.form_data);
                              alert(JSON.stringify(submission.form_data, null, 2));
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Edit Price Modal */}
        {editingService && (
          <div className="modal-overlay" onClick={() => setEditingService(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Service Price</h3>
              <p className="modal-service-name">{editingService.name}</p>
              
              <div className="modal-form">
                <label htmlFor="price">New Price ($)</label>
                <input
                  id="price"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter new price"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleUpdatePrice}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Price'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
