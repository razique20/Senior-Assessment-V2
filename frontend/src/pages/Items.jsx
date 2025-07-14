import React, { useEffect, useState, useCallback } from 'react';
import { useData } from '../state/DataContext';
import { useNavigate } from 'react-router-dom';

function Items() {
  const { items, fetchItems } = useData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const loadData = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    fetchItems({ q: search, page, limit, signal: controller.signal })
      .catch(err => {
        if (err.name !== 'AbortError') setError('Failed to load items');
      })
      .finally(() => setLoading(false));

    return controller;
  }, [fetchItems, search, page]);

  useEffect(() => {
    const controller = loadData();
    return () => controller.abort();
  }, [loadData]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (!items.length) return <p className="text-center mt-8">No items found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search items..."
        value={searchInput}
        onChange={handleSearchChange}
        className="mb-6 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(`/items/${item.id}`)}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-5"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-2">{item.name}</h3>
            <p className="text-gray-600"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-800 mt-1"><strong>Price:</strong> ${item.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={items.length < limit}
          className={`px-4 py-2 rounded ${
            items.length < limit
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Items;
