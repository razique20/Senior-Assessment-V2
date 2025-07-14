import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';

function App() {
  return (
    <DataProvider>
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            🛍️ Item Explorer
          </h1>
          <Link
            to="/"
            className="text-white hover:bg-white hover:text-purple-700 px-4 py-2 rounded transition duration-200 font-medium"
          >
            Home
          </Link>
        </div>
      </nav>

      <main className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </main>
    </DataProvider>
  );
}

export default App;
