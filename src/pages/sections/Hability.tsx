import { motion } from "framer-motion";
import HabilityCarrd from "../../components/HabilityCard";
import { IoLogoJavascript } from "react-icons/io";
import { SiLangchain, SiPostgresql, SiPrisma, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaCss3, FaDocker, FaGit, FaGithub, FaPython, FaReact } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from "react";

export default function Hability() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'center',
        skipSnaps: false
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

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
    ];

    // Agrupa as habilidades em pares para mobile
    const groupedHabilitys = [];
    for (let i = 0; i < habilitys.length; i += 4) {
        groupedHabilitys.push(habilitys.slice(i, i + 4));
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-[90%] lg:w-[80%] mx-auto h-full flex items-center justify-center"
        >
            {/* Desktop View - Grid simples COM nomes */}
            <div className="hidden lg:grid h-[90%] w-full bg-white/10 rounded-xl shadow-lg lg:grid-cols-4 gap-4 p-4">
                {habilitys.map((hability) => (
                    <HabilityCarrd 
                        key={hability.name} 
                        name={hability.name} 
                        icon={hability.icon}
                        showName={true}
                    />
                ))}
            </div>

            {/* Mobile View */}
            <div className="lg:hidden w-full flex flex-col items-center justify-center gap-6">
                {/* Header simples */}
                <div className="text-center px-4 space-y-2">
                    <h2 className="text-5xl font-bold text-white">
                        Habilidades
                    </h2>
                    <p className="text-white/60 text-base">
                        Tecnologias do meu stack
                    </p>
                </div>

                {/* Carousel + Dots agrupados */}
                <div className="w-full space-y-4">
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {groupedHabilitys.map((group, groupIndex) => (
                                    <div key={groupIndex} className="flex-[0_0_100%] min-w-0 px-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
                                            <div className="grid grid-cols-2 gap-5">
                                                {group.map((hability) => (
                                                    <HabilityCarrd 
                                                        key={hability.name} 
                                                        name={hability.name} 
                                                        icon={hability.icon}
                                                        showName={false}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={scrollPrev}
                            className="absolute left-[-2.5%] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 active:scale-95 shadow-lg"
                            aria-label="Previous"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-[-2.5%] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 active:scale-95 shadow-lg"
                            aria-label="Next"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots logo abaixo do carousel */}
                    <div className="flex justify-center gap-2 px-4">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    index === selectedIndex 
                                        ? 'w-8 h-2 bg-white' 
                                        : 'w-2 h-2 bg-white/40'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Informação relevante */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center max-w-md mx-auto">
                    <p className="text-white/80 text-sm leading-relaxed">
                        Especializado em criar <span className="text-white font-semibold">aplicações completas</span> do front-end ao back-end
                    </p>
                </div>
            </div>
        </motion.div>
    );
}