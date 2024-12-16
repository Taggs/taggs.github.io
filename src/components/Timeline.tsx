import { useEffect, useRef, useState } from 'react';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

const timelineData: TimelineItem[] = [
    {
        year: '2023',
        title: 'CTPO Consultant',
        description: 'Helping organizations adapt to technological change through strategic consulting and interim leadership roles.'
    },
    {
        year: '2020',
        title: 'Chief Technology & Product Officer',
        description: 'Led digital transformation initiatives and product development for a rapidly growing fintech company.'
    },
    {
        year: '2018',
        title: 'Head of Engineering',
        description: 'Scaled engineering teams and established robust development practices across multiple product lines.'
    },
    {
        year: '2015',
        title: 'Senior Software Architect',
        description: 'Designed and implemented enterprise-scale solutions for major financial institutions.'
    },
    {
        year: '2012',
        title: 'Technical Lead',
        description: 'Led development teams in delivering complex software solutions for the banking sector.'
    }
];

export default function Timeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.findIndex(ref => ref === entry.target);
                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50% 0px',
                threshold: 0
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={timelineRef} className="relative flex gap-8 max-w-6xl mx-auto">
            {/* Timeline Line and Dot */}
            <div className="hidden md:block relative w-0.5 bg-gray-200 dark:bg-gray-700 self-stretch mx-8">
                <div 
                    className="absolute w-4 h-4 bg-primary rounded-full -left-[7px] transition-all duration-500"
                    style={{ 
                        top: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
                    }}
                />
            </div>

            {/* Timeline Content */}
            <div className="flex-1 space-y-24">
                {timelineData.map((item, index) => (
                    <div
                        key={item.year}
                        ref={el => itemRefs.current[index] = el}
                        className={`transition-opacity duration-500 ${
                            Math.abs(activeIndex - index) <= 1 ? 'opacity-100' : 'opacity-50'
                        }`}
                    >
                        <div className="flex items-baseline gap-8">
                            <span className="text-2xl font-bold text-primary whitespace-nowrap">
                                {item.year}
                            </span>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
