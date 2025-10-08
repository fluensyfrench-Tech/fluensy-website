const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-4/5">
          {/* Column 1 */}
          <div className="space-y-6">
            <p className="text-4xl font-normal -mb-1">
              <strong>fluensy</strong>french
            </p>
            <p className="flex items-center gap-2 text-xl">
              It is possible <span>👍🏾</span>
            </p>
          </div>

          {/* Column 2: Social */}
          <div className="space-y-2 text-base font-normal ml-0 md:ml-20">
            <h4 className="font-normal">Stay connected</h4>
            <ul className="space-y-1 text-sm font-light">
              {["X", "Linkedin", "Tiktok", "Youtube", "Instagram"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-2 text-base">
            <h4 className="text-lg font-normal">Company</h4>
            <ul className="space-y-2 text-sm font-light">
              {["Meet", "The Academy", "Terms & Conditions", "Privacy Policy"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="transition-all duration-200 hover:text-[#7DE5F2] hover:scale-105 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
