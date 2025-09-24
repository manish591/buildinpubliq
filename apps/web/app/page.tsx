import {
  ArrowRight,
  BarChart2,
  Globe,
  Link2,
  Linkedin,
  MessageCirclePlus,
  NotebookPen,
  Package2,
  Repeat2,
  Rocket,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/web/footer';
import { Header } from '@/components/web/header';
import {
  IconBrandBluesky,
  IconBrandThreads,
  IconBrandX,
} from '@tabler/icons-react';

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
      <Header />
      <main>
        <section className="py-12 relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-[1380px] grid grid-cols-2 px-4 items-center">
            <div>
              <h1 className="text-4xl font-medium leading-[1.2] sm:text-4xl md:text-[70px]">
                GitHub Pull Requests <br />
                <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
                  To
                </span>{' '}
                <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
                  Shareable
                </span>{' '}
                <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
                  Ideas.
                </span>
              </h1>
            </div>
            <div>
              <p className="text-right text-muted-foreground text-base/relaxed max-w-[70%] ml-auto">
                Auto-generate updates directly from your GitHub activity,
                schedule them in advance, and seamlessly publish across Twitter,
                LinkedIn.
              </p>
              <div className="flex items-center gap-4 justify-end mt-4">
                <Link href="/auth" className="inline-block">
                  <Button className="rounded-full">
                    <span>Get Started</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[1380px] px-4 mt-10">
            <div
              className="p-16 pb-0 rounded-3xl relative"
              style={{
                backgroundImage:
                  'linear-gradient(235.85134265566074deg, #ffffff 0%, var(--token-a61a6e73-ca59-4dcf-881d-6ea1b2705903, rgb(217, 217, 217)) 30.288460850715637%, rgb(255, 255, 255) 74.03846383094788%, rgb(235, 236, 237) 89.90384340286255%, rgb(228, 229, 231) 100%)',
              }}
            >
              <Image
                src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1758748255/Group_1_5_raonuw.png"
                alt="dashboard-mockup"
                width={1080}
                height={800}
                className="mx-auto rotate-2 w-[600px] mb-[-20px]"
              />
              <div className="absolute top-[20%] left-[23%] text-sm w-max p-0.5 rounded-[2px] bg-black opacity-40 blur-[3px]">
                <IconBrandX className="size-10 text-white" />
              </div>
              <div className="absolute top-[55%] left-[20%] text-sm w-max p-0.5 rounded-[2px] bg-[#0a66c2] opacity-40 blur-[3px]">
                <Linkedin className="size-10 text-white" />
              </div>
              <div className="absolute top-[30%] right-[23%] text-sm w-max p-0.5 rounded-[2px] bg-[#01AAFF] opacity-40 blur-[3px]">
                <IconBrandBluesky className="size-10 text-white" />
              </div>
              <div className="absolute top-[60%] right-[20%] text-sm w-max p-0.5 rounded-[2px] bg-black opacity-40 blur-[3px]">
                <IconBrandThreads className="size-10 text-white" />
              </div>
            </div>
          </div>
          <div className="w-full h-[120px] bg-background blur-xl absolute top-[85%]"></div>
        </section>
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <div className="mx-auto inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
              be discovered
            </div>
            <p className="mt-2 text-3xl font-bold sm:text-4xl w-[80%] sm:w-full mx-auto">
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
        <section className="w-full pb-28 sm:pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div>
                <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
                  Simple Process
                </div>
                <h2 className="mt-2 text-3xl font-bold sm:text-5xl">
                  How It Works?
                </h2>
                <p className="text-gray-500 sm:w-[90%] lg:w-[75%] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-lg mt-6">
                  Our streamlined process makes getting started quick and easy.
                  Follow these simple steps to transform your experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <NotebookPen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">1. Describe</h3>
                <p className="text-center text-sm text-gray-500">
                  give your project a title and description. We&apos;ll use this
                  to create a perfect social post.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <Link2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">2. Connect</h3>
                <p className="text-center text-sm text-gray-500">
                  link your X and LinkedIn accounts. This allows us to post
                  updates on your behalf automatically.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                  <Package2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">3. Ship</h3>
                <p className="text-center text-sm text-gray-500">
                  push your code and create a pull request. We&apos;ll generate
                  a post for you based on your update.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-xs">
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
