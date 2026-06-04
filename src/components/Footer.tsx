/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import PlayStoreFooterIcon from "./icons/PlayStoreFooterIcon";
import AppleFooterIcon from "./icons/AppleFooterIcon";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Academy", href: "/academy" },
  { label: "About us", href: "/about-us" },
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy-policy" },
];

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@fluensyfrench" },
  { label: "X (formerly Twitter)", href: "https://x.com/fluensyfrench?s=21" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fluensyfrench/posts/?feedView=all",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@fluensyfrench" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fluensyfrench?igsh=aWZ6dnlna3hmc3B5&utm_source=qr",
  },
  // { label: "Telegram", href: "https://t.me/+c5zFTQKZjGFmNGRk" },
];

const contactLinks = [{ label: "Contact us", href: "bonjour@fluensyfrench.com" }];

const footerIcons = [
  {
    icon: "/images/icons/footer-icon-1.svg",
    size: "w-[30px] h-[30px] md:w-[50px] md:h-[50px]",
    position: "-left-[12] top-20 md:left-10 md:top-5"
  },
  {
    icon: "/images/icons/footer-icon-2.svg",
    size: "w-[15px] h-[15px] md:w-[30px] md:h-[30px]",
    position: "-bottom-[36] left-10 md:left-40 md:bottom-10"
  },
  {
    icon: "/images/icons/footer-icon-3.svg",
    size: "w-[25px] h-[25px] md:w-[50px] md:h-[50px]",
    position: "-right-2 top-8 md:right-10 md:top-5"
  },
  {
    icon: "/images/icons/footer-icon-4.svg",
    size: "w-[25px] h-[25px] md:w-[50px] md:h-[50px]",
    position: "-bottom-[32] right-10 md:right-40 md:bottom-6"
  },
];

const Footer = () => {
  const [isPlayStoreHovered, setIsPlayStoreHovered] = useState(false);
  const [isAppStoreHovered, setIsAppStoreHovered] = useState(false);
  
  return (
    <>
      <section className="bg-secondary-1 px-6 pt-8 pb-16 md:pt-24 md:pb-24">
        <div className="max-w-[1250px] mx-auto relative">
          {/* Animated decorative icons */}
          {footerIcons.map((icon, index) => (
            <motion.img 
              className={`absolute ${icon.position} ${icon.size}`} 
              key={index} 
              src={icon.icon} 
              alt={icon.icon}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
            />
          ))}
          
          {/* Animated heading */}
          <motion.h2
            className="text-white text-3xl md:text-5xl text-center font-medium mt-4 mb-2 w-fit mx-auto"
            style={{ lineHeight: "1.3" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            Stay consistent and make <br className="hidden md:block" />  faster progress.<br className="md:hidden" /> Get the app
          </motion.h2>

          {/* Animated buttons container */}
          <motion.div 
            className=" flex flex-col md:flex-row md:items-center mt-6 md:mt-9 space-y-4 md:space-y-0 md:space-x-9 px-[20px] md:w-fit mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.fluensyfrench.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] md:min-w-[320px] transition ${
                isPlayStoreHovered 
                  ? "bg-[#7DE5F2] text-primary" 
                  : "bg-white text-secondary-1"
              }`}
              onMouseEnter={() => setIsPlayStoreHovered(true)}
              onMouseLeave={() => setIsPlayStoreHovered(false)}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PlayStoreFooterIcon isHovered={isPlayStoreHovered} />
              Download on Google Play
            </motion.a>

            <motion.a
              href="https://apps.apple.com/us/app/fluensyfrench/id6770974375"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] md:min-w-[320px] transition text-primary ${
                isAppStoreHovered 
                  ? "bg-[#7DE5F2]" 
                  : "bg-secondary-2 md:bg-white"
              }`}
              onMouseEnter={() => setIsAppStoreHovered(true)}
              onMouseLeave={() => setIsAppStoreHovered(false)}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AppleFooterIcon  isHovered={isAppStoreHovered} />
              Download on App Store
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#181A25] text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Column 1 */}
            <div className="md:space-y-8 flex flex-row items-center md:flex-col md:items-start gap-4">
              <p className="text-2xl font-bold md:-mb-5">
                Fluensy is possible
              </p>
              <div>
                <Image
                  className="w-[50px] h-[47px] md:w-[196px] md:h-[202px]"
                  src="/images/hand.svg"
                  alt="hand"
                  width={196}
                  height={202}
                />

              </div>
            </div>

            {/* Column 2 & 3: Stay connected + Company */}
            <div className="grid min-[400px]:flex gap-10 text-base font-normal">
              {/* Stay Connected */}
              <div className="space-y-2">
                <h4 className="font-normal">Let’s be friends online 😍</h4>
                <ul className="space-y-2 text-base font-normal text-[#C7CAD1]">
                  {socialLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105 inline-block"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <h4 className="text-base font-normal">Company</h4>
                <ul className="space-y-2 text-base font-normal text-[#C7CAD1]">
                  {navLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="inline-block transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="text-base font-normal">Contact us</h4>
              <ul className="space-y-2 text-base font-normal text-[#C7CAD1]">
                {contactLinks.map(({ href, label }) => (
                  <li key={label}>
                    <a href={`mailto:${href}`} className="inline-block transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105">
                      {href}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
