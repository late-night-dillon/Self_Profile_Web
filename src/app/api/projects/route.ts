import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { projectCreateSchema } from "@/lib/validators/project";

export async function GET() {
const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
});

return NextResponse.json(projects);
}

export async function POST(req: Request) {
const body = await req.json().catch(() => null);

const parsed = projectCreateSchema.safeParse(body);
if (!parsed.success) {
    return NextResponse.json(
    { error: "Validation error", details: parsed.error.flatten() },
    { status: 400 }
    );
}

const { title, description, url } = parsed.data;

const created = await prisma.project.create({
    data: {
    title,
    description,
    url: url ? url : null,
    },
});

    return NextResponse.json(created, { status: 201 });
}
