import Link from "next/link";
import {
  GraduationCap,
  BriefcaseBusiness,
  Award,
  ArrowUpRight,
  Calendar,
  Clock3,
  Globe,
  Microscope,
  Mail,
  Phone,
  Linkedin,
  BookOpen,
  Sparkles,
  Menu,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PortfolioPage() {
  const education = [
    {
      degree: "Master's in Food Safety and Risk Management",
      institute: "University of Parma, Italy",
      duration: "2025 – Present",
    },
    {
      degree: "Bachelor of Science in Food Technology (Honors)",
      institute: "Vikram University, India",
      duration: "2021 – 2025",
    },
  ];

  const experiences = [
    {
      role: "Intern Dietitian",
      company: "Apollo Hospitals",
      points: [
        "Provided dietary counselling for patients and families.",
        "Coordinated therapeutic meal planning with kitchen staff.",
      ],
    },
    {
      role: "Quality Department Intern",
      company: "Ariba Foods Pvt. Ltd.",
      points: [
        "Assisted in laboratory testing and audit documentation.",
        "Supported quality assurance and compliance processes.",
      ],
    },
    {
      role: "Dairy Industry Intern",
      company: "Ujjain Sahakari Dugdh Sangh",
      points: [
        "Observed dairy production and quality control systems.",
        "Learned supply chain and operational workflows.",
      ],
    },
  ];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blogs?page=1&limit=3&sort=newest&status=published`,
    { cache: "no-store" }
  );

  const blogData = await res.json();
  const latestBlogs = blogData?.data?.blogs || [];

  return (
    <main className="min-h-screen bg-[#FCFCF9] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-4 z-50 px-4 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-xl">
          <Link href="/" className="text-lg font-bold tracking-wide">
            Pranjal Pandya
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#education" className="hover:text-emerald-600 transition">
              Education
            </a>
            <a href="#experience" className="hover:text-emerald-600 transition">
              Experience
            </a>
            <a href="#blogs" className="hover:text-emerald-600 transition">
              Blogs
            </a>
            <a href="#contact" className="hover:text-emerald-600 transition">
              Contact
            </a>
          </div>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </nav>
      </header>

    {/* HERO SECTION */}
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-20 pt-12 sm:pt-16 lg:pt-24 pb-20">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(34,197,94,0.08),transparent_30%)]" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      
      {/* CONTENT */}
      <div className="text-center lg:text-left order-1">
        <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700">
          <Globe className="mr-2 h-4 w-4" />
          Parma, Italy
        </span>

        <p className="mt-5 text-sm font-semibold tracking-[0.3em] text-emerald-600">
          PRANJAL PANDYA
        </p>

        {/* MOBILE IMAGE */}
        <div className="mt-8 flex justify-center lg:hidden">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
              alt="Professional Portrait"
              className="h-[280px] w-[220px] object-cover"
            />
          </div>
        </div>

        <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          Advancing
          <span className="text-emerald-600"> Food Safety </span>
          Through Research &
          Industry Practice
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 lg:mx-0">
          Food Safety and Risk Management professional focused on improving food
          systems through scientific research, regulatory compliance, and
          practical industry implementation.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          Sharing insights on food safety, quality assurance, and nutrition.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link href="/blogs">
            <Button className="rounded-full bg-emerald-600 px-8 hover:bg-emerald-700">
              Explore Articles
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <a href="#contact">
            <Button variant="outline" className="rounded-full px-8">
              Contact Me
            </Button>
          </a>
        </div>
      </div>

      {/* DESKTOP IMAGE */}
      <div className="hidden lg:flex justify-end order-2">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <img
            src="/photo.png"
            alt="Professional Portrait"
            className="h-[420px] w-[340px] object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* EDUCATION */}
      <section id="education" className="px-6 py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Card className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Education</h2>
              <div className="space-y-6">
                {education.map((item) => (
                  <div key={item.degree}>
                    <p className="font-semibold">{item.degree}</p>
                    <p className="text-sm text-slate-600">{item.institute}</p>
                    <p className="text-xs text-slate-400">{item.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Core Focus Areas</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "Food Safety",
                  "HACCP",
                  "Risk Management",
                  "Quality Assurance",
                  "Nutrition",
                  "Research Methodology",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="bg-white px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-bold">Professional Experience</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {experiences.map((exp) => (
              <Card key={exp.role} className="rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-emerald-600">
                    {exp.company}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{exp.role}</h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">KNOWLEDGE HUB</p>
              <h2 className="text-3xl font-bold">Latest Articles</h2>
            </div>

            <Link href="/blogs">
              <Button variant="outline" className="rounded-full">
                View All Articles
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {latestBlogs.map((blog: any) => (
              <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.image || "/blog.png"}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 className="h-4 w-4" />
                        5 min read
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-xl font-semibold group-hover:text-emerald-600">
                      {blog.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm text-slate-500">
                      {blog.excerpt || blog.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-emerald-100 bg-emerald-50 px-8 py-14 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-emerald-600" />

          <h2 className="mt-4 text-3xl font-bold">Let’s Connect</h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Open to collaborations, consulting opportunities, academic discussions,
            and professional networking.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:pranjalpandya23@gmail.com">
              <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
            </a>

            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </a>

            <a href="tel:+918319052600">
              <Button variant="outline" className="rounded-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}