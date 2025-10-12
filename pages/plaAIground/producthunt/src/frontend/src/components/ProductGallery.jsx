import { useState } from 'react'
import './ProductGallery.css'

function ProductGallery({ products, isSearching, onFilterChange }) {
  const [filters, setFilters] = useState({
    roomType: '',
    materials: [],
    priceRange: ''
  })
  const [sortBy, setSortBy] = useState('similarity')

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0)
      case 'price_desc':
        return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0)
      case 'similarity':
      default:
        return (b.similarity || 0) - (a.similarity || 0)
    }
  })

  const formatPrice = (price) => {
    if (!price) return 'Price on request'
    const numPrice = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'))
    return isNaN(numPrice) ? price : `${numPrice.toLocaleString()} Kč`
  }

  const getSimilarityColor = (similarity) => {
    if (similarity >= 0.8) return '#28a745'
    if (similarity >= 0.6) return '#ffc107'
    return '#6c757d'
  }

  if (isSearching) {
    return (
      <div className="product-gallery">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <h3>Searching Products...</h3>
          <p>Finding products that match your design vision</p>
        </div>
      </div>
    )
  }

  return (
    <div className="product-gallery">
      <div className="gallery-header">
        <h2>Found Products ({products.length})</h2>

        <div className="gallery-controls">
          <div className="sort-control">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="similarity">Best Match</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="room-type">Room:</label>
          <select
            id="room-type"
            value={filters.roomType}
            onChange={(e) => handleFilterChange('roomType', e.target.value)}
          >
            <option value="">All Rooms</option>
            <option value="koupelna">Bathroom</option>
            <option value="kuchyň">Kitchen</option>
            <option value="obývák">Living Room</option>
            <option value="ložnice">Bedroom</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-range">Price Range:</label>
          <select
            id="price-range"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-1000">Under 1,000 Kč</option>
            <option value="1000-5000">1,000 - 5,000 Kč</option>
            <option value="5000-20000">5,000 - 20,000 Kč</option>
            <option value="20000+">Over 20,000 Kč</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your filters or refining your search through the chat</p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product, index) => (
            <div key={product.id || index} className="product-card">
              <div className="product-image">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="placeholder-image">
                    <span>📦</span>
                  </div>
                )}

                <div className="similarity-badge">
                  <div
                    className="similarity-score"
                    style={{ backgroundColor: getSimilarityColor(product.similarity) }}
                  >
                    {Math.round((product.similarity || 0) * 100)}%
                  </div>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price">
                  {formatPrice(product.price)}
                </div>

                {product.specifications && (
                  <div className="product-specs">
                    {product.specifications.slice(0, 2).map((spec, i) => (
                      <span key={i} className="spec-tag">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {product.explanation && (
                  <div className="match-explanation">
                    <small>💡 {product.explanation}</small>
                  </div>
                )}

                <div className="product-actions">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-product-btn"
                  >
                    View Details
                  </a>

                  {product.has3DModel && (
                    <span className="3d-badge" title="3D model available">
                      🎯 3D
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery