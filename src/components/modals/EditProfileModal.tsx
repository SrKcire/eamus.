import React, { useState } from 'react';
import { X, Camera, MapPin, AlignLeft, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/EditProfileModal.css';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, updateUser } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
    avatar: user.avatar,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="edit-modal-card">
        {/* Header */}
        <div className="edit-modal-header">
          <h2 className="edit-modal-title">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          {/* Seção do Avatar */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="edit-avatar-container group">
              {' '}
              {/* Adicionado 'group' aqui */}
              <img
                src={formData.avatar}
                className="edit-avatar-img"
                alt="Preview"
              />
              <div className="edit-avatar-overlay">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">
              Alterar Foto
            </span>
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            <InputGroup
              label="Nome"
              icon={<UserIcon size={12} />}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
            />

            <div className="flex flex-col gap-2">
              <label className="edit-input-label">
                <AlignLeft size={12} /> Bio
              </label>
              <textarea
                value={formData.bio}
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="edit-textarea-field"
                placeholder="Conte sua história..."
              />
            </div>

            <InputGroup
              label="Localização"
              icon={<MapPin size={12} />}
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
              placeholder="Ex: São Paulo, Brasil"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputGroup = ({
  label,
  icon,
  value,
  onChange,
  placeholder = '',
}: any) => (
  <div className="flex flex-col gap-2">
    <label className="edit-input-label">
      {icon} {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="edit-input-field"
    />
  </div>
);

export default EditProfileModal;
