import React, { useState } from 'react';
import { registerTea } from '../services/api';

interface RegisterTeaProps {
  onTeaRegistered: () => void;
}

const RegisterTea: React.FC<RegisterTeaProps> = ({ onTeaRegistered }) => {
  const [teaName, setTeaName] = useState('');
  const [provider, setProvider] = useState('');
  const [source, setSource] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!teaName.trim() || !provider.trim()) {
      setErrorMessage('Please fill in Tea Name and Provider (Source is optional)');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      await registerTea(teaName, provider, source);
      setShowSuccess(true);
      setTeaName('');
      setProvider('');
      setSource('');
      onTeaRegistered();

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error: any) {
      console.error('Error registering tea:', error);
      if (error.response?.status === 409) {
        setErrorMessage('Tea already exists with this name and provider');
      } else {
        setErrorMessage(error.response?.data || 'Failed to register tea. Please try again.');
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginTop: 0 }}>Register a New Tea</h2>
      {showSuccess && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Tea registered successfully!
        </div>
      )}
      {showError && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {errorMessage}
        </div>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tea Name:</label>
        <input
          type="text"
          value={teaName}
          onChange={(e) => setTeaName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ced4da'
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Source (optional):</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ced4da'
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Provider:</label>
        <input
          type="text"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ced4da'
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Register Tea
      </button>
    </div>
  );
};

export default RegisterTea;
