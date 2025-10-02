import GlassSurface from "./components/GlassSurface"
import LiquidEther from "./components/LiquidEther"
import ModelViewer from "./components/ModelViewer"
import TextType from "./components/TextType"

function App() {

  return (
    <div className="grid">
        <div className="flex flex-col justify-center relative items-center h-screen w-full bg-black">
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={150}
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
            <div className="absolute z-10 pointer-events-none grid justify-center items-center">
                <div className="col-span-2 w-full ">
                <GlassSurface 
                  borderRadius={50}
                  width="100%"
                  className="w-full"
                />
              </div>
              <div className="flex h-full w-full items-center justify-center ">
                <TextType
                  text={"Henrique Bueno"}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  textColors={["#fff"]}
                  className="text-6xl text-white font-bold font-name"
                />
                <div className="">
                <ModelViewer
                  url="public\retro-television\source\model.glb"
                  width={850}
                  height={850}
                  defaultZoom={4}
                  minZoomDistance={2}
                  enableHoverRotation={true}
                  fadeIn={true}
                  showScreenshotButton={false}
                  autoRotate={true}
                />
                </div>
              </div>
            </div>
        </div>
        <div className="h-screen w-full bg-red-800">
          <h1>pag 2</h1>
        </div>
      
    </div>
  )
}

export default App
