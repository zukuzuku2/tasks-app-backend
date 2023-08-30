const zod = require('zod');

const registerSchema = zod.object({
  username: zod.string({
    required_error: 'Nombre de usuario es requerido',
  }),
  email: zod
    .string({
      required_error: 'Email es requerido',
    })
    // eslint-disable-next-line no-useless-escape
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'Email invalido',
    }),
  password: zod
    .string({
      required_error: 'Contraseña es requerida',
    })
    .min(5, { message: 'La contraseña debe tener al menos 5 caracteres' }),
});

const loginSchema = zod.object({
  email: zod
    .string({
      required_error: 'Email es requerido',
    })
    // eslint-disable-next-line no-useless-escape
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'Email invalido',
    }),
  password: zod
    .string({
      required_error: 'Contraseña es requerida',
    })
    .min(5, { message: 'La contraseña debe tener al menos 5 caracteres' }),
});

const tasksSchema = zod.object({
  title: zod.string({
    required_error: 'Titulo es requerido',
  }),
  description: zod
    .string({
      required_error: 'Descripción debe ser un string',
    })
    .optional(),
  date: zod.string().datetime().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  tasksSchema,
};
