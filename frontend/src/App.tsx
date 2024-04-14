import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
