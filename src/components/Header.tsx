import React from 'react';
import { FileAudio, ChevronDown, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center text-red-500 hover:text-red-600 transition-colors">
            <FileAudio className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Imagem<span className="font-normal">Falada</span></span>
          </a>
          
          <nav className="hidden md:flex ml-8">
            <button className="flex items-center text-gray-700 hover:text-red-500 transition-colors mr-4">
              Acessibilidade
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <button className="text-gray-700 hover:text-red-500 transition-colors">
              Ajuda
            </button>
          </nav>
        </div>
        
        <div className="flex items-center mt-3 md:mt-0 w-full md:w-auto">
          <div className="relative flex-grow md:max-w-md mr-2">
            <input 
              type="text" 
              placeholder="O que você está procurando?" 
              className="w-full bg-gray-100 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-gray-700 hover:text-red-500 transition-colors whitespace-nowrap">
              Iniciar sessão
            </button>
            <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md px-4 py-2 transition-colors whitespace-nowrap">
              Registrar-se
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;