import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CardFullScr from "../../components/CardFullScr.tsx";
import axios from "axios";
import Loading from "../../components/Loading";

// Componente de Card isolado
const ProjectCard = ({ item, onClick }: any) => (
    <article
        onClick={onClick}
        className="flex flex-col justify-between rounded-2xl overflow-hidden 
                    bg-[rgba(36,30,52,0.43)] border border-white/10 backdrop-blur-lg
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30
                    w-full h-[480px] relative cursor-pointer"
    >
        <div className="p-6">
            <img
                src={item.image}
                alt={`Preview do projeto ${item.name}`}
                className="w-full h-44 object-cover rounded-3xl"
                loading="lazy"
            />
        </div>

        <div className="flex flex-col flex-grow px-6 pb-6">
            <h3 className="text-2xl font-semibold mb-2 text-white truncate" title={item.name}>
                {item.name}
            </h3>

            <p
                className="text-gray-300 leading-relaxed mb-4 flex-grow overflow-hidden text-ellipsis"
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                }}
            >
                {item.smallDescription}
            </p>

            <div className="flex gap-3 mb-6 overflow-hidden whitespace-nowrap">
                {item.techs.map((tech: any) => (
                    <span
                        key={tech.id}
                        className="text-[#BDA8FF] font-medium text-sm bg-white/10 px-3 py-1 rounded-md shrink-0"
                    >
                        {tech.name}
                    </span>
                ))}
            </div>

            <button
                className="w-full py-3 px-5 rounded-lg bg-[#7D3CFF] text-white font-semibold
                            transition-all duration-300 ease-in-out
                            hover:bg-[#9867FF] hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
            >
                Ver Mais
            </button>
        </div>
    </article>
);

export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
        try {
            setLoading(true);
            const { data } = await axios.get("meudominio");
            console.log("Projetos carregados:", data);
            if (Array.isArray(data.Projects)) {
            setProjects(data.Projects);
            } else {
            setProjects([]);
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
            console.error("Falha ao carregar projetos:", error);
            setProjects([]);
            }
        } finally {
            setLoading(false);
        }
        }

        fetchProjects();
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: false, 
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": {
                slidesToScroll: 3,
            }
        }
        
    });

    const [fullscr, setFullScr] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const totalSlides = projects.length;
    const prevIndexRef = useRef<number | null>(null);
    const hasInitializedRef = useRef(false);

    const clampSlide = useCallback(
        (value: number) => {
            if (totalSlides <= 0 || !Number.isFinite(value)) return 0;
            return Math.max(0, Math.min(value, totalSlides - 1));
        },
        [totalSlides]
    );

    const slideParam = searchParams.get("slide");
    const hasSlideParam = slideParam !== null && !Number.isNaN(Number(slideParam));
    const targetSlide = clampSlide(hasSlideParam ? Number(slideParam) : 0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi || !hasInitializedRef.current) return;
        const canPrev = emblaApi.canScrollPrev();
        const canNext = emblaApi.canScrollNext();
        const index = emblaApi.selectedScrollSnap();
        setCanScrollPrev(canPrev);
        setCanScrollNext(canNext);
        if (prevIndexRef.current === index) return;
        prevIndexRef.current = index;
        if ((searchParams.get("slide") ?? "") !== index.toString()) {
            const next = new URLSearchParams(searchParams);
            next.set("slide", index.toString());
            setSearchParams(next, { replace: true });
        }
    }, [emblaApi, searchParams, setSearchParams]);

    useEffect(() => {
        if (!emblaApi) return;

        if (!hasInitializedRef.current) {
            emblaApi.scrollTo(targetSlide);
            prevIndexRef.current = targetSlide;
            hasInitializedRef.current = true;

            if (!hasSlideParam) {
                const next = new URLSearchParams(searchParams);
                next.set("slide", targetSlide.toString());
                setSearchParams(next, { replace: true });
            }
        }

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, targetSlide, hasSlideParam, searchParams, setSearchParams, onSelect]);

    const handleCardClick = useCallback((item: any) => {
        setSelectedCard(item);
        setFullScr(true);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loading />
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full w-[85%] m-auto"
        >
            <div className="w-full text-inter h-full grid grid-cols-1 justify-center items-center">
                <h1 className="text-[4.5rem] text-center">Projetos</h1>

                <div className="relative z-20 self-start mt-2">
                    <div className="overflow-x-hidden pb-4" ref={emblaRef}>
                        <div className="flex">
                            {projects.map((item, index) => (
                                <div 
                                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3 select-none py-2" 
                                    key={index}
                                >
                                    <ProjectCard 
                                        item={item} 
                                        onClick={() => handleCardClick(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: canScrollPrev ? 1.1 : 1, rotate: canScrollPrev ? -5 : 0 }}
                        whileTap={{ scale: canScrollPrev ? 0.9 : 1 }}
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className={`flex items-center justify-center shadow-lg cursor-pointer bg-gray-400 rounded-full w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-30 transition-opacity ${canScrollPrev ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: canScrollNext ? 1.1 : 1, rotate: canScrollNext ? 5 : 0 }}
                        whileTap={{ scale: canScrollNext ? 0.9 : 1 }}
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className={`flex items-center justify-center shadow-lg cursor-pointer bg-gray-400 rounded-full w-10 h-10 absolute -right-7 -translate-y-1/2 -translate-x-1/2 top-1/2 z-30 transition-opacity ${canScrollNext ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                    >
                        <ArrowRight className="w-6 h-6 text-gray-600" />
                    </motion.button>
                </div>
            </div>

            {fullscr && (
                <CardFullScr
                    fullScr={fullscr}
                    setFullScr={setFullScr}
                    selectedCard={selectedCard}
                />
            )}
        </motion.div>
    );
}