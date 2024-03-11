// validation.js

const Joi = require('joi');

const registerValidation = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().required(),
    profilePicture: Joi.string().allow(null).optional(),
    bio: Joi.string().allow(null).optional(),
    socialMedia: Joi.object({
      twitter: Joi.string().allow(null).optional(),
      linkedIn: Joi.string().allow(null).optional()
    }).allow(null).optional(),
    lastLogin: Joi.date().allow(null).optional(),
    status: Joi.string().valid('active', 'inactive', 'suspended').allow(null).optional(),
    interests: Joi.array().items(Joi.string()).allow(null).optional(),
    isAdmin: Joi.boolean().allow(null).optional()
  });
  

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


module.exports = { registerValidation ,loginValidation};
