import { useState, useRef, useCallback, ChangeEvent } from 'react';

export const useMediaUpload = () => {
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função para abrir o seletor de ficheiros
  const selectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Processa o ficheiro selecionado
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Se já existia um preview, removemos da memória antes de criar o novo
        if (mediaUrl) URL.revokeObjectURL(mediaUrl);

        const url = URL.createObjectURL(file);
        setMediaUrl(url);
      }
    },
    [mediaUrl]
  );

  // Limpa a mídia selecionada
  const clearMedia = useCallback(() => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setMediaUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [mediaUrl]);

  return {
    mediaUrl,
    setMediaUrl,
    fileInputRef,
    selectFile,
    handleFileChange,
    clearMedia,
  };
};
