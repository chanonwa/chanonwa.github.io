'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function apply(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export default function ThemeToggle() {
  // The layout script has already applied the theme before paint: the saved choice, or else the system setting.
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    // Until the visitor picks a theme, keep following the system setting when it changes.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('theme-choice');
      } catch {}
      if (saved === 'light' || saved === 'dark') return;
      const next: Theme = e.matches ? 'dark' : 'light';
      apply(next);
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem('theme-choice', next);
    } catch {}
  }

  return (
    <button className="toggle" type="button" onClick={toggle} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? 'Light mode' : 'Night mode'}
    </button>
  );
}
