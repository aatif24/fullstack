'use client';

import RBac from "@/components/hoc/permissions.hoc";
import CreateRoleForm from "./components/create-role-form";
import { ROLES_CREATE } from "@/lib/permissions";
import PageHeader from "@/components/ui/page-header";

export default RBac(
    function CreateRole() {
    return <div className="h-full flex-1 flex-col space-y-8 md:flex">
        <PageHeader title={"roles"} description="Create a new role"/>
        <CreateRoleForm />
    </div>
},
    [ROLES_CREATE],
)
