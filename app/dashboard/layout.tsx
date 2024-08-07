import HeaderNav from '@/app/components/HeaderNav/HeaderNav';
import SideNav from '@/app/components/SideNav/SideNav';

interface DashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayout> = ({ children }) => {
  return (
    <div>
      <SideNav />
      <HeaderNav />
      <div className="pl-[240px] pt-[70px]">
        <div className="max-w-1470 ml-auto mr-auto pt-5 px-[10px] pb-[60px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
