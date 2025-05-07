import { createWorker, PSM, OEM } from 'tesseract.js';

let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

export const recognizeText = async (imageFile: File): Promise<string> => {
  try {
    if (!worker) {
      worker = await createWorker();
      
      // Configurar o worker com parâmetros otimizados
      await worker.loadLanguage('por');
      await worker.initialize('por');
      
      // Configurações avançadas para melhor reconhecimento
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO, // Detecta automaticamente o layout
        tessedit_ocr_engine_mode: OEM.LSTM_ONLY, // Usa apenas o motor LSTM (mais preciso)
        tessjs_create_pdf: '0', // Desativa criação de PDF para melhor performance
        tessjs_create_hocr: '0', // Desativa criação de HOCR para melhor performance
        preserve_interword_spaces: '1', // Preserva espaços entre palavras
        textord_heavy_nr: '1', // Remove ruídos da imagem
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-_():;/%$@ ', // Lista de caracteres permitidos
      });
    }

    // Pré-processamento da imagem
    const imageUrl = URL.createObjectURL(imageFile);
    const result = await worker.recognize(imageUrl, {
      rectangle: undefined, // Área específica da imagem (undefined para imagem inteira)
      classify_bln_numeric_mode: '1', // Melhor reconhecimento de números
      tessedit_do_invert: '0', // Não inverter cores
    });
    
    URL.revokeObjectURL(imageUrl);

    if (!result.data.text) {
      throw new Error('Nenhum texto encontrado na imagem');
    }

    // Pós-processamento do texto
    let text = result.data.text
      .replace(/\s+/g, ' ') // Remove espaços extras
      .replace(/[^\S\r\n]+/g, ' ') // Normaliza espaços entre palavras
      .trim(); // Remove espaços no início e fim

    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    if (error instanceof Error) {
      throw new Error(`Falha ao extrair texto da imagem: ${error.message}`);
    }
    throw new Error('Falha ao extrair texto da imagem');
  }
};

export const terminateWorker = async (): Promise<void> => {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
};