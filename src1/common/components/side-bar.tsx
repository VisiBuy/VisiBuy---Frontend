import React from "react";
import logo from "/visibuy-beta.svg";
export function SideBar({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    
      <div className="text-center flex flex-col items-center border-r border-light-gray fixed h-screen w-[20%] overflow-y-auto ">
        <div className="mx-8 mt-12 ">
          <img src={logo} alt="Visibuy beta"  width={200}/>
        </div>
        {children}
      </div>
    
  );
}
