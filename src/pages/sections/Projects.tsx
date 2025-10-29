
import UseEmblaCarousel from "embla-carousel-react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CardFullScr from "../../components/CardFullScr";
import { projects } from './../../../projects.ts';

export default function Projects() {

    const [emblaRef, emblaApi] = UseEmblaCarousel({ 
        loop: false, 
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": {
                slidesToScroll: 3,
            }
        }
    });

    const [fullscr, setFullScr] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})

    function scrollPrev() {
        if (emblaApi) emblaApi.scrollPrev();
    }

    function scrollNext() {
        if (emblaApi) emblaApi.scrollNext();
    }

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    function onSelect() {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi]);

    
    return (
            !fullscr ? (

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
                                    {projects.map((item, index) => {
                                        return (
                                            <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3 select-none py-2" key={index} onClick={() => {
                                                setSelectedCard(item)
                                                setFullScr(true)
                                            }}>
                                               <article
                                                className="flex flex-col justify-between rounded-2xl overflow-hidden 
                                                            bg-[rgba(36,30,52,0.43)] border border-white/10 backdrop-blur-lg
                                                            transition-all duration-300 ease-in-out
                                                            hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30
                                                            w-full h-[480px] relative cursor-pointer"
                                                >
                                                {/* Imagem */}
                                                <div className="p-6">
                                                    <img
                                                    src={`${item.image}`}
                                                    alt={`Preview do projeto ${item.name}`}
                                                    className="w-full h-44 object-cover rounded-3xl"
                                                    />
                                                </div>

                                                {/* Conteúdo */}
                                                <div className="flex flex-col flex-grow px-6 pb-6">
                                                    {/* Título com ellipsis */}
                                                    <h3
                                                    className="text-2xl font-semibold mb-2 text-white truncate"
                                                    title={item.name} // tooltip mostra o nome completo ao passar o mouse
                                                    >
                                                    {item.name}
                                                    </h3>

                                                    {/* Descrição limitada com "..." */}
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

                                                    {/* Lista das tecnologias (sem carrossel, corte se ultrapassar o limite) */}
                                                    <div
                                                    className="flex gap-3 mb-6 overflow-hidden whitespace-nowrap"
                                                    >
                                                    {item.techs.map((tech) => (
                                                        <span
                                                        key={tech.id}
                                                        className="text-[#BDA8FF] font-medium text-sm bg-white/10 px-3 py-1 rounded-md shrink-0"
                                                        >
                                                        {tech.name}
                                                        </span>
                                                    ))}
                                                    </div>

                                                    {/* Botão */}
                                                    <button
                                                    className="w-full py-3 px-5 rounded-lg bg-[#7D3CFF] text-white font-semibold
                                                                transition-all duration-300 ease-in-out
                                                                hover:bg-[#9867FF] hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                                                    >
                                                    Ver Mais
                                                    </button>
                                                </div>
                                                </article>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
        
                            <motion.button
                                whileHover={{ scale: canScrollPrev ? 1.1 : 1, rotate: canScrollPrev ? -5 : 0 }}
                                whileTap={{ scale: canScrollPrev ? 0.9 : 1 }}
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                className={`flex items-center justify-center shadow-lg cursor-pointer bg-gray-400 rounded-full w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-30 transition-opacity ${canScrollPrev ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                            >
                                <FaArrowLeft className="w-6 h-6 text-gray-600" />
                            </motion.button>
        
                            <motion.button
                                whileHover={{ scale: canScrollNext ? 1.1 : 1, rotate: canScrollNext ? 5 : 0 }}
                                whileTap={{ scale: canScrollNext ? 0.9 : 1 }}
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                className={`flex items-center justify-center shadow-lg cursor-pointer bg-gray-400 rounded-full w-10 h-10 absolute -right-7 -translate-y-1/2 -translate-x-1/2 top-1/2 z-30 transition-opacity ${canScrollNext ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                            >
                                <FaArrowRight className="w-6 h-6 text-gray-600" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <CardFullScr fullScr={fullscr} setFullScr={setFullScr} selectedCard={selectedCard}/>
            )
    )
}