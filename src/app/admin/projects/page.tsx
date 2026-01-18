import Link from "next/link";
import prisma from "@/lib/prisma";
import DeleteButton from "./_components/DeleteButton";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
    const projects = await prisma
        .project
        .findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

    return (
        <main className="mx-auto max-w-4xl p-6">
        <BackButton label="Back" className="absolute left-6 top-6"/>
            <header className="flex items-center justify-between gap-4 pt-16">
                <div>
                    <h1 className="text-2xl font-semibold">Admin — Projects</h1>
                    <p className="mt-1 text-sm text-white/60">
                        CRUD data “Projects” yang tampil di halaman profile.
                    </p>
                </div>

                <Link
                    href="/admin/projects/new"
                    className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
                    + New Project
                </Link>
            </header>
            <ul className="mt-6 space-y-3">
                {
                    projects.map((p) => (
                        <li
                            key={p.id}
                            className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="font-medium">{p.title}</div>
                                    <div className="mt-1 line-clamp-2 text-sm text-white/70">
                                        {p.description}
                                    </div>
                                    {
                                        p.url
                                            ? (<div className="mt-2 text-xs text-white/50">{p.url}</div>)
                                            : null
                                    }
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        href={`/admin/projects/${p.id}/edit`}
                                        className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
                                        Edit
                                    </Link>
                                    <DeleteButton id={p.id}/>
                                </div>
                            </div>
                        </li>
                    ))
                }

                {
                    projects.length === 0
                        ? (
                            <li className="text-white/60">
                                Belum ada project. Klik
                                <b>New Project</b>
                                untuk menambah.
                            </li>
                        )
                        : null
                }
            </ul>
        </main>
    );
}
