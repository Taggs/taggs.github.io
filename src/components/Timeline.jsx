import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const timelineEvents = [
  {
    year: '2024',
    title: 'Current Role',
    description: 'Your current position and achievements',
  },
  {
    year: '2023',
    title: 'Previous Role',
    description: 'Description of your previous role and key accomplishments',
  },
  {
    year: '2022',
    title: 'Earlier Experience',
    description: 'Notable projects or roles from this period',
  },
  // Add more timeline events as needed
]

export default function Timeline() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Track scroll position relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });

  // Update active index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const index = Math.floor(value * timelineEvents.length);
      setActiveIndex(Math.min(index, timelineEvents.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative container mx-auto px-4 py-16 min-h-[600px]">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/20" />

      {/* Animated dot */}
      <motion.div
        initial={{ y: 0 }}
        style={{ 
          y: useTransform(
            smoothProgress,
            [0, 1],
            [0, "calc(100% - 32px)"] // Subtract dot height to prevent overflow
          ),
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.div>

      {/* Timeline events */}
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative mb-12 last:mb-0"
        >
          {/* Content */}
          <div
            className={`relative w-5/12 ${
              index % 2 === 0 ? 'ml-auto pl-8' : 'mr-auto pr-8 text-right'
            }`}
          >
            <motion.div
              animate={{
                scale: activeIndex === index ? 1.05 : 1,
                boxShadow: activeIndex === index 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg"
            >
              <span className="text-primary font-bold">{event.year}</span>
              <h3 className="text-xl font-bold mt-1">{event.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{event.description}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
