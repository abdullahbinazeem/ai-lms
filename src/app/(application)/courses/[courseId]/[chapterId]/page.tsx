import React from "react";

import prisma from "@/lib/db";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import AddVideo from "./_component/addVideo";
import AddSummary from "./_component/addSummary";

type Props = {
  params: {
    chapterId: string;
    courseId: string;
  };
};

const page = async ({ params: { chapterId, courseId } }: Props) => {
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: chapterId,
    },
  });

  return (
    <div>
      <Container>
        <nav className="border-b-[3px] border-slate-300 w-full">
          <ul className="flex justify-between items-center py-2">
            <li className="text-4xl font-bold flex flex-row">
              <a className="flex flex-row" href="/">
                <img src="../../plain-circle.svg" alt="" className="p-2" />
                UTutor
              </a>
            </li>
            <div className="flex gap-8">
              <li className="hover:text-main">
                <a href="/">Home</a>
              </li>
              <li className="hover:text-main">
                <a href="/#section-about">About</a>
              </li>
              <li className="hover:text-main">
                <a href="/courses">My Courses</a>
              </li>
            </div>
          </ul>
        </nav>
        <Link href={`/courses/${courseId}`}>
          <Button className="bg-main mt-10">Back</Button>
        </Link>
        <h1 className="text-4xl font-medium- py-6 ">{chapter?.name}</h1>
        {chapter?.videoId ? (
          <div className="flex gap-10 items-start">
            <iframe
              title="chapter video"
              className=" aspect-video grow"
              src={`https://www.youtube.com/embed/${chapter.videoId}`}
              allowFullScreen
            />
            <div className="max-w-[600px]">
              {chapter?.summary ? (
                <div>
                  <p className="text-pretty">{chapter?.summary}</p>
                </div>
              ) : (
                <div>
                  <AddSummary chapterId={chapterId} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <AddVideo chapterId={chapterId} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default page;
