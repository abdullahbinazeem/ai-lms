"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const AddCourse = () => {
  const router = useRouter();

  const [course, setCourse] = useState("");

  const createBoardbook = useMutation({
    mutationFn: async () => {
      if (course != "") {
        const res = await axios.post("/api/course", {
          name: course,
        });
        return res.data;
      }
      return null;
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong, maybe try again");
    },
    onSuccess: (data) => {
      router.push(`/courses/${data.id}`);
    },
  });

  return (
    <div className="mb-20">
      <h2 className="text-3xl mt-12 font-bold underline underline-offset-8 decoration-slate-300">
        Or create a <span className="text-main">New Course:</span>
      </h2>
      <div className="flex flex-row w-screen mt-4 mb-8">
        <Input
          className="w-[50%] border-2 border-slate-300 focus-visible:border-black focus-visible:ring-0"
          placeholder="Topic"
          onChange={(e) => setCourse(e.target.value)}
          value={course}
        />
        <div className="w-full ml-4">
          <Button
            className="bg-main"
            onClick={() => {
              createBoardbook.mutate();
            }}
          >
            Start Creating!
            {createBoardbook.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              ""
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
