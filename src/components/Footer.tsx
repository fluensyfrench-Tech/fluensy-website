import { PiGooglePlayLogoLight } from "react-icons/pi";
import { TbBrandApple } from "react-icons/tb";

const navLinks = [
  { label: "Meet us", href: "/meet-us" },
  // { label: "The Academy", href: "/academy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy-policy" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/fluensyfrench?s=21" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fluensyfrench/posts/?feedView=all",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@fluensyfrench" },
  { label: "YouTube", href: "https://www.youtube.com/@fluensyfrench" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fluensyfrench?igsh=aWZ6dnlna3hmc3B5&utm_source=qr",
  },
  // { label: "Telegram", href: "https://t.me/+c5zFTQKZjGFmNGRk" },
];

const contactLinks = [{ label: "Contact us", href: "fluensyfrench@gmail.com" }];

const Footer = () => {
  return (
    <>
      <section className="bg-secondary-1 px-6 pt-8 pb-16 md:pt-24 md:pb-24">
        <h2
          className="text-white text-3xl md:text-5xl text-center font-medium mt-4 mb-2 w-fit mx-auto"
          style={{ lineHeight: "1.3" }}
        >
          Stay consistent and make <br className="hidden md:block" />  faster progress. Get the app
        </h2>

        <div className=" flex flex-col md:flex-row md:items-center mt-6 md:mt-9 space-y-4 md:space-y-0 md:space-x-9 px-[20px] md:w-fit mx-auto">
          <button
            className="bg-white flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-secondary-1 md:min-w-[320px]"
          >
            <PiGooglePlayLogoLight size={32} fill="#643BD8" />
            Download on Google Play
          </button>

          <button
            className="bg-secondary-2 flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-black md:min-w-[320px]"
          >
            <TbBrandApple size={32} />
            Download on App Store
          </button>
        </div>
      </section>
      <footer className="bg-[#181A25] text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Column 1 */}
            <div className="space-y-6">
              <p className="text-2xl min-[400px]:text-3xl sm:text-4xl font-normal -mb-5">
                <strong>fluensy</strong>french
              </p>
              <p className="flex items-center gap-2 text-xl font-light text-[#C7CAD1]">
                It&apos;s possible <span>👍🏾</span>
              </p>
            </div>

            {/* Column 2 & 3: Stay connected + Company */}
            <div className="grid min-[400px]:grid-cols-2 gap-6 text-base font-normal">
              {/* Stay Connected */}
              <div className="space-y-2">
                <h4 className="font-normal">Stay connected</h4>
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
                    <span className="inline-block transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105">
                      {href}
                    </span>
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
