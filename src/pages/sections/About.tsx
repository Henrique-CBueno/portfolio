import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
    className="w-[90%] lg:w-[80%] mx-auto min-h-full grid pt-3 pb-8"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    <div className="flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center lg:gap-8 xl:gap-15 text-center w-full">
        <div className="rounded-full bg-[url(/public/avatar-teste.png)] w-50 h-50 bg-cover bg-center border-4 border-white shadow-lg flex-shrink-0"></div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl mt-4 lg:mt-0">Sobre Mim</h1>
      </div>
    </div>
    <div className="flex justify-center items-start py-4">
      <div className="w-full h-fit bg-white/10 rounded-xl p-3 sm:p-6 lg:p-8 mt-3 lg:mt-8 shadow-lg flex items-center justify-center">
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-start lg:text-justify leading-relaxed">
          Olá, sou Henrique Bueno, Desenvolvedor Fullstack especializado em criar soluções robustas e escaláveis com Java (Spring Boot) e React.<br/>

          Tenho experiência na construção de aplicações de alta disponibilidade, desde portais governamentais críticos até plataformas SaaS baseadas em microsserviços e IA. Meu foco é unir a segurança e a performance do backend com interfaces envolventes e intuitivas no frontend.<br/>

          Valorizo código limpo e arquitetura sólida (SOLID, Clean Code), mas sem perder de vista a experiência do usuário e a automação de processos para facilitar o dia a dia. Estou sempre em busca de desafios que exijam criatividade técnica e entrega de valor real.
        </p>
      </div>
    </div>
  </motion.div>
  );
}
