import { motion, MotionConfig } from 'framer-motion';
import { LockClosedIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

const ICONS = {
  radar: (
    <>
      <path d="M12 3l8.56 6.22-3.27 10.06H6.71L3.44 9.22z" />
      <path d="M12 12V3M12 12l8.56-2.78M12 12l5.29 7.28M12 12l-5.29 7.28M12 12L3.44 9.22" strokeOpacity="0.4" />
      <path d="M12 5l4.76 5.45-1.23 6.4-5.29-2.42-3.95-4.28z" fill="currentColor" fillOpacity="0.25" />
    </>
  ),
  bird: (
    <>
      <path d="M3 13c3-1 5-4 6-7 1 3 2 5 4 6l8-3-4 5c-2 3-6 4-9 3l-5 2 2-3c-1-1-2-2-2-3z" />
      <circle cx="16.5" cy="10.5" r="0.6" fill="currentColor" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7.5c-1.5-1-5-1.5-6.5 1.5S5 17 8 19.5c1.5 1.2 2.8.5 4 .5s2.5.7 4-.5c3-2.5 4-7.5 2.5-10.5S13.5 6.5 12 7.5z" />
      <path d="M12 7.5c0-2 .5-3.5 2-4.5" />
      <path d="M12.5 5c1.5-1.5 3.5-1.5 4.5-1-.5 1.5-2.5 2.5-4.5 1z" fill="currentColor" fillOpacity="0.25" />
    </>
  ),
  quill: (
    <>
      <path d="M20 4c-6 0-11 4-13 11l-2 5" />
      <path d="M20 4c0 5-3 9-8 10.5L7 15" />
      <path d="M9.5 11.5l4-4" strokeOpacity="0.5" />
    </>
  ),
  candles: (
    <>
      <path d="M6 4v16M12 7v12M18 3v14" />
      <rect x="4.5" y="8" width="3" height="7" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="10" width="3" height="5" rx="0.5" />
      <rect x="16.5" y="5" width="3" height="8" rx="0.5" fill="currentColor" />
    </>
  ),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
  hover: { y: -4 },
};

const iconVariants = {
  hover: { rotate: [0, -12, 10, -6, 0], transition: { duration: 0.6 } },
};

// Render **bold** segments in taglines
function withBold(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i} className="font-semibold">{part}</strong> : part
  );
}

function StatusBadge({ status, badge }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 font-mono text-[11px] text-gray-500 dark:text-gray-400">
      {status === 'private' ? (
        <LockClosedIcon className="h-3 w-3" aria-hidden="true" />
      ) : (
        <span
          className={`h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot ${
            status === 'live' ? 'text-primary' : 'text-orange-400'
          }`}
        />
      )}
      {badge}
    </span>
  );
}

export default function ProjectCard({ project, index = 0 }) {
  const { name, tagline, blurb, aside, tags, status, badge, href, extraLink, icon } = project;
  const Tag = href ? motion.a : motion.div;
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <MotionConfig reducedMotion="user">
      <Tag
        {...linkProps}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: '-60px' }}
        className="group relative flex h-full flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-lighter p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-[0_0_0_4px_rgb(66_214_146/0.12),0_12px_32px_-12px_rgb(66_214_146/0.35)]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <motion.svg
            variants={iconVariants}
            viewBox="0 0 24 24"
            className="h-9 w-9 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[icon]}
          </motion.svg>
          <StatusBadge status={status} badge={badge} />
        </div>

        <h3 className="flex items-center gap-1 text-2xl font-semibold tracking-tight">
          {name}
          {href && (
            <ArrowUpRightIcon className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          )}
        </h3>
        <p className="mt-1 text-primary-dark dark:text-primary">{withBold(tagline)}</p>
        <p className="mt-3 text-gray-600 dark:text-gray-300">{blurb}</p>

        <p className="mt-4 font-mono text-xs text-gray-400 dark:text-gray-500">
          <span className="text-primary/70">//</span> {aside}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:text-gray-400"
            >
              {t}
            </span>
          ))}
          {extraLink && !href && (
            <a
              href={extraLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-[11px] text-gray-500 underline decoration-dotted underline-offset-4 hover:text-primary"
            >
              {extraLink.label} ↗
            </a>
          )}
        </div>
      </Tag>
    </MotionConfig>
  );
}
