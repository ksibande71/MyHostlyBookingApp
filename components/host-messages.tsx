"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function HostMessages() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const messages = [
    {
      id: "1",
      guestName: "John Smith",
      propertyName: "Cozy Mountain Cabin",
      lastMessage: "Hi! What time is check-in?",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      guestName: "Sarah Johnson",
      propertyName: "Downtown Loft",
      lastMessage: "Thank you for the great stay!",
      timestamp: "1 day ago",
      unread: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            className="pl-10 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(`/host/messages/${message.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{message.guestName}</h3>
                      {message.unread && (
                        <Badge variant="default" className="bg-teal-600">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{message.propertyName}</p>
                    <p className="text-sm text-gray-800">{message.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{message.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-gray-600">Messages from your guests will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
