// =====================================================================
//  DAGA's digibook · ALL CONTENT LIVES HERE
//  Edit this file to add projects, images, links, talks, awards.
//  - img:  path to an image (e.g. "assets/img/aota.webp"). It shows as
//          ASCII art and turns into the real picture on hover.
//  - motif: emoji used to draw the ASCII thumb when there is no img yet.
//  - video: a YouTube or Vimeo link (unlisted is fine). It plays inside
//          the project page. Add vertical: true for 9:16 episodes.
//  - line: true shows the project as a text line (title · role) with no
//          picture. Use it for client work until images are approved.
//  - pos:  where to crop the picture in its frame, e.g. '50% 20%'.
//  - gallery: more pictures, shown in the project page.
//  - todo: a pencil note shown on the card until you fill it in.
//          Delete the todo line when the info is final.
// =====================================================================

export const site = {
  name: 'Daga',
  fullName: 'Daniela Gamarra',
  role: 'AI Filmmaker, Director & Visual Developer',
  tagline: 'Queer animated stories, made with a human-first AI pipeline: the artist leads, the tools follow.',
  location: 'From Peru, based in Toronto, Canada',
  email: 'gamarra.saenz@gmail.com',
  // Your Substack, e.g. 'https://daga.substack.com'. Leave '' until it exists.
  // A GitHub Action reads its RSS feed every hour and the posts show up on
  // the "writing" page by themselves. Write on Substack, done.
  substack: '',
  links: [
    { label: 'Instagram', handle: '@in.daga', url: 'https://www.instagram.com/in.daga' },
    { label: 'TikTok', handle: '@in.daga', url: 'https://www.tiktok.com/@in.daga' },
    { label: 'LinkedIn', handle: 'daniela-gamarra-saenz', url: 'https://www.linkedin.com/in/daniela-gamarra-saenz' },
  ],
  // Hero text. Pretext lays it out live around the cat.
  hero: 'I make queer animated stories, games, comics and the tools to build them. Ten years of drawing by hand, now directing with a human-first AI pipeline: the artist leads, the tools follow. This is my digibook, a digital sketchbook. Drag the cat, flip through the pages, doodle in the margins.',
  heroMarks: ['queer animated stories', 'games', 'comics', 'tools', 'human-first AI pipeline', 'digibook'],
  // About text (from the portfolio brief, kept as written).
  about: "Hola! I'm Daga, an award-winning visual developer and director from Peru, now based in Toronto, and queer too. Ten years across comics, webtoons, illustration and games. I ran my own game studio and led a two-year production with an 11-person team. Back home, I was recognized for women's leadership in intellectual property and as a standout young creator. Now I make AI-assisted animation and lead AI-assisted art workflows in games.",
  stats: [
    { n: '10', label: 'years drawing for a living' },
    { n: '50k', label: 'on TikTok' },
    { n: '10k', label: 'on Instagram' },
    { n: '11', label: 'person team, led for two years' },
  ],
};

// Pages of the sketchbook, in reading order. `at` = where the page lies on
// the desk (column, row) around the cover page at (0, 0).
export const pages = [
  { id: 'films',   no: '01', title: 'shows & AI films', note: 'what I direct now', at: [1, 0], cols: 3, tint: 'lime' },
  { id: 'tools',   no: '02', title: 'tools I build',    note: 'because the right tool did not exist', at: [1, 1], cols: 2, tint: 'blue' },
  { id: 'games',   no: '03', title: 'games',            note: 'playable stories', at: [0, 1], cols: 3, tint: 'peach' },
  { id: 'comics',  no: '04', title: 'comics & webtoons', note: 'by hand, always', at: [-1, 1], cols: 2, tint: 'pink' },
  { id: 'product', no: '05', title: 'product design',   note: 'apps people use', at: [-1, 0], cols: 2, tint: 'blue' },
  { id: 'studio',  no: '06', title: 'studio & ventures', note: 'building my own things', at: [-1, -1], cols: 2, tint: 'peach' },
  { id: 'awards',  no: '07', title: 'awards & talks',   note: 'nice moments', at: [0, -1], cols: 2, tint: 'lime' },
  { id: 'writing', no: '08', title: 'writing', note: 'notes from my Substack', at: [2, 0], cols: 2, tint: 'blue' },
  { id: 'about',   no: '09', title: 'Let\'s work together', note: 'about + contact', at: [1, -1], cols: 3, tint: 'pink' },
];

