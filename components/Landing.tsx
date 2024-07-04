import Link from "next/link";
import Image from "next/image";
import { CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-36 bg-background">
          <div className="container px-4 md:px-6 space-y-8">
            <div className="px-4 sm:px-6 md:gap-8 lg:gap-12">
              <div className="w-[80%] mx-auto text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl">
                Building in Public: Showcase Live, Reach Community
                </h1>
                <p className="mt-3 w-[90%] mx-auto text-muted-foreground md:text-xl">
                Join us in actively building and showcasing projects live, where every creation has the potential to reach and resonate with a vibrant community of developers and enthusiasts worldwide.
                </p>
                <Link href="/login">
                  <Button className="mt-8 inline-flex gap-4 h-14 items-center justify-center rounded-md px-16 text-lg font-medium">
                    <span>Get started</span>
                    <CircleArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6 space-y-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Featured Projects</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Showcase the projects you&apos;re building in public on your personal landing page.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project 1</CardTitle>
                      <CardDescription>A description of the first project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
                        >
                          <Image src="/x.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                          Tweet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Project 2</CardTitle>
                      <CardDescription>A description of the second project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
                        >
                          <Image src="/x.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                          Tweet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Project 3</CardTitle>
                      <CardDescription>A description of the third project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
                        >
                          <Image src="/x.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                          Tweet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Project 4</CardTitle>
                      <CardDescription>A description of the fourth project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
                        >
                          <Image src="/x.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                          Tweet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
              <div className="container px-4 md:px-6 space-y-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Resources for Building in Public
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Check out these tips and resources to help you build in public and grow your developer audience.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Twitter <br></br>Tips</CardTitle>
                      <CardDescription>
                        Effective strategies for growing your Twitter audience as a developer.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Link
                          href="#"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                          prefetch={false}
                        >
                          Read More
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Blogging Best Practices</CardTitle>
                      <CardDescription>Tips for creating a successful developer blog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Link
                          href="#"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                          prefetch={false}
                        >
                          Read More
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Building in Public Mindset</CardTitle>
                      <CardDescription>Cultivate the right mindset for building in public.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Link
                          href="#"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                          prefetch={false}
                        >
                          Read More
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Networking for Developers</CardTitle>
                      <CardDescription>Effective strategies for networking as a developer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Link
                          href="#"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                          prefetch={false}
                        >
                          Read More
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}