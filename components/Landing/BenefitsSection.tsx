import { BarChart2, MessageCirclePlus, Repeat2, Globe } from 'lucide-react';

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

export function BenefitsSection() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="text-center">
        <div className="mx-auto inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
          be discovered
        </div>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl w-[80%] sm:w-full mx-auto">
          the benefits of building in public
        </p>
        <p className="text-gray-500 mt-6 sm:w-[90%] lg:w-[80%] mx-auto text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Sharing your development journey can help you grow an audience, get
          valuable feedback, and stay motivated throughout your projects.
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
  );
}
