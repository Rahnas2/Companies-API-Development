import { Building2, Plus } from 'lucide-react'

const Navbar = ({handleCreateCompany}) => {
    return (
        <div className="shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
                            <p className="text-sm text-gray-600">
                                Manage your companies with ease
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreateCompany}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-sm"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Company
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar