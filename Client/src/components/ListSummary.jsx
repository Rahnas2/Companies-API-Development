const ListSummary = ({currentListLength, totalListLength, searchTerm}) => {
    return (
        <div className="mb-4">
            <p className="text-sm text-gray-600">
                Showing {currentListLength} of {totalListLength} companies
                {searchTerm && (
                    <span className="ml-1">
                        for "<strong>{searchTerm}</strong>"
                    </span>
                )}
            </p>
        </div>
    )
}

export default ListSummary