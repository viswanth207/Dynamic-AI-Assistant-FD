import React, { useState, useEffect } from 'react'
import { fetchWithTimeout } from '../utils/api'

function CreateFormPage({ onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    dataSourceType: 'csv',
    file: null,
    dataUrl: '',
    customInstructions: 'You are a helpful AI assistant. Analyze the data, identify patterns, and answer questions. You can make predictions based on data patterns when asked about hypothetical scenarios.If query Is not related to dataset reply "Sorry! only Ask questions related to "',
    enableStatistics: false,
    enableAlerts: false,
    enableRecommendations: false
  })

  const [fileName, setFileName] = useState('Choose a file...')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDataSourceTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      dataSourceType: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      setFileName(file.name)
    } else {
      setFormData(prev => ({ ...prev, file: null }))
      setFileName('Choose a file...')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('data_source_type', formData.dataSourceType)

      if (formData.dataSourceType === 'url') {
        formDataToSend.append('data_source_url', formData.dataUrl)
      } else if (formData.file) {
        formDataToSend.append('file', formData.file)
      }

      formDataToSend.append('custom_instructions', formData.customInstructions)
      formDataToSend.append('enable_statistics', formData.enableStatistics)
      formDataToSend.append('enable_alerts', formData.enableAlerts)
      formDataToSend.append('enable_recommendations', formData.enableRecommendations)

      const response = await fetchWithTimeout('/api/assistants/create', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || error.error || 'Failed to create assistant')
      }

      const result = await response.json()
      onSuccess(result.assistant_id, result.name)

    } catch (error) {
      console.error('Error creating assistant:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      dataSourceType: 'csv',
      file: null,
      dataUrl: '',
      customInstructions: 'You are a helpful AI assistant. Analyze the data, identify patterns, and answer questions. You can make predictions based on data patterns when asked about hypothetical scenarios.If query Is not related to dataset reply "Sorry! only Ask questions related to "',
      enableStatistics: false,
      enableAlerts: false,
      enableRecommendations: false
    })
    setFileName('Choose a file...')
    setError('')
  }

  useEffect(() => {
    resetForm()
  }, [])

  return (
    <div className="page active">
      <div className="container">
        <button className="btn btn-secondary btn-back" onClick={onBack}>
          ← Back
        </button>

        <div className="form-container">
          <h2 className="form-title">Create Your Assistant</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Assistant Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Sales Data Analyzer"
                required
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label>Data Source Type *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="dataSourceType"
                    value="csv"
                    checked={formData.dataSourceType === 'csv'}
                    onChange={(e) => handleDataSourceTypeChange(e.target.value)}
                  />
                  <span>CSV File</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="dataSourceType"
                    value="json"
                    checked={formData.dataSourceType === 'json'}
                    onChange={(e) => handleDataSourceTypeChange(e.target.value)}
                  />
                  <span>JSON File</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="dataSourceType"
                    value="url"
                    checked={formData.dataSourceType === 'url'}
                    onChange={(e) => handleDataSourceTypeChange(e.target.value)}
                  />
                  <span>URL</span>
                </label>
              </div>
            </div>

            {formData.dataSourceType !== 'url' ? (
              <div className="form-group">
                <label htmlFor="file-upload">Upload File *</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="file-upload"
                    accept={formData.dataSourceType === 'csv' ? '.csv' : '.json'}
                    onChange={handleFileChange}
                    required
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <span>{fileName}</span>
                  </label>
                </div>
                <small className="form-hint">Maximum file size: 10MB</small>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="dataUrl">Website URL *</label>
                <input
                  type="url"
                  id="dataUrl"
                  name="dataUrl"
                  value={formData.dataUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com or https://api.example.com/data.json"
                  required
                />
                <small className="form-hint">
                  Enter any website URL (e.g., blog, documentation, article) or API endpoint returning JSON/CSV
                </small>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="customInstructions">Custom Instructions</label>
              <textarea
                id="customInstructions"
                name="customInstructions"
                value={formData.customInstructions}
                onChange={handleInputChange}
                rows="4"
                placeholder="You are a helpful AI assistant. Analyze the data, identify patterns, and answer questions. You can make predictions based on data patterns."
              />
              <small className="form-hint">Define how your assistant should behave</small>
            </div>

            <div className="form-group">
              <label>Optional Features</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="enableStatistics"
                    checked={formData.enableStatistics}
                    onChange={handleInputChange}
                  />
                  <span>Enable Statistics - Provide data insights and analytics</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="enableAlerts"
                    checked={formData.enableAlerts}
                    onChange={handleInputChange}
                  />
                  <span>Enable Alerts - Detect anomalies and important patterns</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="enableRecommendations"
                    checked={formData.enableRecommendations}
                    onChange={handleInputChange}
                  />
                  <span>Enable Recommendations - Get actionable suggestions</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isLoading}
              >
                Create Assistant
              </button>
            </div>

            {isLoading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Creating your assistant...</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateFormPage
