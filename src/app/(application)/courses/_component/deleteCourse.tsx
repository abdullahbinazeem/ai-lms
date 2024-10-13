"use client";

import React from "react";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
const DeleteCourse = ({ courseId }: { courseId: string }) => {
  const router = useRouter();

  const deleteCourse = async (url: string) => {
    try {
      await axios.delete(`/api/courses/${url}`);

      toast.success("Course deleted successfully");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");

      console.log(err);
    }
  };

  return (
    <Link href="/courses" className="absolute bottom-2 right-2 z-10">
      <div
        onClick={() => {
          deleteCourse(courseId);
        }}
      >
        <p className="text-xs text-red-800 hover:font-bold">Delete</p>
      </div>
    </Link>
  );
};

export default DeleteCourse;
