/// <reference types="vite/client" />
interface ImportMetaEnv {
 readonly VITE_SITE_URL?: string;
 readonly VITE_INDEXABLE?: string;
 readonly VITE_CONTENT_APPROVED?: string;
 readonly VITE_API_BASE_URL?: string;
 readonly VITE_KENAIS_BOOKING_URL?: string;
 readonly VITE_HERO_VIDEO?: string;
 readonly VITE_REVIEWS_API_URL?: string;
 readonly VITE_PHONE?: string;
 readonly VITE_EMAIL?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv; }
