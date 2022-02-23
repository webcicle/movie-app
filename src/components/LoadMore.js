export default function LoadMore({setPage, page}) {
    function increasePage() {
        setPage(prev => prev + 1)
    }

    function resetPage() {
        setPage(1)
    }

    return (
        <button 
            onClick={page < 10 ? increasePage : resetPage}
            className="load-more">load more results
        </button>
    )
}