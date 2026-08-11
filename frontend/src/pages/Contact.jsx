import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetterBox";
const Contact = () => {
  return (
    <div className="border-t bg-gray-50/30">
      <div className="text-center text-3xl pt-12 pb-4 tracking-tight">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-14 flex flex-col justify-center md:flex-row gap-16 max-w-6xl mx-auto mb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Image side */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 transition-transform duration-500 hover:scale-[1.02] max-h-[500px]"
            src={assets.contact_img}
            alt="Contact us"
          />
        </div>

        {/* Content side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-50 text-black flex items-center justify-center rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="font-semibold text-2xl text-gray-900 tracking-tight">Our Store</p>
            </div>
            <div className="space-y-3 text-gray-600 pl-16">
              <p className="leading-relaxed">
                54709 Wills Station <br /> Suite 250, Washington, USA
              </p>
              <div className="h-px bg-gray-100 w-full my-2"></div>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (419) 555-5555
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                admin@forever.com
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-50 text-black flex items-center justify-center rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="font-semibold text-2xl text-gray-900 tracking-tight">Careers at Forever</p>
            </div>
            <div className="pl-16 space-y-5">
              <p className="text-gray-600 leading-relaxed">
                Learn more about our teams and job openings. We are always looking for talented individuals to join us.
              </p>
              <button className="border-2 border-black px-8 py-3 rounded-full font-medium text-sm hover:bg-black hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Explore Jobs
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="pb-16 px-4">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;
