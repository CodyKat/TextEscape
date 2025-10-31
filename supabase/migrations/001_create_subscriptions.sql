-- 구독 테이블 생성
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  paypal_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium', 'pro'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'canceled', 'past_due', 'pending'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_paypal_subscription_id_idx ON subscriptions(paypal_subscription_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 사용자는 자신의 구독 정보만 조회/수정 가능
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS 정책: 서버 사이드에서만 삽입/업데이트 가능 (API 키 사용)
-- 참고: 서버 사이드 API는 service_role 키를 사용하므로 이 정책은 필요 없을 수 있음
-- 웹훅은 일반적으로 서버에서 직접 실행되므로 RLS를 우회할 수 있도록 설정

-- 기존 사용자에 대한 무료 플랜 자동 생성 (선택사항)
-- INSERT INTO subscriptions (user_id, plan_id, status)
-- SELECT id, 'free', 'active'
-- FROM auth.users
-- WHERE id NOT IN (SELECT user_id FROM subscriptions)
-- ON CONFLICT DO NOTHING;

-- 테스트용 더미 구독 데이터 삽입
-- 사용법: 아래 쿼리의 주석을 해제하고 실행하세요
-- 방법 1: 첫 번째 사용자를 Premium 구독자로 만들기
-- INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
-- SELECT 
--   id,
--   'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
--   'premium',
--   'active',
--   NOW() + INTERVAL '30 days'
-- FROM auth.users
-- WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
-- LIMIT 1
-- ON CONFLICT (user_id) DO UPDATE SET
--   plan_id = EXCLUDED.plan_id,
--   status = EXCLUDED.status,
--   paypal_subscription_id = EXCLUDED.paypal_subscription_id,
--   current_period_end = EXCLUDED.current_period_end;

-- 방법 2: 특정 사용자 이메일로 Premium 구독자 만들기 (아래 이메일을 변경하세요)
-- INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
-- SELECT 
--   u.id,
--   'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
--   'premium',
--   'active',
--   NOW() + INTERVAL '30 days'
-- FROM auth.users u
-- WHERE u.email = 'your-email@example.com'  -- 여기를 실제 이메일로 변경
-- ON CONFLICT (user_id) DO UPDATE SET
--   plan_id = EXCLUDED.plan_id,
--   status = EXCLUDED.status,
--   paypal_subscription_id = EXCLUDED.paypal_subscription_id,
--   current_period_end = EXCLUDED.current_period_end;

-- 방법 3: Pro 플랜으로 만들기
-- INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
-- SELECT 
--   id,
--   'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
--   'pro',
--   'active',
--   NOW() + INTERVAL '30 days'
-- FROM auth.users
-- WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
-- LIMIT 1
-- ON CONFLICT (user_id) DO UPDATE SET
--   plan_id = EXCLUDED.plan_id,
--   status = EXCLUDED.status,
--   paypal_subscription_id = EXCLUDED.paypal_subscription_id,
--   current_period_end = EXCLUDED.current_period_end;

-- 확인 쿼리: 생성된 구독 데이터 확인
-- SELECT 
--   s.id,
--   s.plan_id,
--   s.status,
--   s.paypal_subscription_id,
--   s.current_period_end,
--   u.email,
--   u.created_at as user_created_at
-- FROM subscriptions s
-- JOIN auth.users u ON s.user_id = u.id;