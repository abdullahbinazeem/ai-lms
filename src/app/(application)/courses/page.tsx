import Container from "@/components/container";
import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";

import AddCourse from "./_component/addCourse";
import DeleteCourse from "./_component/deleteCourse";

import axios from "axios";

const page = async () => {
  const courses = await prisma.course.findMany({});

  const deleteCourse = async (url: string) => {
    await axios.delete(`/api/course/${url}`);
  };

  return (
    <Container className="text-black grainy overflow-hidden min-h-[100vh]">
      <nav className="border-b-[3px] border-slate-300 w-full">
        <ul className="flex justify-between items-center py-2">
          <li className="text-4xl font-bold flex flex-row">
            <a className="flex flex-row" href="/">
              <img src="plain-circle.svg" alt="" className="p-2" />
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
      <div className="text-4xl pt-8 font-bold underline underline-offset-8 decoration-slate-300">
        Course Catalog:
      </div>
      <div className="mt-6 p-4">
        <div className="grid grid-cols-5 gap-5 object-fill">
          {courses.map((course) => {
            return (
              <div
                className="bg-white text-black shadow-[0px_3px_rgba(0,_98,_90,_0.4)_2px,_0px_8px_rgba(0,_98,_90,_0.3)_4px] shadow-slate-900/50
                h-24 overflow-hidden border-[2px] rounded-md border-black
                transition-all
                hover:scale-[1.05]
                hover:translate-y-[-0.2em]"
              >
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <div className="grid grid-cols-[15fr_85fr] h-full w-full relative z-0">
                    <div className="bg-main h-full w-full border-r-2 border-black"></div>
                    <p className="p-1 text-md font-semibold capi           talize">
                      {course.name}
                    </p>
                  </div>
                </Link>
                <div className="relative">
                  <DeleteCourse courseId={course.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddCourse />
    </Container>
  );
};

export default page;
