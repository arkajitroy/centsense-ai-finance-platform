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
} from "lucide-react";
import { checkUser } from "@/features/auth/services/check-user";

export default async function HomePage() {
  await checkUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Badge className="mb-6 text-xs font-medium px-3 py-1 bg-accent text-accent-foreground">
              🚀 Now with Advanced AI Analytics
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-primary">The Future of</span>
              <br />
              <span className="bg-gradient-to-r from-sidebar-accent to-accent bg-clip-text text-transparent">
                Financial Intelligence
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
              Transform your financial decisions with
              <span className="font-medium text-primary"> AI-powered insights</span>, automated
              tracking, and personalized recommendations.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 150,000+ users who&apos;ve increased their savings by 40% in the first year.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                className="px-8 py-5 font-medium text-base bg-primary text-primary-foreground rounded-lg"
              >
                Start Your Financial Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-5 font-medium text-base border-accent text-accent rounded-lg hover:bg-accent hover:text-accent-foreground"
              >
                Watch Demo
              </Button>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-medium">Free 30-day trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-primary">
              Trusted by Financial Leaders
            </h2>
            <p className="text-base sm:text-lg text-primary-muted">
              Real results from real users worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">$2.4B+</div>
              <div className="text-sm sm:text-base text-primary font-medium">
                Assets Under Management
              </div>
              <div className="text-xs text-primary mt-1">Across 50+ countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">150K+</div>
              <div className="text-sm sm:text-base text-primary font-medium">Active Users</div>
              <div className="text-xs text-primary mt-1">Growing daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">98.7%</div>
              <div className="text-sm sm:text-base text-primary font-medium">Accuracy Rate</div>
              <div className="text-xs text-primary mt-1">AI predictions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">40%</div>
              <div className="text-sm sm:text-base text-primary font-medium">
                Average Savings Increase
              </div>
              <div className="text-xs text-primary mt-1">First year results</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-secondary2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs font-medium px-3 py-1 bg-accent text-accent-foreground">
              POWERFUL FEATURES
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Intelligence That
              <br />
              <span className="bg-gradient-to-r from-sidebar-accent to-accent bg-clip-text text-transparent">
                Adapts to You
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our AI learns your habits, predicts your needs, and optimizes your financial future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Predictive Analytics",
                bg: "bg-primary",
                description:
                  "AI analyzes spending patterns to predict expenses and suggest budget allocations.",
              },
              {
                icon: TrendingUp,
                title: "Smart Investments",
                bg: "bg-sidebar-accent",
                description: "Automated portfolio rebalancing and investment recommendations.",
              },
              {
                icon: Shield,
                title: "Military-Grade Security",
                bg: "bg-accent",
                description:
                  "Bank-level encryption with biometric authentication and fraud detection.",
              },
              {
                icon: Target,
                title: "Goal Optimization",
                bg: "bg-primary",
                description: "Set goals and let AI create personalized strategies to achieve them.",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                bg: "bg-sidebar-accent",
                description: "Seamless experience across devices with offline capabilities.",
              },
              {
                icon: Globe,
                title: "Global Integration",
                bg: "bg-accent",
                description: "Connect with 10,000+ banks and manage multiple currencies.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-card hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${feature.bg}`}
                  >
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* How it Works */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs font-medium px-3 py-1 bg-primary text-primary-foreground">
              SIMPLE PROCESS
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Get Started in
              <br />
              <span className="bg-gradient-to-r from-sidebar-accent to-accent bg-clip-text text-transparent">
                Three Steps
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              From setup to optimization, financial management made simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: "Connect & Verify",
                bg: "bg-primary",
                dotBg: "bg-accent",
                description: "Link accounts securely with bank-grade encryption.",
                badges: ["2-Factor Auth", "256-bit SSL"],
              },
              {
                number: 2,
                title: "AI Learning Phase",
                bg: "bg-sidebar-accent",
                dotBg: "bg-accent",
                description: "AI analyzes spending and creates your unique profile.",
                badges: ["Machine Learning", "Pattern Recognition"],
              },
              {
                number: 3,
                title: "Optimize & Grow",
                bg: "bg-accent",
                dotBg: "bg-primary",
                description: "Personalized recommendations and automated savings.",
                badges: ["Auto-Optimization", "Real-time Alerts"],
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 ${step.bg} text-primary-foreground`}
                  >
                    {step.number}
                  </div>
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${step.dotBg}`}
                  ></div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {step.description}
                </p>
                <div className="flex justify-center gap-2">
                  {step.badges.map((badge, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-24 bg-secondary2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs font-medium px-3 py-1 bg-sidebar-accent text-white">
              TRANSPARENT PRICING
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-sidebar-accent to-accent bg-clip-text text-transparent">
                Financial Future
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when ready. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Starter",
                price: "$0",
                subtext: "forever",
                description: "Perfect for individuals getting started",
                features: ["Connect up to 3 accounts", "Basic expense tracking", "Monthly reports"],
                button: {
                  text: "Get Started Free",
                  variant: "outline",
                  style: "border-primary text-white",
                },
              },
              {
                title: "Professional",
                price: "$19",
                subtext: "/month",
                description: "For serious financial optimization",
                features: [
                  "Unlimited account connections",
                  "AI-powered insights",
                  "Investment recommendations",
                  "Goal tracking & optimization",
                ],
                button: {
                  text: "Start 30-Day Trial",
                  variant: "default",
                  style: "bg-sidebar-accent text-white",
                },
                highlight: true,
              },
              {
                title: "Enterprise",
                price: "$99",
                subtext: "/month",
                description: "For businesses and wealth management",
                features: [
                  "Everything in Professional",
                  "Multi-user access",
                  "Advanced analytics",
                  "Dedicated support",
                ],
                button: {
                  text: "Contact Sales",
                  variant: "outline",
                  style: "border-primary text-white",
                },
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-2 ${
                  plan.highlight
                    ? "border-sidebar-accent relative overflow-hidden"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-sidebar-accent"></div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">{plan.title}</h3>
                    {plan.highlight && (
                      <Badge className="bg-sidebar-accent text-white">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: plan.highlight ? "var(--sidebar-accent)" : "var(--primary)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">{plan.subtext}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full text-sm ${plan.button.style}`} variant={"default"}>
                    {plan.button.text}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs font-medium px-3 py-1 bg-accent text-accent-foreground">
              SUCCESS STORIES
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Real Results from
              <br />
              <span className="bg-gradient-to-r from-sidebar-accent to-accent bg-clip-text text-transparent">
                Real People
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands who transformed their financial lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director, Tech Startup",
                quote:
                  "FinanceAI helped me save $25,000 in my first year. The AI insights are incredibly accurate.",
                bg: "bg-accent",
              },
              {
                name: "Michael Chen",
                role: "Software Engineer, Fortune 500",
                quote: "The investment recommendations increased my portfolio returns by 35%.",
                bg: "bg-sidebar-accent",
              },
              {
                name: "Emily Rodriguez",
                role: "Small Business Owner",
                quote:
                  "Simple, powerful, and intuitive. My business finances have never been more organized.",
                bg: "bg-primary",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-medium">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full mr-3 ${testimonial.bg}`}></div>
                    <div>
                      <div className="font-bold text-base text-primary">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-secondary2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
            Stay Ahead of the Curve
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Weekly insights, market updates, and exclusive tips to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 h-12 text-base border-2 border-sidebar-accent"
            />
            <Button
              size="lg"
              className="h-12 px-6 font-medium text-base bg-sidebar-accent text-white"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Join 50,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-sidebar-accent/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge className="mb-6 text-xs font-medium px-3 py-1 bg-accent text-accent-foreground">
            LIMITED TIME OFFER
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Financial Future?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join 150,000+ users with our 30-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="px-8 py-5 bg-card text-primary text-base font-medium rounded-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-5 border-2 border-primary-foreground text-primary text-base font-medium rounded-lg hover:bg-card hover:text-primary"
            >
              Schedule a Demo
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-1" />
              <span className="font-medium">Award-winning AI</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span className="font-medium">150K+ happy users</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-5 w-5 mr-1" />
              <span className="font-medium">Bank-level security</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
