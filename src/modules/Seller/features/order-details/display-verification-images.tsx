import { capitalize } from "@/lib/utils";

export const veiwMap = {
    'lv':'left-view',
    'rv':'right-view',
    'fv': 'front-view',
    'bv': 'back-view',
    'closeup': 'full-view'
}
export type IVeiwMap = 'lv'|'rv'|'fv'|'bv'|'closeup'

export interface IVerificationImages {
    view : IVeiwMap ;
    viewUrl : string
}
export interface IVerificationImagesProps 
{
    images: IVerificationImages[]
}

export const DisplayVerificationImage = ({images}:IVerificationImagesProps)=>{
  
  return ( <>
  <div className="flex flex-col md:flex-row gap-y-3 w-full gap-x-4 p-6 ">
    {images && images.map(({view,viewUrl})=><div key={view}>
      <img src={viewUrl} alt={view} className="w-full"/>
      <p className="text-base md:text-lg">{capitalize((veiwMap[view as IVeiwMap]))}</p>
   </div>)}
  </div>
  
  </>)
}