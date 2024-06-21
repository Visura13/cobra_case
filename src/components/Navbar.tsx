import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className="h-14 sticky z-[100] inset-x-0 top-0 w-full bg-white/75 backdrop-blur-lg transition-all border-b border-zinc-200">
        <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex z-40 font-semibold">
              case<span className="text-green-600">cobra</span>
            </Link>

            <div className="h-full flex items-center space-x-4">
              {user ? (
                <>
                <Link 
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Logout
                </Link>
                {isAdmin && (
                  <Link 
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Dashboard
                </Link>
                )}
                </>

              ) : (
                <>
                <Link 
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <Link 
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>
                
                </>
              )}
              <div className="h-8 w-px bg-zinc-200 hidden sm:block"/>

              <Link 
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Your Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
            </div>
        </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar