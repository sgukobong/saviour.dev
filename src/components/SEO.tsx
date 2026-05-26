import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = '/images/og-image.jpg', 
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    // Title
    document.title = `${title} | Saviour Ukobong`;

    // Helper to set meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOg = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard SEO
    setMeta('description', description);
    if (keywords.length > 0) setMeta('keywords', keywords.join(', '));
    setMeta('author', 'Saviour Ukobong');

    // Open Graph
    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:image', image);
    setOg('og:url', url);
    setOg('og:type', type);
    setOg('og:site_name', 'Saviour Ukobong');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:url', url);

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;