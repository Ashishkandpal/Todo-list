import { useEffect, useState } from "react";
import { Card } from "./components/Card";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, []);

  function handleDarkMode() {
    setIsDark((prev) => !prev);
  }
  return (
    <div className={`w-screen h-screen relative ${isDark ? 'bg-dark text-white' : 'bg-slate-100 text-dark'} text-center`}>
        <img
          className="w-screen"
          src={isMobile ? isDark ? 'images/bg-mobile-dark.jpg' : 'images/bg-mobile-light.jpg' : isDark ? 'images/bg-desktop-dark.jpg' : 'images/bg-desktop-light.jpg'}
          alt="background"
        />
        <Card isDark={isDark} handleDarkMode={handleDarkMode} isMobile={isMobile}/>
    </div>
  );
}

export default App;
