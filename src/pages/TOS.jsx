import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              Terms of <span className="text-visibuy-blue">Service</span>
            </h1>
            <p className="text-xl text-black/70 mb-8">
              These terms govern your use of VisiBuy's services and platform.
            </p>
            <div className="bg-visibuy-blue-light rounded-2xl p-6">
              <p className="text-lg text-black/80">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-visibuy-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Acceptance of Terms */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Acceptance of Terms</h2>
              <div className="space-y-4 text-black/80">
                <p>By accessing and using VisiBuy, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.</p>
              </div>
            </div>

            {/* Use of Services */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Use of Services</h2>
              <div className="space-y-4 text-black/80">
                <p>You agree to use VisiBuy only for lawful purposes and in accordance with these terms. You must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Engage in fraudulent activities</li>
                </ul>
              </div>
            </div>

            {/* Account Responsibilities */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Account Responsibilities</h2>
              <div className="space-y-4 text-black/80">
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Keeping your account information up to date</li>
                </ul>
              </div>
            </div>

            {/* Verification Process */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Verification Process</h2>
              <div className="space-y-4 text-black/80">
                <p>Our verification process is designed to ensure quality and trust. By using our services, you agree that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sellers must provide accurate photos of items</li>
                  <li>Buyers must review verification photos promptly</li>
                  <li>Final approval is required before shipment</li>
                  <li>VisiBuy may intervene in disputes when necessary</li>
                </ul>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Payment Terms</h2>
              <div className="space-y-4 text-black/80">
                <p>All payments are processed securely through our escrow system:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is held in escrow until verification approval</li>
                  <li>Service fees are clearly disclosed at checkout</li>
                  <li>Refunds are processed according to our refund policy</li>
                  <li>All prices are in Nigerian Naira unless stated otherwise</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Limitation of Liability</h2>
              <div className="space-y-4 text-black/80">
                <p>VisiBuy provides a platform for buyers and sellers to transact safely. While we strive to ensure quality:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We are not responsible for the quality of individual items</li>
                  <li>Our liability is limited to the value of the transaction</li>
                  <li>We do not guarantee uninterrupted service</li>
                  <li>Users engage with third-party sellers at their own risk</li>
                </ul>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Termination</h2>
              <div className="space-y-4 text-black/80">
                <p>We may terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.</p>
                <p>You may terminate your account at any time by contacting our customer support.</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Contact Us</h2>
              <div className="space-y-4 text-black/80">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <ul className="space-y-2">
                  <li>Email: legal@visibuy.com</li>
                  <li>Phone: +234 806 192 4490</li>
                  <li>Address: Lagos, Nigeria</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto flex flex-col justify-center items-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust VisiBuy for safe online shopping.
            </p>
            <Button className="bg-visibuy-green hover:bg-visibuy-green/90 hover:text-white text-white text-lg px-8 py-6 rounded-2xl max-w-xl">
              <Link to="/signup">
              Create Your Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default TermsOfService;