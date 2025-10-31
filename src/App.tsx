import { useState, useEffect, lazy, Suspense } from 'react';
import Loading from './components/Loading';

// Lazy load dos componentes pesados
const Ribbons = lazy(() => import('./components/Ribbons'));
const InitialPage = lazy(() => import('./pages/InitialPagte'));

// Loading component simples

function App() {
  const [cursor, setCursor] = useState(1);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setCursor(1);
    } else {
      setCursor(0);
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid h-screen w-screen lg:overflow-hidden">
        <div className="flex flex-col relative h-full w-full bg-black">
          {cursor === 1 && (
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
          )}

          <div className="absolute w-full h-full">
            <InitialPage cursor={cursor} setCursor={setCursor} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;