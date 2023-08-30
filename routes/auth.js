const router = require('express').Router();
const {
  register,
  login,
  profile,
} = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth');
const { validateSchema } = require('../middlewares/validator.middleware');
const {
  registerSchema,
  loginSchema,
} = require('../schemas/schemas');

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/profile', auth, profile);

module.exports = router;
