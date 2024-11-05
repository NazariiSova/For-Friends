// components/JsonLd.tsx
import { useEffect, useState } from 'react';

interface JsonLdProps {
  schema: Record<string, any>;
}

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
