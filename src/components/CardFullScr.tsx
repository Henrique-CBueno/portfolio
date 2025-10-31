import { motion, AnimatePresence } from "framer-motion";
import { TechLogo } from "./techLogo";
import { TechIcons } from "../icons/tech";

type TechIconName = keyof typeof TechIcons;

interface CardFullScrProps {
  fullScr: boolean;
  setFullScr: (value: boolean) => void;
  selectedCard: any;
}

export default function CardFullScr({ fullScr, setFullScr, selectedCard }: CardFullScrProps) {
  // Mapeamento de nomes das tecnologias para os logos
  const techIcons: Record<string, TechIconName> = {
    "React.js": "React",
    "FastAPI": "FastAPI",
    "PostgreSQL": "PostgreSQL",
    "Docker": "Docker",
    "Next.js": "Next",
    "Next": "Next",
    "Tailwind CSS": "Tailwind",
    "Figma": "Figma",
    "Node.js": "Node",
    "MongoDB": "MongoDB",
    "Sass": "Sass",
    "TypeScript": "Typescript",
    "Axios": "React", // Axios não tem ícone, usei React como fallback
    "CSS3": "Css3",
    "Prisma": "Prisma",
    "Python": "Python",
    "OpenCV": "OpenCV",
    "TensorFlow": "TensorFlow",
    "LangChain": "Langchain",
    "OpenAI API": "OpenAI",
  };

  return (
    <AnimatePresence>
      {fullScr && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setFullScr(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden
                       bg-gradient-to-br from-[#1a1425] via-[#241e34] to-[#1a1425]
                       border border-white/10 rounded-3xl shadow-2xl shadow-purple-500/20"
          >
            {/* Botão Fechar */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setFullScr(false);
              }}
              className="absolute top-6 right-6 z-50 p-3 
                         bg-[#7D3CFF] hover:bg-[#9867FF]
                         rounded-full transition-all duration-300 backdrop-blur-sm
                         shadow-lg shadow-purple-500/50 cursor-pointer"
            >
              <TechLogo name="close" className="w-6 h-6 text-white" />
            </motion.button>

            {/* Container com scroll customizado */}
            <div className="h-full max-h-[90vh] overflow-y-auto scrollbar-custom">
              {/* Imagem do Projeto */}
              <div className="relative h-72 md:h-96 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1425] via-transparent to-transparent z-10" />
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-8 md:p-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  {selectedCard.name}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg text-gray-300 leading-relaxed mb-8"
                >
                  {selectedCard.smallDescription}
                </motion.p>

                {/* Tecnologias */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Tecnologias Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedCard.techs?.map((tech: any, index: any) => (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }}
                        className="flex items-center gap-3 px-5 py-3 
                                   bg-white/5 hover:bg-white/10 
                                   border border-white/10 hover:border-purple-500/50
                                   rounded-xl transition-all duration-300
                                   backdrop-blur-sm group cursor-pointer
                                   hover:scale-110 hover:-translate-y-1
                                   hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        <TechLogo name={techIcons[tech.name] || "React"} className="w-8 h-8 text-[#BDA8FF] group-hover:text-purple-400 transition-colors duration-300" />
                        <span className="text-[#BDA8FF] font-medium text-base">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Botões de Ação */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 60px rgba(125, 60, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center justify-center gap-3 px-8 py-4 
                               bg-[#7D3CFF] hover:bg-[#9867FF] 
                               text-white font-semibold text-lg rounded-xl
                               shadow-lg shadow-purple-500/30
                               transition-colors duration-300 group cursor-pointer"
                  >
                    <TechLogo name="external-link" className="w-5 h-5" />
                    Ver Demo
                  </motion.button>

                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center justify-center gap-3 px-8 py-4 
                               bg-white/10 hover:bg-white/20 
                               text-white font-semibold text-lg rounded-xl
                               border border-white/20 hover:border-purple-500/50
                               backdrop-blur-sm transition-all duration-300 group cursor-pointer"
                  >
                    <TechLogo name="github" className="w-6 h-6" />
                    Ver no GitHub
                  </motion.button>
                </motion.div>

                {/* Seção Adicional - Detalhes do Projeto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Sobre o Projeto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Tipo</p>
                      <p className="text-white font-medium">Full Stack</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Status</p>
                      <p className="text-green-400 font-medium">✓ Concluído</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Ano</p>
                      <p className="text-white font-medium">2024</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scrollbar custom */}
            <style>{`
              .scrollbar-custom::-webkit-scrollbar { width: 10px; }
              .scrollbar-custom::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius:10px; margin:10px; }
              .scrollbar-custom::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #7D3CFF 0%, #9867FF 100%); border-radius:10px; border:2px solid rgba(255,255,255,0.1);}
              .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #9867FF 0%, #B491FF 100%);}
              .scrollbar-custom { scrollbar-width: thin; scrollbar-color: #7D3CFF rgba(255, 255, 255, 0.05);}
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
