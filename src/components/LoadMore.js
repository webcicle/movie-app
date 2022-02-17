export default function LoadMore({setPage}) {
    function increasePage() {
        setPage(prev => prev + 1)
    }

    return (
        <button 
            onClick={increasePage}
            className="load-more">load more results
        </button>
    )
}