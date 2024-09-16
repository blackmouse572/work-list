'use client';
import { ConfirmDialogProvider } from '@/app/components/ConfirmDialog';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const queryClient = new QueryClient();

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
