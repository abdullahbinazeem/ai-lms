import prisma from "@/lib/db";
import { searchYoutube } from "@/lib/searchYoutube";

import { NextResponse } from "next/server";

interface ChapterIdParams {
  params: {
    chapterId: string;
  };
}

export async function POST(req: Request, { params }: ChapterIdParams) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const chapter = await prisma.chapter.findFirst({
      where: {
        id: params.chapterId,
      },
    });

    if (chapter) {
      const youtubeUrl = await searchYoutube(chapter?.youtubeSearchQuery);

      const updatedChapter = await prisma.chapter.update({
        where: {
          id: params.chapterId,
        },
        data: {
          videoId: youtubeUrl,
        },
      });

      return NextResponse.json(updatedChapter, { status: 200 });
    } else {
      return new NextResponse("No Chapter Found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
