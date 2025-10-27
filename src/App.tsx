import LiquidEther from "./components/LiquidEther"
import InitialPage from "./pages/InitialPagte"

function App() {

  return (
    <div className="grid lg:overflow-hidden">
      <div className="flex flex-col relative h-screen w-full bg-black">
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
            <div className="absolute w-full h-full">
              <InitialPage />
            </div>
          
      </div>
    </div>
  )
}

export default App
