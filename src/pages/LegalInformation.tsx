import { Button } from "@/ui/Button";
import { Scale, Shield, FileText, Info } from "lucide-react";

const LegalInformation = () => {
  const legalSections = [
    {
      icon: Info,
      title: "Intellectual Property Notice",
      content: [
        "All content on this website — including but not limited to text, images, graphics, logos, product verification guides, user interface elements, and software — is the exclusive property of Visibuy Technology Limited and is protected by international copyright and intellectual property laws.",
        "No part of this website may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any form or by any means without prior written permission from Visibuy Technology Limited."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              Legal <span className="text-visibuy-blue">Information</span>
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-tight">
              Important legal notices and intellectual property information for VisiBuy users.
            </p>
            <div className="bg-visibuy-blue-light rounded-2xl p-6">
              <p className="text-lg text-black/80">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Copyright Notice */}
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-visibuy-blue/10 rounded-2xl p-3 mr-4">
                  <Scale className="w-6 h-6 text-visibuy-blue" />
                </div>
                <h2 className="text-xl lg:text-3xl font-bold text-black leading-tight">Copyright Notice</h2>
              </div>
              <div className="space-y-4 text-black/80">
                <p className="text-lg font-semibold text-black">
                  © 2025 Visibuy Technology Limited. All rights reserved.
                </p>
                <p>
                  This notice applies to all content, materials, and intellectual property found on the VisiBuy platform and website.
                </p>
              </div>
            </div>

            {/* Intellectual Property Notice */}
            {legalSections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-visibuy-green/10 rounded-2xl p-3 mr-4">
                    <section.icon className="w-6 h-6 text-visibuy-green" />
                  </div>
                  <h2 className=" text-xl lg:text-3xl font-bold text-black">{section.title}</h2>
                </div>
                <div className="space-y-4 text-black/80">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

           

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl lg:text-3xl font-bold text-black mb-6 leading-tight">Legal Contact Information</h2>
              <div className="space-y-4 text-black/80">
                <p>For questions regarding intellectual property, copyright, or legal matters:</p>
                <ul className="space-y-2">
                  <li><strong>Legal Team:</strong> legal@visibuy.com</li>
                  <li><strong>Copyright Issues:</strong> copyright@visibuy.com</li>
                  <li><strong>Phone:</strong> +234 (0) 123 456 7890</li>
                  <li><strong>Address:</strong> Lagos, Nigeria</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      
    </div>
  );
};

export default LegalInformation;