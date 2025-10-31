-- 더미 구독 데이터 삽입 (테스트용)
-- 실제 auth.users 테이블의 첫 번째 사용자를 구독자로 만듭니다

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
ON CONFLICT (user_id) DO NOTHING;

-- 방법 2: 특정 사용자 이메일로 Premium 구독자 만들기 (이메일을 원하는 값으로 변경)
-- INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
-- SELECT 
--   u.id,
--   'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
--   'premium',
--   'active',
--   NOW() + INTERVAL '30 days'
-- FROM auth.users u
-- WHERE u.email = 'your-email@example.com'
-- ON CONFLICT (user_id) DO UPDATE SET
--   plan_id = EXCLUDED.plan_id,
--   status = EXCLUDED.status,
--   paypal_subscription_id = EXCLUDED.paypal_subscription_id,
--   current_period_end = EXCLUDED.current_period_end;

-- 방법 3: 여러 명의 사용자를 다른 플랜으로 만들기
-- INSERT INTO subscriptions (user_id, paypal_subscription_id, plan_id, status, current_period_end)
-- SELECT 
--   id,
--   'DUMMY-PAYPAL-SUB-' || gen_random_uuid()::text,
--   CASE 
--     WHEN row_number() OVER (ORDER BY created_at) = 1 THEN 'premium'
--     WHEN row_number() OVER (ORDER BY created_at) = 2 THEN 'pro'
--     ELSE 'free'
--   END,
--   'active',
--   NOW() + INTERVAL '30 days'
-- FROM auth.users
-- WHERE id NOT IN (SELECT user_id FROM subscriptions WHERE user_id IS NOT NULL)
-- LIMIT 2
-- ON CONFLICT (user_id) DO NOTHING;

-- 확인 쿼리: 생성된 구독 데이터 확인
-- SELECT 
--   s.*,
--   u.email,
--   u.created_at as user_created_at
-- FROM subscriptions s
-- JOIN auth.users u ON s.user_id = u.id;

