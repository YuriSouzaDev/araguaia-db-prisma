import { userGet } from '@/app/actions/user-get';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

const HeaderNav = async () => {
  const { data } = await userGet();

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-custom-bgSideNav pl-[240px] h-[70px] z-10 shadow-3xl">
      <div className="flex w-full justify-end px-[10px] py-[15px] gap-5 max-w-1470 mx-auto">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {data && (
          <div className="flex flex-col gap-[3px] justify-center items-start">
            <p className="text-sm text-custom-textBlack font-bold">
              {`${data?.name} ${data?.lastName}`}
            </p>
            <span className="text-xs text-custom-textBlack font-semibold capitalize">
              {data?.role}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderNav;
