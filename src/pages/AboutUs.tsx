
import { Button } from "@/ui/Button";
import { Shield, Users, Target, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We believe every Nigerian deserves to shop with confidence, knowing their money is protected until they're completely satisfied."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built by Nigerians, for Nigerians. We understand the unique challenges of online shopping in our market."
    },
    {
      icon: Target,
      title: "Transparency",
      description: "No hidden fees, no surprise deliveries. What you see in our verification photos is exactly what you get."
    },
    {
      icon: Heart,
      title: "Customer Obsession",
      description: "Your satisfaction drives everything we do. We're not happy until you're thrilled with your purchase."
    }
  ];

  const team = [
    {
      name: "Emmaunuel Worgu",
      role: "CEO & Co-Founder",
      description: "Former e-commerce executive with 10+ years experience building trust in African markets."
    },
    {
      name: "Ahukanna David",
      role: "CTO & Co-Founder", 
      description: "Tech innovator passionate about solving real problems with elegant solutions."
    },
    {
      name: "Nzube ",
      role: "Head Product Designer & Co-Founder",
      description: "Logi expert ensuring every verification and delivery exceeds expectations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
    
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              Changing How <span className="text-visibuy-blue">Nigeria</span> Shops
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              We're on a mission to eliminate the fear and uncertainty from online shopping. 
              Every Nigerian should get exactly what they order, every time.
            </p>
            <div className="bg-visibuy-blue-light rounded-2xl p-8">
              <p className="text-lg text-black font-medium">
                "We've all been burned by online shopping gone wrong. That ends today."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12 text-center">Our Story</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">The Problem We Solve</h3>
                <p className="text-black/80 mb-6 leading-relaxed">
                  In 2023, over 60% of Nigerian online shoppers reported receiving items that didn't match 
                  what they ordered. Blurry photos, misleading descriptions, and no accountability created 
                  a market full of broken trust.
                </p>
                <p className="text-black/80 leading-relaxed">
                  We knew there had to be a better way. What if buyers could see exactly what they were 
                  getting before it left the seller's hands?
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-visibuy-green mb-2">99.8%</div>
                  <div className="text-black/70 mb-4">Customer Approval Rate</div>
                  <div className="text-4xl font-bold text-visibuy-blue mb-2">10,000+</div>
                  <div className="text-black/70">Verified Orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">Our Values</h2>
              <p className="text-xl text-black/70">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-visibuy-blue-light rounded-2xl p-6 mb-4 inline-block">
                    <value.icon className="w-8 h-8 text-visibuy-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                  <p className="text-black/70 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">Meet the Team</h2>
              <p className="text-xl text-black/70">
                The passionate people building the future of Nigerian e-commerce
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-visibuy-gray rounded-full mx-auto mb-6"></div>
                  <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                  <div className="text-visibuy-blue font-medium mb-4">{member.role}</div>
                  <p className="text-black/70 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Help us build an e-commerce ecosystem where trust comes first and 
              every Nigerian can shop with confidence.
            </p>
            <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white text-lg px-8 py-6 rounded-2xl mx-auto">
              Start Shopping Safely
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;