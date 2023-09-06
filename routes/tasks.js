const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getTasks,
  createTask,
  getTask,
  updateTasks,
  deleteTasks,
} = require('../controllers/tasks');

const { tasksSchema } = require('../schemas/schemas');
const { validateSchema } = require('../middlewares/validator');

router.get('/tasks', auth, getTasks);
router.get('/tasks/:id', auth, getTask);
router.post('/tasks', auth, validateSchema(tasksSchema), createTask);
router.delete('/tasks/:id', auth, deleteTasks);
router.put('/tasks/:id', auth, updateTasks);

module.exports = router;
