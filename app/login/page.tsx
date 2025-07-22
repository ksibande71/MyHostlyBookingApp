import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </div>
  )
}
