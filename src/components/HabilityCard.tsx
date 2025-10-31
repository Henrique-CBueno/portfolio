interface HabilityCardProps {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    showName?: boolean;
}

export default function HabilityCarrd({ name, icon: Icon, showName = true }: HabilityCardProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="h-full grid items-center justify-center w-[90%] rounded-lg border border-white/10 p-6 z-10 hover:scale-105 transition-transform duration-300">
                <div className="grid items-center justify-center">
                    <Icon className="w-16 h-full" />
                </div>
                {showName && (
                    <div className="text-2xl font-semibold text-center">
                        {name}
                    </div>
                )}
            </div>
        </div>
    )
}