import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Registrar Service Worker com escopo e tipo apropriados
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        type: 'classic'
      });
      console.log('ServiceWorker registration successful:', registration.scope);
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);