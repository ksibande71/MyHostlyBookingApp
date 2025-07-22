"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("HostCover information coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  HostCover
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Anti-discrimination policy coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Anti-discrimination
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Disability support information coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Disability support
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Cancellation options coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Cancellation options
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/host" className="text-gray-600 hover:text-gray-900">
                  Hostly your home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("HostCover for Hosts information coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  HostCover for Hosts
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Hosting resources coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Hosting resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Community forum coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Community forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Hosting responsibly guide coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Hosting responsibly
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hostly</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => alert("Newsroom coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Newsroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("New features coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  New features
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Careers page coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Investors information coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Investors
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Gift cards coming soon!")}
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  Gift cards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open("https://facebook.com", "_blank")}
                className="text-gray-600 hover:text-gray-900"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open("https://twitter.com", "_blank")}
                className="text-gray-600 hover:text-gray-900"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open("https://instagram.com", "_blank")}
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© 2024 Hostly, Inc.</span>
            <button onClick={() => alert("Privacy policy coming soon!")} className="hover:text-gray-900">
              Privacy
            </button>
            <button onClick={() => alert("Terms of service coming soon!")} className="hover:text-gray-900">
              Terms
            </button>
            <button onClick={() => alert("Sitemap coming soon!")} className="hover:text-gray-900">
              Sitemap
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => alert("Language selector coming soon!")} className="hover:text-gray-900">
              English (US)
            </button>
            <button onClick={() => alert("Currency selector coming soon!")} className="hover:text-gray-900">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
