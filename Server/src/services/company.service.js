const companyRepo = require('../repositories/company.repository')
const { httpStatusCodes } = require('../utils/httpStatusCodes')

exports.createCompany = async (data) => {
    const existing = await companyRepo.findByName(data.name)
    if (existing) throw { status: httpStatusCodes.BAD_REQUEST, message: 'Company already registered' }

    const company = await companyRepo.createCompany(data)
    return company
}

exports.getCompanies = async (limit, page, search) => {
    const companies = await companyRepo.findAllCompanies(limit, page, search)
    return companies
}

exports.getCompany = async (companyId) => {
    const company = await companyRepo.findByCompanyId(companyId)
    if(!company){
        throw { status: httpStatusCodes.NOT_FOUND, message: 'Company Not Found' }
    }
    return company
}

exports.updateCompany = async (companyId, data) => {
    if (data.name) {
        console.log('name currently ', data.name)
        const existing = await companyRepo.findByName(data.name)
        console.log('exising ', existing)
        if (existing && existing._id !== companyId) {
            throw { status: httpStatusCodes.CONFLICT, message: 'Company already registered' }
        }
    }
    const company = await companyRepo.updateCompanyById(companyId, data)
    return company
}

exports.deleteCompany = async (companyId) => {
    const reuslt = await companyRepo.deleteCompanyById(companyId)
    if(!reuslt){
        throw { status: httpStatusCodes.NOT_FOUND, message: 'Company Not Found'}
    }
    return 
}