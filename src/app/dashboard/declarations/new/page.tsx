'use client';

import React from 'react';
import { DeclarationForm } from "@/components/customs/DeclarationForm";

export default function NewDeclarationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">New Declaration</h1>
      <DeclarationForm />
    </div>
  );
} 