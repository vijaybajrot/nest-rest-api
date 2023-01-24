import * as Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  email: [
    Joi.string().min(3).max(100).required(),
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  ],
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const loginSchema = Joi.object({
  email: [
    Joi.string().min(3).max(100).required(),
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  ],
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
