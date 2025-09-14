export function WelcomeFeatureCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="border bg-background rounded-md p-6 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition-shadow">
      {children}
    </div>
  );
}
