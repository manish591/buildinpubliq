import Image from 'next/image';
import { Loader } from '@/components/loader';

export default function Loading() {
  return (
    <div className="h-full relative w-full border-4 flex items-center justify-center">
      <div className="flex itmes-center gap-4">
        <Image
          src="/favicon.ico"
          width={30}
          height={30}
          alt="logo"
          className="dark:border dark:border-gray-100 dark:rounded-md dark:p-1"
        />
        <h2 className="text-2xl font-bold">Buildd</h2>
      </div>
      <div className="absolute left-10 bottom-10 flex items-center gap-4">
        <Loader />
        <span>Loading Buildd</span>
      </div>
    </div>
  );
}
