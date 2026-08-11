import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="px-4 border-t sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="text-3xl text-center pt-12 pb-4 tracking-tight">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* --- About Us Section --- */}
      <div className="my-14 flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            className="w-full h-auto object-cover rounded-2xl shadow-xl relative z-10 transition-transform duration-500 hover:scale-[1.02]"
            src={assets.about_img}
            alt="Team working together"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-600">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">Our Story</h3>
            <p className="text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              voluptatibus explicabo natus sequi nostrum officia cum modi
              voluptas? Modi ea nesciunt amet, numquam non quidem obcaecati alias
              mollitia sed provident.
            </p>
          </div>
          
          <div className="w-16 h-1 bg-gray-200 rounded-full my-2"></div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">Our Mission</h3>
            <p className="text-base leading-relaxed text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
              mollitia esse libero expedita. Recusandae placeat voluptas
              reiciendis, doloremque ab ut fugit aliquid, velit possimus natus
              eveniet sequi omnis at. Cupiditate.
            </p>
          </div>
        </div>
      </div>

      <div className="text-3xl py-12 text-center tracking-tight mt-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="mb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-50 text-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <b className="text-xl text-gray-900 tracking-tight">Quality Assurance</b>
            <p className="text-gray-500 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-50 text-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <b className="text-xl text-gray-900 tracking-tight">Convenience</b>
            <p className="text-gray-500 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-50 text-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            </div>
            <b className="text-xl text-gray-900 tracking-tight">Exceptional Service</b>
            <p className="text-gray-500 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pb-16">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
