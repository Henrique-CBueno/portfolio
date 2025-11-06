
// import ModelViewer from "../../components/ModelViewer";
import TextType from "../../components/TextType";
import { motion } from "framer-motion";
import avatar from "/public/avatar-2-semBG.png";



export default function Home() {
    return (
        <div className="lg:w-[80%] mx-auto h-full grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 justify-center items-center lg:gap-4">
                <div className="w-full h-full flex lg:text-start text-center flex-col overflow-y-hidden justify-center items-center lg:items-start gap-8">
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
                {/* {
                    (window.innerWidth >= 1024) ? (
                        <div className="w-full h-full justify-center items-center z-2 cursor-grab flex">
                            <ModelViewer
                                modelUrl="retro-television\source\model.glb"
                            />
                        </div>
                    ) : ( */}
                        <motion.div
                        className="w-full h-full justify-center items-center z-2 cursor-grab flex overflow-visible"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 12,
                            duration: 1.2,
                        }}
                        >
                        <motion.img
                            src={avatar}
                            alt="Avatar"
                            className="scale-150 select-none"
                            loading="lazy"
                            animate={{
                            y: [0, -8, 0], // flutuação leve
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror", // 🔥 movimento contínuo sem pulo
                                ease: "easeInOut",
                            }}
                            whileHover={{
                            scale: 1.05,
                            rotate: 1,
                            transition: { type: "spring", stiffness: 100, damping: 10 },
                            }}
                            drag
                            dragElastic={0.1}
                            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        />
                        </motion.div>
                    {/* )
                        
                } */}
            </div>
    )
}