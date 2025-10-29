export default function HabilityCarrd(props: any) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="h-full grid items-center justify-center w-[90%] rounded-lg border border-white/10 p-6  z-10 hover:scale-105 transition-transform duration-300">
                <div className="grid items-center justify-center">
                    <props.icon className="w-16 h-full" />
                </div>
                <div className="text-2xl font-semibold text-center">
                    {props.name}
                </div>
            </div>
        </div>
    )
}