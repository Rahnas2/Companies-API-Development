import { Building2, Plus } from "lucide-react"

const EmptyResult = ({searchTerm, handleCreateCompany}) => {
    return (
        <div className="col-span-full">
            <div className="rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-4">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first company.'}
                </p>
                {!searchTerm && (
                    <button
                        onClick={handleCreateCompany}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Company
                    </button>
                )}
            </div>
        </div>
    )
}

export default EmptyResult