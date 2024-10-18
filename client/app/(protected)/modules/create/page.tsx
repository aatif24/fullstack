'use client';

import RBac from "@/components/hoc/permissions.hoc";

import { ROLES_CREATE } from "@/lib/permissions";
import PageHeader from "@/components/ui/page-header";
import CreateModuleForm from "./components/create-module-form";

export default RBac(
    function CreateModule() {
    return <div className="h-full flex-1 flex-col space-y-8 md:flex">
        <PageHeader title={"modules"} description="Create a new module"/>
        <CreateModuleForm />
    </div>
},
    [ROLES_CREATE],
)
