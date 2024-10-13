import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getTranscript } from "@/lib/getTranscript";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ChapterIdParams {
  params: {
    chapterId: string;
  };
}

export async function POST(req: Request, { params }: ChapterIdParams) {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: params.chapterId,
      },
    });

    if (chapter?.videoId) {
      const transcript = (await getTranscript(chapter?.videoId)) || "";

      if (!transcript) {
        return new NextResponse("No Transcript Found", { status: 404 });
      }
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI capable of teaching the content of a youtube video by its transcript. The response is 200 words or less.",
          },
          {
            role: "user",
            content: `Teach the concepts discussed in this video's transcript in 200 words or less and do not talk of the sponsors or anything unrelated to the main topic. Do not introduce the video.

            ${transcript}
            
            ${JSON.stringify({
              summary:
                "summary of the transcript, this should have transcript key in the JSON object.",
            })}`,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const Jsonified = JSON.parse(response.choices[0].message.content!);

      const updatedChapter = await prisma.chapter.update({
        where: {
          id: params.chapterId,
        },
        data: {
          summary: Jsonified.summary,
        },
      });

      return NextResponse.json(updatedChapter, {
        status: 200,
      });
    } else {
      return new NextResponse("No Chapter Found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
