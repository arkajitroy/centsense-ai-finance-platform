import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Shield,
  Star,
  TrendingUp,
  Target,
  CheckCircle,
  Users,
  Award,
  Smartphone,
  Globe,
  Lock,
  PenBox,
  LayoutDashboard,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { checkUser } from "@/features/auth/services/check-user";

export default async function HomePage() {
  await checkUser();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECFAE5" }}>
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-lg mr-3"
                style={{ backgroundColor: "#0E2148" }}
              ></div>
              <h1 className="text-3xl font-black tracking-tight" style={{ color: "#0E2148" }}>
                Centsense<span style={{ color: "#483AA0" }}>AI</span>
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* <a
                href="#features"
                className="text-gray-700 hover:text-[#0E2148] transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-[#0E2148] transition-colors font-medium"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-[#0E2148] transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-[#0E2148] transition-colors font-medium"
              >
                Testimonials
              </a> */}

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Button variant="outline">
                    <LayoutDashboard size={18} />
                    <span className="hidden md:inline">Dashboard</span>
                  </Button>
                </Link>
                <a href="/transaction/create">
                  <Button className="flex items-center gap-2">
                    <PenBox size={18} />
                    <span className="hidden md:inline">Add Transaction</span>
                  </Button>
                </a>
              </SignedIn>

              <SignedOut>
                <Link href={"/sign-in"}>
                  <Button
                    variant="outline"
                    className="border-[#0E2148] text-[#0E2148] hover:bg-[#0E2148] hover:text-white font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Badge
              className="mb-8 text-sm font-semibold px-4 py-2"
              style={{ backgroundColor: "#7965C1", color: "white" }}
            >
              🚀 Now with Advanced AI Analytics
            </Badge>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-none">
              <span style={{ color: "#0E2148" }}>The Future of</span>
              <br />
              <span className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] bg-clip-text text-transparent">
                Financial Intelligence
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
              Transform your financial decisions with
              <span className="font-semibold text-[#0E2148]"> AI-powered insights</span>, automated
              tracking, and personalized recommendations that adapt to your lifestyle.
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Join 150,000+ users who&apos;ve increased their savings by an average of 40% in the
              first year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-xl px-12 py-6 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "#0E2148" }}
              >
                Start Your Financial Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-12 py-6 font-semibold rounded-xl border-2"
                style={{ borderColor: "#483AA0", color: "#483AA0" }}
              >
                Watch Demo
              </Button>
            </div>
            <div className="mt-16 flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Free 30-day trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4" style={{ color: "#0E2148" }}>
              Trusted by Financial Leaders
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Real results from real users worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black mb-2" style={{ color: "#483AA0" }}>
                $2.4B+
              </div>
              <div className="text-lg text-gray-600 font-medium">Assets Under Management</div>
              <div className="text-sm text-gray-500 mt-1">Across 50+ countries</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-2" style={{ color: "#483AA0" }}>
                150K+
              </div>
              <div className="text-lg text-gray-600 font-medium">Active Users</div>
              <div className="text-sm text-gray-500 mt-1">Growing daily</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-2" style={{ color: "#483AA0" }}>
                98.7%
              </div>
              <div className="text-lg text-gray-600 font-medium">Accuracy Rate</div>
              <div className="text-sm text-gray-500 mt-1">AI predictions</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-2" style={{ color: "#483AA0" }}>
                40%
              </div>
              <div className="text-lg text-gray-600 font-medium">Average Savings Increase</div>
              <div className="text-sm text-gray-500 mt-1">First year results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32" style={{ backgroundColor: "#ECFAE5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className="mb-6 text-sm font-semibold px-4 py-2"
              style={{ backgroundColor: "#7965C1", color: "white" }}
            >
              POWERFUL FEATURES
            </Badge>
            <h2 className="text-6xl lg:text-7xl font-black mb-8" style={{ color: "#0E2148" }}>
              Intelligence That
              <br />
              <span className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] bg-clip-text text-transparent">
                Adapts to You
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
              Our AI doesn&apos;t just track your money—it learns your habits, predicts your needs,
              and optimizes your financial future automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#0E2148" }}
                >
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Predictive Analytics
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  AI algorithms analyze spending patterns to predict future expenses and suggest
                  optimal budget allocations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#483AA0" }}
                >
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Smart Investments
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Automated portfolio rebalancing and investment recommendations based on your risk
                  profile and goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#7965C1" }}
                >
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Military-Grade Security
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Bank-level encryption with biometric authentication and real-time fraud detection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#0E2148" }}
                >
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Goal Optimization
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Set financial goals and let AI create personalized strategies to achieve them
                  faster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#483AA0" }}
                >
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Mobile-First Design
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Seamless experience across all devices with offline capabilities and instant sync.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#7965C1" }}
                >
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0E2148" }}>
                  Global Integration
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Connect with 10,000+ banks worldwide and manage multiple currencies effortlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className="mb-6 text-sm font-semibold px-4 py-2"
              style={{ backgroundColor: "#0E2148", color: "white" }}
            >
              SIMPLE PROCESS
            </Badge>
            <h2 className="text-6xl lg:text-7xl font-black mb-8" style={{ color: "#0E2148" }}>
              Get Started in
              <br />
              <span className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] bg-clip-text text-transparent">
                Three Steps
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              From setup to optimization, we&apos;ve made financial management as simple as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="relative mb-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#0E2148", color: "white" }}
                >
                  1
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#7965C1" }}
                ></div>
              </div>
              <h3 className="text-3xl font-bold mb-6" style={{ color: "#0E2148" }}>
                Connect & Verify
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed mb-4">
                Securely link your financial accounts using bank-grade encryption. Our AI instantly
                categorizes your transactions.
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  2-Factor Auth
                </Badge>
                <Badge variant="outline" className="text-xs">
                  256-bit SSL
                </Badge>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#483AA0", color: "white" }}
                >
                  2
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#7965C1" }}
                ></div>
              </div>
              <h3 className="text-3xl font-bold mb-6" style={{ color: "#0E2148" }}>
                AI Learning Phase
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed mb-4">
                Our AI analyzes your spending patterns, income cycles, and financial behavior to
                create your unique profile.
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Machine Learning
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Pattern Recognition
                </Badge>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#7965C1", color: "white" }}
                >
                  3
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#0E2148" }}
                ></div>
              </div>
              <h3 className="text-3xl font-bold mb-6" style={{ color: "#0E2148" }}>
                Optimize & Grow
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed mb-4">
                Receive personalized recommendations, automated savings, and real-time insights to
                maximize your wealth.
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Auto-Optimization
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Real-time Alerts
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32" style={{ backgroundColor: "#ECFAE5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className="mb-6 text-sm font-semibold px-4 py-2"
              style={{ backgroundColor: "#483AA0", color: "white" }}
            >
              TRANSPARENT PRICING
            </Badge>
            <h2 className="text-6xl lg:text-7xl font-black mb-8" style={{ color: "#0E2148" }}>
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] bg-clip-text text-transparent">
                Financial Future
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200 bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#0E2148" }}>
                  Starter
                </h3>
                <p className="text-gray-600 mb-6">Perfect for individuals getting started</p>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: "#0E2148" }}>
                    $0
                  </span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Connect up to 3 accounts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic expense tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Monthly reports</span>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  variant="outline"
                  style={{ borderColor: "#0E2148", color: "#0E2148" }}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-2 bg-white relative overflow-hidden"
              style={{ borderColor: "#483AA0" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: "#483AA0" }}
              ></div>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold" style={{ color: "#0E2148" }}>
                    Professional
                  </h3>
                  <Badge style={{ backgroundColor: "#483AA0", color: "white" }}>Most Popular</Badge>
                </div>
                <p className="text-gray-600 mb-6">For serious financial optimization</p>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: "#483AA0" }}>
                    $19
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited account connections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>AI-powered insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Investment recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Goal tracking & optimization</span>
                  </li>
                </ul>
                <Button className="w-full text-white" style={{ backgroundColor: "#483AA0" }}>
                  Start 30-Day Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#0E2148" }}>
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6">For businesses and wealth management</p>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: "#0E2148" }}>
                    $99
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Multi-user access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  variant="outline"
                  style={{ borderColor: "#0E2148", color: "#0E2148" }}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              className="mb-6 text-sm font-semibold px-4 py-2"
              style={{ backgroundColor: "#7965C1", color: "white" }}
            >
              SUCCESS STORIES
            </Badge>
            <h2 className="text-6xl lg:text-7xl font-black mb-8" style={{ color: "#0E2148" }}>
              Real Results from
              <br />
              <span className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] bg-clip-text text-transparent">
                Real People
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Join thousands who have transformed their financial lives with FinanceAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                  FinanceAI helped me save $25,000 in my first year. The AI insights are incredibly
                  accurate and the automated savings feature is a game-changer.
                </p>
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full mr-4"
                    style={{ backgroundColor: "#7965C1" }}
                  ></div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: "#0E2148" }}>
                      Sarah Johnson
                    </div>
                    <div className="text-gray-600">Marketing Director, Tech Startup</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                  The investment recommendations increased my portfolio returns by 35%. I wish I had
                  found this app sooner!
                </p>
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full mr-4"
                    style={{ backgroundColor: "#483AA0" }}
                  ></div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: "#0E2148" }}>
                      Michael Chen
                    </div>
                    <div className="text-gray-600">Software Engineer, Fortune 500</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                  Simple, powerful, and intuitive. FinanceAI makes managing money feel effortless.
                  My business finances have never been more organized.
                </p>
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full mr-4"
                    style={{ backgroundColor: "#0E2148" }}
                  ></div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: "#0E2148" }}>
                      Emily Rodriguez
                    </div>
                    <div className="text-gray-600">Small Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24" style={{ backgroundColor: "#ECFAE5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6" style={{ color: "#0E2148" }}>
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-light">
            Get weekly insights, market updates, and exclusive tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 h-14 text-lg border-2"
              style={{ borderColor: "#483AA0" }}
            />
            <Button
              size="lg"
              className="h-14 px-8 font-semibold text-lg"
              style={{ backgroundColor: "#483AA0" }}
            >
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Join 50,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "#0E2148" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#483AA0]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge
            className="mb-8 text-sm font-semibold px-4 py-2"
            style={{ backgroundColor: "#7965C1", color: "white" }}
          >
            LIMITED TIME OFFER
          </Badge>
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Transform
            <br />
            Your Financial Future?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join 150,000+ users who have already taken control of their financial destiny. Start
            your journey today with our 30-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-[#0E2148] hover:bg-gray-100 text-xl px-12 py-6 font-bold rounded-xl shadow-2xl"
            >
              Start Your Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-[#0E2148] hover:bg-white hover:text-[#0E2148] text-xl px-12 py-6 font-semibold rounded-xl"
            >
              Schedule a Demo
            </Button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-300">
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-2" />
              <span className="font-medium">Award-winning AI</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span className="font-medium">150K+ happy users</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              <span className="font-medium">Bank-level security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div
                  className="w-10 h-10 rounded-lg mr-3"
                  style={{ backgroundColor: "#0E2148" }}
                ></div>
                <h3 className="text-3xl font-black" style={{ color: "#0E2148" }}>
                  Finance<span style={{ color: "#483AA0" }}>AI</span>
                </h3>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Intelligent finance management powered by cutting-edge AI technology. Transform your
                financial future today.
              </p>
              <div className="flex space-x-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ECFAE5" }}
                >
                  <span className="text-sm font-bold" style={{ color: "#0E2148" }}>
                    f
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ECFAE5" }}
                >
                  <span className="text-sm font-bold" style={{ color: "#0E2148" }}>
                    t
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ECFAE5" }}
                >
                  <span className="text-sm font-bold" style={{ color: "#0E2148" }}>
                    in
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6" style={{ color: "#0E2148" }}>
                Product
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6" style={{ color: "#0E2148" }}>
                Company
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6" style={{ color: "#0E2148" }}>
                Support
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0E2148] transition-colors font-medium">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">&copy; 2024 FinanceAI. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Made with ❤️ for financial freedom</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
