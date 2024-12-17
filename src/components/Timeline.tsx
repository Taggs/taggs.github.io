import { useEffect, useRef, useState } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
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
