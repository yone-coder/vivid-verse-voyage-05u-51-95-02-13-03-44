
/**
 * Project configuration file
 * This file helps define the project structure without modifying package.json
 */

module.exports = {
  // Project structure
  structure: {
    frontend: {
      root: './',
      src: './src',
      public: './public',
      vite: './vite.config.ts'
    },
    backend: {
      root: './backend',
      functions: './backend/functions'
    }
  },

  // Scripts that could be run (for documentation)
  scripts: {
    'frontend:dev': 'vite',
    'frontend:build': 'tsc && vite build',
    'frontend:preview': 'vite preview',
    'deploy:functions': 'supabase functions deploy paypal-payment'
  }
};
