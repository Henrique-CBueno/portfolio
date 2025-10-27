import { motion } from "framer-motion";
import HabilityCarrd from "../../components/HabilityCard";
import { IoLogoJavascript } from "react-icons/io";
import { SiLangchain, SiPostgresql, SiPrisma, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaCss3, FaDocker, FaGit, FaGithub, FaPython, FaReact } from "react-icons/fa";

export default function Hability() {

    const habilitys = [
        { name: "JavaScript", icon: IoLogoJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Tailwind", icon: SiTailwindcss },
        { name: "CSS", icon: FaCss3 },
        { name: "React", icon: FaReact },
        { name: "Python", icon: FaPython },
        { name: "Langchain", icon: SiLangchain },
        { name: "Docker", icon: FaDocker },
        { name: "Git", icon: FaGit },
        { name: "GitHub", icon: FaGithub },
        { name: "Prisma", icon: SiPrisma },
        { name: "Postgress", icon: SiPostgresql },
    ]

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-[80%] mx-auto h-full flex items-center justify-center"
        >
            <div className="h-[90%] w-full bg-white/10 rounded-xl shadow-lg grid grid-cols-4 gap-4">
                {
                    habilitys.map((hability) => (
                        <HabilityCarrd key={hability.name} name={hability.name} icon={hability.icon}/>
                    ))
                }
            </div>
        
        </motion.div>
    )
}