import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 정적 내보내기 설정
  output: 'export',
  
  // 이미지 최적화 비활성화 (정적 내보내기에서는 지원하지 않음)
  images: {
    unoptimized: true,
  },
  
  // 트레일링 슬래시 제거
  trailingSlash: false,
  
  // 정적 내보내기 시 동적 라우트 처리
  experimental: {
    // 정적 내보내기 시 클라이언트 사이드 네비게이션 최적화
    optimizePackageImports: ['zustand'],
  },
  
  // 빌드 최적화 (swcMinify는 Next.js 15에서 기본값)
  
  // 환경 변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 압축 설정
  compress: true,
  
  // 정적 최적화
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
