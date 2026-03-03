"use client";

import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="border-t mt-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 text-sm">

          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dheeraj Ray</h3>
            <p className="text-muted-foreground leading-relaxed">
              Full Stack Developer building modern web applications
              using MERN stack and Next.js.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="#projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">

              <a
                href="https://github.com/DheerajRay-01"
                target="_blank"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </a>

              <a
                href="mailto:dheeraj@example.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail size={16} />
                Email
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dheeraj Ray. Built with Next.js & Tailwind CSS.
        </div>

      </div>
    </footer>
  );
}