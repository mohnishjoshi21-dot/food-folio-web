"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

export default function PublicFooter() {
  return (
    <footer className="border-t mt-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 text-sm">

          {/* Branding */}
          <div className="space-y-4">
            <Logo/>
            <p className="text-muted-foreground leading-relaxed">
              A platform sharing insights on food safety, risk management,
              HACCP, and quality assurance. Built on research and real-world
              industry experience.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Explore</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/#contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">

              <a
                href="mailto:your-email@example.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail size={16} />
                Email
                <ArrowUpRight size={14} />
              </a>

              <p className="text-xs text-muted-foreground">
                Based in Parma, Italy
              </p>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FoodFolio. All rights reserved.
        </div>

      </div>
    </footer>
  );
}