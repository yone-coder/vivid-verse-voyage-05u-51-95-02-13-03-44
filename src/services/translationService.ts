
interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

class TranslationService {
  private cache = new Map<string, string>();
  
  private getCacheKey(text: string, targetLang: string): string {
    return `${text}:${targetLang}`;
  }

  async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    const { text, targetLanguage, sourceLanguage = 'en' } = request;
    
    // Return original text if translating to the same language
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text };
    }

    const cacheKey = this.getCacheKey(text, targetLanguage);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return { translatedText: this.cache.get(cacheKey)! };
    }

    try {
      // Call our Supabase edge function
      const response = await fetch('/functions/v1/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage,
          sourceLanguage
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.translatedText || text;
      
      // Cache the result
      this.cache.set(cacheKey, translatedText);
      
      return { translatedText };
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to original text
      return { translatedText: text };
    }
  }

  async translateMultiple(texts: string[], targetLanguage: string, sourceLanguage = 'en'): Promise<string[]> {
    const promises = texts.map(text => 
      this.translateText({ text, targetLanguage, sourceLanguage })
    );
    
    const results = await Promise.all(promises);
    return results.map(result => result.translatedText);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = new TranslationService();
