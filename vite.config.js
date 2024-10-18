import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { babel } from '@rollup/plugin-babel'; // Import the Rollup Babel plugin

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelHelpers: 'bundled', // Required for bundled Babel helpers
      extensions: ['.js', '.jsx'], // Ensure Babel processes these files
      exclude: 'node_modules/**', // Exclude node_modules from Babel processing
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for absolute imports
    },
  },
  esbuild: false, // Disable ESBuild to allow Babel to take over
});
