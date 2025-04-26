import { cn } from "../lib/utils";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
interface MainLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactNode;
  children: React.ReactNode;
}
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export function MainLayout({
  title,
  children,
  className,
  id,
}: MainLayoutProps) {
  return (
    <div>
      <ScrollToTop />
      <h2 className='font-Montserrat text-4xl font-semibold my-12'>{title} </h2>
      <div
        className={cn(
          `border border-light-gray p-10 min-h-dvh lg:min-h-screen rounded-xl `,
          className
        )}
        id={id}
      >
        {children}
      </div>
    </div>
  );
}
