import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GoogleAdSense } from "@/components/google-ads";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 언어 감지 함수
async function detectLanguageFromHeaders(): Promise<'ko' | 'ja' | 'en'> {
  try {
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language') || ''
    
    // accept-language 파싱 (예: "ko-KR,ko;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang: string) => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (lang.startsWith('ko')) return 'ko'
      if (lang.startsWith('ja')) return 'ja'
      if (lang.startsWith('en')) return 'en'
    }
  } catch (error) {
    // 서버 사이드에서 headers() 사용 시 에러 처리
  }
  
  return 'en' // 기본값
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLanguageFromHeaders()
  
  const titles = {
    ko: "TEXT-ESCAPE - 텍스트 방탈출 게임",
    ja: "TEXT-ESCAPE - テキスト脱出ゲーム",
    en: "TEXT-ESCAPE - Text Escape Room Game"
  }
  
  const descriptions = {
    ko: "텍스트 기반 방탈출 게임을 즐겨보세요! 다양한 퍼즐과 선택지로 구성된 몰입감 있는 어드벤처 게임입니다.",
    ja: "テキストベースの脱出ゲームをお楽しみください！様々なパズルと選択肢で構成された没入感のあるアドベンチャーゲームです。",
    en: "Experience thrilling text-based escape room adventures! Solve puzzles and make choices in this immersive game."
  }
  
  const keywords = {
    ko: "방탈출,텍스트게임,퍼즐,어드벤처,한국어게임,온라인게임,AI",
    ja: "脱出ゲーム,テキストゲーム,パズル,アドベンチャー,日本語ゲーム,オンラインゲーム,AI",
    en: "escape room,text game,puzzle,adventure,online game,free game,AI"
  }
  
  const locales = {
    ko: "ko_KR",
    ja: "ja_JP", 
    en: "en_US"
  }
  
  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: "website",
      locale: locales[lang],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await detectLanguageFromHeaders()
  
  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <GoogleAdSense />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

