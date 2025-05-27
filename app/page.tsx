import Link from 'next/link';
import {
  BarChart2,
  MessageCirclePlus,
  Repeat2,
  Globe,
  Link2,
  NotebookPen,
  Package2,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/magicui/grid-pattern';

const features = [
  {
    name: 'Track Your Projects',
    description:
      'as you develop your projects we will create updates using AI that you can track on the dashboard.',
    icon: BarChart2,
  },
  {
    name: 'Share Updates',
    description:
      'We help you create your feature announcement post for plateforms like twitter, linkedIn.',
    icon: Repeat2,
  },
  {
    name: 'Get Valuable Feedback',
    description:
      'Receive feedback from the community to improve your projects.',
    icon: MessageCirclePlus,
  },
  {
    name: 'Be Discovered',
    description:
      'built your personal brand online using our tools. Avoid the hassel of posting on socials',
    icon: Globe,
  },
];

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main className="space-y-32 sm:space-y-40">
        <div className="pt-24 md:pt-32 relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="w-full text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-[5.25rem]">
              Build in the open<br></br> connect to be found
            </h1>
            <p className="mt-6 w-[80%] sm:w-[75%] lg:w-[55%] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Create your projects in the open and be discovered by a community
              eager to connect, collaborate, and celebrate innovation. Share
              your learning each for better visibility.
            </p>
            <div className="flex items-center gap-6 justify-center mt-10">
              <Link href="/auth" className="inline-block">
                <Button className="rounded-md h-12 px-6 gap-2 text-base">
                  <span className="font-bold">
                    Start Your Journey - It&apos;s Free{' '}
                  </span>
                  <ArrowRight className="h-10"></ArrowRight>
                </Button>
              </Link>
            </div>
          </div>
          <GridPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ',
            )}
          />
        </div>
        <div id="benefits" className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <div className="mx-auto inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
              be discovered
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl w-[80%] sm:w-full mx-auto">
              the benefits of building in public
            </p>
            <p className="text-gray-500 mt-6 sm:w-[90%] lg:w-[80%] mx-auto text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sharing your development journey can help you grow an audience,
              get valuable feedback, and stay motivated throughout your
              projects.
            </p>
          </div>
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-lg font-semibold leading-7">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <feature.icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <section id="how-it-works" className="w-full pb-28 sm:pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div>
                <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
                  Simple Process
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works?
                </h2>
                <p className="text-gray-500 sm:w-[90%] lg:w-[75%] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-lg mt-6">
                  Our streamlined process makes getting started quick and easy.
                  Follow these simple steps to transform your experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <NotebookPen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">1. Describe</h3>
                <p className="text-center text-sm text-gray-500">
                  give your project a title and description. We&apos;ll use this
                  to create a perfect social post.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <Link2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">2. Connect</h3>
                <p className="text-center text-sm text-gray-500">
                  link your X and LinkedIn accounts. This allows us to post
                  updates on your behalf automatically.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <Package2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">3. Ship</h3>
                <p className="text-center text-sm text-gray-500">
                  push your code and create a pull request. We&apos;ll generate
                  a post for you based on your update.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">4. Launch</h3>
                <p className="text-center text-sm text-gray-500">
                  Your post is ready! Publish it right away or schedule it for
                  later.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/auth" className="inline-block">
                <Button
                  variant="outline"
                  className="rounded-md h-12 px-6 gap-2 text-base"
                >
                  <span className="font-bold">
                    Start Your Journey - It&apos;s Free{' '}
                  </span>
                  <ArrowRight className="h-10"></ArrowRight>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
