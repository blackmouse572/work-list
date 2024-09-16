'use client';

import { Icon, IconName } from '@/app/components/Icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const ThemeMap: Record<string, IconName> = {
    light: 'tabler/sun-filled',
    dark: 'tabler/moon-filled',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Icon name={ThemeMap[theme as any]} size="md" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    </div>
  );
}
