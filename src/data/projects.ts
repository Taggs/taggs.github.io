export type ProjectStatus = 'live' | 'percolating' | 'private';

export interface Project {
  name: string;
  /** Supports **bold** segments */
  tagline: string;
  blurb: string;
  aside: string;
  tags: string[];
  status: ProjectStatus;
  /** Badge text shown next to the status dot / lock */
  badge: string;
  href?: string;
  extraLink?: { label: string; href: string };
  section: 'building' | 'writing';
  icon: 'radar' | 'bird' | 'globe' | 'candles' | 'apple' | 'quill';
}

export const projects: Project[] = [
  {
    name: 'truthscore.ai',
    tagline: 'A nutrition label for news, powered by **Verity**, my AI journalist model.',
    blurb:
      'Gives every news article a credibility score, built by AI and refined by the community. Lives in your browser as a Chrome extension and on your phone as an iOS app.',
    aside: "Because 'trust me bro' isn't a source.",
    tags: ['TypeScript', 'React', 'AI'],
    status: 'percolating',
    badge: 'percolating',
    href: 'https://truthscore.ai',
    icon: 'radar',
    section: 'building',
  },
  {
    name: 'SkyHunter',
    tagline: 'Be the bird. Eat the pigeon.',
    blurb:
      'A first-person survival game where you play as real bird species (peregrine falcon, common swift, northern goshawk), with proper flight physics, predators and territory.',
    aside: 'Currently a flying cube. A very convincing cube.',
    tags: ['C#', 'Unity 6', 'URP'],
    status: 'private',
    badge: 'in the nest',
    icon: 'bird',
    section: 'building',
  },
  {
    name: 'earth-ss2',
    tagline:
      'Remember the Economist screensaver in the 2000s? No? Just me then... This is my homage to it, built with Claude.',
    blurb:
      'An interactive 3D globe for your desktop, with a real day/night terminator, live weather and headlines from wherever you click.',
    aside: "Screensavers are coming back. I've decided.",
    tags: ['TypeScript', 'Three.js', 'Tauri'],
    status: 'private',
    badge: 'rendering',
    extraLink: { label: 'v1 is public', href: 'https://github.com/Taggs/earth-screensaver' },
    icon: 'globe',
    section: 'building',
  },
  {
    name: 'AI/ML trading bot',
    tagline: 'Buy low, sell high, automate the regret.',
    blurb:
      'Algorithmic strategies across crypto, equities and options, built on Lumibot, backtested with honest slippage, then let loose on Alpaca and IBKR paper accounts.',
    aside: 'Past performance is not indicative of anything, especially mine.',
    tags: ['Python', 'Lumibot', 'IBKR'],
    status: 'private',
    badge: 'NDA with myself',
    icon: 'candles',
    section: 'building',
  },
  {
    name: 'Media Nutrition',
    tagline: 'A balanced diet for your attention.',
    blurb:
      'A work-in-progress book and YouTube channel pushing back against misinformation and attention theft, while championing the media that actually feeds you.',
    aside: 'Doomscrolling is not one of your five a day.',
    tags: ['Book', 'YouTube', 'Newsletter'],
    status: 'percolating',
    badge: 'simmering',
    href: 'https://www.medianutrition.cloud/',
    icon: 'apple',
    section: 'writing',
  },
  {
    name: 'Credit & Credibility',
    tagline: 'A novel. Yes, an actual one, with chapters.',
    blurb:
      'Fiction, for a change. Written in the gaps between everything else, one stubborn paragraph at a time.',
    aside: 'Any resemblance to real persons is purely coincidental. Probably.',
    tags: ['Fiction', 'Novel', 'Long-form'],
    status: 'private',
    badge: 'first draft',
    icon: 'quill',
    section: 'writing',
  },
];
