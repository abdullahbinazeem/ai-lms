import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-black">
      <div className="bg-gradient-to-b grainy  min-h-screen">
        <Container>
          <div className="border-b-2 border-muted">
            <ul className="flex justify-between items-center py-2">
              <li className="text-4xl font-bold">
                <a className="flex flex-row" href="/">
                  <img src="plain-circle.svg" alt="" className="p-2" />
                  UTutor
                </a>
              </li>
              <div className="flex gap-8">
                <li className="hover:text-main">
                  <a href="#">Home</a>
                </li>
                <li className="hover:text-main">
                  <a href="/courses">My Courses</a>
                </li>
              </div>
            </ul>
          </div>
          <div className="h-96 mt-16 grid grid-cols-2">
            <span className="flex flex-col justify-center">
              <h1 className="font-bold text-6xl">Learn new skills with ease</h1>
              <p className="text-slate-500 italic mt-2">
                By harnessing the power of AI to boost your learning.
              </p>
              <Link href="/courses" className="w-[110px]">
                <Button className="w-full bg-main mt-4">Get Started</Button>
              </Link>
            </span>
          </div>
        </Container>
      </div>
    </div>
  );
}
