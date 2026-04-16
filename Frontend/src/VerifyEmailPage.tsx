import { useEffect, useMemo, useState } from 'react'
import { verifyEmail } from './api/auth'

type Status = 'verifying' | 'success' | 'error'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<Status>('verifying')
  const [message, setMessage] = useState<string>('Đang xác thực email...')

  const { Email, Token } = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      Email: params.get('email') ?? '',
      Token: params.get('token') ?? '',
    }
  }, [])

  useEffect(() => {
  // 1. Kiểm tra đầu vào
  if (!Email || !Token) {
    setStatus('error');
    setMessage('Thiếu thông tin xác thực.');
    return;
  }

  // Cờ để chống gọi API 2 lần trong React Strict Mode
  let isSubscribed = true;

  const performVerify = async () => {
    try {
      // Gọi API với đúng cấu trúc body { Email, Token }
      await verifyEmail({ Email, Token });

      if (isSubscribed) {
        setStatus('success');
        setMessage('Xác thực email thành công!');
      }
    } catch (err: any) {
      if (isSubscribed) {
        setStatus('error');
        // Backend nên trả về message lỗi cụ thể
        const errorMsg = err.response?.data?.message || 'Xác thực thất bại.';
        setMessage(errorMsg);
      }
    }
  };

  performVerify();

  // Cleanup function
  return () => { isSubscribed = false; };
}, [Email, Token]);

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <main className="auth-root">
      <section className="auth-card">
        <h1>
          {status === 'verifying'
            ? 'Đang xác thực'
            : status === 'success'
              ? 'Thành công'
              : 'Thất bại'}
        </h1>
        <p>{message}</p>
        <button className="primary" onClick={goHome}>
          Về trang đăng nhập
        </button>
      </section>
    </main>
  )
}

