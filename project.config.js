
/**
 * Project configuration file
 * This file helps define the project structure without modifying package.json
 */

module.exports = {
  // Project structure
  structure: {
    frontend: {
      root: './frontend',
      src: './frontend/src',
      public: './frontend/public',
      vite: './frontend/vite.config.ts'
    },
    backend: {
      root: './backend',
      functions: './backend/functions'
    }
  },

  // Scripts that could be run (for documentation)
  scripts: {
    'frontend:dev': 'cd frontend && vite',
    'frontend:build': 'cd frontend && tsc && vite build',
    'frontend:preview': 'cd frontend && vite preview',
    'deploy:functions': 'supabase functions deploy paypal-payment'
  }
};
