import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { projectUpdateSchema } from "@/lib/validators/project";
import { Prisma } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing project id" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
    }

export async function PATCH(req: Request, { params }: Ctx) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing project id" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    const parsed = projectUpdateSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
        { error: "Validation error", details: parsed.error.flatten() },
        { status: 400 }
        );
    }

    try {
        const updated = await prisma.project.update({
        where: { id },
        data: {
            ...(typeof parsed.data.title !== "undefined" ? { title: parsed.data.title } : {}),
            ...(typeof parsed.data.description !== "undefined"
            ? { description: parsed.data.description }
            : {}),
            ...(typeof parsed.data.url !== "undefined"
            ? { url: parsed.data.url ? parsed.data.url : null }
            : {}),
        },
    });

    return NextResponse.json(updated);
} catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        throw e;
    }
}

export async function DELETE(_req: Request, { params }: Ctx) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing project id" }, { status: 400 });
    }

    try {
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        throw e;
    }
}
