import { motion } from 'framer-motion'

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
  return (
    <div className="relative container mx-auto px-4 py-16">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/20" />
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative mb-12 last:mb-0"
        >
          {/* Year bubble */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`relative w-5/12 ${
              index % 2 === 0 ? 'ml-auto pl-8' : 'mr-auto pr-8 text-right'
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="text-primary font-bold">{event.year}</span>
              <h3 className="text-xl font-bold mt-1">{event.title}</h3>
              <p className="mt-2 text-gray-600">{event.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
