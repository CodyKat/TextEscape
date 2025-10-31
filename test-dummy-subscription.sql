-- 테스트용 더미 구독 데이터 삽입 SQL
-- Supabase SQL Editor에서 직접 실행하거나, 마이그레이션 파일에 추가하여 사용하세요

-- 방법 1: 첫 번째 사용자를 Premium 구독자로 만들기
INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
SELECT 
  id,
  'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
  'premium',
  'active',
  NOW() + INTERVAL '30 days'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET
  plan_id = EXCLUDED.plan_id,
  status = EXCLUDED.status,
  paypal_subscription_id = EXCLUDED.paypal_subscription_id,
  current_period_end = EXCLUDED.current_period_end;

-- 방법 2: 특정 사용자 이메일로 Premium 구독자 만들기
-- 아래 'your-email@example.com'을 실제 이메일 주소로 변경하세요
/*
INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
SELECT 
  u.id,
  'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
  'premium',
  'active',
  NOW() + INTERVAL '30 days'
FROM auth.users u
WHERE u.email = 'your-email@example.com'
ON CONFLICT (user_id) DO UPDATE SET
  plan_id = EXCLUDED.plan_id,
  status = EXCLUDED.status,
  paypal_subscription_id = EXCLUDED.paypal_subscription_id,
  current_period_end = EXCLUDED.current_period_end;
*/

-- 방법 3: Pro 플랜으로 만들기
/*
INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
SELECT 
  id,
  'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
  'pro',
  'active',
  NOW() + INTERVAL '30 days'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET
  plan_id = EXCLUDED.plan_id,
  status = EXCLUDED.status,
  paypal_subscription_id = EXCLUDED.paypal_subscription_id,
  current_period_end = EXCLUDED.current_period_end;
*/

-- 방법 4: 취소된 구독 테스트하기 (status를 'canceled'로)
/*
INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
SELECT 
  id,
  'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
  'premium',
  'canceled',
  NOW() + INTERVAL '30 days'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET
  plan_id = EXCLUDED.plan_id,
  status = EXCLUDED.status,
  paypal_subscription_id = EXCLUDED.paypal_subscription_id,
  current_period_end = EXCLUDED.current_period_end;
*/

-- 확인 쿼리: 생성된 구독 데이터 확인
SELECT 
  s.id,
  s.plan_id,
  s.status,
  s.paypal_subscription_id,
  s.current_period_end,
  s.created_at as subscription_created_at,
  u.email,
  u.created_at as user_created_at
FROM subscriptions s
JOIN auth.users u ON s.user_id = u.id
ORDER BY s.created_at DESC;

