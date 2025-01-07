import { useEffect, useRef, useState } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: 'Co-founder',
    title: 'Tele-medicine startup',
    description: 'Bootstrapping the company with a website plugging into various healthcare platforms. Launched in 5 months.'
  },
  {
    year: 'Tech function assessment',
    title: 'Advising scale-up business on readiness.',
    description: 'An established telemedicine business was scaling up and the CEO needed an external assessment of the technology function to ensure it had what it needed to scale effectively and safely. There was a 3-month assessment of systems and people, and I reported findings back to the founders. They recently sold half the business to private equity, after successfully scaling to meet NHS requirements.'
  },
  {
    year: 'Fractional CTO',
    title: 'Building a multi-family office',
    description: 'Employee #5 at this financial services startup. Established information architecture and procedures, including security and data governance. Ran selection for, and deployment of, a portfolio management system, migrating from the old reporting system. Established solid partnerships with vendors to ensure they continued to meet our expectations as we scaled the business.'
  },
  {
    year: 'Chief Technology and Product Officer',
    title: 'Global Management Consultancy, sold to Fortune 1000 firm',
    description: 'Led the technology function, which included outsourced IT, as well as including outsourced IT, development and support teams for 3 core SaaS products, including mobile apps. Helped the CEO scale and sell the business.'
  }
];

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0
};

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const updateDotPosition = (index: number) => {
    if (!dotRef.current || !timelineRef.current) return;
    
    const timelineHeight = timelineRef.current.offsetHeight - 40; // Subtract dot height
    const position = (index / (TIMELINE_DATA.length - 1)) * timelineHeight;
    dotRef.current.style.transform = `translateY(${position}px)`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
            updateDotPosition(index);
          }
        }
      });
    }, OBSERVER_OPTIONS);

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
    const isEven = index % 2 === 0;
    const yearClasses = `w-32 text-right ${isEven ? 'pr-8' : 'pl-8 text-right'}`;
    const contentClasses = `w-1/2 ${isEven ? 'pr-12' : 'pl-12'}`;
    const cardClasses = `
      bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm 
      rounded-lg p-6 shadow-lg transition-all duration-300
      ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-50 scale-100'}
    `;

    return (
      <div
        ref={el => itemRefs.current[index] = el}
        className="mb-24 last:mb-0"
      >
        <div className={`flex items-center justify-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* Year marker */}
          <div className={yearClasses}>
            <span className="text-xl font-bold text-primary">
              {item.year}
            </span>
          </div>

          {/* Content */}
          <div className={contentClasses}>
            <div className={cardClasses}>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={timelineRef} className="relative max-w-6xl mx-auto">
      {/* Center line */}
      <div className="absolute left-1/2 top-[20px] bottom-[20px] w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />
      
      {/* Animated dot */}
      <div 
        ref={dotRef}
        className="absolute left-1/2 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 transition-transform duration-500 ease-in-out z-10"
      />

      {/* Timeline items */}
      <div className="relative">
        {TIMELINE_DATA.map((item, index) => (
          <TimelineItem key={item.year} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
