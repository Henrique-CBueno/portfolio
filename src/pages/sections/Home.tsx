
import ModelViewer from "../../components/ModelViewer";
import TextType from "../../components/TextType";



export default function Home() {
    return (
        <div className="lg:w-[80%] mx-auto h-full grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 justify-center items-center lg:gap-4">
                <div className="w-full h-full flex lg:text-start text-center flex-col justify-center items-center lg:items-start gap-8">
                    <TextType
                        text={"Henrique Bueno"}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        textColors={["#fff"]}
                        className="lg:text-6xl text-5xl text-white text-center font-bold font-name"
                    />
                    <TextType
                        text={"Desenvolvedor de Software"}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        textColors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        className="lg:text-6xl text-5xl text-white font-bold font-name"
                    />
                </div>
                <div className="w-full h-full justify-center items-center z-2 cursor-grab flex">
                    <ModelViewer
                        modelUrl="retro-television\source\model.glb"
                    />
                </div>
            </div>
    )
}