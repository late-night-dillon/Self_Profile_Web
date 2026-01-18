import ProjectForm from "../_components/ProjectForm";

export default function NewProjectPage() {
    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="text-2xl font-semibold">New Project</h1>
            <p className="mt-1 text-sm text-white/60">
                Isi data project untuk tampil di website profile.
            </p>

            <div className="mt-6">
                <ProjectForm mode="create"/>
            </div>
        </main>
    );
}
