import FuzzyText from "./FuzzyText";


export default function NotFound(){

    return (
        <div className="h-full w-full flex flex-col items-center gap-8 justify-center z-20">
            <FuzzyText
            baseIntensity={0.2} 
            hoverIntensity={0.5} 
            enableHover={true}
            >
                404
            </FuzzyText>
            <FuzzyText
            baseIntensity={0.3} 
            hoverIntensity={0.5} 
            enableHover={true}
            >
                NOT FOUND
            </FuzzyText>
        </div>
    )
}