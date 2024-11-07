import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { PlusIcon, XIcon } from "lucide-react";
import { BreadcrumbComponent } from "./nav/breadcrumb";
import { cn, makeSingular } from "@/lib/utils";

import { useState, useEffect } from "react";

// Type for the debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    } as T;
}
export default function PageHeader({ title, module, ctx, search, setSearch }: { title: string; module?: string; ctx?: string; search?: string | undefined, setSearch?: React.Dispatch<React.SetStateAction<string | undefined>> }) {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        // Use debounce with a short delay
        const debouncedHandleScroll = debounce(handleScroll, 50); // Adjust delay as needed

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);


    return <div className={cn("transition-all flex relative duration-300 left-1/2 -translate-x-1/2", isScrolled && "h-fit lg:max-w-4xl max-w-3xl p-4 items-center bg-background fixed md:top-20 bottom-20  shadow-sm rounded-full border-[0.5px] z-50 w-full")}>
        <div className="w-full space-y-4">
            {!isScrolled && <BreadcrumbComponent />}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight capitalize">{title}</h2>
                </div>

                {module ?
                    <div className="flex gap-4 ">
                        <Link
                            href={`/${module}/${ctx}`}
                            className="w-fit flex items-center"
                        >
                            <Button className="w-full" variant={'secondary'}>
                                <span className="capitalize hidden md:inline">
                                    New {makeSingular(module)} &nbsp;
                                </span>
                                <PlusIcon className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Input
                            type="text"
                            className=" md:min-w-[300px]"
                            onChange={(e) => setSearch && setSearch(e.target.value)}
                            value={search}
                            placeholder="Search..."
                        />
                        {search ? (
                            <Button
                                type="button"
                                variant="link"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                onClick={() => setSearch && setSearch('')}
                            >
                                <XIcon className="h-4 w-4" />
                                <span className="sr-only">Clear</span>
                            </Button>
                        ) : null}
                    </div>
                    : null}
            </div>
        </div>
    </div>
}