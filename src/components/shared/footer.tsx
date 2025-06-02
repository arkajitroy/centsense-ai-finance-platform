import React from "react";

export default function Footer() {
  return (
    <footer className="bg-card py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-md mr-2 bg-primary"></div>
              <h3 className="text-2xl font-bold text-primary">
                Finance<span className="text-sidebar-accent">AI</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Intelligent finance management powered by AI technology.
            </p>
            <div className="flex gap-3">
              {["f", "t", "in"].map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary2"
                >
                  <span className="text-xs font-bold text-primary">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Security", "API", "Integrations"],
            },
            { title: "Company", links: ["About Us", "Blog", "Careers", "Press", "Contact"] },
            {
              title: "Support",
              links: [
                "Help Center",
                "Documentation",
                "Community",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-base mb-4 text-primary">{section.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-primary transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 FinanceAI. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-xs text-muted-foreground">
              Made with ❤️ for financial freedom
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
