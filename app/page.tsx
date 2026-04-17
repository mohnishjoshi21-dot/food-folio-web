import PortfolioPageComponent from "@/components/publicPageComponents/PortfolioPage";

export const metadata = {
  title: "Food Safety Blog & Research | FoodFolio",
  description:
    "Explore food safety, HACCP, risk management and quality assurance insights by Pranjal Pandya on FoodFolio.",
};

export default async function Home() {
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
    <>
      {/* 🔥 SEO hidden content (important) */}
      <section className="sr-only">
        <h1>
          Food Safety Blog, HACCP, Risk Management & Quality Assurance Insights
        </h1>
        <p>
          FoodFolio is a professional food safety blog sharing knowledge on
          HACCP, risk management, food quality assurance, and food technology.
          Learn from research-based insights and real-world industry experience.
        </p>
      </section>

      {/* MAIN UI */}
      <PortfolioPageComponent
        education={education}
        experiences={experiences}
        latestBlogs={latestBlogs}
      />
    </>
  );
}