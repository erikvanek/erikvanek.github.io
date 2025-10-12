import { useState, useEffect } from 'react'
import './App.css'
import MoodboardUpload from './components/MoodboardUpload'
import ProductGallery from './components/ProductGallery'
import ChatInterface from './components/ChatInterface'

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [designDNA, setDesignDNA] = useState(null)
  const [products, setProducts] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Create session on component mount
  useEffect(() => {
    createSession()
  }, [])

  const createSession = async () => {
    try {
      const response = await fetch('/api/session', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        setSessionId(data.sessionId)
      }
    } catch (error) {
      console.error('Failed to create session:', error)
    }
  }

  const handleMoodboardAnalysis = async (imageFile, projectBrief) => {
    if (!sessionId) return

    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('sessionId', sessionId)
      formData.append('moodboard', imageFile)
      formData.append('projectBrief', projectBrief || '')

      const response = await fetch('/api/analyze-moodboard', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setDesignDNA(data.designDNA)
        // Automatically search for products after analysis
        await searchProducts()
      }
    } catch (error) {
      console.error('Moodboard analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const searchProducts = async (constraints = {}) => {
    if (!sessionId) return

    setIsSearching(true)
    try {
      const response = await fetch('/api/search-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          constraints,
          topK: 20
        })
      })

      const data = await response.json()
      if (data.success) {
        setProducts(data.searchResults)
      }
    } catch (error) {
      console.error('Product search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleChatMessage = async (message) => {
    if (!sessionId) return

    try {
      const response = await fetch('/api/refine-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          feedback: message
        })
      })

      const data = await response.json()
      if (data.success) {
        setDesignDNA(data.refinedDNA)
        setProducts(data.searchResults)
        return data.refinedDNA.explanation || 'Search refined successfully!'
      }
    } catch (error) {
      console.error('Chat refinement failed:', error)
      return 'Sorry, there was an error processing your request.'
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Interior Design Product Discovery</h1>
        <p>AI-powered product search for Czech interior architects</p>
      </header>

      <main className="app-main">
        {!designDNA ? (
          <div className="upload-section">
            <MoodboardUpload
              onAnalyze={handleMoodboardAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          <div className="results-section">
            <div className="design-dna">
              <h2>Design DNA Extracted</h2>
              <div className="dna-details">
                <p><strong>Style:</strong> {designDNA.style}</p>
                <p><strong>Colors:</strong> {designDNA.colors}</p>
                <p><strong>Materials:</strong> {designDNA.materials}</p>
                <p><strong>Mood:</strong> {designDNA.mood}</p>
              </div>
            </div>

            <div className="products-chat-layout">
              <ProductGallery
                products={products}
                isSearching={isSearching}
                onFilterChange={searchProducts}
              />

              <ChatInterface
                onMessage={handleChatMessage}
                designDNA={designDNA}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App