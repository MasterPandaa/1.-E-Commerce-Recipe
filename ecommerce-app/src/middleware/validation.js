const { body, validationResult, param, query } = require('express-validator')

// Helpers
const passwordRules = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number')

// Auth
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  passwordRules,
  body('name').trim().notEmpty().withMessage('Name is required')
]

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
]

// Products
const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('category').trim().notEmpty().withMessage('Category is required')
]

// Cart
const cartValidation = [
  body('product_id')
    .isInt({ gt: 0 })
    .withMessage('product_id must be a positive integer'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('quantity must be a positive integer')
]

// Checkout
const checkoutValidation = [
  body('shipping_address')
    .trim()
    .notEmpty()
    .withMessage('shipping_address is required'),
  body('payment_method')
    .trim()
    .notEmpty()
    .withMessage('payment_method is required')
]

// Error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    })
  }
  return next()
}

module.exports = {
  registerValidation,
  loginValidation,
  productValidation,
  cartValidation,
  checkoutValidation,
  handleValidationErrors
}
