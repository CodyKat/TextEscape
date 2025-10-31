declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_ADSENSE_CLIENT_ID: string
      NEXT_PUBLIC_GA_ID?: string
      NEXT_PUBLIC_GTM_ID?: string
      NEXT_PUBLIC_API_URL?: string
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      OPENAI_API_KEY?: string
    }
  }
}

export {} 