import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-[300px] h-[300px]"
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black rounded-full" />

      {/* Green frame */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-primary rounded-full border-4 border-primary"
        />
      </div>
      
      {/* Image container with padding */}
      <div 
        className="absolute inset-[4px] overflow-hidden rounded-full"
      >
        <img
          src="/images/neil-profile.png"
          alt="Neil Taggart Portrait"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
