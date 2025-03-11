export function Header({children}:Readonly<{children:React.ReactNode}>){
    return <div className="border-b border-light-gray w-full py-12 pl-8 pr-12" >
       {children}  
    </div>
}