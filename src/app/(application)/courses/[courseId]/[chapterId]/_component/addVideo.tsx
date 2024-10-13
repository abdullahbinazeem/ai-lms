"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type videoProps = {
  chapterId: string;
};

const AddVideo = ({ chapterId }: videoProps) => {
  const Router = useRouter();

  const createVideo = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/api/course/${chapterId}/createVideo`, {});
      return res.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong, maybe try again");
    },
    onSuccess: (data) => {
      Router.refresh();
      toast.success("Video added");
    },
  });
  return (
    <div>
      <Button
        className="bg-main mt-10 flex gap-3"
        onClick={() => {
          createVideo.mutate();
        }}
        disabled={createVideo.isPending}
      >
        Generate a Video!
        {createVideo.isPending ? <Loader className="animate-spin" /> : <Play />}
      </Button>
    </div>
  );
};

export default AddVideo;
