import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export interface DrawerProps {
  openDrawer: boolean;
  closeDrawer: () => void;
  children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  openDrawer,
  closeDrawer,
  children,
}) => {
  return (
    <>
      <Sheet open={openDrawer}>
        <SheetContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] h-screen p-0 gap-0 w-full flex flex-col">
          <ScrollArea>
            <div className="p-[30px]">{children}</div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Drawer;
