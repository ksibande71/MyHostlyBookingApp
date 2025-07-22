"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, User, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  const handleSearch = () => {
    router.push("/search")
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-teal-600 hidden sm:block">hostly</span>
          </Link>

          {/* Search Bar */}
          <div
            className="hidden md:flex items-center space-x-4 bg-white border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleSearch}
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Anywhere</span>
              <div className="w-px h-6 bg-gray-300" />
              <span className="text-sm font-medium">Any week</span>
              <div className="w-px h-6 bg-gray-300" />
              <span className="text-sm text-gray-600">Add guests</span>
            </div>
            <Button size="sm" className="rounded-full bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/host" className="hidden sm:block text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-full">
              Hostly your home
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => alert("Language selector coming soon!")}
            >
              <Globe className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full px-3 py-2 border-gray-300 bg-transparent">
                  <Menu className="w-4 h-4 mr-2" />
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
                    <AvatarFallback>
                      {isAuthenticated ? user?.firstName?.[0] || "U" : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/trips">My trips</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/host">Hostly your home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help">Help Center</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Sign up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Log in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/host">Hostly your home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/experiences">Host an experience</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help">Help Center</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
