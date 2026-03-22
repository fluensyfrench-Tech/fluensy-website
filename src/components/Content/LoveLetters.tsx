
import Image from "next/image"

const LoveLetters = () => {
    return (
        <section className="px-7 py-[86px] max-w-[1250px] mx-auto">
            <Image 
              src='/images/love-letter.svg' 
              alt="letter" 
              width={151} 
              height={165}
              className="mx-auto" 
            />

            <h2
              className="text-primary text-3xl md:text-5xl md:text-center font-medium mt-4 mb-2"
              style={{ lineHeight: "1.2" }}
            >
              Love letters from our learners
            </h2>

            <p className="text-[18px] text-primary font-normal mb-4 md:text-center">Read the sweet messages our learners have shared with us </p>

            <div className="space-y-4 md:space-y-0 md:flex md:items-stretch md:gap-[30px]">
                <div className="bg-secondary-1 rounded-xl pt-[18px] pb-[38px] md:pt-[30px] md:pb-[30px]  px-6 md:px-10 text-white text-[18px] md:flex-1">
                    <div className="space-y-7">
                    <p>Dear fluensyfrench</p>
                    <p>
                        I didn’t think I’d be able to speak French so soon, but after just a few weeks, I’m already making great progress. My teacher has been amazing, guiding me every step of the way.
                    </p>
                    <p>
                        With love 💕 <br />Abisola
                    </p>
                    </div>

                    <span className="mt-10 block">Pioneer student</span>

                </div>

                <div className="bg-secondary-2 rounded-xl pt-[18px] pb-[38px]  md:pt-[30px] md:pb-[30px]  px-6 md:px-10 text-primary text-[18px] md:flex-1">
                    <div className="space-y-7">
                    <p>Dear fluensyfrench</p>
                    <p>
                        The fluensyfrench community has been very valuable to my learning. The combination of reading, sentence practice, and contextual learning makes French easier to understand and stay consistent with.
                    </p>
                    <p>
                        Sweet regards 💕 <br />Halima
                    </p>
                    </div>

                    <span className="mt-10 block">Community member</span>

                </div>
            </div>



        </section>
    )
}

export default LoveLetters