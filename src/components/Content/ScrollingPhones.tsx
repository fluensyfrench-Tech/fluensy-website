import Image from "next/image"

const ScrollingPhones = () => {
    const mobilePhones = [
        { id: 1, phone: '/images/scrolling-phone-2.svg' },
        { id: 2, phone: '/images/scrolling-phone-1.svg' },
        { id: 3, phone: '/images/scrolling-phone-3.svg' },
        { id: 4, phone: '/images/scrolling-phone-5.svg' },
        { id: 5, phone: '/images/scrolling-phone-4.svg' },
    ]

    const mobilePhonesMobile = [
        { id: 1, phone: '/images/scrolling-phone-2.webp' },
        { id: 2, phone: '/images/scrolling-phone-1.webp' },
        { id: 3, phone: '/images/scrolling-phone-3.webp' },
        { id: 4, phone: '/images/scrolling-phone-5.webp' },
        { id: 5, phone: '/images/scrolling-phone-4.webp' },
    ]

    const GAP = '-2rem'       // spacing between images within a set
    const SEAM_GAP = '-2rem'  // spacing at the loop seam — tweak independently

    return (
        <section className="bg-secondary-1 py-[90px] overflow-hidden">
            <style>{`
                @keyframes seamless-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .phone-scroll-track {
                    display: flex;
                    align-items: flex-end;
                    width: max-content;
                    animation: seamless-scroll 25s linear infinite;
                }
                .phone-scroll-track img {
                    width: auto !important;
                    height: auto !important;
                    max-height: 662px;
                    flex-shrink: 0;
                    margin-right: ${GAP};
                }
                .phone-scroll-track img:nth-child(5),
                .phone-scroll-track img:nth-child(10) {
                    margin-right: ${SEAM_GAP};
                }
            `}</style>

            <div className="phone-scroll-track">
                {[...(typeof window !== 'undefined' && window.innerWidth <= 768 ? mobilePhonesMobile : mobilePhones), ...(typeof window !== 'undefined' && window.innerWidth <= 768 ? mobilePhonesMobile : mobilePhones)].map((mobilePhone, index) => (
                    <Image
                        key={index}
                        src={mobilePhone.phone}
                        alt="mobile phone"
                        width={0}
                        height={0}
                        sizes="100vw"
                        unoptimized
                    />
                ))}
            </div>
        </section>
    )
}

export default ScrollingPhones