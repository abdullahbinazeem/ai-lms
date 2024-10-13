import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      <div className="bg-gradient-to-b to-black from-slate-800 min-h-screen">
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
                <li className="hover:text-purple-300">
                  <a href="#">Home</a>
                </li>
                <li className="hover:text-purple-300">
                  <a href="#section-about">About</a>
                </li>
                <li className="hover:text-purple-300">
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
            <img
              src="images/brand-image-transparent.png"
              alt="Branding image"
              className="bg-cover bg-center"
            />
          </div>
        </Container>
      </div>
      <div className="bg-gradient-to-t to-black from-slate-800  min-h-screen">
        <Container>
          <div id="section-about" className="flex flex-col items-center">
            <div className="w-[60%] border-t-2 border-muted"></div>
            <h2 className="mt-8 font-bold text-white text-4xl">About</h2>
          </div>
          {/* Gallery */}
          <div className="flex flex-col items-center text-slate-500 italic">
            {/* Cards */}
            <div className="mr-96 mt-12 hover:text-white hover:scale-105 transition-all">
              <div className="border-2 rounded-xl border-slate-500 p-4">
                <p>
                  By using UTutor, you can generate full courses on any topic.
                  Courses come with a full AI-powered curriculum which includes
                  multiple unit, each containing lessons with a full summary and
                  video.
                </p>
              </div>
            </div>
            <div className="ml-96 mt-24 hover:text-white hover:scale-105 transition-all">
              <div className="border-2 rounded-xl border-slate-500 p-4">
                <p>
                  With no need to spend hours building your own roadmaps or
                  searching for hard-to-find resources, you&apos;ll save tons of
                  time while cruising forward with your studies.
                </p>
              </div>
            </div>
            <div className="mr-96 mt-24 hover:text-white hover:scale-105 transition-all">
              <div className="border-2 rounded-xl border-slate-500 p-4">
                <p>
                  Courses can be built for any topic, no matter how obscure.
                  From learning Greek to mastering the art of pumpkin carving,
                  there are no limits to the kinds of courses you can create.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <footer className="left-0 right-0 bg-slate-900 border-t-2 border-white">
        <div className="py-6 px-16 flex flex-row justify-center gap-x-8 text-slate-400">
          <ul>
            <li className="text-white font-bold">
              <h3>Contact Us</h3>
            </li>
            <li>
              <a href="#">Email</a>
            </li>
            <li>
              <a href="#">Phone</a>
            </li>
          </ul>
          <ul>
            <li className="text-white font-bold">
              <h3>
                <a href="#">Privacy Policy</a>
              </h3>
            </li>
          </ul>
          <ul>
            <li className="text-white font-bold">
              <h3>
                <a href="#">Support</a>
              </h3>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
