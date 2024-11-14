'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HSCodeLookup } from '../components/customs/HSCodeLookup';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">HS Code Lookup</h2>
      <HSCodeLookup 
        onHSCodeSelect={(code, description) => {
          console.log('Selected HS Code:', code);
          console.log('Selected Description:', description);
        }}
      />
    </div>
  );
} 