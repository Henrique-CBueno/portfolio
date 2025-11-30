import { motion } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useState, useMemo } from "react";
import useEmblaCarousel from 'embla-carousel-react';

// Lazy load apenas do componente de card
const HabilityCard = lazy(() => import("../../components/HabilityCard"));
import Loading from "../../components/Loading";

// Import icons
import { TechIcons } from "../../icons/tech";
import { TechLogo } from "../../components/techLogo";

const HABILITIES = [
    { name: "JavaScript", icon: "Javascript" },
    { name: "TypeScript", icon: "Typescript" },
    { name: "Tailwind", icon: "Tailwind" },
    { name: "OpenAi", icon: "OpenAI" },
    { name: "React", icon: "React" },
    { name: "Python", icon: "Python" },
    { name: "Langchain", icon: "Langchain" },
    { name: "Docker", icon: "Docker" },
    { name: "Git", icon: "Git" },
    { name: "FastAPI", icon: "FastAPI" },
    { name: "Agno", icon: "Agno" },
    { name: "Postgress", icon: "PostgreSQL" },
];

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2.5} 
      d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
    />
  </svg>
);

export default function Hability() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'center',
        skipSnaps: false
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        emblaApi?.scrollTo(index);
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
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const groupedHabilitys = useMemo(() => {
        const groups = [];
        for (let i = 0; i < HABILITIES.length; i += 4) {
            groups.push(HABILITIES.slice(i, i + 4));
        }
        return groups;
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-[90%] lg:w-[80%] mx-auto h-full flex items-center justify-center"
        >
            {/* Desktop View */}
            <div className="hidden lg:grid h-[90%] w-full bg-white/10 rounded-xl shadow-lg lg:grid-cols-4 gap-4 p-4">
                <Suspense fallback={<Loading />}>
                    {HABILITIES.map((hability) => (
                        <HabilityCard 
                            key={hability.name} 
                            name={hability.name} 
                            icon={() => <TechLogo name={hability.icon as keyof typeof TechIcons} size={50} />}
                            showName={true}
                        />
                    ))}
                </Suspense>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden w-full flex flex-col items-center justify-center gap-6">
                <div className="text-center px-4 space-y-2">
                    <h2 className="text-5xl font-bold text-white">Habilidades</h2>
                    <p className="text-white/60 text-base">Tecnologias do meu stack</p>
                </div>

                <div className="w-full space-y-4">
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {groupedHabilitys.map((group, groupIndex) => (
                                    <div key={groupIndex} className="flex-[0_0_100%] min-w-0 px-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
                                            <div className="grid grid-cols-2 gap-5">
                                                <Suspense fallback={<Loading />}>
                                                    {group.map((hability) => (
                                                        <HabilityCard 
                                                            key={hability.name} 
                                                            name={hability.name} 
                                                            icon={() => <TechLogo name={hability.icon as keyof typeof TechIcons} size={40} />}
                                                            showName={false}
                                                        />
                                                    ))}
                                                </Suspense>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={scrollPrev}
                            className="absolute left-[-2.5%] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 active:scale-95 shadow-lg"
                            aria-label="Previous"
                        >
                            <ArrowIcon direction="left" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-[-2.5%] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 active:scale-95 shadow-lg"
                            aria-label="Next"
                        >
                            <ArrowIcon direction="right" />
                        </button>
                    </div>

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

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center max-w-md mx-auto">
                    <p className="text-white/80 text-sm leading-relaxed">
                        Especializado em criar <span className="text-white font-semibold">aplicações completas</span> do front-end ao back-end
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
