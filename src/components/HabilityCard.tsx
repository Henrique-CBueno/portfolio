export default function HabilityCarrd(props: any) {
    return (
        <div className="p-8 rounded-lg border border-white/10 m-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
            <div>
                <props.icon size={48} className="mb-4"/>
            </div>
            <div className="text-2xl font-semibold text-center">
                {props.name}
            </div>
        </div>
    )
}