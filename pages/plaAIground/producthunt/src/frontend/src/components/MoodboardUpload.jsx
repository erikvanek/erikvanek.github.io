import { useState, useRef } from 'react'
import './MoodboardUpload.css'

function MoodboardUpload({ onAnalyze, isAnalyzing }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [projectBrief, setProjectBrief] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    } else {
      alert('Please select an image file (JPG, PNG, etc.)')
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please select a moodboard image first')
      return
    }
    onAnalyze(selectedFile, projectBrief)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="moodboard-upload">
      <div className="upload-card">
        <h2>Upload Your Moodboard</h2>
        <p>Upload an image that represents your design vision</p>

        <div
          className={`drop-zone ${dragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {selectedFile ? (
            <div className="file-preview">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Moodboard preview"
                className="preview-image"
              />
              <div className="file-info">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            </div>
          ) : (
            <div className="drop-zone-content">
              <div className="upload-icon">📤</div>
              <p className="drop-text">
                Drag & drop your moodboard here, or{' '}
                <span className="browse-link">browse files</span>
              </p>
              <p className="file-types">
                Supports: JPG, PNG, WebP (max 10MB)
              </p>
            </div>
          )}
        </div>

        <div className="project-brief">
          <label htmlFor="project-brief">
            Project Brief (Optional)
          </label>
          <textarea
            id="project-brief"
            value={projectBrief}
            onChange={(e) => setProjectBrief(e.target.value)}
            placeholder="Describe your project: Modern minimalist bathroom for Prague apartment, budget 50k CZK..."
            rows={4}
          />
        </div>

        <button
          className="analyze-button"
          onClick={handleSubmit}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? (
            <div className="analyzing">
              <div className="spinner"></div>
              Analyzing Design DNA...
            </div>
          ) : (
            '🔍 Analyze Moodboard'
          )}
        </button>

        {isAnalyzing && (
          <div className="analysis-info">
            <p>🤖 AI is analyzing your design vision...</p>
            <p>⏱️ This usually takes 5-10 seconds</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodboardUpload