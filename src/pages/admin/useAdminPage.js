import { useEffect } from 'react';

/** Sets the tab title and keeps admin pages out of search engines. */
export function useAdminPage(title) {
  useEffect(() => {
    document.title = title;
    let robots = document.head.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content') ?? null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (previous === null) robots.remove();
      else robots.setAttribute('content', previous);
    };
  }, [title]);
}
