
import axios from 'axios';

// Interface for translation results
interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

interface TranslateResponse {
  data: {
    translations: TranslationResult[];
  };
}

// Default API key - in a real app, this should be in an environment variable
const GOOGLE_TRANSLATE_API_KEY = 'YOUR_API_KEY';

/**
 * Translates text using Google Translate API
 * @param text Text to translate
 * @param targetLang Target language code
 * @param sourceLang Optional source language code
 * @returns Promise with translated text
 */
export const translateText = async (
  text: string, 
  targetLang: string, 
  sourceLang?: string
): Promise<string> => {
  try {
    // For demo/development purposes, we'll use a mock function
    // In production, uncomment the actual API call below
    return mockTranslate(text, targetLang, sourceLang);
    
    /* 
    // Real API call for production use
    const response = await axios.post<TranslateResponse>(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        target: targetLang,
        ...(sourceLang && { source: sourceLang }),
        format: 'text'
      }
    );
    
    return response.data.data.translations[0].translatedText;
    */
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
};

/**
 * Batch translates multiple texts
 * @param texts Array of texts to translate
 * @param targetLang Target language code
 * @param sourceLang Optional source language code
 * @returns Promise with array of translated texts
 */
export const batchTranslate = async (
  texts: string[], 
  targetLang: string, 
  sourceLang?: string
): Promise<string[]> => {
  try {
    // For demo purposes, we'll translate them sequentially
    // In production with a real API, consider a bulk endpoint if available
    const results = await Promise.all(
      texts.map(text => translateText(text, targetLang, sourceLang))
    );
    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts; // Return original texts on error
  }
};

/**
 * Mock translation function - for development without API key
 * Only does simple transforms for demo purposes
 */
const mockTranslate = (text: string, targetLang: string, sourceLang?: string): string => {
  // This is a very basic mock just to show the functionality
  // It's not a real translation!
  const mockDictionaries: Record<string, Record<string, string>> = {
    en: {
      'For You': 'For You',
      'Posts': 'Posts',
      'Shops': 'Shops',
      'Trending': 'Trending',
      'Videos': 'Videos',
      'Search for products': 'Search for products',
      'Fashion': 'Fashion',
      'Sports': 'Sports',
      'Home': 'Home',
      'Tools': 'Tools',
      'Gaming': 'Gaming',
      'Baby': 'Baby',
      'Auto': 'Auto',
      'Electronics': 'Electronics',
    },
    es: {
      'For You': 'Para Ti',
      'Posts': 'Publicaciones',
      'Shops': 'Tiendas',
      'Trending': 'Tendencias',
      'Videos': 'Vídeos',
      'Search for products': 'Buscar productos',
      'Fashion': 'Moda',
      'Sports': 'Deportes',
      'Home': 'Hogar',
      'Tools': 'Herramientas',
      'Gaming': 'Videojuegos',
      'Baby': 'Bebé',
      'Auto': 'Auto',
      'Electronics': 'Electrónica',
    },
    fr: {
      'For You': 'Pour Vous',
      'Posts': 'Publications',
      'Shops': 'Boutiques',
      'Trending': 'Tendances',
      'Videos': 'Vidéos',
      'Search for products': 'Rechercher des produits',
      'Fashion': 'Mode',
      'Sports': 'Sports',
      'Home': 'Maison',
      'Tools': 'Outils',
      'Gaming': 'Jeux vidéo',
      'Baby': 'Bébé',
      'Auto': 'Auto',
      'Electronics': 'Électronique',
    },
    de: {
      'For You': 'Für Dich',
      'Posts': 'Beiträge',
      'Shops': 'Geschäfte',
      'Trending': 'Im Trend',
      'Videos': 'Videos',
      'Search for products': 'Produkte suchen',
      'Fashion': 'Mode',
      'Sports': 'Sport',
      'Home': 'Zuhause',
      'Tools': 'Werkzeuge',
      'Gaming': 'Spiele',
      'Baby': 'Baby',
      'Auto': 'Auto',
      'Electronics': 'Elektronik',
    },
  };

  // Check if we have a mock translation for this target language
  if (mockDictionaries[targetLang]) {
    // Check if we have a translation for this specific text
    return mockDictionaries[targetLang][text] || text;
  }
  
  // Return original text if no mock translation available
  return text;
};
