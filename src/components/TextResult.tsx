import React from 'react';

interface TextResultProps {
  extractedText: string;
  isProcessing: boolean;
}

const TextResult: React.FC<TextResultProps> = ({ extractedText, isProcessing }) => {
  if (isProcessing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!extractedText) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-full">
      <h2 className="text-xl font-semibold mb-3">Texto Extraído:</h2>
      <p className="whitespace-pre-line text-gray-700">{extractedText}</p>
    </div>
  );
};

export default TextResult;