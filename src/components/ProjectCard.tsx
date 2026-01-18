import type {Project}
from "@prisma/client";
import Link from "next/link";

export default function ProjectCard({project} : {
    project: Project
}) {
    return (
        <div
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{project.title}</h3>

                {
                    project.url
                        ? (
                            <Link
                                href={project.url}
                                target="_blank"
                                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/80 hover:bg-white/15">
                                Visit
                            </Link>
                        )
                        : null
                }
            </div>

            <p className="mt-2 text-sm text-white/70">{project.description}</p>

            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                <div
                    className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-[2px]"/>
            </div>
        </div>
    );
}
