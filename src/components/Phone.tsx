/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
    dark?: boolean
}

const Phone = ({imgSrc, dark = false, className, ...props}: PhoneProps) => {
  return (
    <div 
      className={cn("z-50 relative pointer-events-none overflow-hidden", className)}
      {...props}
    >
       <img 
         src={
            dark
              ? "/phone-template-dark-edges.png"
              : "/phone-template-white-edges.png"
         } 
         alt="phone template image" 
       /> 

       <div className="absolute -z-10 inset-0">
        <img 
          src={imgSrc}
          alt="back cover image" 
          className="object-cover min-w-full max-h-full" 
        />
       </div>

    </div>
  )
}

export default Phone