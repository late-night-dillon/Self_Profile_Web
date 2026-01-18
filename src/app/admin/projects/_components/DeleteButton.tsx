"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function DeleteButton({id} : {
    id: string
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onDelete() {
        const ok = confirm("Hapus project ini?");
        if (!ok) 
            return;
        
        setLoading(true);
        try {
            const res = await fetch(`/api/projects/${id}`, {method: "DELETE"});
            if (!res.ok) 
                throw new Error("Gagal menghapus project.");
            
            router.refresh();
        } catch (e) {
            alert(
                e instanceof Error
                    ? e.message
                    : "Error"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={onDelete}
            disabled={loading}
            className="rounded-lg bg-red-500/20 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/30 disabled:opacity-50">
            {
                loading
                    ? "Deleting..."
                    : "Delete"
            }
        </button>
    );
}
