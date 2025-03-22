import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import { LikedArticlesProvider } from './contexts/LikedArticlesContext';
import Top from './features/Top';
import Layout from './components/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <Top />
    </Layout>
  </StrictMode>,
);
