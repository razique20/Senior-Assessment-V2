import { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });

  const fetchItems = useCallback(
    async ({ q = "", page = 1, limit = 10, signal } = {}) => {
      const params = new URLSearchParams({ q, page, limit });

      const res = await fetch(`http://localhost:3001/api/items?${params}`, {
        signal,
      });
      const json = await res.json();

      setItems(json.items);
      setMeta({ total: json.total, page: json.page, limit: json.limit });
    },
    []
  );

  return (
    <DataContext.Provider value={{ items, meta, fetchItems }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
