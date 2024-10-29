import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/SearchResultsModal.scss';

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
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ results, onClose }) => (
  <div className="custom-modal-overlay">
    <div className="custom-modal-content">
      <button onClick={onClose} className="modal-close">✕</button>
      {results.map(result => (
        <div key={result.id} className="result-item">
          <Image src={result.main_photo?.url || ''} alt={result.main_photo?.alt_tag || 'Image'} width={60} height={60} />
          <div>
            <h3 className="result-title">{result.title}</h3>
            <p className="result-description">{result.short_description}</p>
            <Link href={`/posts/${result.id}`}>
              <button className="result-link">Читати більше</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SearchResultsModal;
