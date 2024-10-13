import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { File, Check } from "lucide-react";

import Link from "next/link";

type Props = {
  params: {
    courseId: string;
    unitId: string;
  };
};

const page = async ({ params: { unitId, courseId } }: Props) => {
  const unit = await prisma.unit.findFirst({
    where: {
      id: unitId,
    },
    include: {
      chapters: true,
    },
  });

  return (
    <div>
      <Container className="my-10">
        <Link href={`/courses/${courseId}`}>
          <Button className="bg-main">Back</Button>
        </Link>

        <div className="flex items-center gap-6 mt-20">
          <File className="" size={86} />
          <h3 className="pb-[0.75rem] text-2xl font-bold">
            Overview of {unit?.name}
          </h3>
        </div>
        <p className="mt-10">{unit?.description}</p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          In this section you will be covering:
        </h2>
        <div className="flex flex-col gap-4">
          {unit?.chapters.map((chapter) => {
            return (
              <div key={chapter.id} className="flex gap-3">
                <Check stroke="#00FF00" />
                <h3 className="text-lg font-medium">{chapter.name}</h3>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default page;
