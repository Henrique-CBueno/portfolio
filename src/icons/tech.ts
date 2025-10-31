// src/components/icons/tech.ts (ou onde estiver seu arquivo)

import {
    siJavascript,
    siTypescript,
    siTailwindcss,
    siPrisma,
    siPostgresql,
    siLangchain,
    siCss,
    siDocker,
    siGit,
    siGithub,
    siPython,
    siReact,
    siFastapi,
    siNextdotjs,
    siFigma,
    siNodedotjs,
    siMongodb,
    siSass,
    siOpencv,
    siTensorflow,
    siOpenai,
  } from "simple-icons"; // <-- CORREÇÃO APLICADA AQUI
  
  import { X, ExternalLink, Github } from "lucide-react";
  
  export const TechIcons = {
    // Ícones de Simple Icons
    Javascript: siJavascript,
    Typescript: siTypescript,
    Tailwind: siTailwindcss,
    Prisma: siPrisma,
    PostgreSQL: siPostgresql,
    Langchain: siLangchain,
    Css3: siCss,
    Docker: siDocker,
    Git: siGit,
    Github: siGithub,
    Python: siPython,
    React: siReact,
    FastAPI: siFastapi,
    Next: siNextdotjs,
    Figma: siFigma,
    Node: siNodedotjs,
    MongoDB: siMongodb,
    Sass: siSass,
    OpenCV: siOpencv,
    TensorFlow: siTensorflow,
    OpenAI: siOpenai,
  
    // Ícones do Lucide
    close: X,
    'external-link': ExternalLink,
    github: Github, 
  };