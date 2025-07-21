import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 정적 내보내기 설정 (프로덕션에서만 활성화)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
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
