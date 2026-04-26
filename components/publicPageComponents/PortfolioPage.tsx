"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BriefcaseBusiness,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Menu,
  Twitter ,
  Instagram,
  MessageCircle,
  Youtube,
  Eye,
} from "lucide-react";




import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";


const PortfolioPageComponent = ({
  education,
  experiences,
  latestBlogs,
  user,
}: any) => {
  const [open, setOpen] = useState(false);

  const iconMap = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  instagram: Instagram,
  whatsapp: MessageCircle,
  youtube: Youtube,
  twitter: Twitter ,
};

  return (
    <main className="min-h-screen bg-[#FCFCF9] text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-4 z-50 px-4 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-white/70 backdrop-blur-xl border px-4 sm:px-6 py-3 shadow-sm">

          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="h-9 w-9" />
            <Logo/>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#blogs">Blogs</a>
            <a href="#contact">Contact</a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <Twitter  /> : <Menu />}
          </button>
        </nav>

      {/* MOBILE MENU */}
{open && (
  <>
    {/* BACKDROP */}
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
    />

    {/* DRAWER */}
    <div className="fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white z-50 shadow-xl p-6 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-8 w-8" />
          <span className="font-semibold text-lg">
            Food<span className="text-emerald-600">Folio</span>
          </span>
        </div>

        <button onClick={() => setOpen(false)}>
          <Twitter  className="h-5 w-5" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex flex-col gap-6 text-base font-medium">
        <a href="#education" onClick={() => setOpen(false)} className="hover:text-emerald-600">
          Education
        </a>
        <a href="#experience" onClick={() => setOpen(false)} className="hover:text-emerald-600">
          Experience
        </a>
        <a href="#blogs" onClick={() => setOpen(false)} className="hover:text-emerald-600">
          Blogs
        </a>
        <a href="#contact" onClick={() => setOpen(false)} className="hover:text-emerald-600">
          Contact
        </a>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link href="/blogs">
          <Button className="w-full rounded-full bg-emerald-600">
            Explore Articles
          </Button>
        </Link>
      </div>
    </div>
  </>
)}
      </header>

      {/* HERO */}
<section className="px-4 sm:px-6 lg:px-20 pt-24 pb-16 bg-gradient-to-b from-emerald-50/40 to-transparent">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

    {/* IMAGE FIRST ON MOBILE */}
    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
      <img
        src={user.profileImage}
        className="rounded-2xl shadow-lg h-[280px] w-[220px] sm:h-[340px] sm:w-[260px] object-cover"
      />
    </div>

    {/* TEXT */}
    <div className="order-2 lg:order-1 text-center lg:text-left">

      {/* TOP INFO GROUP */}
      <div className="flex flex-col items-center lg:items-start gap-3">

        {/* LOCATION */}
        <span className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-sm text-emerald-700">
          <Globe className="h-4 w-4" />
          {user.location }
        </span>

        {/* BRAND */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-5 w-5" />
          <span className="text-sm text-slate-500 font-medium">
            Food<span className="text-emerald-600">Folio</span>
          </span>
        </div>

        {/* NAME */}
        <p className="text-xs tracking-[0.2em] text-emerald-600 font-medium">
          {user.name }
        </p>
      </div>

      {/* HEADING */}
      <h1 className="mt-5 text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
        Building Safer
        <br />
        Food Systems with
        <span className="text-emerald-600"> FoodFolio</span>
      </h1>

      {/* DIVIDER */}
      <div className="mt-4 mx-auto lg:mx-0 h-1 w-12 bg-emerald-500 rounded-full" />

      {/* DESCRIPTION */}
      <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
       {user.bio}
      </p>

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
        <Link href="/blogs" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto rounded-full bg-emerald-600 hover:bg-emerald-700">
            Explore Articles
          </Button>
        </Link>

        <a href="#contact" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto rounded-full">
            Contact Me
          </Button>
        </a>
      </div>

    </div>

  </div>
</section>

      {/* ABOUT */}
      <section className="px-6 lg:px-20 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">About FoodFolio</h2>
          <p className="mt-4 text-slate-600 text-lg">
           {user.about}
          </p>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-bold mb-10">Education</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item: any) => (
            <Card key={item.degree} className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <GraduationCap className="text-emerald-600 mb-3" />
                <h3 className="font-semibold">{item.degree}</h3>
                <p className="text-slate-600">{item.institute}</p>
                <p className="text-sm text-slate-400">{item.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="bg-white px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-bold mb-10">Experience</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp: any) => (
            <Card key={exp.role} className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <BriefcaseBusiness className="text-emerald-600 mb-3" />
                <p className="text-emerald-600 text-sm">{exp.company}</p>
                <h3 className="font-semibold mt-2">{exp.role}</h3>

                <ul className="mt-4 text-sm text-slate-600 space-y-2">
                  {exp.points.map((p: string) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="px-6 lg:px-20 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Latest Articles</h2>

          <Link href="/blogs">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latestBlogs.map((blog: any) => (
            <Link key={blog._id} href={`/blogs/${blog.slug}`}>
              <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition">
                <img
                  src={blog.image || "/blog.png"}
                  className="h-44 w-full object-cover"
                />

                <CardContent className="p-5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                     <span className="flex items-center gap-1">
    <Eye size={14} className="text-slate-400" />
    {blog.views }
  </span>
                  </div>

                  <h3 className="mt-2 font-semibold line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                    {blog.excerpt || blog.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT */}
          <section id="contact" className="px-6 lg:px-20 py-20">
  <div className="max-w-4xl mx-auto bg-emerald-50/80 backdrop-blur-xl rounded-3xl p-10 text-center shadow-sm">

    <Sparkles className="mx-auto text-emerald-600 mb-4 animate-pulse" />
    <Logo/>

    <h2 className="text-3xl font-bold mt-5">Let’s Connect</h2>

    <p className="mt-4 text-slate-600 max-w-xl mx-auto">
      Open to collaborations, consulting opportunities, and professional networking.
    </p>

    {/* SOCIALS */}
    <div className="mt-8 flex flex-wrap justify-center gap-4">

      {user.socials?.map((item: any, index: number) => {
        const Icon = iconMap[item.platform as keyof typeof iconMap];

        return (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="
                group flex items-center gap-2 
                px-5 py-2.5 
                rounded-full 
                bg-white/80 backdrop-blur 
                border border-gray-200
                shadow-sm

                text-sm font-medium capitalize

                transition-all duration-300 ease-in-out

                hover:bg-emerald-600 
                hover:text-white 
                hover:shadow-lg 
                hover:scale-105

                active:scale-95
              "
            >
              {Icon && (
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              )}

              {item.platform}
            </Button>
          </a>
        );
      })}

    </div>
  </div>
</section>

    </main>
  );
}

export default PortfolioPageComponent