import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/site';

const OG_IMAGE = '/blue-sky-poster.jpg';

/** Creates the tag on first use, then reuses it on later route changes. */
function setMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement(attrs.rel ? 'link' : 'meta');
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
}

/**
 * Per-page SEO: title, description, canonical URL and the Open Graph /
 * Twitter tags that decide how a shared link looks in chat apps and search.
 * Client-rendered, so crawlers that execute JS see it; the index.html defaults
 * cover the rest.
 */
export function useSeo(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${SITE_URL}${pathname}`;
    if (title) document.title = title;
    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description });
    }
    setMeta('link[rel="canonical"]', { rel: 'canonical', href: url });

    const og = {
      'og:type': 'website',
      'og:site_name': 'Medibytes',
      'og:url': url,
      'og:image': `${SITE_URL}${OG_IMAGE}`,
      ...(title && { 'og:title': title }),
      ...(description && { 'og:description': description }),
    };
    Object.entries(og).forEach(([property, content]) =>
      setMeta(`meta[property="${property}"]`, { property, content })
    );

    const twitter = {
      'twitter:card': 'summary_large_image',
      'twitter:image': `${SITE_URL}${OG_IMAGE}`,
      ...(title && { 'twitter:title': title }),
      ...(description && { 'twitter:description': description }),
    };
    Object.entries(twitter).forEach(([name, content]) =>
      setMeta(`meta[name="${name}"]`, { name, content })
    );
  }, [title, description, pathname]);
}
