import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsPage />} />
      </Routes>
    </div>
  );
};

export default App;
