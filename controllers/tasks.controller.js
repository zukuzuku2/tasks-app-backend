const Task = require("../models/task.model");

const getTasks = (req, res, next) => {
  const tasks = Task.find()
    .then((tasks) => res.json(tasks))
    .catch(() => {
      const err = new Error("No se encontraron tareas");
      err.statusCode = 400;
      next(err);
    });
};
const createTask = (req, res, next) => {
  const { title, description, date } = req.body;
  const task = new Task({
    title,
    description,
    date,
    user: req.user._id,
  });
  task
    .save()
    .then((task) => res.json(task))
    .catch(() => {
      const err = new Error("Solicitud incorrecta");
      err.statusCode = 400;
      next(err);
    });
};
const getTask = (req, res, next) => {
  const task = Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch(() => {
      const err = new Error("Tarea no encontrada");
      err.statusCode = 404;
      next(err);
    });
};
const updateTasks = (req, res, next) => {
  const task = Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => res.json(task))
    .catch(() => {
      const err = new Error("Solicitud incorrecta");
      err.statusCode = 400;
      next(err);
    });
};
const deleteTasks = (req, res, next) => {
  const task = Task.findByIdAndDelete(req.params.id)
    .then((task) => res.json(task))
    .catch(() => {
      const err = new Error("Tarea no encontrada");
      err.statusCode = 404;
      next(err);
    });
  res.status(204).send();
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTasks,
  deleteTasks,
};
