import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
const HomePage = lazy(() => import('./Pages/Home/HomePage'));

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className='App'>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
