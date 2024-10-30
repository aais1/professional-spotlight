import React from 'react';
import Image from "./comapnny.png"
import Video from "./vedio.mp4";
const PortfolioLayout = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            {/* Header Section */}
            <header header className="relative h-64 sm:h-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <video className="w-full h-full" autoPlay loop muted controls={false}>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </header>

            {/* Main Content */}
            <main className="space-y-12">
                {/* Our Company Section */}
                <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Text Content */}
                    <div className="md:w-1/3 flex justify-center items-center">
                        <h2 className="text-2xl sm:mt-10 sm:text-3xl lg:text-4xl font-[Frutiger] font-bold text-[#124e66] mb-4 text-center md:text-left">
                            Our Company
                        </h2>
                    </div>
                    {/* Description */}
                    <div className="md:w-2/3">
                        <p className="text-gray-700 font-[Calibri] leading-relaxed">
                        Welcome to Professionals Spotlight, your premier destination for publishing exceptional biographies and creating impactful online portfolios. Established in Los Angeles in 2024, our mission is to elevate your online presence, ensuring your expertise is recognized and celebrated.
                        Every biography we craft is tailored to reflect your unique voice and vision, resonating with your target audience. By employing advanced SEO techniques, we ensure your content reaches the right people at the right time, enhancing your online visibility and driving engagement. Featuring your biography on our platform will significantly boost both your personal and professional brand.
                        In addition to biographies, we offer expertly crafted student portfolios that are not only professional but also SEO-optimized. Our portfolios ensure that when your name is searched on Google, your portfolio appears at the top of the results. Students can easily download their portfolios or request free revisions, providing a seamless and comprehensive service.
                        </p>
                    </div>
                </section>

                {/* Our Mission and Services Section */}
                <section className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                    {/* Text Content */}
                    <div className="md:w-1/3 flex items-center  ">
                        <h2 className="text-2xl sm:mt-10 font-[Frutiger] sm:text-3xl lg:text-4xl font-bold text-[#124e66] mb-4 text-center md:text-right">
                            Our Mission and Services
                        </h2>
                        {/* Optional Images */}
                        {/* 
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/api/placeholder/200/200" alt="Service 1" className="w-full h-auto rounded-lg shadow-md" />
                            <img src="/api/placeholder/200/200" alt="Service 2" className="w-full h-auto rounded-lg shadow-md" />
                        </div> 
                        */}
                    </div>
                    {/* Description */}
                    <div className="md:w-2/3">
                        <p className="text-gray-700 font-[Calibri] leading-relaxed">
                        At Professionals Spotlight, we empower CEOs and students by crafting impactful portfolios and biographies that showcase their unique strengths and achievements. For CEOs, we capture leadership stories that resonate with industry leaders and potential collaborators, emphasizing the strategic vision and milestones that define their careers. For students, we create portfolios that highlight academic accomplishments, projects, and potential, positioning them to stand out in competitive job markets.

                        Our expertly tailored content, combined with advanced SEO strategies, ensures your profile reaches the right audience—enhancing your visibility, credibility, and opening doors to valuable networking opportunities. Whether you're a seasoned executive or a rising talent, Professionals Spotlight is your platform for growth and recognition.
                        </p>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Text Content */}
                    <div className="md:w-1/3">
                        <h2 className="text-2xl  sm:mt-10 sm:ml-10 sm:text-3xl font-[Frutiger] lg:text-4xl font-bold text-[#124e66] mb-4 text-center md:text-left">
                            Why Choose Us?
                        </h2>
                        {/* Optional Images */}
                        {/* 
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/api/placeholder/200/200" alt="Why 1" className="w-full h-auto rounded-lg shadow-md" />
                            <img src="/api/placeholder/200/200" alt="Why 2" className="w-full h-auto rounded-lg shadow-md" />
                        </div> 
                        */}
                    </div>
                    {/* Description */}
                    <div className="md:w-2/3">
                        <p className="text-gray-700 leading-relaxed font-[Calibri]">
                        Professionals Spotlight goes beyond being a content platform—we are your dedicated partner in growth. What sets us apart is our relentless focus on authenticity, quality, and personalized storytelling. We work hand-in-hand with CEOs, students, and professionals to craft tailored narratives that spotlight their accomplishments and engage their target audience. Our SEO-optimized content ensures that when people search for your name or business, your story rises to the top, maximizing visibility and impact.
                        Let us help you create compelling, polished content that reflects your unique journey and positions you for long-term success in your career or studies.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PortfolioLayout;
