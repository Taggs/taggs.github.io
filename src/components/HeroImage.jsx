import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-[300px] h-[400px]"
    >
      {/* Curved rhombus frame */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-primary"
          style={{
            clipPath: `path('M150 0 C150 0, 300 100, 300 200, 300 300, 150 400, 150 400, 150 400, 0 300, 0 200, 0 100, 150 0, 150 0Z')`
          }}
        />
      </div>
      
      {/* Image container with padding to show frame */}
      <div 
        className="absolute inset-[3px]"
        style={{
          clipPath: `path('M150 4 C150 4, 296 102, 296 200, 296 298, 150 396, 150 396, 150 396, 4 298, 4 200, 4 102, 150 4, 150 4Z')`
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
          alt="Portrait"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
