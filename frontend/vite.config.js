import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/.vite')) {
            // Group all third-party dependencies into a single chunk
            return 'vite';
          } else if (id.includes('src/components')) {
            // Group components into a separate chunk
            return 'components';   
          }  else if (id.includes('src/layouts')) {
            // Group layouts into a separate chunk
            return 'layouts';
          }
          else if (id.includes('src/views/auths')) {
            // Group views into a separate chunk
            return 'auths';    
          }
          else if (id.includes('src/views/avatarpage')) {
            // Group views into a separate chunk
            return 'avatarpage';    
          }else if (id.includes('src/views/AvatarScrach')) {
            // Group views into a separate chunk
            return 'AvatarScrach';    
          }
          else if (id.includes('src/views/homepage')) {
            // Group views into a separate chunk
            return 'homepage';    
          }
          else if (id.includes('src/views/likedprofiles')) {
            // Group views into a separate chunk
            return 'likedprofiles';    
          }else if (id.includes('src/views/mywallet')) {
            // Group views into a separate chunk
            return 'mywallet';    
          }else if (id.includes('src/views/navigations')) {
            // Group views into a separate chunk
            return 'navigations';    
          }else if (id.includes('src/views/profile')) {
            // Group views into a separate chunk
            return 'profile';    
          }else if (id.includes('src/views/search')) {
            // Group views into a separate chunk
            return 'search';    
          }else if (id.includes('src/views/videos')) {
            // Group views into a separate chunk
            return 'videos';    
          }
        }
      }
    }
  }
});
