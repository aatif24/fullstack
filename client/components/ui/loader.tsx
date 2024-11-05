import { Loader2 } from 'lucide-react';

export default function LoaderComponent({
    loading = false,
}: {
    loading: boolean;
}) {
    return loading ? (
        <div className="absolute h-full w-full left-0 top-0 bg-slate-500/10 overflow-hidden rounded-lg backdrop-blur z-50">
            <Loader2 className="absolute top-1/2 left-1/2 w-6 h-6 animate-spin" />
        </div>
    ) : null;
}
