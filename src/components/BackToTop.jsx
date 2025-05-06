import { useEffect, useState } from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={ToTop}
      className="w-16 h-16 bg-orange fixed bottom-6 right-4 rounded-[50%] z-20 lg:bottom-14 lg:right-10 shadow-md hover:opacity-80 transition-opacity duration-300"
    >
      <ArrowUpwardOutlinedIcon className="text-white !w-5 !h-5" />
    </button>
  );
}
