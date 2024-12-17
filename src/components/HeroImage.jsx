import { motion } from 'framer-motion';

const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

const IMAGE_PROPS = {
  src: '/images/neil-profile.png',
  alt: 'Neil Taggart Portrait',
  size: 300,
};

export default function HeroImage() {
  return (
    <motion.div
      {...ANIMATION_CONFIG}
      className={`relative w-[${IMAGE_PROPS.size}px] h-[${IMAGE_PROPS.size}px]`}
    >
      {/* Black background layer */}
      <div className="absolute inset-0 bg-black rounded-full" />

      {/* Green frame layer */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-primary rounded-full border-4 border-primary" />
      </div>
      
      {/* Image layer */}
      <div className="absolute inset-[4px] overflow-hidden rounded-full">
        <img
          src={IMAGE_PROPS.src}
          alt={IMAGE_PROPS.alt}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
