

export default function SearchBar({ searchQuery, setSearchQuery }: {
    searchQuery: string,
    setSearchQuery: Function
}) {
    return (
        <input
            className='p-2 rounded'
            placeholder='search...'
            value={searchQuery}
            onInput={e => {
                const target = e.target as HTMLInputElement;
                setSearchQuery(target.value);
            }}
        />
    )
}
