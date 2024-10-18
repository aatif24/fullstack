export default function PageHeader({ title, description }: { title: string; description: String }) {
    return <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold tracking-tight capitalize">{title}</h2>
            <p className="text-muted-foreground text-sm">
                {description}
            </p>
        </div>
    </div>
}