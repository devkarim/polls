import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const useColorMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return { theme: undefined, setTheme: () => {} };

  return { theme, setTheme };
};

export default useColorMode;
