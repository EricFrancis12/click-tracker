

export default function SearchBar({ searchQuery, setSearchQuery }: {
    searchQuery: string,
    setSearchQuery: Function
}) {
    return (
        <input
            value={searchQuery}
            onInput={e => {
                const target = e.target as HTMLInputElement;
                setSearchQuery(target.value);
            }}
        />
    )
}
