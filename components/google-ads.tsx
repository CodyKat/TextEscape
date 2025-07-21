'use client'

import Script from 'next/script'

export function GoogleAdSense() {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}

export function AdSenseAd({ 
  adSlot, 
  adFormat = "auto",
  fullWidthResponsive = true 
}: {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
}) {
  // 개발 환경이나 AdSense가 설정되지 않은 경우 광고를 숨김
  if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return (
      <div className="my-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
        <p className="text-gray-400 text-sm">
          📢 광고 영역 (개발 모드)
        </p>
        <p className="text-gray-500 text-xs mt-1">
          AdSense 설정 후 실제 광고가 표시됩니다
        </p>
      </div>
    )
  }

  return (
    <div className="my-4 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
      <Script id={`adsense-${adSlot}`}>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}

// 광고 위치별 컴포넌트들
export function TopBannerAd() {
  return (
    <div className="w-full bg-gray-100 p-2 text-center">
      <GoogleAdSense />
      <AdSenseAd 
        adSlot="1234567890" // 실제 광고 슬롯 ID로 교체 필요
        adFormat="banner"
        fullWidthResponsive={true}
      />
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="w-full bg-gray-100 p-2 text-center">
      <GoogleAdSense />
      <AdSenseAd 
        adSlot="0987654321" // 실제 광고 슬롯 ID로 교체 필요
        adFormat="rectangle"
        fullWidthResponsive={true}
      />
    </div>
  )
}

export function BottomBannerAd() {
  return (
    <div className="w-full bg-gray-100 p-2 text-center">
      <GoogleAdSense />
      <AdSenseAd 
        adSlot="1122334455" // 실제 광고 슬롯 ID로 교체 필요
        adFormat="banner"
        fullWidthResponsive={true}
      />
    </div>
  )
} 