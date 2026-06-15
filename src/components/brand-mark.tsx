import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

/** Sadah wordmark + "كونكت" sub-brand label. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Image
        src="/logo.png"
        alt="سادة كونكت"
        width={92}
        height={31}
        priority
        className="h-7 w-auto"
      />
      {/* <span className="text-[15px] font-extrabold text-navy">كونكت</span> */}
    </span>
  );
}
