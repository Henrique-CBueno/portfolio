import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="w-[80%] mx-auto h-full grid pt-3"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-15 w-full">
            <div className="rounded-full bg-[url(/public/avatar-teste.jpeg)] w-50 h-50 bg-cover bg-center border-4 border-white shadow-lg mt-4"></div>
            <h1 className=" text-8xl">Sobre Mim</h1>
        </div>
      </div>
      <div className="flex justify-center items-start py-4">
        <div className="w-full h-fit bg-white/10  rounded-xl p-8 mt-8 shadow-lg flex items-center justify-center text-start">
            <p className="text-2xl text-justify"><span> </span>Oi, sou Henrique, desenvolvedor de Software especializado em transformar ideias em softwares completos com interfaces envolventes e intuitivas, usando HTML, CSS, TypeScript, React, Python e Banco de Dados. Tenho um olhar atento para detalhes e gosto de criar aplicações que sejam funcionais, rápidas e visualmente atraentes. Viso muito tambem desenvolver aplicaçoes automatizadas para facilitar muito o dia a dia do usuario. Além de código bem estruturado, valorizo a experiência do usuário e busco soluções criativas para cada projeto. Fora do teclado, você pode me encontrar jogando bola ou assistindo o Corinthians, sempre buscando inspiração para o próximo desafio. Vamos criar algo que faça a diferença?</p>
        </div>
      </div>
    </motion.div>
  );
}
