# PayPal 결제 시스템 설정 가이드

## 1. PayPal 계정 생성 및 설정

1. [PayPal Developer](https://developer.paypal.com)에서 계정 생성
2. **My Apps & Credentials** 이동
3. **Sandbox** 또는 **Live** 환경 선택

## 2. PayPal 앱 생성 및 API 키 확인

### Sandbox 환경 (테스트)

1. **Sandbox** 탭으로 이동
2. **Create App** 클릭
3. App 정보 입력:
   - App Name: `TextEscape`
   - Merchant: 선택 (Sandbox Business Account)
4. **Create App** 클릭
5. 생성된 앱에서 다음 정보 확인:
   - **Client ID**
   - **Secret** (Show 버튼 클릭)

### Live 환경 (프로덕션)

1. **Live** 탭으로 이동
2. 동일한 방식으로 앱 생성
3. Client ID와 Secret 확인

## 3. PayPal Product 생성

PayPal Product는 구독 플랜을 생성하기 전에 먼저 생성해야 합니다.

### 방법 1: PayPal Developer 대시보드 (권장)

1. [PayPal Developer](https://developer.paypal.com) 로그인
2. 왼쪽 메뉴에서 **Products & Plans** 또는 **Billing** 선택
3. **Products** 탭 클릭
4. **Create Product** 버튼 클릭
5. Product 정보 입력:
   - **Name**: `TextEscape Subscription`
   - **Type**: `Service` (구독 서비스의 경우)
   - **Description**: `TextEscape 멤버십 구독`
   - **Category**: `SOFTWARE` (또는 적절한 카테고리)
6. **Save Product** 클릭
7. 생성된 Product의 **Product ID** 복사 (형식: `PROD-XXXXXXXXXXXXXX`)

### 방법 2: PayPal REST API로 생성

Product ID를 API로 생성하려면 다음 API를 호출하세요:

```bash
# OAuth 토큰 먼저 받기
curl -X POST https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "CLIENT_ID:SECRET" \
  -d "grant_type=client_credentials"

# Product 생성
curl -X POST https://api-m.sandbox.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "PayPal-Request-Id: product-$(date +%s)" \
  -d '{
    "name": "TextEscape Subscription",
    "description": "TextEscape 멤버십 구독",
    "type": "SERVICE",
    "category": "SOFTWARE"
  }'
```

응답에서 `id` 필드가 Product ID입니다 (예: `PROD-XXXXXXXXXXXXXX`).

### 방법 3: 코드에서 자동 생성 (선택사항)

Product ID가 없으면 코드에서 자동으로 생성할 수 있습니다. 이 경우 `PAYPAL_PRODUCT_ID` 환경 변수는 선택사항입니다.

## 4. 환경 변수 설정

프로젝트 루트의 `.env.local` 파일에 다음을 추가:

```env
# PayPal API 키 (Sandbox)
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_ENVIRONMENT=sandbox

# PayPal Product ID
PAYPAL_PRODUCT_ID=PROD-XXXXX

# PayPal Webhook (선택사항 - 웹훅 설정 후)
PAYPAL_WEBHOOK_ID=your_webhook_id
PAYPAL_WEBHOOK_SECRET=your_webhook_secret
```

### 프로덕션 환경 변수

프로덕션 배포 시:
```env
PAYPAL_ENVIRONMENT=live
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
```

## 5. PayPal Webhook 설정 (선택사항)

웹훅을 통해 구독 상태 변경을 자동으로 처리할 수 있습니다.

### 로컬 개발 환경

1. [ngrok](https://ngrok.com) 또는 유사한 툴로 로컬 서버를 외부에 노출:
   ```bash
   ngrok http 3000
   ```
2. 생성된 URL (예: `https://xxxxx.ngrok.io`) 복사

### Webhook 엔드포인트 설정

1. PayPal Developer 대시보드에서 **Webhooks** 이동
2. **Add Webhook** 클릭
3. **Webhook URL** 입력:
   ```
   https://yourdomain.com/api/webhooks
   ```
   또는 로컬 개발 시 ngrok URL:
   ```
   https://xxxxx.ngrok.io/api/webhooks
   ```
4. **Event types** 선택:
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.CREATED`
   - `BILLING.SUBSCRIPTION.UPDATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
   - `PAYMENT.SALE.COMPLETED`
5. **Save** 클릭
6. 생성된 **Webhook ID** 복사

## 6. Supabase 데이터베이스 설정

1. Supabase 대시보드에서 **SQL Editor** 이동
2. `supabase/migrations/001_create_subscriptions.sql` 파일의 내용을 실행
3. 또는 Supabase CLI 사용:
   ```bash
   supabase db push
   ```

**중요**: 기존에 Stripe를 사용했다면 다음 SQL로 마이그레이션:

```sql
-- 기존 컬럼 삭제 (데이터 백업 후 실행)
ALTER TABLE subscriptions DROP COLUMN IF EXISTS stripe_customer_id;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS stripe_subscription_id;

-- PayPal 컬럼 추가
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS paypal_subscription_id TEXT UNIQUE;

-- 인덱스 업데이트
DROP INDEX IF EXISTS subscriptions_stripe_customer_id_idx;
DROP INDEX IF EXISTS subscriptions_stripe_subscription_id_idx;
CREATE INDEX IF NOT EXISTS subscriptions_paypal_subscription_id_idx ON subscriptions(paypal_subscription_id);
```

## 7. 테스트 결제

### Sandbox 테스트 계정

1. PayPal Developer 대시보드에서 **Sandbox** > **Accounts** 이동
2. **Create account** 클릭하여 테스트 구매자 계정 생성
3. 또는 기본 제공되는 테스트 계정 사용:
   - Email: `buyer@personal.example.com` (테스트)
   - Password: 제공된 비밀번호

### 테스트 시나리오

1. 로그인 후 pricing 페이지 접속
2. 프리미엄 또는 프로 플랜 선택
3. PayPal 로그인 페이지에서 Sandbox 계정으로 로그인
4. 결제 승인 후 구독 상태 확인

### Sandbox 테스트 계정 정보

PayPal Sandbox에서는 실제 결제 없이 테스트할 수 있습니다:
- 모든 테스트 카드는 자동으로 승인됩니다
- 실제 돈이 차감되지 않습니다
- Sandbox 계정 간 송금은 즉시 처리됩니다

## 8. 프로덕션 배포 전 체크리스트

- [ ] PayPal Live 환경 API 키로 변경
- [ ] `PAYPAL_ENVIRONMENT=live` 설정
- [ ] 프로덕션 Product ID 설정
- [ ] 프로덕션 웹훅 엔드포인트 설정
- [ ] `NEXT_PUBLIC_BASE_URL` 프로덕션 URL로 변경
- [ ] RLS 정책 테스트
- [ ] 결제 플로우 전체 테스트
- [ ] 구독 취소 기능 테스트

## 9. 구독 관리

### 구독 취소

PayPal 대시보드에서 직접 구독을 취소하거나, API를 통해 취소할 수 있습니다:

```typescript
// 구독 취소 API (선택사항)
POST /api/subscription/cancel
```

## 문제 해결

### 결제 승인 URL 생성 실패
- PayPal API 키 확인
- Product ID 확인
- 환경 변수 로드 확인 (서버 재시작 필요)

### 구독 정보가 저장되지 않음
- Supabase 테이블 생성 확인
- RLS 정책 확인
- 웹훅 이벤트 수신 확인 (PayPal 대시보드의 웹훅 로그 확인)

### 웹훅 서명 검증 실패
- Webhook ID와 Secret 확인
- 로컬 개발 시: ngrok URL이 올바른지 확인
- 프로덕션: 웹훅 엔드포인트 URL 확인

## 참고 자료

- [PayPal Developer 문서](https://developer.paypal.com/docs/)
- [PayPal Subscriptions API](https://developer.paypal.com/docs/subscriptions/)
- [PayPal Webhooks](https://developer.paypal.com/docs/api-basics/notifications/webhooks/)
