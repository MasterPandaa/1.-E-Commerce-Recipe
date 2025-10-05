const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const rateLimiter = require('./middleware/rateLimiter')
const errorHandler = require('./middleware/errorHandler')

// Routers
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

// Core middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Apply rate limiter to API
app.use('/api', rateLimiter)

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

// Global error handler (must be last)
app.use(errorHandler)

module.exports = app
