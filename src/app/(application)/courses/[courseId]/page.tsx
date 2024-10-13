import { redirect } from "next/navigation";
import React from "react";

import prisma from "@/lib/db";
import Container from "@/components/container";
import { Play, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    courseId: string;
  };
};

const page = async ({ params: { courseId } }: Props) => {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  return (
    <div className="grainy">
      <Container>
        <nav className="border-b-[3px] border-slate-300 w-full">
          <ul className="flex justify-between items-center py-2">
            <li className="text-4xl font-bold flex flex-row">
              <a className="flex flex-row" href="/">
                <img src="../plain-circle.svg" alt="" className="p-2" />
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
        <div className="flex gap-6 items-center my-10">
          <Link href="/courses">
            <Button className="bg-main ">Back</Button>
          </Link>
          <h1 className="text-4xl font-bold capitalize ">{course?.name}</h1>
        </div>
        <div className="flex flex-col gap-8 mb-8">
          {course?.units.map((unit) => {
            return (
              <div key={unit.id} className="w-[50%]">
                <h2 className="text-2xl font-semibold">{unit.name}</h2>
                <div className="h-[2px] bg-main mb-4" />
                <div className="flex flex-col">
                  <Link
                    className="rounded-md transition-all py-1 pl-2
                        hover:bg-slate-300 
                        hover:translate-x-3"
                    href={`/courses/${courseId}/document/${unit.id}`}
                  >
                    <div className="flex gap-5 items-center text-lg">
                      <File />
                      <h3 className="pb-[0.75rem]">Overview of {unit.name}</h3>
                    </div>
                  </Link>
                  {unit.chapters.map((chapter) => {
                    return (
                      <Link
                        key={chapter.id}
                        className="rounded-md transition-all py-1 pl-2
                        hover:bg-slate-300 
                        hover:translate-x-3"
                        href={`/courses/${courseId}/${chapter.id}`}
                      >
                        <div>
                          <div className="flex gap-5 items-center">
                            <Play />
                            <div>
                              <h3 className="text-lg">{chapter.name}</h3>
                              <p className="text-xs">
                                {chapter.youtubeSearchQuery}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default page;
