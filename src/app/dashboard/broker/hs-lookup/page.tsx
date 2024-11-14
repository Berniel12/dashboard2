'use client';

import React from 'react';
import { HSCodeLookup } from '@/components/customs/HSCodeLookup';

export default function HSLookupPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">HS Code Lookup</h2>
      <HSCodeLookup 
        onHSCodeSelect={(code, description) => {
          console.log('Selected HS Code:', code);
          console.log('Selected Description:', description);
        }}
      />
    </div>
  );
} 