export const projects = [
  // ---------------------------------------------------------------- films
  {
    id: 'aota', page: 'films', featured: true,
    title: 'All of the Above',
    kind: 'Animated series · in development',
    role: 'Creator, director, AI pipeline',
    year: '2026',
    motif: '🐺',
    tagline: 'Queer supernatural romance meets summer camp comedy (imagine Hilda x Feel Good).',
    blurb: 'A skittish wolf-girl spends the summer as a camp counselor, making a list of everything she\'s always wanted. The list gets a lot shorter when she meets a girl from another planet.',
    facts: ['Format: 60 × 60-second vertical episodes', 'Characters: Hira, April, Gust and the forest spirits', 'Setting: Golden Crow Camp'],
    todo: 'add character art + animation tests',
  },
  {
    id: 'appetite', page: 'films',
    title: 'Appetite',
    kind: 'AI short film',
    role: 'Director',
    year: '',
    motif: '🎬',
    img: 'assets/img/appetite.jpg',
    video: 'https://www.youtube.com/watch?v=BfQ9TdJdbeg',
    blurb: 'My first animated short. An AI short film made with AI Film Club Vancouver.',
    todo: 'add year',
  },
  {
    id: 'aota-tests', page: 'films',
    title: 'All of the Above · animation tests',
    kind: 'AI animation tests',
    role: 'Creator, director, AI pipeline',
    year: '2026',
    motif: '🌲',
    blurb: 'Animation tests for All of the Above: Hira, April, Gust and the forest spirits at Golden Crow Camp.',
    todo: 'add test videos (YouTube/Vimeo links)',
  },
  {
    id: 'behind', page: 'films',
    title: 'Behind the Seat',
    kind: 'Code animation · interactive experience (demo) · Indaga Studios',
    role: 'Creator · story, design, code',
    year: '2026',
    motif: '🚕',
    img: 'assets/img/behind-the-seat.jpg', pos: '50% 50%',
    blurb: 'A rainy night, a taxi, and a driver who asks one question: "When?" The passenger answers in one line and the ride becomes a memory, drawn entirely in ASCII characters that flow around you.',
    links: [{ label: 'take the ride', url: 'https://behindtheseat.vercel.app' }],
  },
  {
    id: 'strands', page: 'films',
    title: 'Strands',
    kind: 'Sci-fi war drama · in development',
    role: 'Creator',
    year: '',
    motif: '🧬',
    blurb: 'A sci-fi war drama in development.',
    todo: 'confirm it is OK to show + 1 image',
  },
  {
    id: 'awwm', page: 'films',
    title: 'A World Without Magic',
    kind: 'Fantasy romance · in development',
    role: 'Creator',
    year: '',
    motif: '🔥',
    blurb: 'A fantasy romance in development.',
    todo: 'confirm it is OK to show + 1 image',
  },

  // ---------------------------------------------------------------- tools
  {
    id: 'hd-web', page: 'tools', featured: true,
    title: 'Hybrid Dreams',
    kind: 'Writing + worldbuilding studio · web',
    role: 'Founder · product design + build',
    year: '2026',
    motif: '🌙',
    img: 'assets/img/hybrid-dreams.jpg',
    tagline: 'A collection of creative tools by DAGA.',
    blurb: 'A local-first studio in the browser for writers, comic artists and indie filmmakers. Story timelines on an infinite canvas, docs, characters and worlds, storyboards, AI video prompts and an editor to cut the film. Your story lives as plain Markdown in your own folder, never on a server.',
    facts: ['Storiest: visual story timelines', 'Elements: characters, locations, magic systems', 'Directing + Framest: from shot prompts to the final cut', 'Plain Markdown in a folder on your computer, Obsidian-compatible, no account, free'],
    links: [{ label: 'hybrid-dreams.com', url: 'https://www.hybrid-dreams.com/' }],
  },
  {
    id: 'hd-draw', page: 'tools',
    title: 'Inkest',
    kind: 'Drawing app · iPad · Hybrid Dreams',
    role: 'Product design + build',
    year: '2026',
    motif: '✏️',
    blurb: 'A native drawing app for iPad, built in Swift and Metal, so sketches flow straight into the Hybrid Dreams studio.',
    todo: 'add a screenshot',
  },

  // ---------------------------------------------------------------- games
  {
    id: 'calling', page: 'games', featured: true,
    title: 'The Calling',
    kind: 'Interactive experience · career guidance · Indaga Studios',
    role: 'Creative Director',
    year: '2021–2025',
    motif: '🧭',
    img: 'assets/img/the-calling.jpg',
    video: 'https://www.youtube.com/watch?v=iAFNo7Z261w',
    tagline: 'Where are you going? What are you looking for?',
    blurb: 'Discover your vocational path with a video game where you live a magical adventure and face important questions to understand your vocation and your path in life. A production of Indaga Studios and M.O.V.E.',
    facts: ['A vocational education video game', 'An interactive career finder', 'Part of the M.O.V.E. digital ecosystem, built on Javier Echevarría\'s vocational guidance method'],
    links: [{ label: 'movetuvocacion.com', url: 'https://www.movetuvocacion.com/' }],
  },
  {
    id: 'thrive-table', page: 'games',
    title: 'Thrive to Table',
    kind: 'Cozy cafe adventure game',
    role: 'Main Artist, AI-assisted workflows',
    year: '',
    motif: '🥕',
    img: 'assets/img/thrive-to-table.jpg', pos: '50% 22%',
    tagline: 'Tiny mysterious friends escaped from the real world help you craft and thrive in a cozy cafe adventure.',
    blurb: 'Main artist, leading AI-assisted art workflows.',
    links: [{ label: 'thrivetotable.com', url: 'https://thrivetotable.com/' }],
  },
  {
    id: 'cusco', page: 'games',
    title: 'Cusco Paradox',
    kind: 'Game (demo) · Indaga Studios',
    role: 'Creative Director',
    year: '2021',
    motif: '🦙',
    img: 'assets/img/cusco-paradox.jpg',
    tagline: 'An LGBTQ+ narrative puzzle game about a fox being trapped in the Incan netherworld.',
    blurb: 'My own queer Inca game. An educational interactive experience made at Indaga Studios, where I led creative direction, art direction and production.',
    links: [{ label: 'play the demo on itch.io', url: 'https://indagastudios.itch.io/cuscoparadox' }],
  },
  {
    id: 'giftagame', page: 'games',
    title: 'Gift a Game',
    kind: 'Personalised gift game · web · Indaga Studios',
    role: 'Founder & Creative Director',
    year: '2026',
    motif: '🎁',
    img: 'assets/img/gift-a-game.jpg',
    blurb: 'A special gift made just for your loved ones: their city as a tiny game, personalised by you, with your words hidden on the signs and your message at the end. Any phone. No app.',
    links: [{ label: 'giftagame.app', url: 'https://www.giftagame.app/' }],
  },
  {
    id: 'kadabra', page: 'games',
    title: 'Escuela Kadabra',
    kind: 'Educational game · Innova Schools',
    role: 'Lead Artist',
    year: '2019–2021',
    motif: '🎩',
    img: 'assets/img/escuela-kadabra.jpg',
    video: 'https://www.youtube.com/watch?v=9lFaFwQrFaA',
    tagline: 'An educational side-scroller narrative game for kids.',
    facts: ['Reading comprehension minigames: vocabulary, decoding and inferential meaning', 'Explore the world of Eureka and the Ekai, mythical creatures who guide the learning'],
    blurb: 'A learning game for kids in rural Latin America. I built and ran the full art pipeline, from vision to delivery, and mentored the junior designers.',
  },
  {
    id: 'azoove', page: 'games',
    title: 'Azoove',
    kind: 'Game · Timeless Toucan Studios',
    role: 'UI Artist',
    year: '2023–2024',
    motif: '🎮',
    img: 'assets/img/azoove/key-art.jpg',
    gallery: ['assets/img/azoove/ui-1.jpg', 'assets/img/azoove/ui-2.jpg', 'assets/img/azoove/ui-3.jpg', 'assets/img/azoove/ui-4.jpg', 'assets/img/azoove/ui-5.jpg', 'assets/img/azoove/ui-6.jpg', 'assets/img/azoove/ui-7.jpg'],
    blurb: 'Defined the UI art direction that became the game\'s visual identity, and iterated the player experience from user research.',
  },
  {
    id: 'empathy', page: 'games',
    title: 'Empathy Hearts',
    kind: 'Visual novel · mental health · Indaga Studios',
    role: 'Producer',
    year: '2023',
    motif: '🌈',
    img: 'assets/img/empathy-hearts.jpg',
    links: [{ label: 'play on itch.io', url: 'https://indagastudios.itch.io/empathy-hearts' }],
    blurb: 'A visual novel made together with 4th-year secondary students from Innova Schools, to share knowledge and build empathy for people who live with OCD.',
  },

  // ---------------------------------------------------------------- comics
  {
    id: 'mod', page: 'comics', featured: true,
    title: 'MOD · Machine of Dreams',
    kind: 'My own webtoon IP · hand-drawn, no AI',
    role: 'Writer & artist',
    year: 'ongoing',
    motif: '🧠',
    img: 'assets/img/mod-machine-of-dreams.jpg', pos: '50% 30%',
    tagline: 'What do you dream about when no one else is watching?',
    blurb: 'My most personal story, drawn fully by hand. No AI, ever. Paris, September 21, 2075. MOD, the quantum computer that can open the door between the real world and the world of dreams, is out of control, and Paris is sunk in an endless dream. Mida and the DreamHackers, the ones who stay lucid in the dream, try to take back their city, not knowing they are about to face the truths hidden deep in the human unconscious.',
    facts: ['3 pilot episodes published: 1:1 Mida · 1:2 Petra · 1:3 Limbo between dreams', 'Published in Spanish on WEBTOON Canvas'],
    links: [{ label: 'read it on WEBTOON', url: 'https://www.webtoons.com/es/canvas/mod-machine-of-dreams/list?title_no=521619' }],
  },
  {
    id: 'rosa-cuchillo', page: 'comics',
    title: 'Rosa Cuchillo',
    kind: 'Book illustration · Penguin Random House',
    role: 'Illustrator, Penguin Random House',
    year: '',
    motif: '🌹',
    blurb: 'Illustration for Rosa Cuchillo, published by Penguin Random House.',
    todo: 'check the contract before adding covers',
  },
  {
    id: 'mario-vargas-llosa', page: 'comics',
    title: 'Mario, el universo de Vargas Llosa',
    kind: 'Book illustration · Penguin Random House',
    role: 'Illustrator, Penguin Random House',
    year: '',
    motif: '📚',
    blurb: 'Illustration for Mario, el universo de Vargas Llosa, published by Penguin Random House.',
    todo: 'check the contract before adding covers',
  },
  {
    id: 'distortion', page: 'comics',
    title: 'DISTORTION',
    kind: 'My own comic IP',
    role: 'Writer & artist',
    year: '',
    motif: '🌀',
    blurb: 'A comic series, shared in pieces on Instagram.',
    todo: 'add a page + link',
  },
  {
    id: 'illus', page: 'comics',
    title: 'Illustration',
    kind: 'Selected pieces',
    role: 'Illustrator',
    year: '',
    motif: '🖌️',
    blurb: 'A selection of personal and commissioned illustration.',
    todo: 'add 6–12 pieces',
  },

  // ---------------------------------------------------------------- product
  {
    id: 'thrivepal', page: 'product', featured: true,
    title: 'ThrivePal',
    kind: 'Mobile app',
    role: 'UX/UI designer, visual developer',
    year: '2024–now',
    motif: '🌱',
    blurb: 'Mobile-first UX/UI flows and visuals built from user research and behavioral insight. I set the art direction and brand guidelines, and designed generative AI production pipelines with Stable Diffusion, ComfyUI and Google AI Studio.',
  },
  {
    id: 'colloquium', page: 'product',
    title: 'Graphic Design Colloquium',
    kind: 'Visual identity · PUCP, Lima',
    role: 'Activities + brand coordinator',
    year: '2017',
    motif: '🎟️',
    blurb: 'The full identity system for the university\'s largest design event, across print, signage, merch and digital. I led a team of 30 designers.',
  },

  // ---------------------------------------------------------------- studio
  {
    id: 'indaga', page: 'studio', featured: true, indaga: true,
    title: 'Indaga Studios',
    kind: 'My studio · Lima → Toronto',
    role: 'Founder, lead designer, producer',
    year: '2021–now',
    motif: '⭐',
    blurb: 'My own studio. Interactive experiences about 2SLGBTQ+ inclusion, mental health and career guidance; then original IP and AI-assisted animation. I ran a two-year production with an 11-person team, vendors across time zones, budgets, briefs and the art bible.',
  },
  {
    id: 'creator', page: 'studio',
    title: '50k on TikTok',
    kind: 'Content creator',
    role: 'Creator',
    year: '2020',
    motif: '📱',
    blurb: 'Grew a TikTok audience past 50,000 with strong visual hooks and stories people felt.',
  },
  {
    id: 'clothing', page: 'studio',
    title: 'My clothing brand',
    kind: 'E-commerce · Shopify',
    role: 'Founder',
    year: '',
    motif: '👕',
    blurb: 'Ran my own clothing brand online, end to end: design, store, content.',
    todo: 'add name + year',
  },
];

