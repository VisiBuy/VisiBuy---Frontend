import React from 'react';
import { Clock, Shield, AlertCircle, CheckCircle, XCircle, Mail, Phone, FileText } from 'lucide-react';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white mt-40">
      {/* Header */}
      <header className="bg-[#007AFF] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Refund & Returns Policy</h1>
              <p className="text-indigo-100 mt-2 text-lg">Effective Date: 5th June 2025</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <FileText className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-gray-900">Policy Overview</h2>
          </div>
          <div className="border-l-4 border-indigo-600 pl-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              This Refund & Returns Policy applies to all transactions made through the Visibuy platform operated by 
              <span className="font-semibold text-indigo-600"> Visibuy Technologies Ltd</span>. By placing an order on the Platform, 
              buyers agree to the terms set out below.
            </p>
          </div>
        </div>

        {/* Refund Eligibility */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">1. Refund Eligibility</h2>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Escrow-Based Payments</h3>
            <p className="text-blue-800 text-lg">
              All payments made on Visibuy are held in escrow until you complete visual verification and approve the item for delivery.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-6">When a Refund is Allowed</h3>
          <p className="text-gray-700 mb-6 text-lg">You are eligible for a full refund <strong>only if</strong>:</p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-500">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-lg">
                You <strong>decline the product during the visual verification phase</strong>, citing valid reasons 
                (e.g., mismatch, damage, or incorrect item).
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-500">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-lg">
                The seller <strong>fails to upload verification media</strong> within the required timeframe.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-500">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-lg">
                The seller <strong>cancels the order</strong> before verification or shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Verification */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <Clock className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">2. Visual Verification and Buyer Approval</h2>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
            <p className="text-orange-900 mb-6 text-lg">Once you receive the visual verification (photo or video) from the seller:</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-orange-600" />
                <p className="text-orange-800 text-lg">
                  You must <strong>approve or reject</strong> the item within <strong className="text-red-600 text-xl">6 hours</strong> of receiving it.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="text-orange-800 text-lg">
                  <strong>Failure to respond</strong> within this timeframe may result in <strong>automatic approval</strong> and release of funds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Returns After Delivery */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">3. Returns After Delivery</h2>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <p className="text-red-900 font-semibold mb-3 text-lg">Due to our visual verification model:</p>
            <p className="text-red-800 mb-4 text-lg">
              <strong>All sales are final once approved</strong> and the item is shipped.
            </p>
            <p className="text-red-800 text-lg">
              Visibuy does <strong>not accept returns or refunds</strong> after delivery unless:
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-lg">
                The seller delivers an item <strong>significantly different</strong> from the verified media.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-lg">
                The item is damaged <strong>in transit</strong> and reported immediately upon delivery with photo evidence.
              </p>
            </div>
          </div>

          <p className="text-gray-600 mt-6 text-base italic">
            In such cases, Visibuy will investigate the matter and determine the refund eligibility on a case-by-case basis.
          </p>
        </div>

        {/* Non-Refundable Situations */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">4. Non-Refundable Situations</h2>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">Refunds will <strong>not</strong> be issued in the following situations:</p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-50 border-l-4 border-red-500">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-lg">You approved the product during the verification step and later changed your mind.</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 border-l-4 border-red-500">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-lg">You fail to respond within the allotted verification timeframe.</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 border-l-4 border-red-500">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-lg">The product was accurately verified but did not meet personal preference after approval.</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 border-l-4 border-red-500">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-lg">You provide incorrect delivery information or fail to receive the item due to absence or refusal.</p>
            </div>
          </div>
        </div>

        {/* Refund Processing */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">5. Refund Processing</h2>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">If eligible:</p>
          
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="font-semibold text-green-900 mb-3 text-xl">Fast Track Refunds</h3>
              <p className="text-green-800 text-lg">
                Refunds for <strong>declined items during the escrow verification phase</strong> are processed 
                <strong> almost instantly</strong> and typically reflect within a few minutes to a few hours, 
                depending on your payment provider.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h3 className="font-semibold text-blue-900 mb-3 text-xl">Standard Refunds</h3>
              <p className="text-blue-800 text-lg">
                Other approved refunds will be processed within <strong>5–7 business days</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Important Notes:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 text-lg">Refunds will be made to the <strong>original payment method</strong>.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 text-lg">Refund processing time may vary depending on your bank or payment provider.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disputes and Resolution */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <AlertCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">6. Disputes and Resolution</h2>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
            <p className="text-purple-900 text-lg">
              If you believe an item was approved or delivered in error, please contact Visibuy Support at 
              <strong className="text-purple-700"> tech@visibuy.com.ng</strong> within <strong>24 hours</strong> of delivery.
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-6 text-xl">Visibuy reserves the right to:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gray-400">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 text-lg">Review all verification and order data</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gray-400">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 text-lg">Contact the seller for clarifications</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gray-400">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 text-lg">Make a final determination on refund or resolution</span>
            </div>
          </div>
        </div>

        {/* Seller Responsibilities */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <Shield className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">7. Seller Responsibilities</h2>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">Sellers on Visibuy are required to:</p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-indigo-50 border-l-4 border-indigo-500">
              <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-indigo-800 text-lg">Accurately display the product during the visual verification process</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 border-l-4 border-indigo-500">
              <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-indigo-800 text-lg">Ship the exact item shown and verified</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 border-l-4 border-indigo-500">
              <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-indigo-800 text-lg">Ensure packaging protects the item during transit</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-800 text-lg">
              <strong>Failure to comply</strong> may result in penalties, suspension, or removal from the platform.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-600 text-white p-8 mb-8">
          <div className="flex items-start gap-4 mb-8">
            <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
            <h2 className="text-3xl font-bold">8. Contact Us</h2>
          </div>
          
          <p className="mb-8 text-lg opacity-90">
            For any questions or support, reach out to our Customer Success team:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg mb-1">Email Support</p>
                <a href="mailto:tech@visibuy.com.ng" className="text-indigo-200 hover:text-white transition-colors text-lg">
                  tech@visibuy.com.ng
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg mb-1">Phone Support</p>
                <a href="tel:+2348061924490" className="text-indigo-200 hover:text-white transition-colors text-lg">
                  +234 806 192 4490
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-l-4 border-gray-400">
          <div className="text-center">
            <p className="text-gray-600 text-base">
              <strong>Visibuy Technologies Ltd</strong> reserves the right to amend this Refund & Returns Policy at any time. 
              Any updates will be posted to the platform and take effect immediately upon publication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;