"use client"

import { useState } from "react"
import { X, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "email" | "signup" | "login">("phone")
  const [formData, setFormData] = useState({
    countryCode: "+27",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })
  const { login, signup, socialLogin } = useAuth()

  const handlePhoneSubmit = () => {
    if (!formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to continue.",
        variant: "destructive",
      })
      return
    }
    setStep("signup")
  }

  const handleEmailSubmit = () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email to continue.",
        variant: "destructive",
      })
      return
    }

    // Check if user exists and redirect to login
    const existingUsers = JSON.parse(localStorage.getItem("hostly_users") || "[]")
    const userExists = existingUsers.some((u: any) => u.email === formData.email)

    if (userExists) {
      setStep("login")
    } else {
      setStep("signup")
    }
  }

  const handleSignup = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: "All fields required",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const success = await signup({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    })

    if (success) {
      toast({
        title: "Account created!",
        description: "Welcome to Hostly! You can now complete your booking.",
      })
      onSuccess?.()
      onClose()
      resetForm()
    } else {
      toast({
        title: "Signup failed",
        description: "An account with this email already exists. Please try logging in.",
        variant: "destructive",
      })
      setStep("login")
    }
  }

  const handleLogin = async () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email to log in.",
        variant: "destructive",
      })
      return
    }

    const success = await login(formData.email)

    if (success) {
      toast({
        title: "Logged in successfully!",
        description: "Welcome back! You can now complete your booking.",
      })
      onSuccess?.()
      onClose()
      resetForm()
    } else {
      toast({
        title: "Login failed",
        description: "No account found with this email. Please sign up first.",
        variant: "destructive",
      })
      setStep("signup")
    }
  }

  const handleSocialLogin = async (provider: string) => {
    const success = await socialLogin(provider, {
      email: `user@${provider}.com`,
      firstName: "John",
      lastName: "Doe",
      phone: formData.phone,
    })

    if (success) {
      toast({
        title: "Logged in successfully!",
        description: `Welcome! You can now complete your booking.`,
      })
      onSuccess?.()
      onClose()
      resetForm()
    } else {
      toast({
        title: "Login failed",
        description: "There was an error with social login. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      countryCode: "+27",
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    })
    setStep("phone")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => (step !== "phone" ? setStep("phone") : null)}>
              {step !== "phone" && "←"}
            </Button>
            <DialogTitle>
              {step === "phone" && "Log in or sign up to book"}
              {step === "email" && "Log in or sign up to book"}
              {step === "signup" && "Finish signing up"}
              {step === "login" && "Welcome back"}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {step === "phone" && (
            <>
              <div className="space-y-2">
                <Label>Country code</Label>
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+27">South Africa (+27)</SelectItem>
                    <SelectItem value="+1">United States (+1)</SelectItem>
                    <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Phone number</Label>
                <Input
                  placeholder="734539955"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <p className="text-xs text-gray-600">
                  We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
                  <button className="underline">Privacy Policy</button>
                </p>
              </div>

              <Button onClick={handlePhoneSubmit} className="w-full bg-teal-600 hover:bg-teal-700">
                Continue
              </Button>

              <div className="text-center text-sm text-gray-600">or</div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Continue with Facebook
                </Button>

                <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialLogin("google")}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialLogin("apple")}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Continue with Apple
                </Button>

                <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep("email")}>
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with email
                </Button>
              </div>
            </>
          )}

          {step === "email" && (
            <>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <Button onClick={handleEmailSubmit} className="w-full bg-teal-600 hover:bg-teal-700">
                Continue
              </Button>

              <div className="text-center">
                <button className="text-sm underline" onClick={() => setStep("login")}>
                  Already have an account? Log in
                </button>
              </div>
            </>
          )}

          {step === "signup" && (
            <>
              <div className="space-y-2">
                <Label>Phone number</Label>
                <Input value={`${formData.countryCode} ${formData.phone}`} disabled className="bg-gray-50" />
                <div className="text-right">
                  <button className="text-sm underline" onClick={() => setStep("phone")}>
                    Already have an account? Log in
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Contact info</h3>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-xs text-gray-600">We'll email you trip confirmations and receipts.</p>
                </div>

                <h3 className="font-semibold">Legal name</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="First name on ID"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <Input
                    placeholder="Last name on ID"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <p className="text-xs text-gray-600">
                    Make sure this matches the name on your government ID. If you go by another name, you can add a{" "}
                    <button className="underline">preferred first name</button>.
                  </p>
                </div>
              </div>

              <Button onClick={handleSignup} className="w-full bg-teal-600 hover:bg-teal-700">
                Agree and continue
              </Button>
            </>
          )}
          {step === "login" && (
            <>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <Button onClick={handleLogin} className="w-full bg-teal-600 hover:bg-teal-700">
                Log in
              </Button>

              <div className="text-center">
                <button className="text-sm underline" onClick={() => setStep("signup")}>
                  Don't have an account? Sign up
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
