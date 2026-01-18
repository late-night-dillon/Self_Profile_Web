import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="relative">
      {/* background modern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.35),transparent_55%)]" />

      <main className="mx-auto max-w-5xl px-6 py-14">
        {/* top nav */}
        <header className="flex items-center justify-between gap-4">
          <div className="text-sm font-medium tracking-wide text-white/80">
            Dillon Donetta
          </div>

          <nav className="hidden gap-5 text-sm md:flex">
            <a href="#about" className="text-white/70 hover:text-white">
              About
            </a>
            <a href="#projects" className="text-white/70 hover:text-white">
              Projects
            </a>
            <a href="#contact" className="text-white/70 hover:text-white">
              Contact
            </a>
          </nav>

          <Link
            href="/admin/projects"
            className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Admin
          </Link>
        </header>

        {/* hero */}
        <section className="mt-14">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Frontend Developer
            <span className="text-white/60"> — Next.js & Tailwind</span>
          </h1>

          <p className="mt-6 max-w-2xl text-white/70">
            Saya membangun web yang cepat, modern, dan rapi. Stack utama: Next.js,
            Tailwind, PostgreSQL, dan Prisma.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white/90"
            >
              Lihat Projects
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Kontak
            </a>
          </div>
        </section>

        {/* about */}
        <section id="about" className="mt-16">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-3 max-w-3xl text-white/70">
            I am a 5th-semester Informatics undergraduate at Universitas Multimedia Nusantara, focusing on front-end
development and UI/UX design. I have hands-on experience building responsive web interfaces using HTML,
CSS, JavaScript, PHP, Laravel, React, Tailwind CSS, and mobile applications using Kotlin. I am actively
involved as a front-end developer in organization websites, mobile app projects, and group coursework,
translating UI/UX concepts into clean, user-friendly interfaces, including integrating REST APIs, MySQL
databases, and machine learning predictions into real-world use cases.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["Next.js", "React", "Tailwind", "PostgreSQL", "Prisma"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-white/60 hover:text-white"
            >
              Kelola di Admin →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}

            {projects.length === 0 ? (
              <div className="text-white/60">
                Belum ada project. Tambah lewat{" "}
                <Link className="underline" href="/admin/projects">
                  Admin
                </Link>
                .
              </div>
            ) : null}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="mt-16">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-3 text-white/70">
            Tiktok:{" "}
            <a className="underline" href="https://www.tiktok.com/@dailen34_?_r=1&_t=ZS-93B5nrA3Zaf">
              Dailenn
            </a>
          </p>
          <p className="mt-3 text-white/70">
            Instagram:{" "}
            <a className="underline" href="https://www.instagram.com/dillon34_?igsh=anYxcDgwczlkMmZh">
              dillon34_
            </a>
          </p>
          <p className="mt-3 text-white/70">
            Email:{" "}
            <a className="underline" href="mailto:dillondonetta7@gmail.com">
              dillondonetta7@gmail.com
            </a>
          </p>
          <p className="mt-3 text-white/70">
            Whatsapp:{" "}
            <a className="underline" href="https://wa.me/6283818705104">
              +62 838-1870-5104
            </a>
          </p>
          <p className="mt-3 text-white/70">
            Github:{" "}
            <a className="underline" href="https://github.com/late-night-dillon">
              late-night-dillon
            </a>
          </p>
        </section>

        <footer className="mt-16 border-t border-white/10 py-8 text-sm text-white/50">
          © {new Date().getFullYear()} Dillon Donetta. Built with Next.js + Tailwind + Postgres.
        </footer>
      </main>
    </div>
  );
}
