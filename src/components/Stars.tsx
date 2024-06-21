/* eslint-disable @next/next/no-img-element */

import { Star } from "lucide-react"

const Stars = ({count}: {count: number}) => {
    
    function renderStars() {
        const stars = []
        for (let i = 0; i < count; i++) {
            stars.push(<Star key={i} className='h-5 w-5 text-green-600 fill-green-600' />)
            
        }
        return stars
    }

  return (
    <>
        {renderStars()}
    </>
  )
}

export default Stars