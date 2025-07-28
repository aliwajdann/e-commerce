// lib/navigateWithSpinner.ts
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useNavigateWithSpinner() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navigate = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return { navigate, loading };
}
