import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
    const [isReady, setIsReady] = useState(false)
    const loadedCount = useRef(0)
    const phones = isMobile ? mobilePhonesMobile : mobilePhones
    const doubled = [...phones, ...phones]

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)')
        setIsMobile(mq.matches)
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    // Preload images imperatively before the component even renders them into DOM
    useEffect(() => {
        const sources = isMobile ? mobilePhonesMobile : mobilePhones
        loadedCount.current = 0
        setIsReady(false)

        const imgs = sources.map(src => {
            const img = new window.Image()
            img.src = src.phone
            img.onload = () => {
                loadedCount.current += 1
                if (loadedCount.current === sources.length) {
                    setIsReady(true)
                }
            }
            img.onerror = () => {
                // Don't block animation on broken images
                loadedCount.current += 1
                if (loadedCount.current === sources.length) {
                    setIsReady(true)
                }
            }
            return img
        })

        return () => {
            imgs.forEach(img => {
                img.onload = null
                img.onerror = null
            })
        }
    }, [isMobile])

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
                    will-change: transform;
                    transform: translate3d(0, 0, 0);
                    -webkit-transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    /* animation only runs once isReady */
                    animation-name: seamless-scroll;
                    animation-duration: 25s;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-play-state: paused;
                    -webkit-animation-name: seamless-scroll;
                    -webkit-animation-duration: 25s;
                    -webkit-animation-timing-function: linear;
                    -webkit-animation-iteration-count: infinite;
                    -webkit-animation-play-state: paused;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .phone-scroll-track.ready {
                    animation-play-state: running;
                    -webkit-animation-play-state: running;
                    opacity: 1;
                }
                .phone-scroll-track img {
                    width: auto !important;
                    height: auto !important;
                    max-height: 662px;
                    flex-shrink: 0;
                    padding-right: 0rem;
                    display: block;
                }
            `}</style>

            <div className={`phone-scroll-track${isReady ? ' ready' : ''}`}>
                {doubled.map((mobilePhone, index) => (
                    <Image
                        key={index}
                        src={mobilePhone.phone}
                        alt="mobile phone"
                        width={0}
                        height={0}
                        sizes="100vw"
                        // @ts-ignore — valid HTML attr, Next.js passes it through
                        fetchpriority="high"
                        loading="eager"
                        unoptimized
                    />
                ))}
            </div>
        </section>
    )
}

export default ScrollingPhones