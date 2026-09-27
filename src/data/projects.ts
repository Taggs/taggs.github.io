export type ProjectStatus = 'live' | 'private';

export interface Project {
  name: string;
  tagline: string;
  blurb: string;
  aside: string;
  tags: string[];
  status: ProjectStatus;
  /** Badge text shown next to the status dot / lock */
  badge: string;
  href?: string;
  extraLink?: { label: string; href: string };
  icon: 'gauge' | 'bird' | 'globe' | 'candles';
}

export const projects: Project[] = [
  {
    name: 'truthscore.ai',
    tagline: 'A nutrition label for news.',
    blurb:
      'Gives every news article a credibility score, built by AI and refined by the community. Lives in your browser as a Chrome extension and on your phone as an iOS app.',
    aside: "Because 'trust me bro' isn't a source.",
    tags: ['TypeScript', 'React', 'AI'],
    status: 'live',
    badge: 'live',
    href: 'https://truthscore.ai',
    icon: 'gauge',
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
  },
  {
    name: 'earth-ss2',
    tagline: 'Earth Screensaver 2.0.',
    blurb:
      'An interactive 3D globe for your desktop, with a real day/night terminator, live weather and headlines from wherever you click.',
    aside: "Screensavers are coming back. I've decided.",
    tags: ['TypeScript', 'Three.js', 'Tauri'],
    status: 'private',
    badge: 'rendering',
    extraLink: { label: 'v1 is public', href: 'https://github.com/Taggs/earth-screensaver' },
    icon: 'globe',
  },
  {
    name: 'Trading bot',
    tagline: 'Buy low, sell high, automate the regret.',
    blurb:
      'Algorithmic strategies on Lumibot, backtested with honest slippage, then let loose on Alpaca and IBKR paper accounts.',
    aside: 'Past performance is not indicative of anything, especially mine.',
    tags: ['Python', 'Lumibot', 'IBKR'],
    status: 'private',
    badge: 'NDA with myself',
    icon: 'candles',
  },
];
