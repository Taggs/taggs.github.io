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

// Simplified cloud path - scaled up by 5.76x (was 57.6x)
const CLOUD_PATH = "M198 180c16.434 0 28.8-12.366 28.8-28.8s-12.366-32.4-28.8-32.4c0-41.093-34.507-72-75.6-72-36.37 0-69.12 23.122-75.6 57.6h-7.2C17.902 104.4 3.6 123.454 3.6 144s15.454 36 36 36z";

export default function HeroImage() {
  return (
    <motion.div
      {...ANIMATION_CONFIG}
      className="relative w-[400px] h-[400px] -mt-8"
    >
      <svg 
        viewBox="0 0 3000 2500" 
        className="w-full h-full"
      >
        {/* ViewBox outline */}
        <rect
          x="0"
          y="0"
          width="3000"
          height="2500"
          fill="none"
          stroke="blue"
          strokeWidth="1"
        />

        <defs>
          <clipPath id="cloudClip">
            <path d={CLOUD_PATH} transform="translate(800, 200) scale(8)" />
          </clipPath>
        </defs>

        {/* Clipped image */}
        <image
          href={IMAGE_PROPS.src}
          width="1800"
          height="1800"
          x="350"
          y="350"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#cloudClip)"
        />

        {/* Single outline */}
        <path
          d={CLOUD_PATH}
          transform="translate(800, 200) scale(8)"
          fill="none"
          className="stroke-primary"
          strokeWidth="3"
        />
      </svg>
    </motion.div>
  );
}
