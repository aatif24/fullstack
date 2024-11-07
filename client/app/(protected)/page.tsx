'use client';
import RBac from '@/components/hoc/permissions.hoc';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/ui/page-header';
import { PROFILE_READ } from '@/lib/permissions';
import { BookOpen, ArrowRight, Coffee } from 'lucide-react';
import Link from 'next/link';

export default RBac(
    function Home() {
        return (
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                <PageHeader title="Home" />
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Hello,</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                            We&apos;re excited to have you here. Our platform is
                            designed to help you achieve your goals and
                            streamline your workflow.
                        </p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Get Started
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                New to our platform? Check out our quick start
                                guide to get up and running in no time.
                            </p>
                            <Link href={'/documentation'}>
                                <Button variant="outline">
                                    View Guide
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Coffee className="mr-2 h-5 w-5" />
                                Latest Updates
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Stay informed about our newest features &
                                improvements.
                            </p>
                            <Button variant="outline">
                                Read Blog
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    },
    [PROFILE_READ],
);
