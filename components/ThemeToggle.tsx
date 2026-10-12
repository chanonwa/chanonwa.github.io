'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  // Light is the default. The layout script has already applied a saved "dark" choice before paint.
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
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
