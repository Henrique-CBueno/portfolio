
import ModelViewer from "../../components/ModelViewer";
import TextType from "../../components/TextType";



export default function Home() {
    return (
        <div className="w-[80%] mx-auto h-full grid grid-cols-2 justify-center items-center gap-4">
                <div className="w-full h-full flex text-start flex-col justify-center items-start gap-8">
                    <TextType
                        text={"Henrique Bueno"}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        textColors={["#fff"]}
                        className="text-6xl text-white font-bold font-name"
                    />
                    <TextType
                        text={"Desenvolvedor de Software"}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        textColors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        className="text-6xl text-white font-bold font-name"
                    />
                </div>
                <div className="w-full h-full flex justify-center items-center z-2 cursor-grab">
                    <ModelViewer
                        modelUrl="retro-television\source\model.glb"
                    />
                </div>
            </div>
    )
}