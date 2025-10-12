import { useState, useRef, useEffect } from 'react'
import './ChatInterface.css'

function ChatInterface({ onMessage, designDNA }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (designDNA) {
      setMessages([{
        type: 'system',
        text: `Design DNA extracted! I found a ${designDNA.style} style with ${designDNA.colors} colors and ${designDNA.materials} materials. The mood is ${designDNA.mood}. How would you like to refine your search?`,
        timestamp: new Date()
      }])
    }
  }, [designDNA])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    const userMessage = {
      type: 'user',
      text: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsProcessing(true)

    try {
      const response = await onMessage(userMessage.text)

      const assistantMessage = {
        type: 'assistant',
        text: response || 'Search refined successfully!',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        type: 'error',
        text: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const quickActions = [
    'Make it warmer and more cozy',
    'More minimalist, less clutter',
    'I prefer darker colors',
    'Show me cheaper options',
    'Focus on bathroom products only',
    'More modern style please'
  ]

  const handleQuickAction = (action) => {
    setInputValue(action)
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="chat-title">
          <span className="chat-icon">💬</span>
          Refine Your Search
        </div>
        <div className="chat-subtitle">
          Tell me how to improve your product matches
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-icon">🤖</div>
            <p>Hi! I'm your AI design assistant.</p>
            <p>Upload a moodboard to get started, then I'll help you refine your product search with natural language.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type}-message`}
          >
            <div className="message-content">
              <div className="message-text">
                {message.text}
              </div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="message assistant-message processing">
            <div className="message-content">
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Processing your request...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length > 0 && (
        <div className="quick-actions">
          <div className="quick-actions-title">Quick actions:</div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action)}
                disabled={isProcessing}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              messages.length === 0
                ? "Upload a moodboard first to start chatting..."
                : "Type your refinement request..."
            }
            className="chat-input"
            disabled={isProcessing || messages.length === 0}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isProcessing || messages.length === 0}
          >
            {isProcessing ? (
              <div className="spinner-small"></div>
            ) : (
              <span className="send-icon">→</span>
            )}
          </button>
        </div>
      </form>

      {designDNA && (
        <div className="current-dna">
          <div className="dna-title">Current Search DNA:</div>
          <div className="dna-tags">
            <span className="dna-tag style">{designDNA.style}</span>
            <span className="dna-tag colors">{designDNA.colors}</span>
            <span className="dna-tag materials">{designDNA.materials}</span>
            <span className="dna-tag mood">{designDNA.mood}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatInterface