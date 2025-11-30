import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UIIcons } from "../../icons/ui";  // Seu arquivo de UI icons
import axios from "axios";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSand(values: { name: string; email: string; message: string }) {
    console.log("Enviando dados:", values);
    axios.post("http://localhost:9999/contact", values)
      .then(response => {
        console.log("Resposta do servidor:", response.data);
      })
      .catch(error => {
        console.error("Erro ao enviar dados:", error);
      });
  }

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Informe seu nome"),
      email: Yup.string().email("Email inválido").required("Informe seu email"),
      message: Yup.string().required("Digite sua mensagem"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("📩 Dados enviados:", values);
      handleSand(values);
      setSent(true);
      resetForm();
      setTimeout(() => setSent(false), 3000); // Esconde após 3 segundos
    },
  });

  return (
    <section className="w-full min-h-fit flex flex-col items-center lg:justify-center text-white px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-14 px-2"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Entre em{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF]/90 via-[#FF9FFC]/80 to-[#B19EEF]/90">
            Contato
          </span>
        </h1>
        <p className="text-white/60 max-w-md sm:max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Tem um projeto, ideia ou oportunidade? Me envie uma mensagem e vamos conversar.
        </p>
      </motion.div>

      {/* Formulário */}
      <motion.form
        onSubmit={formik.handleSubmit}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md sm:max-w-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.08]
                   rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-5 sm:gap-6 z-20"
      >
        {/* Nome */}
        <div>
          <label className="block text-sm mb-1 text-white/70">Nome</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Seu nome"
            className="w-full p-3 sm:p-3.5 rounded-lg bg-black/40 border border-white/10 focus:border-[#B19EEF] 
                       focus:ring-2 focus:ring-[#5227FF]/30 outline-none transition-all text-sm sm:text-base"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-white/70">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="seu@email.com"
            className="w-full p-3 sm:p-3.5 rounded-lg bg-black/40 border border-white/10 focus:border-[#B19EEF] 
                       focus:ring-2 focus:ring-[#5227FF]/30 outline-none transition-all text-sm sm:text-base"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm mb-1 text-white/70">Mensagem</label>
          <textarea
            name="message"
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Escreva sua mensagem..."
            className="w-full p-3 sm:p-3.5 rounded-lg bg-black/40 border border-white/10 focus:border-[#B19EEF] 
                       focus:ring-2 focus:ring-[#5227FF]/30 outline-none transition-all resize-none text-sm sm:text-base"
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.message}</p>
          )}
        </div>

        {/* Confirmação de envio */}
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-400 text-sm font-medium text-center"
            >
              ✅ Mensagem enviada com sucesso!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-1">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 
                       bg-gradient-to-r from-[#5227FF]/80 via-[#FF9FFC]/70 to-[#B19EEF]/80 
                       hover:from-[#5227FF]/90 hover:to-[#FF9FFC]/90 rounded-full font-semibold 
                       text-sm sm:text-base shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <UIIcons.Send className="w-5 h-5" />
            Enviar
          </motion.button>

          <motion.a
            href="https://linkedin.com/in/henrique-cbueno"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 
                       bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.12] 
                       rounded-full font-semibold text-sm sm:text-base transition-all"
          >
            <UIIcons.Linkedin className="w-5 h-5 text-blue-400" />
            LinkedIn
          </motion.a>
        </div>
      </motion.form>
    </section>
  );
}
