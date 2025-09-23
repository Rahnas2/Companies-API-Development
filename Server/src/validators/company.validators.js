const Joi = require('joi');
const mongoose = require('mongoose');

//Create Company 
exports.companyCreateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must have at least 2 characters',
      'string.max': 'Name must have at most 100 characters'
    }),

  industry: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Industry must be a string',
      'string.empty': 'Industry is required',
      'string.min': 'Industry must have at least 2 characters',
      'string.max': 'Industry must have at most 50 characters'
    }),

  address: Joi.object({
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().min(2).max(20).required()
  }).required(),

  foundedYear: Joi.number()
    .integer()
    .min(1800)    
    .max(new Date().getFullYear()) 
    .required()
    .messages({
      'number.base': 'Founded year must be a number',
      'number.integer': 'Founded year must be an integer',
      'number.min': 'Founded year cannot be before 1800',
      'number.max': 'Founded year cannot be in the future',
      'any.required': 'Founded year is required'
    }),

  noEmployees: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Number of employees must be a number',
      'number.integer': 'Number of employees must be an integer',
      'number.min': 'Number of employees must be at least 1',
      'any.required': 'Number of employees is required'
    })
});


//Update Company 
exports.companyUpdateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must have at least 2 characters',
      'string.max': 'Name must have at most 100 characters'
    }),

  industry: Joi.string()
    .min(2)
    .max(50)
    .messages({
      'string.base': 'Industry must be a string',
      'string.min': 'Industry must have at least 2 characters',
      'string.max': 'Industry must have at most 50 characters'
    }),

  address: Joi.object({
    street: Joi.string().min(2).max(100),
    city: Joi.string().min(2).max(50),
    state: Joi.string().min(2).max(50),
    country: Joi.string().min(2).max(50),
    postalCode: Joi.string().min(2).max(20)
  }),

  foundedYear: Joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear())
    .messages({
      'number.base': 'Founded year must be a number',
      'number.integer': 'Founded year must be an integer',
      'number.min': 'Founded year cannot be before 1800',
      'number.max': 'Founded year cannot be in the future'
    }),

  noEmployees: Joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'Number of employees must be a number',
      'number.integer': 'Number of employees must be an integer',
      'number.min': 'Number of employees must be at least 1'
    })
});

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid"); // throws Joi validation error
  }
  return value;
}, "ObjectId Validation");

exports.companyIdSchema = Joi.object({
  id: objectId.required()
});