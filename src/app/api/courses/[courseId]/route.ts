// /api/course

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface IParams {
  courseId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = params;

  const course = await prisma.course.deleteMany({
    where: {
      id: courseId,
    },
  });

  return NextResponse.json(course);
}
