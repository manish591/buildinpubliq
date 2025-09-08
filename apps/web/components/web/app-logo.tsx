import Link from 'next/link';

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 app-logo">
      <div className="bg-primary w-7 h-7 rounded-sm flex items-center justify-center">
        <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
          b
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="font-normal text-xl">buildinpubliq</span>
      </div>
    </Link>
  );
}
