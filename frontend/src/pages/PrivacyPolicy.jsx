import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsLetterBox";

const PrivacyPolicy = () => {
  return (
    <div className="px-4 border-t sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="text-3xl text-center pt-12 pb-4 tracking-tight">
        <Title text1={"PRIVACY"} text2={"POLICY"} />
      </div>

      <div className="my-14 flex flex-col gap-8 max-w-4xl mx-auto text-gray-600">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">Information We Collect</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            When you visit the Forever website, we collect certain information about your device, your interaction with the site, 
            and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">How We Use Your Information</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            We use your personal Information to provide our services to you, which includes: offering products for sale, 
            processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">Data Security</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            We are committed to protecting your privacy and employing security measures to prevent unauthorized access, disclosure, 
            alteration, or destruction of your personal information. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
          </p>
        </div>
      </div>
      
      <NewsletterBox />
    </div>
  );
};

export default PrivacyPolicy;
