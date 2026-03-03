"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  Github,
  Mail,
  ArrowRight,
  Code,
  User,
  ArrowUpRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold">Dheeraj Ray</h1>

          <p className="text-xl text-muted-foreground">
            Full Stack Developer
          </p>

          <p className="max-w-2xl mx-auto text-muted-foreground">
            I build modern web applications using MERN stack and Next.js.
            I enjoy solving problems and building useful tools for developers.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={() => router.push("/blogs")}>
              Visit My Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/DheerajRay-01", "_blank")
              }
            >
              Github
              <Github className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <Separator />

        {/* ABOUT */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            About Me
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            I am an aspiring Full Stack Developer with experience in building
            real-world projects using MERN stack and Next.js.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            I have worked on multiple projects including developer collaboration
            platforms and AI-powered applications.
          </p>
        </section>

        <Separator />

        {/* SKILLS */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Code className="h-6 w-6" />
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "Express.js",
              "Tailwind CSS",
              "JavaScript",
              "C++",
              "GitHub",
            ].map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* PROJECTS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">DevCollab</h3>
                <p className="text-muted-foreground">
                  Developer collaboration platform built with MERN stack and
                  GitHub integration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Ankahe Lafz</h3>
                <p className="text-muted-foreground">
                  AI powered poetry generator using Gemini API.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* BLOG */}
        <section className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Blog</h2>

          <p className="text-muted-foreground">
            I write tutorials about web development.
          </p>

          <Button onClick={() => router.push("/blogs")}>
            Read My Blogs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        <Separator />

        {/* CONTACT */}
        <section className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Contact</h2>

          <div className="space-y-2 text-muted-foreground">
            <p>dheeraj@example.com</p>
            <p>+91 XXXXX XXXXX</p>
            <p>github.com/DheerajRay-01</p>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">

          <div className="space-y-3">
            <h3 className="font-semibold text-base">Dheeraj Ray</h3>
            <p className="text-muted-foreground">
              Full Stack Developer building modern web apps.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Navigation</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <button onClick={() => router.push("/")}>Home</button>
              <button onClick={() => router.push("/blogs")}>Blog</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <a
                href="https://github.com/DheerajRay-01"
                target="_blank"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Github size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </a>

              <a
                href="mailto:dheeraj@example.com"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t text-center text-xs text-muted-foreground py-4">
          © {new Date().getFullYear()} Dheeraj Ray. Built with Next.js.
        </div>
      </footer>
    </div>
  );
}