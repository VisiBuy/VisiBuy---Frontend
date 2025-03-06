import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import logo from "/VisiBuy - White Colored.png";
import lockIcon from "/lock.png";
import { Toaster } from "../../ui/Toaster";
import { SignUpForm } from "./features/components/signup-form";
export function SignUpScreen() {
  return (
    <div className='flex columns-2 h-full w-full'>
      <div className='bg-blue min-h-screen w-2/3'>
        <img src={logo} alt='Visibuy logo' className='w-80 mt-36 ml-28 ' />
        <div className='flex gap-x-8 ml-28 pt-28  items-center'>
          <img src={lockIcon} alt='lock' className='w-16   ' />
          <span>
            <p className='text-3xl text-primary-foreground font-normal'>
              Sign Up
            </p>
          </span>
        </div>
      </div>
      <div className=' w-full text-center flex items-center justify-center'>
        <SignUpForm />
        <Toaster />
      </div>
    </div>
  );
}
