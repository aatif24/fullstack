'use client';

import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';

export function ExpandableCard() {
    const [active, setActive] = useState<
        (typeof cards)[number] | boolean | null
    >(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setActive(false);
            }
        }

        if (active && typeof active === 'object') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === 'object' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === 'object' ? (
                    <div className="fixed inset-0  grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full items-center justify-center p-4 max-w-[50rem]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div
                                layoutId={`image-${active.title}-${id}`}
                            >
                                <Image
                                    priority
                                    width={2000}
                                    height={2000}
                                    src={active.src}
                                    alt={active.title}
                                    className="object-cover"
                                />
                            </motion.div>

                            <div>
                                <div className="p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.content === 'function'
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <div className=" grid grid-cols-3">
                {cards.map((card) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
                    >
                        <motion.div layoutId={`image-${card.title}-${id}`}>
                            <Image
                                width={1000}
                                height={1000}
                                src={card.src}
                                alt={card.title}
                                className="w-fit"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const cards = [
    {
        description: 'Navigate to users list',
        title: 'Navigation',
        src: '/images/docs/user-nav.png',
        content: () => {
            return (
                <p>
                    Navigate to the users listing page to Manage and oversee the
                    users in the system, including creation, updates, and role
                    assignments.
                </p>
            );
        },
    },
    {
        description: 'List of all users',
        title: 'Listing',
        src: '/images/docs/user-list.png',
        content: () => {
            return (
                <p>
                    List of users with basic details shown in list with assigned
                    roles
                </p>
            );
        },
    },

    {
        description: 'Metallica',
        title: 'For Whom The Bell Tolls',
        src: '/images/docs/user-actions.png',
        content: () => {
            return (
                <p>
                    Metallica, an iconic American heavy metal band, is renowned
                    for their powerful sound and intense performances that
                    resonate deeply with their audience. Formed in Los Angeles,
                    California, they have become a cultural icon in the heavy
                    metal music industry. <br /> <br /> Their songs often
                    reflect themes of aggression, social issues, and personal
                    struggles, capturing the essence of the heavy metal genre.
                    With a career spanning over four decades, Metallica has
                    released numerous hit albums and singles that have garnered
                    them a massive fan following both in the United States and
                    abroad.
                </p>
            );
        },
    },
    {
        description: 'Led Zeppelin',
        title: 'Stairway To Heaven',
        src: '/images/docs/user-search.png',
        content: () => {
            return (
                <p>
                    Led Zeppelin, a legendary British rock band, is renowned for
                    their innovative sound and profound impact on the music
                    industry. Formed in London in 1968, they have become a
                    cultural icon in the rock music world. <br /> <br /> Their
                    songs often reflect a blend of blues, hard rock, and folk
                    music, capturing the essence of the 1970s rock era. With a
                    career spanning over a decade, Led Zeppelin has released
                    numerous hit albums and singles that have garnered them a
                    massive fan following both in the United Kingdom and abroad.
                </p>
            );
        },
    },
    {
        description: 'Mustafa Zahid',
        title: 'Toh Phir Aao',
        src: '/images/docs/user-create.png',
        content: () => {
            return (
                <p>
                    &quot;Aawarapan&quot;, a Bollywood movie starring Emraan
                    Hashmi, is renowned for its intense storyline and powerful
                    performances. Directed by Mohit Suri, the film has become a
                    significant work in the Indian film industry. <br /> <br />{' '}
                    The movie explores themes of love, redemption, and
                    sacrifice, capturing the essence of human emotions and
                    relationships. With a gripping narrative and memorable
                    music, &quot;Aawarapan&quot; has garnered a massive fan
                    following both in India and abroad, solidifying Emraan
                    Hashmi&apos;s status as a versatile actor.
                </p>
            );
        },
    },
];
