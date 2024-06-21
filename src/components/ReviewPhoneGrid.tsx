"use client"

import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import Phone from "./Phone"

export function ReviewPhoneGrid () {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.4 })
    const columns = splitArray(PHONES, 3)
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)

    return (
        <div 
          ref={containerRef}
          className="bg-green-200  relative -mx-[10px] mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
            {isInView && (
                <>
                  <ReviewPhoneColumn 
                    reviews={[...column1, ...column3.flat(), ...column2]}
                    reviewClassName={(reviewIndex) => cn({
                        "md:hidden": reviewIndex >= column1.length + column3.length,
                        "lg:hidden": reviewIndex >= column1.length
                    })}
                    msPerPixels={10}
                  />
                  <ReviewPhoneColumn 
                    reviews={[...column2, ...column3[1]]}
                    className="hidden md:block"
                    reviewClassName={(reviewIndex) => reviewIndex >= column2.length ? "lg:hidden" : ""}
                    msPerPixels={15}
                  />
                  <ReviewPhoneColumn 
                    reviews={column3.flat()}
                    className="hidden md:block"
                    msPerPixels={10}
                  />
                </>
            )}
            <div className="absolute pointer-events-none inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-100"/>
            <div className="absolute pointer-events-none inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-100"/>
        </div>
    )
}

const PHONES = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg",
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = []
    //console.log(array[0])

    for (let i = 0; i < array.length; i++) {
        // console.log("i= " + i)
        const index = i % numParts;
        // console.log("index = " + index)
        // console.log(!result[index])
        if (!result[index]) {
            
            result[index] = []
        }
        result[index].push(array[i])
        
    }

    // console.log(result)
    return result
}

interface ReviewPhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}

function ReviewPhone({imgSrc, className, ...props}: ReviewPhoneProps) {
    const ANIMATION_DELAYS = [
        "0s", "1s", "2s", "3s", "4s", "5s",
    ]

    const animationDelay = ANIMATION_DELAYS[
        Math.floor(Math.random() * ANIMATION_DELAYS.length)
    ]

    return (
        <div 
          className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)}
          style={{animationDelay}} 
          {...props}
        >
            <Phone imgSrc={imgSrc}/>
        </div>
    )
}

interface ReviewPhoneColumnProps {
    reviews: string[]
    className?: string
    reviewClassName?: (reviewIndex: number) => string
    msPerPixels?: number
}

function ReviewPhoneColumn({reviews, className, reviewClassName, msPerPixels=0}: ReviewPhoneColumnProps) {
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
    const duration = `${columnHeight * msPerPixels}ms`

    useEffect(() => {
        if(!columnRef.current) return

        const resizeObserver = new ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })
        resizeObserver.observe(columnRef.current)

        return () => resizeObserver.disconnect()

    }, [])

    return (
        <div 
          ref={columnRef}
          className={cn("animate-marquee space-y-8 py-4", className)}
          style={{"--marquee-duration": duration} as React.CSSProperties}
        >
            {reviews.concat(reviews).map((imgSrc, reviewIndex) =>(
                <ReviewPhone 
                  key={reviewIndex} 
                  className={reviewClassName?.(reviewIndex & reviews.length)} 
                  imgSrc={imgSrc}
                />
            ))}
        </div>
    )
}

