import { Dialog } from '@/components/ui/dialog';

export function Modal({
  children,
  isOpen,
  setIsOpen,
}: Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </Dialog>
  );
}
