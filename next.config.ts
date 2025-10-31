import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // output: export는 API 라우트와 호환되지 않으므로 제거
  // API 라우트를 사용하는 경우 서버리스 배포(Vercel 등) 필요
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // 이미지 최적화 설정 (정적 내보내기를 위해 항상 unoptimized)
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [],
  },
  
  // 트레일링 슬래시 제거
  trailingSlash: false,
  
  // 정적 내보내기 시 동적 라우트 처리
  experimental: {
    // 정적 내보내기 시 클라이언트 사이드 네비게이션 최적화
    optimizePackageImports: ['zustand'],
  },
  
  // Next.js 15에서는 swcMinify가 기본값이며 더 이상 설정 불필요
  
  // 환경 변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 압축 설정
  compress: true,
  
  // 정적 최적화
  poweredByHeader: false,
  
  // distDir은 output: export 사용 시에만 필요
  // API 라우트를 사용하므로 기본값(.next) 사용
};

export default withBundleAnalyzer(nextConfig);
