import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import ViewModes from "./components/ViewModes"
import ListSummary from "./components/ListSummary"
import EmptyResult from "./components/EmptyResult"
import CompanyModal from "./components/CompanyModal"
import CompanyCard from "./components/CompanyCard"
import CompaniesTable from "./components/CompaniesTable"
import { deleteCompanyApi, fetchAllCompaniesApi } from "./apis/companyServices"
import Paginaton from "./components/Paginaton"


function App() {

   const [viewMode, setViewMode] = useState('table')
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [modalMode, setModalMode] = useState('create');
   const [searchTerm, setSearchTerm] = useState('');
   const [isFetchingCompanies, setIsFetchingCompanies] = useState(false)
   const [totalCompanies, setTotalCompanies] = useState(0)
   const [companies, setCompanies] = useState([])
   const [editingCompany, setEditingCompany] = useState();

   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)

   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm)
         setCurrentPage(1)
      }, 500)

      return () => {
         clearTimeout(handler)
      }
   }, [searchTerm])

   useEffect(() => {
      const fetchCompanies = async () => {
         try {
            setIsFetchingCompanies(true)
            const result = await fetchAllCompaniesApi(currentPage, debouncedSearchTerm)
            setTotalCompanies(result.total)
            setTotalPages(result.totalPages)
            setCompanies(result.data)
         } catch (error) {
            console.error('error fetching companies ', error)
         } finally {
            setIsFetchingCompanies(false)
         }
      }

      fetchCompanies()
   }, [debouncedSearchTerm, currentPage])


   // View Mode 
   const onChangeViewMode = (data) => {
      setViewMode(data)
   }

   // Handle Page Cahnge 
   const handlePageChange = (newPage) => {
      setCurrentPage(newPage)
   }


   // Create Company
   const handleCreateCompany = () => {
      setModalMode('create');
      setEditingCompany(undefined);
      setIsModalOpen(true);
   };

   // Update Company
   const handleEditCompany = (company) => {
      setModalMode('edit');
      setEditingCompany(company);
      setIsModalOpen(true);
   };

   // Delete Company
   const handleDeleteCompany = async (id) => {
      if (window.confirm('Are you sure you want to delete this company?')) {
         setCompanies(prev => prev.filter(company => company._id !== id));
         setTotalCompanies(totalCompanies - 1)
         await deleteCompanyApi(id)
      }
   };

   // Save Newly Created or Updated Company Info
   const handleSaveCompany = async (formData) => {
      if (modalMode === 'create') {
         setCompanies(prev => [formData, ...prev]);
         setTotalCompanies(totalCompanies + 1)
      } else if (editingCompany) {
         setCompanies(prev =>
            prev.map(company =>
               company._id === editingCompany._id
                  ? formData
                  : company
            )
         );
      }
      setIsModalOpen(false);
   };

   return (
      <div className="min-h-screen bg-gray-50">

         {/* Navbar */}
         <Navbar handleCreateCompany={handleCreateCompany} />

         {/* Main Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Search and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
               <div className="flex-1 max-w-md">
                  <SearchBar
                     searchTerm={searchTerm}
                     onSearchChange={setSearchTerm}
                     placeholder="Search companies, industries, or locations..."
                  />
               </div>
               <ViewModes viewMode={viewMode} onChangeViewMode={onChangeViewMode} />
            </div>

            {/* Result Summary  */}
            <ListSummary currentListLength={companies.length} totalListLength={totalCompanies} searchTerm={searchTerm} />

            {/* Companies Display */}
            {companies.length === 0 ? (
               <EmptyResult searchTerm={searchTerm} handleCreateCompany={handleCreateCompany} />
            ) : viewMode === 'table' ? (
               <>
                  <CompaniesTable companies={companies} onEdit={handleEditCompany} onDelete={handleDeleteCompany} />
                  <Paginaton currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
               </>
            ) : (
               <>
                  {companies.map((company) => (
                     <CompanyCard
                        key={company.name}
                        company={company}
                        onEdit={handleEditCompany}
                        onDelete={handleDeleteCompany}
                     />
                  ))}
                  <Paginaton currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
               </>
            )}
         </div>

         {/* Company Modal */}
         <CompanyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCompany}
            company={editingCompany}
            mode={modalMode}
         />

      </div>
   )
}

export default App
