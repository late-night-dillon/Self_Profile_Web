"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type EditInitial = {
id: string;
title: string;
description: string;
url: string;
};

type Props =
| { mode: "create"; initial?: never }
| { mode: "edit"; initial: EditInitial };

export default function ProjectForm(props: Props) {
const router = useRouter();

const initial = useMemo(() => {
    if (props.mode === "edit") return props.initial;
    return { title: "", description: "", url: "" };
}, [props]);

const [title, setTitle] = useState(initial.title);
const [description, setDescription] = useState(initial.description);
const [url, setUrl] = useState(initial.url);

const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
    const endpoint =
        props.mode === "create"
        ? "/api/projects"
        : `/api/projects/${props.initial.id}`;

    const method = props.mode === "create" ? "POST" : "PATCH";

    const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Request gagal.");
    }

    router.push("/admin/projects");
    router.refresh();
    } catch (e) {
    setError(e instanceof Error ? e.message : "Error");
    } finally {
    setLoading(false);
    }
}

return (
    <form
    onSubmit={onSubmit}
    className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
    >
    <div>
        <label className="block text-sm text-white/70">Title</label>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-white/20"
        placeholder="Contoh: Personal Portfolio"
        required
        />
    </div>

    <div>
        <label className="block text-sm text-white/70">Description</label>
        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 min-h-[120px] w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-white/20"
        placeholder="Jelaskan project kamu..."
        required
        />
    </div>

    <div>
        <label className="block text-sm text-white/70">URL (optional)</label>
        <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-white/20"
        placeholder="https://..."
        />
    </div>

    {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
        {error}
        </div>
    ) : null}

    <div className="flex items-center gap-3">
        <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white/90 disabled:opacity-50"
        >
        {loading ? "Saving..." : "Save"}
        </button>

        <button
        type="button"
        onClick={() => router.back()}
        className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
        Cancel
        </button>
    </div>
    </form>
    );
}
