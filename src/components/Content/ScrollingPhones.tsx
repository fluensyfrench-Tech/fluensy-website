import Image from "next/image"
import { useEffect, useState } from "react"

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

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)')
        setIsMobile(mq.matches)
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const phones = isMobile ? mobilePhonesMobile : mobilePhones
    const doubled = [...phones, ...phones]

    return (
        <section className="bg-secondary-1 py-[90px] overflow-hidden">
            <style>{`
                @keyframes seamless-scroll {
                    0%   { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .phone-scroll-track {
                    display: flex;
                    align-items: flex-end;
                    width: max-content;
                    gap: 0; /* use padding on images instead */
                    will-change: transform;
                    transform: translate3d(0, 0, 0);     /* force compositing layer immediately */
                    -webkit-transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;          /* prevents iOS flickering */
                    -webkit-backface-visibility: hidden;
                    animation: seamless-scroll 25s linear infinite;
                    -webkit-animation: seamless-scroll 25s linear infinite;
                }
                .phone-scroll-track img {
                    width: auto !important;
                    height: auto !important;
                    max-height: 662px;
                    flex-shrink: 0;
                    padding-right: 1rem; /* padding instead of margin — stays in composite layer */
                    display: block;
                }
            `}</style>

            <div className="phone-scroll-track">
                {doubled.map((mobilePhone, index) => (
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