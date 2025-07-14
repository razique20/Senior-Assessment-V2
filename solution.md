# Take-Home Assignment – Solution Summary

## 🧠 Backend (Node.js)

- ✅ Replaced `fs.readFileSync` with non-blocking `fs.promises.readFile`
- ✅ Cached `/api/stats` using in-memory cache and `fs.watchFile` to improve performance
- ✅ Extracted `mean()` logic into reusable utility
- ✅ Handled all 404 and server-side errors with consistent error middleware
- ✅ Added Jest unit tests using Supertest

## 💻 Frontend (React + Vite)

- ✅ Migrated from CRA to Vite for faster builds and modern tooling
- ✅ Fixed memory leak in `Items` by using `AbortController` to cancel fetch
- ✅ Implemented pagination and server-side search (`?q=` param)
- ✅ Used `react-window` for list virtualization to improve performance with large datasets
- ✅ Added basic unit tests using React Testing Library

## ⚙️ Trade-offs

- Did not implement full backend database; used JSON file storage for simplicity
- In-memory cache means updates require file change; in production, Redis or DB caching would be preferred
- Used `react-window` instead of `react-virtualized` to keep the footprint light

## ✅ How to Run

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
