import React, { useState, useEffect } from 'react';

function MyAssistantsPage({ onSelectAssistant, onCreateNew, onBack }) {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:8000/api/assistants', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assistants');
      }

      const data = await response.json();
      setAssistants(data.assistants || []);
    } catch (err) {
      console.error('Error fetching assistants:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (assistantId, event) => {
    event.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this assistant?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/assistants/${assistantId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete assistant');
      }

      // Refresh the list
      fetchAssistants();
    } catch (err) {
      console.error('Error deleting assistant:', err);
      alert('Failed to delete assistant: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '80px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading your assistants...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <div className="page-header">
        <button onClick={onBack} className="btn-back">← Back</button>
        <h1>My Assistants</h1>
        <button onClick={onCreateNew} className="btn btn-primary">
          + Create New Assistant
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {assistants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🤖</div>
          <h2>No Assistants Yet</h2>
          <p>Create your first AI assistant to get started!</p>
          <button onClick={onCreateNew} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Create Your First Assistant
          </button>
        </div>
      ) : (
        <div className="assistants-grid">
          {assistants.map(assistant => (
            <div
              key={assistant.assistant_id}
              className="assistant-card"
              onClick={() => onSelectAssistant(assistant.assistant_id, assistant.name)}
            >
              <div className="assistant-card-header">
                <div className="assistant-icon">🤖</div>
                <button
                  className="assistant-delete-btn"
                  onClick={(e) => handleDelete(assistant.assistant_id, e)}
                  title="Delete assistant"
                >
                  ×
                </button>
              </div>
              <div className="assistant-card-body">
                <h3>{assistant.name}</h3>
                <div className="assistant-meta">
                  <span className="assistant-badge">{assistant.data_source_type}</span>
                  <span className="assistant-docs">{assistant.documents_count} docs</span>
                </div>
                <p className="assistant-date">
                  Created {new Date(assistant.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="assistant-card-footer">
                <button className="btn-link">Open Chat →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAssistantsPage;
