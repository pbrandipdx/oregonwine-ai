import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { DirectoryPage } from "./pages/DirectoryPage";
import { HomePage } from "./pages/HomePage";
import { WineryPage } from "./pages/WineryPage";

const base = import.meta.env.BASE_URL;

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <div className="app">
        <nav className="nav">
          <Link className="brand" to="/">
            OregonWine.ai
          </Link>
          <div className="nav-links">
            <Link to="/directory">Directory</Link>
            <a href={`${base}widget-test.html`} target="_blank" rel="noreferrer">
              Widget demo
            </a>
          </div>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/w/:slug" element={<WineryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
