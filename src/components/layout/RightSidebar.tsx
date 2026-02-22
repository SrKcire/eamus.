import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import '../../styles/RightSidebar.css';

const RightSidebar: React.FC = () => {
  const eventos = [
    {
      id: 1,
      nome: 'Pitty na Fundição',
      data: '22/03/2025',
      img: 'https://i.pravatar.cc/150?u=pitty',
    },
    {
      id: 2,
      nome: 'Turnê "Tifane"',
      data: '25/04/2025',
      img: 'https://i.pravatar.cc/150?u=tifane',
    },
    {
      id: 3,
      nome: 'Turnê Eu Nunca Fui Embora',
      data: '26/04/2025',
      img: 'https://i.pravatar.cc/150?u=turne',
    },
    {
      id: 4,
      nome: 'Turnê WAKE UP!',
      data: '08/05/2025',
      img: 'https://i.pravatar.cc/150?u=wakeup',
    },
  ];

  const [listaSugestoes, setListaSugestoes] = useState([
    {
      id: 1,
      nome: 'Carlos Nogueira',
      user: 'carlos_nog',
      img: 'https://i.pravatar.cc/150?u=carlos',
    },
    {
      id: 2,
      nome: 'Joaquim Castro',
      user: 'jcastro',
      img: 'https://i.pravatar.cc/150?u=joaquim',
    },
    {
      id: 3,
      nome: 'Fernanda Rodrigues',
      user: 'fer_rodrigues',
      img: 'https://i.pravatar.cc/150?u=fernanda',
    },
    {
      id: 4,
      nome: 'Helena Ferreira',
      user: 'helena_f',
      img: 'https://i.pravatar.cc/150?u=helena',
    },
  ]);

  const removerSugestao = (id: number) => {
    setListaSugestoes((prev) => prev.filter((sug) => sug.id !== id));
  };

  return (
    <div className="right-sidebar-container">
      {/* SEÇÃO: Próximos Eventos */}
      <section className="sidebar-section">
        <h3 className="sidebar-section-title">Seus próximos eventos</h3>
        <div className="flex flex-col gap-6">
          {eventos.map((evt) => (
            <div key={evt.id} className="sidebar-item-row group cursor-pointer">
              <div className="avatar-circle-wrapper avatar-event">
                <img src={evt.img} alt={evt.nome} className="avatar-img" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-bold leading-tight">
                  {evt.nome}
                  <span className="block text-[12px] font-normal opacity-60 mt-0.5">
                    {evt.data}
                  </span>
                </p>
                <button className="btn-sidebar-action btn-primary-action">
                  Ver Ingressos
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: Sugestões para seguir */}
      <section className="sidebar-section">
        <h3 className="sidebar-section-title">Sugestões para seguir</h3>
        <div className="flex flex-col gap-6">
          {listaSugestoes.length > 0 ? (
            listaSugestoes.map((sug) => (
              <div key={sug.id} className="sidebar-item-row group">
                {/* BOTÃO DE REMOVER (X) */}
                <button
                  onClick={() => removerSugestao(sug.id)}
                  className="remove-suggestion-btn"
                  title="Remover sugestão"
                >
                  <X size={14} />
                </button>

                <Link
                  to={`/profile/${sug.user}`}
                  className="avatar-circle-wrapper avatar-suggestion"
                >
                  <img src={sug.img} alt={sug.nome} className="avatar-img" />
                </Link>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <Link
                      to={`/profile/${sug.user}`}
                      className="text-[14px] font-bold hover:underline"
                    >
                      {sug.nome}
                    </Link>
                    <span className="text-[12px] opacity-40">@{sug.user}</span>
                  </div>
                  <button className="btn-sidebar-action btn-secondary-outline">
                    Seguir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[12px] opacity-30 italic px-2">
              Sem novas sugestões no momento.
            </p>
          )}
        </div>

        {listaSugestoes.length > 0 && (
          <button className="text-[12px] font-bold opacity-50 hover:opacity-100 hover:underline mt-2 px-2 text-left transition-opacity uppercase">
            Veja mais sugestões
          </button>
        )}
      </section>
    </div>
  );
};

export default RightSidebar;
