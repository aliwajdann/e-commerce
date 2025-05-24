'use client'; // if you're in the app folder
import { useEffect, useState } from 'react';

function DarkModeBtn() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
    const root = document.documentElement;
    isDark ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDark]);

  return (
       <button
      onClick={() => setIsDark(!isDark)}
      className="px-4 py-2 rounded-xl bg-primary text-white mt-4"
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
  )
}

export default DarkModeBtn
