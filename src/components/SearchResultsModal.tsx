import Link from 'next/link'
import Image from 'next/image'
import '../styles/SearchResultsModal.scss'
import '../styles/global.scss'


interface SearchResult {
  id: string
  title: string
  short_description: string
  main_photo?: {
    url: string
    alt_tag: string
  }
  post_type: '0' | '1'
}

interface SearchResultsModalProps {
  results: SearchResult[]
  onClose: () => void
  onSearch: (query: string) => void
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  results,
  onClose,
  onSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content flex-center gap-[15%]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close">
          ✕
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="modal-search-input"
        />

        {results.map((result) => (
          <div key={result.id} className="result-item ">
            <Link href={`/${result.post_type === '0' ? 'gears' : 'trips'}/${result.id}`}>
              <button className="result-link flex-center">
                <Image
                className='result-img'
                  src={result.main_photo?.url || ''}
                  alt={result.main_photo?.alt_tag || 'Image'}
                  width={60}
                  height={60}
                />
                <div>
                  <h3 className="result-title">{result.title}</h3>
                  <p className="result-description">
                    {result.short_description}
                  </p>
                </div>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResultsModal
