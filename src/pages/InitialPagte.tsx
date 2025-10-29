import { useState } from "react";
import GlassSurface from "../components/GlassSurface";
import Home from "./sections/Home";
import About from "./sections/About";
import Hability from "./sections/Hability";
import Projects from "./sections/Projects";
import Selector from "../components/Selector";


export default function InitialPage({cursor, setCursor}: {cursor: any, setCursor: any}) {
    const [nav, setNav] = useState(1)

    return (
        <div className="h-full p-8 grid grid-rows-[auto_1fr]">
            <header className="flex justify-center align-center">
                <GlassSurface
                  borderRadius={50}
                  width="80%"
                  className="w-full z-10"
                  contentClassName="grid grid-cols-3 px-15 ">
                    <div className="flex justify-start items-center">
                        <span
                            className="logo text-4xl cursor select-none transition-all duration-[800ms] hover:rotate-[360deg]"
                            onClick={() => alert("clicou")}
                        >
                            HB
                        </span>
                    </div>
                    <nav className="flex justify-center items-center">
                        <ul className="flex space-x-8 text-lg">
                            <li className="nav-link cursor-pointer" onClick={() => setNav(1)}>
                                Inicio
                            </li>
                            <li className="nav-link cursor-pointer" onClick={() => setNav(2)}>
                                Sobre
                            </li>
                            <li className="nav-link cursor-pointer" onClick={() => setNav(3)}>
                                Habilidades
                            </li>
                            <li className="nav-link cursor-pointer" onClick={() => setNav(4)}>
                                Projetos
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center justify-end">
                        <Selector cursor={cursor} setCursor={setCursor}/>
                    </div>
                </GlassSurface>
            </header>
            {
                nav === 1 ? (
                    <Home />
                ) : nav === 2 ? (
                    <About />
                ) : nav === 3 ? (
                    <Hability />
                ) : nav === 4 ? (
                    <Projects />
                ) : null
            }
            
        </div>
    )
}