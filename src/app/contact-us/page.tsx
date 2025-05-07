// import React, { useState } from "react";

import Head from "next/head";
import { FiMail } from "react-icons/fi";
import { RiCellphoneFill } from "react-icons/ri";
// import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Suman Patra",
    description:
      "Get in touch with Suman Patra for collaboration, project inquiries, or front-end development services.",
  };

  const currentYear = new Date().getFullYear();
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     message: "",
  //   });

  //   const [status, setStatus] = useState("");

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     if (!formData.name || !formData.email || !formData.message) {
  //       setStatus("Please fill out all fields.");
  //       return;
  //     }

  //     try {
  //       await emailjs.send(
  //         "YOUR_SERVICE_ID",
  //         "YOUR_TEMPLATE_ID",
  //         formData,
  //         "YOUR_PUBLIC_KEY"
  //       );
  //       setStatus("Message sent successfully!");
  //       setFormData({ name: "", email: "", message: "" });
  //     } catch (error) {
  //       setStatus("Failed to send message. Please try again.");
  //     }
  //   };

  return (
    <>
      <Head>
        <title>Contact Me | Suman&apos;s Portfolio</title>
        <meta
          name="description"
          content="Contact Suman Patra for web development projects, UI/UX designs, or Next.js solutions."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />
      </Head>
      <section className="bg-black text-white py-16 px-6 md:px-20" id="contact">
        <div className="max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Get In Touch.
            </h2>
          </div>
          <hr className="border-white mb-6 border-b-[3px] " />
          {/* <p className="text-white mb-6 text-2xl">TAKE A COFFEE & CHAT WITH ME</p> */}

          {/* Contact Info */}

          <div className="flex  flex-col " style={{ marginTop: "50px " }}>
            <div className="mb-6 w-full max-w-md">
              <div className="flex items-center bg-gray-900 p-4 rounded-lg mb-2">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <FiMail width={34} height={34} />
                </div>
                <div className="ml-4">
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white text-sm">patrasuman042@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-900 p-4 rounded-lg">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <RiCellphoneFill width={34} height={34} />
                </div>
                <div className="ml-4">
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white text-sm">+91 9734127642</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="w-full max-w-md">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full bg-black text-white border-b border-gray-500 p-3 outline-none mb-4 focus:ring-2 focus:ring-green-500"
              />

              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full bg-black text-white border-b border-gray-500 p-3 outline-none mb-4 focus:ring-2 focus:ring-green-500"
              />

              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Write Your Message"
                className="w-full bg-black text-white border-b border-gray-500 p-3 outline-none mb-4 h-24 focus:ring-2 focus:ring-green-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-green-500 text-black font-semibold py-3 rounded-full hover:bg-green-600 transition-all"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>

        {/* Status Message */}
        {/* {status && <p className="mt-4 text-sm text-gray-300">{status}</p>} */}
        <footer className="bg-black text-white py-6 text-center mt-7">
          <p className="text-gray-400 text-sm">
            © {currentYear} | All rights reserved by{" "}
            <span className="text-white font-semibold">Suman Patra</span>
          </p>
        </footer>
      </section>
    </>
  );
};

export default ContactForm;
