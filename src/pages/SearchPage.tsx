import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, X, ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchPage.css';

const SearchPage: React.FC = () => {
  const { posts } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Sincroniza o termo de busca com a URL (caso o usuário venha de um link externo)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setSearchTerm(decodeURIComponent(q));
  }, [location.search]);

  // Filtro de resultados otimizado com useMemo
  const results = useMemo(() => {
    const low = searchTerm.toLowerCase().trim();
    if (!low) return [];

    return posts.filter(
      (p) =>
        p.location.toLowerCase().includes(low) ||
        p.user.toLowerCase().includes(low)
    );
  }, [searchTerm, posts]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <header>
        <h2 className="search-title">Discover</h2>

        <div className="search-input-wrapper">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Explore novos horizontes..."
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-col gap-4">
        {searchTerm ? (
          <>
            {results.length > 0 ? (
              results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/profile/${p.user}`)}
                  className="result-card group"
                >
                  <img
                    src={p.image}
                    className="result-image"
                    alt={`Thumbnail de ${p.user}`}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-[16px] text-white">
                      @{p.user}
                    </p>
                    <p className="text-[13px] opacity-40 text-white flex items-center gap-1">
                      <MapPin size={12} /> {p.location}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-20 opacity-30">
                <p className="text-[14px] font-medium italic">
                  Nenhum resultado encontrado para "{searchTerm}"
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-search-state">
            <Compass size={80} strokeWidth={1} className="mb-6 text-white" />
            <p className="font-bold uppercase tracking-[0.4em] text-[11px] text-white text-center">
              O mundo espera por você
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
