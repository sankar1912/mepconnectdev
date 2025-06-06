import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import dotenv from 'dotenv';

dotenv.config()
export default defineConfig({
  plugins: [pluginReact()],
  server:{
    proxy:{
      "/api":{
        target:"http://127.0.0.1:8000"
      }
    },
    publicDir:{
      name:"./public"
    }
  },
  html:{
    favicon:"./public/Assets/img/mepcobg.png",
    title:"Alumni Association, Mepco Schlenk Engineering College, Sivakasi",
  },
  tools:{
    eslint:false
  }
});
