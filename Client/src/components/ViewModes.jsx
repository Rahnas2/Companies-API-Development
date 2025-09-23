import { Grid3X3, Table } from "lucide-react"

const ViewModes = ({viewMode, onChangeViewMode}) => {

    return (
        <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
            <button
                onClick={() => onChangeViewMode('table')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'table'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                title="Table View"
            >
                <Table className="h-5 w-5" />
            </button>
            <button
                onClick={() => onChangeViewMode('cards')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'cards'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                title="Card View"
            >
                <Grid3X3 className="h-5 w-5" />
            </button>
        </div>
    )
}

export default ViewModes