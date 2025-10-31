# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. 프로젝트 대시보드로 이동

## 2. API 키 확인

1. 대시보드에서 **Settings** > **API**로 이동
2. 다음 정보를 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** 키: 긴 문자열

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. OAuth 설정 (Google/Apple)

### Google 로그인

1. Supabase 대시보드에서 **Authentication** > **Providers**로 이동
2. **Google** 활성화
3. Google Cloud Console에서 OAuth 클라이언트 생성:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - **APIs & Services** > **Credentials** > **Create Credentials** > **OAuth client ID**
   - Authorized redirect URIs 추가:
     - `https://xxxxx.supabase.co/auth/v1/callback`
4. Client ID와 Client Secret을 Supabase에 입력

### Apple 로그인

1. Supabase 대시보드에서 **Authentication** > **Providers**로 이동
2. **Apple** 활성화
3. Apple Developer Console에서 설정 필요 (복잡한 설정)

## 5. 리다이렉트 URL 설정

Supabase 대시보드에서 **Authentication** > **URL Configuration**:
- Site URL: `http://localhost:3000` (개발) / `https://yourdomain.com` (프로덕션)
- Redirect URLs에 추가:
  - `http://localhost:3000/auth/callback`
  - `https://yourdomain.com/auth/callback`

## 6. 확인 사항

환경 변수가 제대로 설정되었는지 확인:

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 변수명이 정확한지 확인 (`NEXT_PUBLIC_` 접두사 필수)
3. 개발 서버 재시작 (`npm run dev`)

## 문제 해결

### "Your project's URL and API key are required" 에러

- `.env.local` 파일이 존재하는지 확인
- 변수명이 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`인지 확인
- 개발 서버를 재시작했는지 확인
- `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인 (보안)

