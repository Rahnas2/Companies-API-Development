import { Building2, Calendar, Edit, MapPin, Trash2, Users } from 'lucide-react'

const CompanyCard = ({company, onEdit, onDelete}) => {
    return (
        <div className="rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={() => onEdit(company)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(company._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span>
                        {company.address.city}, {company.address.state} {company.address.country}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                        <span>Founded {company.foundedYear}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{company.noEmployees.toLocaleString()} employees</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard