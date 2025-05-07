import React from 'react';
import { Download, Copy, Volume2, Upload } from 'lucide-react';

interface ResultActionsProps {
  extractedText: string;
  onNewImage: () => void;
  isTextAvailable: boolean;
}

const ResultActions: React.FC<ResultActionsProps> = ({ 
  extractedText, 
  onNewImage, 
  isTextAvailable 
}) => {
  const handleDownload = () => {
    if (!extractedText) return;
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto-extraido.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText)
      .then(() => alert('Texto copiado para a área de transferência!'))
      .catch(err => console.error('Erro ao copiar texto:', err));
  };

  const handleSpeak = () => {
    if (!extractedText) return;
    
    const speech = new SpeechSynthesisUtterance(extractedText);
    speech.lang = 'pt-BR';
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
      <button 
        onClick={handleDownload}
        disabled={!isTextAvailable}
        className={`flex-1 min-w-[150px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center transition-colors ${!isTextAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Download className="mr-2 h-5 w-5" />
        Baixar texto
      </button>
      
      <button 
        onClick={handleCopy}
        disabled={!isTextAvailable}
        className={`flex-1 min-w-[150px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center transition-colors ${!isTextAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Copy className="mr-2 h-5 w-5" />
        Copiar texto
      </button>
      
      <button 
        onClick={handleSpeak}
        disabled={!isTextAvailable}
        className={`flex-1 min-w-[150px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center transition-colors ${!isTextAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Volume2 className="mr-2 h-5 w-5" />
        Ouvir texto
      </button>
      
      <button 
        onClick={onNewImage}
        className="flex-1 min-w-[150px] bg-red-500 text-white hover:bg-red-600 px-4 py-3 rounded-md flex items-center justify-center transition-colors"
      >
        <Upload className="mr-2 h-5 w-5" />
        Selecionar nova imagem
      </button>
    </div>
  );
};

export default ResultActions;