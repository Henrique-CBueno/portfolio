import { useState, useEffect } from 'react';
import Ribbons from './components/Ribbons';
import LiquidEther from "./components/LiquidEther";
import InitialPage from "./pages/InitialPagte";
import PixelTrail from './components/PixelTrail";

function App() {
  const [cursor, setCursor] = useState(1);

  useEffect(() => {
    // Detecta se está em desktop (largura mínima 1024px)
    if (window.innerWidth >= 1024) {
      setCursor(1);
    } else {
      setCursor(0);
    }
  }, []);

  return (
    <div className="grid h-screen w-screen lg:overflow-hidden">
      <div className="flex flex-col relative h-full w-full bg-black">
        {cursor === 1 ? (
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <Ribbons
              baseThickness={40}
              colors={['#FFF']}
              speedMultiplier={0.6}
              maxAge={1000}
              enableFade={true}
              enableShaderEffect={false}
            />
          </div>
        ) : cursor === 2 ? (
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={130}
              isViscous={true}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>
        ) : cursor === 3 ? (
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <PixelTrail
              gridSize={50}
              trailSize={0.1}
              maxAge={250}
              interpolate={5}
              color="#fff"
              gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
            />
          </div>
        ) : null}

        <div className="absolute w-full h-full">
          <InitialPage cursor={cursor} setCursor={setCursor} />
        </div>
      </div>
    </div>
  );
}

export default App;
