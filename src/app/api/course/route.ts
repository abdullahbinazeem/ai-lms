// /api/course

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: Response) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json("You did not provide a name");
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      },
      {
        role: "user",
        content: `It is your job to create a course about ${name}. The user has requested to create units for the course, this should have the key units in the JSON object. For each of the units there are chapters. Then, for each chapter, provide a long detailed youtube search query that can be used to find an informative educationalvideo for each chapter. Each query should give an educational informative course in youtube. You are to output an array of objects in the following json format: ${JSON.stringify(
          {
            title:
              "title of the unit, this should have title key in the JSON object",
            description:
              "Summary of this unit around 50 words be sure to include sources to learn this, this should have description key in the JSON object",
            chatpers:
              "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
          }
        )}`,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  const Jsonified = JSON.parse(response.choices[0].message.content!);

  const course = await prisma.course.create({
    data: {
      name,
    },
  });

  for (let i = 0; i < Jsonified.units.length; i++) {
    const prismaUnit = await prisma.unit.create({
      data: {
        description: Jsonified.units[i].description,
        name: Jsonified.units[i].title,
        courseId: course.id,
        chapters: {
          createMany: {
            data: Jsonified.units[i].chapters.map(
              (chapter: {
                youtube_search_query: string;
                chapter_title: string;
              }) => {
                return {
                  name: chapter.chapter_title,
                  youtubeSearchQuery: chapter.youtube_search_query,
                };
              }
            ),
          },
        },
      },
    });
  }

  const courseTableOfContents = await prisma.course.findFirst({
    where: {
      id: course.id,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  return NextResponse.json(courseTableOfContents);
}
