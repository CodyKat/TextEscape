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
  
  // 빌드 최적화
  swcMinify: true,
  
  // 환경 변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 압축 설정
  compress: true,
  
  // 정적 최적화
  poweredByHeader: false,
  
  // 정적 내보내기 최적화
  distDir: 'out',
};

export default withBundleAnalyzer(nextConfig);
