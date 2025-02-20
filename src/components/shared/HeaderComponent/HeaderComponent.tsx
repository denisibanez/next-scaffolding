import LocaleSwitcher from "@/components/shared/LocaleSwitcher/localeSwitcher";
import Image  from 'next/image';
import Logo from '@/assets/images/banner/next.png';

export default function HeaderComponent() {
  return (
  <>

  <div className="flex justify-between h-16 items-center w-full">
    <Image src={Logo} alt="Next.js Logo" width={60} height={60} />


    <LocaleSwitcher />
  </div>
  </>
  );
}