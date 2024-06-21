/* eslint-disable @next/next/no-img-element */

import MaxWidthWrapper from "./MaxWidthWrapper"
import { ReviewPhoneGrid } from "./ReviewPhoneGrid"

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
        <img 
          aria-hidden="true"
          src="/what-people-are-buying.png" 
          alt="what people are buying image" 
          className="absolute select-none hidden xl:block -left-32 top-1/3"
        />

        <ReviewPhoneGrid />
    </MaxWidthWrapper>
  )
}

export default Reviews