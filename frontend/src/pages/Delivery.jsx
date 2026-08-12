import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsLetterBox";

const Delivery = () => {
  return (
    <div className="px-4 border-t sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="text-3xl text-center pt-12 pb-4 tracking-tight">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
      </div>

      <div className="my-14 flex flex-col gap-8 max-w-4xl mx-auto text-gray-600">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">Shipping Methods</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            We offer various shipping methods to ensure your order reaches you as quickly and securely as possible. 
            Standard shipping typically takes 3-5 business days, while express delivery options are available at checkout 
            for those who need their items sooner.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">Order Tracking</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            Once your order has been dispatched, you will receive a confirmation email containing a tracking number. 
            You can use this number to monitor the progress of your delivery in real-time through our courier's website.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">International Delivery</h3>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            Forever ships worldwide! International delivery times vary depending on the destination country and customs processing. 
            Please note that international orders may be subject to import duties and taxes, which are the responsibility of the customer.
          </p>
        </div>
      </div>
      
      <NewsletterBox />
    </div>
  );
};

export default Delivery;
