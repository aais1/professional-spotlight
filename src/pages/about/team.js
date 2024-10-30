import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images directly
import MushafImage from './mushaff.jpg';
import AmnaImage from './Amna.jpg';
import NoreenImage from './noreen.jpg';

const galleryItems = [
    { id: 1, title: "Noreen Mazhar", image: NoreenImage, subtitle: "CEO & Founder", description: "Noreen Mazhar is the creative soul of Professionals Spotlight, having founded the company and serving as its CEO. She has been a key voice in this industry since 2017 by honing her skills in digital marketing and content development. Noreen has a unique ability to convert complex ideas into relevant, interesting stories that help clients make a significant impact in their professions. Professionals Spotlight is protected by her innovative leadership, which keeps it at the forefront of content-driven brand elevation. The company is growing under her direction as an upright source for anyone who wishes to improve their personal and business branding." },
    { id: 2, title: "Mushaf Bin Atif", image: MushafImage, subtitle: "Co-Founder and Chief Operating Officer", description: "Mushaf Bin Atif serves as the Co-Founder and Chief Operating Officer, ensuring the seamless execution of the company's strategic vision and operational excellence. With a deep understanding of market dynamics and corporate strategy, he oversees the alignment of internal processes with client objectives, driving efficiency and effectiveness. His leadership is integral in bridging the gap between client needs and market trends, fostering growth, and delivering impactful solutions. Mushaf's commitment to operational success and his ability to streamline execution make him an indispensable leader at Professional Spotlight." },
    { id: 3, title: "Amna Khan", image: AmnaImage, subtitle: "Co-Founder & Chief Financial Officer", description: "Professionals Spotlight's co-founder and CFO, Amna Khan, gives the organization's financial management and business development a strategic advantage. Amna has played a significant role in growing the company's reach because of her passion for innovation and her acute eye for growth prospects. Her innovative ideas and strategic approach guarantee that Professionals Spotlight flourishes in offering its clients unparalleled success and visibility. Amna's speciality is fusing business savvy with financial knowledge to produce long-term success that benefits the company and its customers." },
];

const InteractiveGallery = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="container mx-auto p-4 h-full">
            <div className="flex flex-col items-center mb-8 sm:flex-row sm:items-center">
                <h1 className="text-lg sm:text-4xl font-bold text-[#124e66] mb-4 sm:mr-8">Meet Our Team</h1>
                <div className="flex gap-4 w-full overflow-x-auto scrollbar-hide">
                    <div className="flex flex-row gap-4 w-full">
                        {galleryItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layoutId={`container-${item.id}`}
                                onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                                className={`cursor-pointer h-64 sm:h-96 flex-shrink-0 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent`}
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    flex: selectedId === null ? 1 : (item.id === selectedId ? (window.innerWidth < 640 ? 8 : 2) : (window.innerWidth < 640 ? 1 : 1)),
                                }}
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: selectedId === item.id ? 1 : 0.8 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className='bg-gray-400 p-2 rounded-sm bg-opacity-30'>
                                    <motion.h2 className="text-xs sm:text-2xl font-bold text-white">
                                        {item.title}
                                    </motion.h2>
                                    <motion.h3 className="text-xs hidden sm:block sm:text-xl text-white">
                                        {item.subtitle}
                                    </motion.h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        key={selectedId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 p-6 sm:w-2/3 text- rounded-lg bg-white shadow-lg"
                    >
                        <h3 className="text-xl sm:text-2xl text-[#124e66] font-bold mb-2">
                            {galleryItems.find(item => item.id === selectedId).title}
                        </h3>
                        <h4 className="text-md sm:text-lg text-[#124e66] font-semibold mb-4">
                            {galleryItems.find(item => item.id === selectedId).subtitle}
                        </h4>
                        <p className="text-gray-700">{galleryItems.find(item => item.id === selectedId).description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveGallery;