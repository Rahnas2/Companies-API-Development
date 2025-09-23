
const companyService = require('../services/company.service');
const { httpStatusCodes } = require('../utils/httpStatusCodes');

exports.createCompany = async (req, res, next) => {
    try {
        const result = await companyService.createCompany(req.body)
        res.status(httpStatusCodes.CREATED).json(result);
    } catch (error) {
        next(error)
    }
}

exports.getCompanies = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const search = req.query.search || ''

        const result = await companyService.getCompanies(limit, page, search)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

exports.getCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id
        const result = await companyService.getCompany(companyId)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id
        const result = await companyService.updateCompany(companyId, req.body)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

exports.deleteCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id
        await companyService.deleteCompany(companyId)
        res.status(httpStatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error)
    }
}