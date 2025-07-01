/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly MODE: string;
  // add other environment variables here as needed}

interface ImportMeta {
  readonly env: ImportMetaEnv}