export const awards = [
  { year: '2023', title: 'Female creator of intellectual property', by: 'Peruvian Government Award' },
  { year: '2022', title: 'Young creators who shine', by: 'Peruvian Government Award' },
  { year: '2022', title: 'Scholarship for digital creators building 2SLGBTQ+ awareness projects', by: 'OUTtv, Canada' },
  { year: '', title: 'First of the class · Winternitz award', by: 'Pontifical Catholic University of Peru' },
];

// Talks you gave. Fill these in; empty ones show as a pencil note.
export const talks = [
  { year: '2026', title: 'Hand-drawn AI animation: turning 3D AI animation into 2D hand-drawn frames with my own tools', where: 'BC + AI Film Club · Vancouver AI', url: 'https://www.youtube.com/watch?v=TUXn235_Btw&t=19s' },
  { year: '', title: '', where: '', url: '', todo: 'add another talk' },
];

// ---------------------------------------------------------------- CV only
export const experience = [
  { role: 'Lead Designer, Producer', org: 'Indaga Studios', where: 'Lima, Peru', when: 'Nov 2021 – Mar 2025',
    points: ['Creative direction and brand strategy for interactive experiences: Empathy Hearts, Cusco Paradox, The Calling.', 'Art bible, briefs and pipelines for an 11-person team plus vendors across time zones.', 'Pitch decks, trailers, web and social for each launch.'] },
  { role: 'UX/UI Designer, Visual Developer', org: 'ThrivePal', where: 'New York (remote)', when: 'Apr 2024 – now',
    points: ['Mobile-first UX/UI from user research; art direction and brand guidelines.', 'Generative AI production pipelines (Stable Diffusion, ComfyUI, Google AI Studio).'] },
  { role: 'UX/UI Designer, Visual Developer', org: 'Timeless Toucan Studios · Azoove', where: 'Seattle (remote)', when: 'Nov 2023 – Feb 2024',
    points: ['UI art direction that became the product\'s core identity; UX iterations from research.'] },
  { role: 'Art Lead', org: 'Innova Schools · Escuela Kadabra', where: 'Lima, Peru', when: 'Oct 2019 – Nov 2021',
    points: ['Built and ran the full art pipeline; mentored junior designers; print + digital.'] },
  { role: 'Illustrator', org: 'Penguin Random House', where: '', when: '',
    points: ['Book illustration.'] },
  { role: 'Content Creator', org: 'Personal brand', where: 'Lima, Peru', when: 'Mar – Nov 2020',
    points: ['Grew a TikTok audience to 50,000+.'] },
  { role: 'Activities and Brand Coordinator', org: 'Graphic Design Colloquium, PUCP', where: 'Lima, Peru', when: 'Feb – Oct 2017',
    points: ['Identity for the university\'s largest design event; led 30 designers.'] },
];

export const education = [
  { title: 'Master of Digital Media (MDM) · Product and Project Management', where: 'Centre for Digital Media, University of British Columbia' },
  { title: 'Bachelor of Art & Graphic Design · First of the class, Winternitz award', where: 'Pontifical Catholic University of Peru' },
];

export const skills = ['Creative direction', 'Directing', 'AI visual production', 'Art direction', 'Visual development', 'UX/UI', 'Brand systems', 'Comics + illustration', 'Production management', 'Content strategy'];
export const tools = ['Figma', 'Adobe Suite', 'ComfyUI', 'Midjourney', 'Google AI Studio', 'Klaviyo', 'Coda', 'ClickUp', 'Jira'];
export const languages = ['Spanish (native)', 'English (fluent)'];
