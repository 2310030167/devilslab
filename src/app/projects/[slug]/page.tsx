
import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="case-study-page">
      {/* Hero Section */}
      <section className="project-hero relative bg-gradient-to-br from-primary to-accent text-white py-48 px-8 text-center overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">{project.heroTagline}</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-8">
        {/* Overview Box */}
        <div className="overview-box bg-white border border-gray-200/80 rounded-2xl shadow-xl p-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-24 relative z-20 mb-24">
          <div className="overview-item">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client</h4>
            <p className="text-lg font-medium text-primary">{project.overview.client}</p>
          </div>
          <div className="overview-item">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</h4>
            <p className="text-lg font-medium text-primary">{project.overview.services}</p>
          </div>
          <div className="overview-item">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</h4>
            <p className="text-lg font-medium text-primary">{project.overview.timeline}</p>
          </div>
          <div className="overview-item">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.overview.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-16">
            {/* The Challenge */}
            <section>
              <h2 className="text-4xl font-bold mb-6 text-gradient">The Challenge</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>{project.challenge}</p>
              </div>
            </section>

            {/* The Solution */}
            <section>
              <h2 className="text-4xl font-bold mb-6 text-gradient">The Solution</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>{project.solution}</p>
              </div>
            </section>
             {/* Results & Impact */}
            <section>
              <h2 className="text-4xl font-bold mb-6 text-gradient">Results & Impact</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                    {project.results.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
                {project.quote && (
                    <blockquote className="border-l-4 border-accent pl-6 italic mt-8">
                        <p>"{project.quote.text}"</p>
                        <cite className="block text-right not-italic text-primary font-medium mt-4">— {project.quote.author}</cite>
                    </blockquote>
                )}
              </div>
            </section>
          </div>

          <aside className="lg:sticky top-32">
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-8">
              <div className="relative h-48 w-full mb-6 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                {project.imageUrl ? (
                  <Image
                      src={project.imageUrl}
                      alt={`${project.title} logo`}
                      fill
                      className="object-contain p-4"
                  />
                ) : (
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-primary">Coming Soon</h4>
                  </div>
                )}
              </div>
              <a href="https://Dendrites.ai" target="_blank" rel="noopener noreferrer" className="text-center text-muted-foreground mb-6 block hover:text-accent transition-colors">
                Powered by DNDX <ArrowUpRight className="inline-block" size={16} />
              </a>
              {project.liveUrl ? (
                <Button asChild size="lg" className="w-full rounded-full py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit Project</a>
                </Button>
              ) : (
                <Button size="lg" disabled className="w-full rounded-full py-7 text-lg font-semibold cursor-not-allowed">
                    Coming Soon
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>
      <div className="py-24 text-center px-8">
            <h3 className="text-3xl font-bold text-primary mb-4">Have a similar project in mind?</h3>
            <p className="text-muted-foreground text-lg mb-8">Let's build the future together.</p>
            <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <Link href="/#contact">Get In Touch</Link>
            </Button>
        </div>
    </article>
  );
}
