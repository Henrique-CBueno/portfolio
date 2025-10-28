export default function CardFullScr({ fullScr, setFullScr, selectedCard }: { fullScr: any, setFullScr: any, selectedCard: any }) {
    return (
        <div className="z-20">
            <h1 onClick={() => setFullScr(false)} className="z-20">teste {selectedCard}</h1>
            <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3 select-none py-2">
                                                <article
                                                    className="flex flex-col rounded-2xl overflow-hidden 
                                                                bg-[rgba(36,30,52,0.43)] border border-white/10 backdrop-blur-lg
                                                                transition-all duration-300 ease-in-out
                                                                hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30
                                                                w-full h-full relative cursor-pointer"
                                                >
                                                    {/* Imagem */}
                                                    <div className="p-6">
                                                        <img
                                                            src='/projetos/flashideas.png'
                                                            alt={`Preview do projeto ${selectedCard}`}
                                                            className="w-full h-56 object-cover rounded-3xl"
                                                        />
                                                    </div>
        
                                                    {/* Conteúdo */}
                                                    <div className="flex flex-col flex-grow p-6">
                                                        {/* Título */}
                                                        <h3 className="text-2xl font-semibold mb-2 text-white">Teste {selectedCard}</h3>
        
                                                        {/* Descrição */}
                                                        <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                                                            Teste
                                                        </p>
        
                                                        {/* Tags de Tecnologia */}
                                                        <div className="mb-6">
                                                            <span className="text-[#BDA8FF] font-medium text-sm">
                                                                Teste
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

        </div>
    )
}