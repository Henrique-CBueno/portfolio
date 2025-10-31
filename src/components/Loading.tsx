import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black p-4">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        {/* Spinner animado */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          {/* Círculo externo */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Círculo do meio */}
          <motion.div
            className="absolute inset-1 sm:inset-2 border-4 border-transparent border-t-purple-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Círculo interno */}
          <motion.div
            className="absolute inset-2 sm:inset-4 border-4 border-transparent border-t-pink-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Texto com animação */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center"
        >
          Carregando
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        {/* Barra de progresso opcional */}
        <div className="w-48 sm:w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-white rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
