import { Building2, Calendar, MapPin, Users, X } from "lucide-react"
import { useEffect, useState } from "react"
import useForm from "../hooks/useForm"
import { companyInitial } from "../utils/initialDataCompany"
import { validateCompanyForm } from "../validations/validateCompanyForm"
import { createCompanyApi, updateCompanyApi } from "../apis/companyServices"
import toast from "react-hot-toast"

const CompanyModal = ({ isOpen, onClose, onSave, company, mode }) => {

    const [submiting, setSubmiting] = useState(false)
    const [errors, setErrors] = useState({});

    const { data, handleChange } = useForm(companyInitial, company, mode)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubmiting(true)
            const validationErros = validateCompanyForm(data)

            if (Object.keys(validationErros).length) {
                setErrors(validationErros)
                return
            }
            let result ;
            if(mode === 'create'){
                result = await createCompanyApi(data)
            } else {
                result = await updateCompanyApi(data)
            }
            toast.success('success')
            onSave(result);
            onClose();

        } catch (error) {
            toast.error(error?.response?.data?.message || 'something went wrong')
        } finally {
            setSubmiting(false)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            {mode === 'create' ? 'Add New Company' : 'Edit Company'}
                        </h2>
                    </div>
                    <button
                        onClick={() => {setErrors({}), onClose()}}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Company Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                            Company Information
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                name="name" 
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter company name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Industry *
                            </label>
                            <input
                                type="text"
                                value={data.industry}
                                name="industry" 
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.industry ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="e.g., Technology, Healthcare, Finance"
                            />
                            {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-green-600" />
                            Address
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address *
                            </label>
                            <input
                                type="text"
                                value={data.address.street}
                                name="address.street" 
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.street ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter street address"
                            />
                            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    value={data.address.city}
                                    name="address.city" 
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.city ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="City"
                                />
                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    value={data.address.state}
                                    name="address.state" 
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.state ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="State"
                                />
                                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country *
                                </label>
                                <input
                                    type="text"
                                    value={data.address.country}
                                    name="address.country" 
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.country ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Country"
                                />
                                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Postal Code *
                                </label>
                                <input
                                    type="text"
                                    value={data.address.postalCode}
                                    name="address.postalCode" 
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Postal Code"
                                />
                                 {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Company Stats */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Company Details</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-orange-600" />
                                    Founded Year *
                                </label>
                                <input
                                    type="number"
                                    value={data.foundedYear}
                                    name="foundedYear"
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.foundedYear ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    min="1800"
                                    max={new Date().getFullYear()}
                                />
                                {errors.foundedYear && <p className="mt-1 text-sm text-red-600">{errors.foundedYear}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Users className="h-4 w-4 mr-1 text-purple-600" />
                                    Number of Employees *
                                </label>
                                <input
                                    type="number"
                                    value={data.noEmployees}
                                    name="noEmployees"
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${errors.noEmployees ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    min="1"
                                />
                                {errors.noEmployees && <p className="mt-1 text-sm text-red-600">{errors.noEmployees}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            disabled={submiting}
                            onClick={() => {setErrors({}), onClose()}}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submiting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                        >
                            {submiting ? 'loading...' : mode === 'create' ? 'Create Company' : 'Update Company'}
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyModal