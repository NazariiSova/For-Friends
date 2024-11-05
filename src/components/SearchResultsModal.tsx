import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/SearchResultsModal.module.scss';

interface SearchResult {
  id: string;
  title: string;
  short_description: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  post_type: '0' | '1';
}

interface SearchResultsModalProps {
  results: SearchResult[];
  onClose: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  results,
  onClose,
  onSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.customModalOverlay} onClick={onClose}>
      <div
        className={`${styles.customModalContent} ${styles.flexCenter} ${styles.gap}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={styles.modalClose}>
          ✕
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className={styles.modalSearchInput}
        />

        {results.map((result) => (
          <div key={result.id} className={styles.resultItem}>
            <Link href={`/${result.post_type === '0' ? 'gears' : 'trips'}/${result.id}`}>
              <button className={styles.resultLink}>
                <Image
                  className={styles.resultImg}
                  src={result.main_photo?.url || ''}
                  alt={result.main_photo?.alt_tag || 'Image'}
                  width={60}
                  height={60}
                />
                <div>
                  <h3 className={styles.resultTitle}>{result.title}</h3>
                  <p className={styles.resultDescription}>
                    {result.short_description}
                  </p>
                </div>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsModal;
