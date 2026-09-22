import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './Pages/HomePage';
import Booth from './Pages/Booth';
import BussinessQuote from './Pages/BussinessQuote';
import ManageQuote from './Pages/ManageQuote';
import SamplingBox from './Pages/SamplingBox';
import EvalutePage from './Pages/EvalutePage';
import ElectricContact from './Pages/ElectricContact';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'trang-chu';
  });

  const navigateTo = (pageKey) => {
    // Normalize aliases
    let target = pageKey;
    if (pageKey === 'xuong-banh-uy-tin') target = 'bo-suu-tap-banh';
    if (pageKey === 'dat-hang-doanh-nghiep') target = 'yeu-cau-bao-gia';
    if (pageKey === 'bao-gia-va-so-sanh-thau') target = 'so-sanh-thau-rfq';
    if (pageKey === 'electric-contact') target = 'hop-dong-dien-tu';
    if (pageKey === 'tro-ly-ai-tu-van' || pageKey === 'tro-ly-ai') {
      target = 'trang-chu';
      setTimeout(() => {
        const el = document.getElementById('ai-assistant-sec');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    setCurrentPage(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'trang-chu':
        return <HomePage onNavigate={navigateTo} />;
      case 'bo-suu-tap-banh':
      case 'xuong-banh-uy-tin':
        return <Booth onNavigate={navigateTo} />;
      case 'dat-hang-doanh-nghiep':
      case 'yeu-cau-bao-gia':
        return <BussinessQuote onNavigate={navigateTo} />;
      case 'so-sanh-thau-rfq':
      case 'bao-gia-va-so-sanh-thau':
        return <ManageQuote onNavigate={navigateTo} />;
      case 'dang-ky-mau-thu':
        return <SamplingBox onNavigate={navigateTo} />;
      case 'danh-gia-va-phe-duyet-mau-thu':
        return <EvalutePage onNavigate={navigateTo} />;
      case 'hop-dong-dien-tu':
      case 'electric-contact':
        return <ElectricContact onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header activePage={currentPage} onNavigate={navigateTo} />
      <div className="flex-1 w-full">
        {renderPage()}
      </div>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
