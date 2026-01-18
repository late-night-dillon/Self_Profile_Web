import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import ProjectForm from "../../_components/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({params} : {
    params: Promise < {
        id: string
    } >;
}) {
    const {id} = await params;

    if (!id) 
        notFound();
    
    const project = await prisma
        .project
        .findUnique({where: {
                id
            }});

    if (!project) 
        notFound();
    
    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="text-2xl font-semibold">Edit Project</h1>

            <div className="mt-6">
                <ProjectForm
                    mode="edit"
                    initial={{
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        url: project.url ?? ""
                    }}/>
            </div>
        </main>
    );
}
