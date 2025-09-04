import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 border-t sm:px-6 lg:px-8">
      <div className="text-2xl text-center pt-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* --- About Us Section --- */}
      <div className="my-12 flex flex-col lg:flex-row lg:items-center gap-12">
        <div className="lg:w-1/2">
          <img
            className="w-full h-auto object-cover rounded-lg shadow-md"
            src={assets.about_img}
            alt="Team working together"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-5 text-gray-600">
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            voluptatibus explicabo natus sequi nostrum officia cum modi
            voluptas? Modi ea nesciunt amet, numquam non quidem obcaecati alias
            mollitia sed provident.
          </p>
          <b className="text-gray-800 text-xl pt-2">Our Mission</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
            mollitia esse libero expedita. Recusandae placeat voluptas
            reiciendis, doloremque ab ut fugit aliquid, velit possimus natus
            eveniet sequi omnis at. Cupiditate.
          </p>
        </div>
      </div>

      <div className="text-2xl py-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* --- Why Choose Us Section (with Borders Restored) --- */}
      <div className="mb-20 border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200 lg:divide-y-0 lg:divide-x lg:divide-gray-200 grid grid-cols-1 lg:grid-cols-3">
          <div className="p-8 flex flex-col gap-4">
            <b className="text-lg">Quality Assurance</b>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci in, hic recusandae suscipit ratione.
            </p>
          </div>
          <div className="p-8 flex flex-col gap-4">
            <b className="text-lg">Convenience</b>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci in, hic recusandae suscipit ratione.
            </p>
          </div>
          <div className="p-8 flex flex-col gap-4">
            <b className="text-lg">Exceptional Customer Service</b>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, autem tempore! Expedita at, temporibus aliquam
              perferendis adipisci in, hic recusandae suscipit ratione.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
