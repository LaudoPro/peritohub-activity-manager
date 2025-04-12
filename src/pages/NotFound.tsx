
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight mb-2">Página não encontrada</h1>
      <p className="text-muted-foreground mb-6">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <a href="/">Voltar para o Dashboard</a>
      </Button>
    </div>
  );
}
