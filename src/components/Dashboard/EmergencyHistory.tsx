import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface EmergencyRequest {
  id: string;
  urgency: 'critical' | 'urgent' | 'high';
  issue: string;
  contact_mode: 'call' | 'email' | 'video';
  phone: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'resolved' | 'cancelled';
  payment_id: string;
  created_at: string;
  contacted_at?: string;
  resolved_at?: string;
  admin_notes?: string;
}

interface EmergencyHistoryProps {
  userId: string;
}

export function EmergencyHistory({ userId }: EmergencyHistoryProps) {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('emergency_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching emergency requests:', error);
      } else {
        setRequests(data || []);
      }
      setLoading(false);
    };

    fetchRequests();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'contacted':
        return '#3b82f6';
      case 'in_progress':
        return '#8b5cf6';
      case 'resolved':
        return '#10b981';
      case 'cancelled':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return '#ef4444';
      case 'urgent':
        return '#f97316';
      case 'high':
        return '#eab308';
      default:
        return '#6b7280';
    }
  };

  const getUrgencyEmoji = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return '🔴';
      case 'urgent':
        return '🟠';
      case 'high':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#0088cc',
          borderRadius: '50%',
          margin: '0 auto',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{ marginTop: '1rem', color: '#666' }}>Loading history...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
          No Emergency Requests Yet
        </h3>
        <p style={{ color: '#666' }}>
          Your past emergency consultation requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        📋 Request History
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map((request) => (
          <div
            key={request.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{getUrgencyEmoji(request.urgency)}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: getUrgencyColor(request.urgency),
                      textTransform: 'uppercase',
                    }}>
                      {request.urgency}
                    </span>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>
                      {formatDate(request.created_at)}
                    </span>
                  </div>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${getStatusColor(request.status)}20`,
                    color: getStatusColor(request.status),
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
                  Contact: {request.contact_mode}
                </div>
                {request.phone && (
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {request.phone}
                  </div>
                )}
              </div>
            </div>

            <div style={{
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1rem',
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.95rem',
                color: '#1a1a1a',
                lineHeight: '1.6',
              }}>
                {request.issue}
              </p>
            </div>

            {request.admin_notes && (
              <div style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #0088cc',
                padding: '1rem',
                borderRadius: '6px',
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#0088cc',
                  marginBottom: '0.5rem',
                }}>
                  Admin Notes:
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#1a1a1a',
                  lineHeight: '1.6',
                }}>
                  {request.admin_notes}
                </p>
              </div>
            )}

            {request.contacted_at && (
              <div style={{
                fontSize: '0.8rem',
                color: '#666',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
              }}>
                Contacted: {formatDate(request.contacted_at)}
                {request.resolved_at && ` • Resolved: ${formatDate(request.resolved_at)}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
