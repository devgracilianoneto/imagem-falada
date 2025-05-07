import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import TextResult from './components/TextResult';
import ResultActions from './components/ResultActions';
import { recognizeText, terminateWorker } from './services/ocrService';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      terminateWorker();
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageSelected = async (file: File) => {
    // Clean up previous preview if it exists
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create preview and set state
    const preview = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(preview);
    setIsProcessing(true);
    setExtractedText('');

    try {
      // Process the image to extract text
      const text = await recognizeText(file);
      setExtractedText(text);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Ocorreu um erro ao processar a imagem. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewImage = () => {
    // Reset state for new image upload
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Extraia e ouça texto de imagens
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Ferramenta de acessibilidade para estudantes: faça upload de fotos de cadernos, 
          quadros ou slides para extrair o texto e ouvi-lo.
        </p>

        <div className="w-full max-w-3xl">
          {imagePreview ? (
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={imagePreview} 
                alt="Imagem enviada" 
                className="w-full object-contain max-h-64"
              />
            </div>
          ) : (
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              isProcessing={isProcessing} 
            />
          )}

          <TextResult 
            extractedText={extractedText} 
            isProcessing={isProcessing} 
          />

          <ResultActions 
            extractedText={extractedText}
            onNewImage={handleNewImage}
            isTextAvailable={!isProcessing && extractedText.length > 0}
          />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Imagem Falada. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;