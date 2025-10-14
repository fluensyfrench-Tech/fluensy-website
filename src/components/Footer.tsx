const navLinks = [
  { label: "Meet us", href: "/meet" },
  { label: "The Academy", href: "/academy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const Footer = () => {
  return (
    <footer className="bg-[#181A25] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Column 1 */}
          <div className="space-y-6">
            <p className="text-4xl font-normal -mb-5">
              <strong>fluensy</strong>french
            </p>
            <p className="flex items-center gap-2 text-xl font-light text-[#C7CAD1]">
              It is possible <span>👍🏾</span>
            </p>
          </div>

          {/* Column 2 & 3: Stay connected + Company */}
          <div className="grid grid-cols-2 gap-6 text-base font-normal">
            {/* Stay Connected */}
            <div className="space-y-2">
              <h4 className="font-normal">Stay connected</h4>
              <ul className="space-y-2 text-base font-normal text-[#C7CAD1]">
                {[
                  "X",
                  {
                    label: "Linkedin",
                    href: "https://www.linkedin.com/company/fluensyfrench/posts/?feedView=all",
                  },
                  "Tiktok",
                  "Youtube",
                  "Instagram",
                ].map((item, idx) => {
                  const label = typeof item === "string" ? item : item.label;
                  const href = typeof item === "string" ? "#" : item.href;
                  return (
                    <li key={idx}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105 inline-block"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
