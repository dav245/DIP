/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_VUE_APP_URL: string;
  readonly VITE_SOLID_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
