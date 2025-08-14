import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure initial theme is applied (mirrors inline script in index.html)
try {
	const stored = localStorage.getItem('theme');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const useDark = stored ? stored === 'dark' : prefersDark;
	const c = document.documentElement.classList;
	if (useDark) c.add('dark'); else c.remove('dark');
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
