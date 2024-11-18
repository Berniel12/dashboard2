"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, Ship, Container, Package } from 'lucide-react';
import Link from 'next/link';
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const router = useRouter();
  const { signIn, isLoaded: clerkLoaded } = useSignIn();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock credentials check
    if (email === 'demo@versa.com' && password === 'demo123') {
      // Set a mock auth cookie
      document.cookie = "auth=mock-token; path=/";
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please use the demo account.');
      setIsLoading(false);
    }
  };

  const signInWith = async (strategy: OAuthStrategy) => {
    try {
      if (!clerkLoaded) return;
      setIsLoading(true);
      setError('');
      
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard"
      });
      
    } catch (err: any) {
      console.error('OAuth error:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const oauthProviders = [
    {
      name: 'Google',
      strategy: 'oauth_google',
      icon: 'https://www.google.com/favicon.ico',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      name: 'GitHub',
      strategy: 'oauth_github',
      icon: 'https://github.com/favicon.ico',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      name: 'Microsoft',
      strategy: 'oauth_microsoft',
      icon: 'https://www.microsoft.com/favicon.ico',
      bgColor: 'bg-[#2F2F2F] hover:bg-[#272727]',
      textColor: 'text-white'
    },
    {
      name: 'Apple',
      strategy: 'oauth_apple',
      icon: 'https://www.apple.com/favicon.ico',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-indigo-200 opacity-20 animate-float">
          <Ship className="w-24 h-24" />
        </div>
        <div className="absolute top-40 right-20 text-indigo-200 opacity-20 animate-float-delayed">
          <Container className="w-32 h-32" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-indigo-200 opacity-20 animate-float">
          <Package className="w-20 h-20" />
        </div>
        {/* Add more background elements as needed */}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Welcome Text */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">V</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Versa</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {oauthProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => signInWith(provider.strategy as OAuthStrategy)}
                className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg transition-colors ${provider.bgColor} ${provider.textColor}`}
              >
                <img src={provider.icon} alt={provider.name} className="w-5 h-5 mr-3" />
                Sign in with {provider.name}
              </button>
            ))}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-indigo-50/50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo Credentials:<br />
              Email: demo@versa.com<br />
              Password: demo123
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-800">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 