import axiosInstance from "./axiosInstance"


// Fetch All Companies
export const fetchAllCompaniesApi = async (page, search) => {
    const response = await axiosInstance.get('/api/companies', { params: { page, search } })
    return response.data
}

// Create New Company
export const createCompanyApi = async (data) => {
    const response = await axiosInstance.post('/api/companies', {...data})
    return response.data
}

// Update Existing Company
export const updateCompanyApi = async (updatedCompanyData) => {
    const {_id, ...data} = updatedCompanyData
    console.log('updated company data ', _id)
    const response = await axiosInstance.patch(`/api/companies/${_id}`, {...data})
    return response.data
}

// Fetch Single Company Detail
export const fetchCompanyByIdApi = async (companyId) => {
    const response = await axiosInstance.get(`/api/companies/${companyId}`)
    return response.data
}

// Delete a Company
export const deleteCompanyApi = async (companyId) => {
    const response = await axiosInstance.delete(`/api/companies/${companyId}`)
    return response.data
}