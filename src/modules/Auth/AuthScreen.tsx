import logo from "/VisiBuy - White Colored.png";
import lockIcon from "/lock.png";
import { Toaster } from "../../ui/Toaster";

type AuthScreenProps = {
  title: "Sign Up" | "Login" | "Password Recovery";
  formComponent: React.ReactNode;
};

export function AuthScreen({ title, formComponent }: AuthScreenProps) {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex h-full w-full">
        <div className="bg-blue min-h-screen w-2/3">
          <img src={logo} alt="Visibuy logo" className="w-80 mt-36 ml-28" />
          <div className="flex gap-x-8 ml-28 pt-28 items-center">
            <img src={lockIcon} alt="lock" className="w-16" />
            <span>
              <p className="text-3xl text-primary-foreground font-normal">
                {title}
              </p>
            </span>
          </div>
        </div>
        <div className="w-full text-center flex mt-11 items-center justify-center">
          {formComponent}
          <Toaster />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden min-h-screen w-full relative overflow-hidden bg-white">
        <div className="absolute top-0 w-full h-[40vh] bg-blue animate-bounce-slow rounded-b-3xl"></div>
        <div className="relative z-10 pt-6 px-4 flex justify-start">
          <img src={logo} alt="Visibuy logo" className="w-48" />
        </div>
        <div className="relative z-10 mt-20 px-4">
          <div className="bg-white shadow-lg rounded-xl px-6 py-5">
            {formComponent}
          </div>
          <Toaster />
        </div>
      </div>
    </>
  );
}
