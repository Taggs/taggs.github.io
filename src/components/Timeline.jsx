import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={containerRef} className="relative container mx-auto px-4 py-16 min-h-[600px]">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/20" />

      {/* Animated dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        animate={{
          y: ["0%", "calc(100% - 40px)"]
        }}
        transition={{
          duration: 1,
          ease: "linear",
          times: [0, 1],
          repeat: 0
        }}
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 40px)"])
        }}
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 rounded-full bg-primary shadow-inner animate-pulse" />
        </div>
      </motion.div>

      {/* Timeline events */}
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
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
