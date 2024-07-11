import { BarChart2, MessageCirclePlus, Repeat2, Globe } from "lucide-react";

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
      'We help you create your feature announcement post for plateforms like twitter, linkedIn and Instagram.',
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
      'find other people work in the discover tab. share your work to get discovered',
    icon: Globe,
  },
]

export function BenefitsSection() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl lg:text-center">
        <h2 className="text-base font-semibold leading-7">be discovered</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          the benefits of building in public
        </p>
        <p className="mt-6 text-lg leading-8 lg:px-16">
          Sharing your development journey can help you grow an audience, get valuable feedback, and stay motivated throughout your projects.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-lg font-semibold leading-7">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <feature.icon aria-hidden="true" className="h-6 w-6" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}