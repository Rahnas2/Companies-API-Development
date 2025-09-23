const express = require('express');
const router = express.Router();

const {validateBody, validateParams} = require('../middlewares/validate.middleware')

const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/company.controller');
const { companyCreateSchema, companyUpdateSchema, companyIdSchema } = require('../validators/company.validators');

router.route('/')
.get(getCompanies)
.post(validateBody(companyCreateSchema), createCompany)

router.route('/:id')
.get(validateParams(companyIdSchema), getCompany)
.patch(validateParams(companyIdSchema), validateBody(companyUpdateSchema), updateCompany)
.delete(validateParams(companyIdSchema), deleteCompany)

module.exports = router;
