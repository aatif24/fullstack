'use client';

import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { ExpandableCard } from "./components/expandable-card";

export default function Documentation() {
    return <div className="">
        {/* <PageHeader title="User Management Guide" description="Check out our quick start guide to get up and running in no time." /> */}
        <section className="">
            <Card className="relative border-none shadow-none">
                <h2 className="text-2xl font-semibold mb-2">Accessing the User Listing Page</h2>
                <p className="mb-4">
                    From the navigation menu, click on <strong>Users</strong>. This will redirect you to the User Listing page, where you can:
                </p>
                <ul className="list-disc ml-6 mb-4">
                    <li>Use the search bar to find specific users.</li>
                    <li>Sort users by name, date, or other attributes.</li>
                    <li>Navigate between pages using pagination.</li>
                </ul>
                <div className="my-4">
                    <ExpandableCard />
                </div>
            </Card>

            <Separator className="my-8" />

            <Card className="relative border-none shadow-none">
                <h2 className="text-2xl font-semibold mb-2">Actions on User Listing</h2>
                <p className="mb-4">Each user on the listing has two available actions:</p>
                <ul className="list-disc ml-6 mb-4">
                    <li><strong>Archive:</strong> Mark the user as inactive.</li>
                    <li><strong>Update:</strong> Edit user details (redirects to the Update User form).</li>
                </ul>
                <div className="my-4">
                    {/* Placeholder for screenshot */}
                    <div className="w-full h-64 bg-gray-200 text-center flex items-center justify-center">
                        <span className="text-gray-500">[Screenshot: Actions in User List]</span>
                    </div>
                </div>
            </Card>

            <Separator className="my-8" />

            <Card className="relative border-none shadow-none">
                <h2 className="text-2xl font-semibold mb-2">Updating a User</h2>
                <p className="mb-4">
                    On the <strong>Update User</strong> page, the user's details such as <strong>name</strong>, <strong>email</strong>, and <strong>roles</strong> will be pre-filled. You can modify any of these fields and submit the changes.
                </p>
                <div className="my-4">
                    {/* Placeholder for screenshot */}
                    <div className="w-full h-64 bg-gray-200 text-center flex items-center justify-center">
                        <span className="text-gray-500">[Screenshot: Update User Form]</span>
                    </div>
                </div>
            </Card>

            <Separator className="my-8" />

            <Card className="relative border-none shadow-none">
                <h2 className="text-2xl font-semibold mb-2">Adding a New User</h2>
                <p className="mb-4">
                    On the User Listing page, click on <strong>Add New User</strong> to open the Create User form. Fill in the necessary information and submit the form to add a new user.
                </p>
                <div className="my-4">
                    {/* Placeholder for screenshot */}
                    <div className="w-full h-64 bg-gray-200 text-center flex items-center justify-center">
                        <span className="text-gray-500">[Screenshot: Add New User Button]</span>
                    </div>
                </div>
            </Card>
        </section>
    </div>
}