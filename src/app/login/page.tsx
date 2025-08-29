'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import StudentNav from '@/components/student/StudentNav';
import Footer from '@/components/layout/Footer';

// Correct the import path from 'apiHandlar' to 'apiHandlers'
import { apiHandlerNoAuth } from '@/lib/api/apiHandlar';
import { API_URLS } from '@/lib/constants/apiUrls';
import { LoginResponse } from '@/lib/types/auth'; 
import { ROUTES } from '@/lib/constants/routes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiHandlerNoAuth<LoginResponse>({
        url: API_URLS.AUTH.LOGIN,
        method: 'POST',
        data: { email, password },
      });

      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        router.push(ROUTES.student.dashboard.home);
      } else {
        setError('Login successful, but tokens not received. Please try again.');
      }
    } catch (apiError) {
      console.error('Login API error:', apiError);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <StudentNav />
      </Header>
      <main className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email or Phone Number
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;