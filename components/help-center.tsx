"use client"

import { useState } from "react"
import { Search, MessageCircle, Phone, Mail, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const helpTopics = [
  {
    title: "Getting started",
    articles: ["How to book", "Account setup", "Payment methods", "Cancellation policy"],
  },
  {
    title: "During your stay",
    articles: ["Check-in process", "House rules", "Contacting your host", "Reporting issues"],
  },
  {
    title: "Hosting",
    articles: ["List your space", "Pricing your listing", "Managing bookings", "Host requirements"],
  },
  {
    title: "Safety & Security",
    articles: ["Verified ID", "Secure payments", "Safety tips", "Emergency contacts"],
  },
]

const faqs = [
  {
    question: "How do I cancel my reservation?",
    answer:
      "You can cancel your reservation by going to your trips page and selecting the booking you want to cancel. Please note that cancellation policies vary by listing.",
  },
  {
    question: "When will I be charged for my reservation?",
    answer:
      "You'll be charged when your reservation is confirmed. For reservations longer than 28 nights, you'll be charged in installments.",
  },
  {
    question: "How do I contact my host?",
    answer:
      "You can message your host through the Airbnb platform. Go to your trips and select 'Contact Host' for the relevant booking.",
  },
  {
    question: "What if I need to change my reservation dates?",
    answer:
      "You can request to change your dates by contacting your host. They'll need to approve the change, and additional fees may apply.",
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search help articles..."
            className="pl-10 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && alert(`Searching for: ${searchQuery}`)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => alert("Opening live chat...")}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => alert("Calling support...")}>
          <CardContent className="flex items-center space-x-4 p-6">
            <Phone className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-sm text-gray-600">1-855-424-7262</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => alert("Opening email form...")}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <Mail className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-gray-600">Send us a message</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Help Topics */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse help topics</h2>
          <div className="space-y-4">
            {helpTopics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topic.articles.map((article, articleIndex) => (
                      <button
                        key={articleIndex}
                        className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded"
                        onClick={() => alert(`Opening article: ${article}`)}
                      >
                        <span className="text-sm">{article}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 ml-8">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-12 p-6 bg-red-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Need emergency assistance?</h3>
        <p className="text-red-700 mb-4">
          If you're experiencing an emergency during your stay, contact local emergency services immediately.
        </p>
        <Button
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
          onClick={() => alert("Emergency contact information displayed")}
        >
          Emergency Contacts
        </Button>
      </div>
    </div>
  )
}
