import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

interface ChapterIdParams {
  params: {
    chapterId: string;
  };
}

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
  );
  if (!data) {
    console.log("youtube fail");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  return data.items[0].id.videoId;
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
