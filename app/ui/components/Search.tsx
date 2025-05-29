interface SearchProps {
    query: {
        text: string
    }
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    baseSearch: string
}

const Search = ({ query, handleSearch, baseSearch }: SearchProps) => {
    return ( 
        <div className="flex items-center justify-center md:space-y-0 bg-white dark:bg-gray-900 ">
            <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    onChange={handleSearch} 
                    value={query.text} 
                    type="text" 
                    id="table-search-users" 
                    className="block p-2 ps-10 text-sm text-gray-900 font-Dana border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder={`جستجو بر اساس ${baseSearch}`}
                />
            </div>
        </div>
    )
}

export default Search
