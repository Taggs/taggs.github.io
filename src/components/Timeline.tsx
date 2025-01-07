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

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const updateDotPosition = (index: number) => {
    if (!dotRef.current || !timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const currentItem = itemRefs.current[index];
    if (!currentItem) return;

    const itemRect = currentItem.getBoundingClientRect();
    const relativePosition = itemRect.top - timelineRect.top;
    dotRef.current.style.transform = `translateY(${relativePosition}px) translateX(-50%)`;
  };

  const handleScroll = () => {
    if (!timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemMiddle = itemRect.top + (itemRect.height / 2);
      const distance = Math.abs(itemMiddle - viewportMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    updateDotPosition(closestIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
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
        <div className="flex items-start justify-center gap-8">
          {/* Left side: Year and Title */}
          <div className="w-60 text-right">
            <span className="text-xl font-bold text-primary block mb-2">
              {item.year}
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {item.title}
            </h3>
          </div>

          {/* Right side: Description */}
          <div className="w-1/2">
            <div className={cardClasses}>
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
