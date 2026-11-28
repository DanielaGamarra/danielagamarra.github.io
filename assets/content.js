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
//  - sections: [{ h, text, items[], gallery[], note }] process chapters on the
//          project page (challenge, research, etc). A gallery item can be
//          { src, wide: true } to fill the whole row.
//          loop: ['A', 'B', ...] draws a core-loop circle; flow: ['A', 'B'] draws
//          a step-by-step chain.
//  - team: [{ name, role }] the people on projects Daga led, shown on the page.
//  - tags: ['UX/UI · Product' | 'Product design · Management' | 'Game UX/UI'] shown as chips.
//  - draft: true keeps a project hidden until its text and images are in.
//  - locked: true shows an ASCII lock card; the real page is encrypted in assets/locked.json
//          (built from IPs/Portfolio/hiring/ with build-locked.mjs). Unlocks with the hiring password.
//  - also: other pages the project shows on too, e.g. ['studio'].
//  - todo: a pencil note shown on the card until you fill it in.
//          Delete the todo line when the info is final.
// =====================================================================

export const site = {
  name: 'Daga',
  fullName: 'Daniela Gamarra',
  role: 'AI Filmmaker, Director & Visual Developer',
  tagline: 'Queer animated stories, made with a human-first AI pipeline: the artist leads, the tools follow.',
  location: 'Born in Lima, based in Toronto',
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
  hero: 'I make queer animated stories, games, comics and the tools to build them. More than ten years of drawing by hand, now directing with a human-first AI pipeline: the artist leads, the tools follow. This is my digibook, a digital sketchbook. Drag the cat, flip through the pages, doodle in the margins.',
  heroMarks: ['queer animated stories', 'games', 'comics', 'tools', 'human-first AI pipeline', 'digibook'],
  // About text (from the portfolio brief, kept as written).
  about: "Hola! I'm Daga, an award-winning visual developer and director from Peru, now based in Toronto, and queer too. More than ten years across comics, webtoons, illustration and games. I ran my own game studio and led a two-year production with an 11-person team. Back home, I was recognized for women's leadership in intellectual property and as a standout young creator. Now I make AI-assisted animation and lead character and UI art for games.",
  stats: [
    { n: '10+', label: 'years drawing for a living' },
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
  { id: 'comics',  no: '04', title: 'comics & webtoons', note: 'by hand, always', at: [-1, 1], cols: 2, tint: 'pink',
    // "What I do" card on this page.
    intro: "I'm an award-winning comic & manga artist and art director. I have a deep passion for visual narrative and design, and an obsession with pushing each visual medium to make versatile, high-quality, memorable stories.",
    roles: [
      { h: 'Comic artist', text: 'Visual development of the style, storyboarding, penciling, inking, coloring, page layout, cover design.' },
      { h: 'Art direction', text: 'Stakeholder alignment, art style direction, character and environment design, color script, team communication, art quality assurance, team feedback, and teaching junior artists to grow their skills.' },
      { h: 'Art production manager', text: 'Setting the production pipeline, finding risks, and improving processes.' },
      { h: 'Graphic designer', text: 'Cover design, layout and print preparation for comics.' },
    ] },
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
    id: 'behind', page: 'films',
    tags: ['Writing'],
    title: 'Behind the Seat',
    kind: 'Code animation · interactive experience (demo) · Indaga Studios',
    role: 'Creator · story, design, code',
    year: '2026',
    motif: '🚕',
    img: 'assets/img/behind-the-seat.jpg', pos: '50% 50%',
    blurb: 'A rainy night, a taxi, and a driver who asks one question: "When?" The passenger answers in one line and the ride becomes a memory, drawn entirely in ASCII characters that flow around you.',
    links: [{ label: 'take the ride', url: 'https://behindtheseat.vercel.app' }, { label: 'read the case study', url: 'case-studies/behind-the-seat/' }],
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
  {
    id: 'trash-squad', page: 'films',
    title: 'Trash Squad',
    kind: 'Animated series concept · pitch',
    role: 'Art Lead',
    year: '2018',
    motif: '🚀',
    img: 'assets/img/trash-squad/key-art.jpg',
    blurb: 'I led the visual development of the project: key concept art, character design and storyboards. I also guided the production team to keep the style and quality consistent. The project reached the semifinals of an international contest after being pitched to Cartoon Network executives and artists from the acclaimed show Steven Universe.',
    facts: ['Semifinalist in an international contest', 'Pitched to Cartoon Network executives and Steven Universe artists'],
    sections: [
      {
        h: 'Key concept art',
        text: 'Key concept art for the show.',
        gallery: ['assets/img/trash-squad/battle.jpg', 'assets/img/trash-squad/bin-galaxy.jpg'],
      },
      {
        h: 'Memories',
        text: 'I painted the background art for the main character\'s memories, with an old, nostalgic look and a style of their own, so the past reads apart from the present.',
        gallery: ['assets/img/trash-squad/memory-1.jpg', 'assets/img/trash-squad/memory-2.jpg'],
      },
      {
        h: 'Storyboards',
        text: 'A selection of storyboard shots for the pilot.',
        gallery: ['assets/img/trash-squad/board-1.jpg', 'assets/img/trash-squad/board-2.jpg', 'assets/img/trash-squad/board-3.jpg'],
      },
    ],
  },

  // ---------------------------------------------------------------- tools
  {
    id: 'hd-web', page: 'tools', featured: true,
    tags: ['Product design · Management'],
    title: 'Hybrid Dreams',
    kind: 'Writing + worldbuilding studio · web',
    role: 'Founder · product design + build',
    year: '2025',
    motif: '🌙',
    img: 'assets/img/hybrid-dreams.jpg',
    tagline: 'A collection of creative tools by DAGA.',
    blurb: 'A local-first studio in the browser for writers, comic artists and indie filmmakers. Story timelines on an infinite canvas, docs, characters and worlds, storyboards, AI video prompts and an editor to cut the film. Your story lives as plain Markdown in your own folder, never on a server.',
    facts: ['Storiest: visual story timelines', 'Elements: characters, locations, magic systems', 'Directing + Framest: from shot prompts to the final cut', 'Plain Markdown in a folder on your computer, Obsidian-compatible, no account, free'],
    links: [{ label: 'hybrid-dreams.com', url: 'https://www.hybrid-dreams.com/' }],
  },
  {
    id: 'hd-draw', page: 'tools', also: ['studio'],
    tags: ['Product design · Management'],
    title: 'Brushest',
    kind: 'iPad drawing + animation app · Apple Pencil · Indaga Studios',
    role: 'Product design + build',
    year: '2026',
    motif: '🖌️',
    img: 'assets/img/brushest.jpg', pos: '50% 20%',
    tagline: "Drawings that won't sit still.",
    blurb: 'An iPad app for Apple Pencil where every line stays alive. Lines boil, wave, bounce and fly apart, without redrawing a single frame.',
    facts: ['Living strokes and stackable effects', 'Frame-by-frame animation', '3D planes'],
    links: [{ label: 'try it on the page', url: 'https://danielagamarra.github.io/brushest/' }],
  },
  {
    id: 'ganttier', page: 'tools',
    tags: ['Product design · Management'],
    title: 'Ganttier',
    kind: 'Planner app · web · Indaga Studios',
    role: 'Product design + build',
    year: '2026',
    motif: '📅',
    img: 'assets/img/ganttier.jpg',
    tagline: 'Your plan, alive. Claude is the brain.',
    blurb: 'A personal planner that lives in a folder of Markdown files. It turns goals into a scheduled week, and any AI, starting with Claude, can read and run it with you.',
    facts: ['Free, local-first, AI-ready', 'No sign-up: your files stay on your computer unless you choose a cloud folder like Google Drive'],
    links: [{ label: 'open Ganttier', url: 'https://ganttier.vercel.app/?welcome' }],
  },

  // ---------------------------------------------------------------- games
  {
    id: 'calling', page: 'games', featured: true,
    tags: ['Game UX/UI'],
    title: 'The Calling',
    kind: 'Interactive experience · career guidance · Indaga Studios',
    role: 'Creative Director, Lead Designer',
    year: '2021–2025',
    motif: '🧭',
    img: 'assets/img/the-calling.jpg',
    video: 'https://www.youtube.com/watch?v=iAFNo7Z261w',
    tagline: 'Where are you going? What are you looking for?',
    blurb: 'Discover your vocational path with a video game where you live a magical adventure and face important questions to understand your vocation and your path in life. A production of Indaga Studios and M.O.V.E.',
    facts: ['A vocational education video game', 'An interactive career finder', 'Part of the M.O.V.E. digital ecosystem, built on Javier Echevarría\'s vocational guidance method', 'Made with Unity and Figma'],
    links: [{ label: 'movetuvocacion.com', url: 'https://www.movetuvocacion.com/' }],
    team: [{ name: 'Brenda Barrueta', role: 'Lead Artist' }, { name: 'Satoshi Waku', role: 'UX/UI' }, { name: 'Yoshi Capurro', role: 'Technical Artist' }],
    sections: [
      {
        h: 'Creative & art direction',
        text: 'I led the project across experience design and art direction, working with cross-functional teams on everything the game needed, from narrative design and technical implementation to stakeholder engagement and strategy. I led the creative and artistic vision of the game, from concept art and briefs to designing and maintaining the art bible and organizing the team. I set high-quality standards for asset production, kept the team on schedule, and set the direction and artistic mood of the experience. With our artists, designers and tech artists, I chose the visual direction from the first concept, where I drew the characters myself, to the final iteration, where I directed the in-house art team and international contractors.',
        note: 'Character concepts by me. Final art by Brenda Barrueta (Lead Artist), Satoshi Waku (UX/UI) and Yoshi Capurro (Technical Artist).',
      },
      {
        h: 'Character style & camera',
        text: 'I developed and kept the character style consistent with the artists across every in-game character, with close attention to asset sizes, style and color palette. I also worked with the artists to polish the camera angle, giving the game its own immersive look and feel.',
        note: 'Character sheets, props and scale charts by Brenda Barrueta, under my art direction.',
      },
      {
        h: 'The challenge',
        text: 'Design a career guidance experience that tests behavior and responses, then gives a guidance result. We ran many tests with students aged 15 to 18 who don\'t play video games.',
      },
      {
        h: 'Research',
        text: 'After aligning the product outcomes with stakeholders, I made a product development plan, from understanding the user to actionable design requirements. The stakeholders had worked with students for more than 30 years and had many ideas about them, so once we were aligned I ran focused research on the pain points of career guidance as a digital experience.',
        items: [
          'Gen Z is less digitally savvy than millennials. Modern products are so easy that Gen Z understands digital products outside social media even less than people think. Add a short attention span, and the game had to be linear, with no room for exploration. Action: transversal mechanics. One or two core mechanics keep the whole game consistent, all aligned with the design system.',
          'Most users in Latin America have a mid-range computer and unstable internet. Only gamers are the exception. Action: a web-based game, with each scene capped at 35 MB. That limit shaped every area of the game, especially art and UI.',
          'Choosing a career is one of the most stressful moments in a young person\'s life, and any failure in the experience can cause emotional distress beyond the game itself. Action: minigames. We turned the guidance method into varied minigames inside a linear journey. Each one gives a partial insight, because the journey is about self-discovery, not just the final result. I ran design sessions to create intuitive minigames that collect the method\'s data without overwhelming players with tutorials.',
        ],
      },
      {
        h: 'User flow',
        text: 'As Lead Designer, I worked with a junior designer to keep improving the experience: intuitive, instructional, and still an immersive game world, since most of the game is UI.',
        loop: ['Explore', 'Talk to a character', 'Vocational minigame', 'Update career profile'],
      },
      {
        h: 'Collaborative iteration',
        text: 'I managed a team with very different levels of seniority. The key was making sure everyone, artists included, understood the design principles and how their work affected other areas. Level design was all hands: the whole team could see how each piece built the full experience.',
      },
      {
        h: 'Testing & production',
        text: 'We ran several rounds of testing with internal and external control groups. We built with a "build to think" mindset, polishing every part of the game from day one. After each test we looked at two outcomes, design and technology, and I organized the team around what to keep, fix or completely change.',
      },
    ],
  },
  {
    id: 'fusewave', page: 'games',
    tags: ['Writing'],
    title: 'Fusewave',
    kind: 'Cozy music adventure game',
    role: 'Writer, game design',
    year: '2024',
    motif: '🎧',
    img: 'assets/img/fusewave/key-art.jpg',
    tagline: 'A narrative-driven sandbox where you compose your own songs.',
    blurb: 'A cozy music adventure game where creativity is key: players explore a narrative-driven sandbox and create their own music. I wrote the game and worked on parts of its game design.',
    team: [{ name: 'Rija Kamran', role: 'Art' }, { name: 'Javier Fernandez (Monkey)', role: 'Game design' }, { name: 'Paula Valverde', role: 'Project manager' }],
    sections: [
      {
        h: 'The world',
        gallery: [{ src: 'assets/img/fusewave/art-headphones.jpg', wide: true }, 'assets/img/fusewave/art-mall.jpg', 'assets/img/fusewave/art-dome.jpg', 'assets/img/fusewave/hero-art.jpg'],
        note: 'Art by Rija Kamran.',
      },
      {
        h: 'Prototype',
        gallery: ['assets/img/fusewave/prototype-1.jpg', 'assets/img/fusewave/prototype-2.jpg'],
      },
    ],
  },
  {
    id: 'thrive-table', page: 'games', locked: true,
    tags: ['Game UX/UI'],
    title: 'Thrive to Table',
    kind: 'Cozy cafe game',
    role: 'Main Artist',
    year: '2024–now',
    motif: '🔒',
    blurb: 'Current work, shown privately to people hiring me. Ask me for the password.',
  },
  {
    id: 'cusco', page: 'games',
    tags: ['Game UX/UI', 'Writing'],
    team: [{ name: 'Alejandro Melian', role: 'Game design' }, { name: 'Yoshi Capurro', role: 'Art support' }],
    title: 'Cusco Paradox',
    kind: 'Game (demo) · Indaga Studios',
    role: 'Creative Director, Lead Designer & Producer',
    year: '2021',
    motif: '🦙',
    img: 'assets/img/cusco-paradox.jpg',
    tagline: 'An LGBTQ+ narrative puzzle game about a fox being trapped in the Incan netherworld.',
    blurb: 'My own queer Inca game. An educational interactive experience made at Indaga Studios, where I led creative direction, art direction and production.',
    links: [{ label: 'play the demo on itch.io', url: 'https://indagastudios.itch.io/cuscoparadox' }],
    sections: [
      {
        h: 'Creative & art direction',
        text: 'I led the creative and artistic vision of the game, from concept art and briefs to designing and maintaining the art bible. The challenges: very different devices, a team with mixed seniority and art styles, and tight timelines set by stakeholders. The solution: a pixel art game with a unique use of shaders and lights.',
      },
      {
        h: 'Characters',
        text: 'I worked closely with the artists to craft memorable characters. I sketched the first designs and color palettes by hand, sent them to the pixel artist for production, and ran feedback sessions until the characters had the look and feel we wanted.',
      },
      {
        h: 'Level concept art',
        text: 'I drew and painted concept art for every level, with precise notes on lighting, landmarks and color palette, and walked the environment pixel artist through them. That kept the final game true to the vision.',
        gallery: [{ src: 'assets/img/cusco/village.jpg', wide: true }, 'assets/img/cusco/serpent-puzzle.jpg', 'assets/img/cusco/green-cave.jpg', 'assets/img/cusco/temple.jpg'],
      },
      {
        h: 'The challenge',
        text: 'Design a narrative-driven puzzle game that tells an Incan 2SLGBTQ+ story and raises awareness about homophobia in the Peruvian Andes. The hardest part of the experience design was teaching players how to play with minimal resources, inside the limits of a web game, while keeping the true identity and historical value of the queer elements of pre-colonial Peru.',
      },
      {
        h: 'Game flow',
        text: 'Players solve puzzles to earn story rewards and move forward. As a cozy game, the stakes stay low when you lose. The main focus was cultural authenticity, which shaped the whole UI design.',
        loop: ['Solve the puzzle', 'Progress in the story'],
      },
      {
        h: 'UX/UI, wireframes & sketches',
        text: 'It was a web and mobile browser game that had to support player gestures like any other mobile game, while staying as modular and simple as possible. I prioritized quantity over polish to get results and run tests fast.',
        gallery: ['assets/img/cusco/sketches.jpg', 'assets/img/cusco/grid-wireframes.jpg', 'assets/img/cusco/tutorial-1.jpg', 'assets/img/cusco/tutorial-2.jpg', 'assets/img/cusco/tutorial-3.jpg'],
      },
      {
        h: 'Testing',
        text: 'I ran several user tests on the game\'s difficulty. Despite the simple mechanics and cozy world, the difficulty grew exponentially and players struggled to understand what to do. Solving that was the most demanding design problem of the project.',
        gallery: [{ src: 'assets/img/cusco/testing-grids.jpg', wide: true }],
      },
    ],
  },
  {
    id: 'giftagame', page: 'games', also: ['studio'],
    tags: ['Product design · Management'],
    title: 'Gift a Game',
    kind: 'Personalised gift game · web · Indaga Studios',
    role: 'Founder & Creative Director',
    year: '2026',
    motif: '🎁',
    img: 'assets/img/gift-a-game-card.jpg',
    blurb: 'A special gift made just for your loved ones: their city as a tiny game, personalised by you, with your words hidden on the signs and your message at the end. Any phone. No app.',
    links: [{ label: 'giftagame.app', url: 'https://www.giftagame.app/' }, { label: 'read the case study', url: 'case-studies/gift-a-game/' }],
  },
  {
    id: 'kadabra', page: 'games',
    tags: ['Game UX/UI', 'Writing'],
    title: 'Escuela Kadabra',
    kind: 'Educational game · Innova Schools',
    role: 'Art Lead, Lead UX/UI Designer, then Art Direction & Production',
    year: '2019–2021',
    motif: '🎩',
    img: 'assets/img/escuela-kadabra.jpg',
    video: 'https://www.youtube.com/watch?v=9lFaFwQrFaA',
    tagline: 'An educational side-scroller narrative game for kids.',
    facts: ['Completion rate up from 0.38% to 30%', 'Reading comprehension minigames: vocabulary, decoding and inferential meaning', 'Explore the world of Eureka and the Ekai, mythical creatures who guide the learning', 'Made with Unity and Figma'],
    blurb: 'I designed an educational experience for a critical issue in Latin America: low reading comprehension among children, which becomes a bigger challenge as they grow and meet more complex information. Escuela Kadabra uses a gamified approach to build essential communication skills, including vocabulary, decoding and inferential thinking. I was the Art Lead and Lead Experience Designer (UX/UI). Later I moved into art direction and production, managing pipelines, briefs and quality assurance with in-house artists and contractors from Peru and Spain.',
    sections: [
      {
        h: 'The challenge',
        text: 'Escuela Kadabra had many design challenges, especially in accessibility. I was part of the first research trip to central Peru to find business opportunities in education, and I worked alongside educators and learning psychologists.',
      },
      {
        h: 'Two users: the mother and the child',
        text: 'As the main designer, my first task was to understand the pain points of our users: children aged 8 to 11 in low-income regions of Latin America. After interviews and experiments, the team learned that the problems these kids face can\'t be solved by a direct product.',
        items: [
          'Proxy user: Latin American mothers. Because of the children\'s age, low family income, and a culture where kids get technology later than in North America, we had to understand the mother too: why would she give her child an educational product?',
          'Mothers decide. In Latin America, mothers choose the educational products. To improve retention, we designed ads for mothers, and the app\'s first onboarding was for the mother, who then hands the phone to her child.',
          'Children\'s digital behavior. Most of our players had barely used technology before. Besides deep research on children\'s usability and accessibility, we made the app extremely easy for someone who has never used an app or a game.',
        ],
      },
      {
        h: 'Pixel art for low-end phones',
        text: 'The app had to run on low-end devices, so the challenge was to make the simplest yet most immersive experience for kids and their parents. Our answer was a full pixel art style, and there I took another hat: Art Lead, with 2 in-house designers and artists, plus contractors abroad. I led the team producing characters, props, animations and UI, and during production I ran feedback sessions to keep the style consistent and raise the quality of each artist\'s work.',
      },
      {
        h: 'Live game experience',
        text: 'As the Experience Designer (UX/UI), I worked closely with the game designer and the educational designer on the first concept and test plans. One of my main goals was to keep the game fun: without that, retention would drop even if the product taught well. I advocated for the changes and features that kept kids engaged, and the completion rate grew from 0.38% to 30%.',
        loop: ['Explore', 'Reading game', 'Earn coins, unlock areas', 'Upgrade your Ekai'],
      },
      {
        h: 'Wireframes & sketches',
        text: 'I did rapid prototyping with the education team to draft the game concept and its features together. Then I refined the pixel art UI and tested it many times with children aged 8 to 11, until it was both attractive and easy to use for the lower dexterity of younger players.',
      },
    ],
  },
  {
    id: 'azoove', page: 'games',
    tags: ['Game UX/UI'],
    title: 'Azoove',
    kind: 'Social survival card game · Timeless Toucan Studios',
    role: 'UX/UI Designer, Visual Developer',
    year: '2023–2024',
    motif: '🎮',
    img: 'assets/img/azoove/key-art.jpg',
    gallery: ['assets/img/azoove/ui-1.jpg', 'assets/img/azoove/ui-2.jpg', 'assets/img/azoove/ui-3.jpg', 'assets/img/azoove/ui-4.jpg', 'assets/img/azoove/ui-5.jpg', 'assets/img/azoove/ui-6.jpg', 'assets/img/azoove/ui-7.jpg'],
    blurb: 'I worked alongside the creative director to redesign the existing interface and create new features, fixing usability issues and making the visual experience more immersive. I defined the UI art direction that became the game\'s visual identity, and iterated the player experience from user research.',
  },
  {
    id: 'catpid', page: 'games',
    tags: ['Production'],
    team: [{ name: 'Rija Kamran', role: 'Art' }],
    title: 'Catpid',
    kind: 'Matchmaking puzzle game · Opal Studios',
    role: 'Producer, project manager, game design',
    year: '',
    motif: '🐱',
    img: 'assets/img/catpid/key-art.jpg',
    tagline: 'Create couples of cats and watch what kind of love grows.',
    blurb: 'A cozy game about making cat couples in an office: match cats by what they love, and see whether each pair becomes healthy love, toxic love or stays neutral. I was the producer and project manager, and I tweaked the game design in the final stage.',
    gallery: ['assets/img/catpid/screen-1.jpg', 'assets/img/catpid/screen-2.jpg', 'assets/img/catpid/screen-3.jpg', 'assets/img/catpid/screen-4.jpg'],
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
    role: 'Writer, main comic artist & art manager',
    year: 'ongoing',
    motif: '🧠',
    img: 'assets/img/mod-machine-of-dreams.jpg', pos: '50% 30%',
    tagline: 'What do you dream about when no one else is watching?',
    blurb: 'My most personal story, drawn fully by hand. No AI, ever. Paris, September 21, 2075. MOD, the quantum computer that can open the door between the real world and the world of dreams, is out of control, and Paris is sunk in an endless dream. Mida and the DreamHackers, the ones who stay lucid in the dream, try to take back their city, not knowing they are about to face the truths hidden deep in the human unconscious.',
    facts: ['3 pilot episodes published: 1:1 Mida · 1:2 Petra · 1:3 Limbo between dreams', 'Published in Spanish on WEBTOON Canvas'],
    links: [{ label: 'read it on WEBTOON (Spanish)', url: 'https://www.webtoons.com/es/canvas/mod-machine-of-dreams/list?title_no=521619' }],
    sections: [
      {
        h: 'Panels as optical illusions',
        text: 'A webcomic that dives into the subconscious mind, quantum computers and climate change. Experimental gutter work and transitions give it a unique art style that brings optical illusions into the reading: long panels that blend one scene into the next as you scroll.',
      },
      {
        h: 'Making it',
        text: 'I did the character and environment design. A short timeline pushed me to experiment more with transitions and new ways to weave panels into the storytelling. I designed and painted the covers for all three chapters and took on the role of Art Manager, organizing two more artists who lettered the script into the speech bubbles and added sound effects. Finally, I worked with the editor to produce a printed version of the comic.',
      },
    ],
  },
  {
    id: 'rosa-cuchillo', page: 'comics',
    title: 'Rosa Cuchillo',
    kind: 'Graphic novel · Random Cómics, Penguin Random House',
    role: 'Penciler, main comic artist & art direction',
    year: '2021',
    motif: '🌹',
    img: 'assets/img/rosa-cuchillo.jpg', pos: '50% 30%',
    links: [{ label: 'watch the book presentation', url: 'https://www.youtube.com/watch?v=_xal_0b7Fyg' }],
    blurb: 'Rosa Cuchillo. La novela gráfica: the comic adaptation of Óscar Colchado\'s novel Rosa Cuchillo (1997), published by Random Cómics, Penguin Random House. I was the penciler and main comic artist, and I developed the art direction of the project: style, character and environment design. I also did the coloring and the cover, in several color palettes for marketing, and worked with the final editing team on lettering, typography, dialogue bubbles and quality control for the printed book.',
    facts: ['ISBN 9786124827327'],
  },
  {
    id: 'mario-vargas-llosa', page: 'comics',
    title: 'Mario. El universo Vargas Llosa',
    kind: 'Comic · Reservoir Books, Penguin Random House',
    role: 'Comic artist & art direction · one of four artists',
    year: '2019',
    motif: '📚',
    facts: ['Finalist, Best illustrated book or comic, Premios Luces 2019 (El Comercio)', 'ISBN 9786124267123'],
    blurb: 'A comic about the life and novels of Mario Vargas Llosa, written by Carlos Enrique Freyre and drawn by four artists: Jesús Castro, Domenica Pagano, Omar Carrillo and me. I organized the three other comic artists through production, building an art style that felt shared yet let each one stay unique. I also did the layout, inking and coloring of the third chapter.',
    todo: 'add the cover or a page',
  },
  {
    id: 'distortion', page: 'comics',
    title: 'DISTORTION',
    kind: 'My own comic IP',
    role: 'Writer & artist',
    year: '',
    motif: '🌀',
    img: 'assets/img/distortion.jpg', pos: '50% 38%',
    blurb: 'A comic series, shared in pieces on Instagram.',
    fair: true, // "for sale at fairs" tag
    todo: 'add a link',
  },
  {
    id: 'illus', page: 'comics',
    title: 'Illustration',
    kind: 'Selected pieces',
    role: 'Illustrator',
    year: '',
    motif: '🖌️',
    img: 'assets/img/illus/dream-head.jpg', pos: '50% 40%',
    blurb: 'A selection of my personal and commissioned illustration: color pieces, ink work, The Infinity Zine, mosaics and short comics.',
    sections: [
      { h: 'Color', gallery: ['assets/img/illus/dream-head.jpg', 'assets/img/illus/blue-field.jpg', 'assets/img/illus/green-warrior.jpg', 'assets/img/illus/striped-figure.jpg', 'assets/img/illus/magic-within.jpg', 'assets/img/illus/bird-head.jpg', { src: 'assets/img/illus/red-blue.jpg', wide: true }] },
      { h: 'Ink', gallery: ['assets/img/illus/navy-ink-portrait.jpg', 'assets/img/illus/ink-girl.jpg', 'assets/img/illus/sketch-girl-sneakers.jpg', 'assets/img/illus/floating-islands.jpg'] },
      { h: 'The Infinity Zine and mosaics', text: 'The Infinity Zine: 31 connected ink illustrations drawn in 2019. Every card joins its neighbours on all sides, so readers arrange 30 cards to build their own story. Shown framed as one tall print, plus a symmetric 3x3 mosaic.', gallery: ['assets/img/illus/infinity-zine-framed.jpg', 'assets/img/illus/infinity-zine-layout.jpg', 'assets/img/illus/mosaic-3x3.jpg'] },
      { h: 'Short comics', gallery: ['assets/img/illus/no-secrets-panel.jpg', 'assets/img/illus/panel-each-other.jpg', 'assets/img/illus/panel-woke-up.jpg', 'assets/img/illus/simple-beast-cover.jpg'] },
    ],
  },

  // ---------------------------------------------------------------- product

  {
    id: 'thrivepal', page: 'product', locked: true,
    tags: ['UX/UI · Product'],
    title: 'ThrivePal',
    kind: 'Mobile app',
    role: 'Product Designer',
    year: '2024–now',
    motif: '🔒',
    blurb: 'Current work, shown privately to people hiring me. Ask me for the password.',
  },
  {
    id: 'virtualtutors', page: 'product',
    tags: ['UX/UI · Product'],
    title: 'VirtualTutors',
    kind: 'Tutoring booking web app · Innova Schools',
    role: 'UX UI Designer',
    year: '2022',
    motif: '📅',
    img: 'assets/img/virtualtutors.jpg',
    blurb: 'UX/UI design for Tutores Virtuales, a new Innova Schools service: pick a day and a time, then confirm a pack of sessions with your tutor.',
  },
  {
    id: 'cafe-symbiosis', page: 'games', draft: true,
    tags: ['Game UX/UI'],
    title: 'Cafe Symbiosis',
    kind: 'Cozy cafe game',
    role: 'UX UI Designer',
    year: '',
    motif: '☕',
    img: 'assets/img/cafe-symbiosis.jpg',
    blurb: 'UX/UI design for Cafe Symbiosis.',
    todo: 'waiting for the project page (text + images)',
  },
  {
    id: 'copiloto', page: 'product', draft: true,
    tags: ['UX/UI · Product'],
    title: 'Copiloto',
    kind: '',
    role: 'UX UI Designer',
    year: '',
    motif: '🧭',
    blurb: 'UX/UI design for Copiloto.',
    todo: 'waiting for the project page (text + images)',
  },

  // ---------------------------------------------------------------- studio
  {
    id: 'indaga', page: 'studio', featured: true,
    ascii: 'assets/img/indaga-studios-logo.svg',
    links: [{ label: 'indagastudios.com', url: 'https://www.indagastudios.com/' }],
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
    id: 'instagram', page: 'studio',
    title: '10k on Instagram',
    kind: 'Content creator · Instagram',
    role: 'Creator',
    year: '',
    motif: '📸',
    blurb: 'Grew my Instagram, @in.daga, to 10,000 followers.',
    links: [{ label: '@in.daga', url: 'https://www.instagram.com/in.daga' }],
  },
];

// Publications, grouped by type: 'editorial' | 'self' | 'art' | 'prints'
// format: 'print' | 'webcomic' | … · fair: true = Daga sells it at fairs
// (empty groups are hidden). forthcoming: true marks one as coming soon
// (comics fairs like TCAF ask for recent + forthcoming).
export const publications = [
  { type: 'editorial', format: 'print', year: '2021', title: 'Rosa Cuchillo. La novela gráfica', publisher: 'Random Cómics, Penguin Random House', role: 'Penciler, main comic artist & art direction · story by Óscar Colchado', isbn: '9786124827327' },
  { type: 'editorial', format: 'print', year: '2019', title: 'Mario. El universo Vargas Llosa', publisher: 'Reservoir Books, Penguin Random House', role: 'Comic artist (chapter 3) & art direction, one of four artists · script by Carlos Enrique Freyre', isbn: '9786124267123' },
  { type: 'self', format: 'manga / graphic novel, B5, ~48 pages, print', year: '2027', forthcoming: true, fair: true, title: 'DISTORTION', role: 'Writer & artist' },
  { type: 'self', format: 'interchangeable story cards, print', year: '2027', forthcoming: true, fair: true, title: 'The Infinity Zine', role: '30 connected ink illustrations: readers arrange the cards to build their own story · 5 × 5 in cards, full layout 25 × 30 in' },
  { type: 'self', format: 'sketchbook zines, 3 volumes, digest 5.5 × 8.5 in', year: '2027', forthcoming: true, fair: true, title: 'Loose Lines', role: 'Artist' },
  { type: 'self', format: 'illustrated book, work in progress', forthcoming: true, title: '24 Hours of Rain', role: 'Writer & artist' },
  { type: 'self', format: 'webcomic', year: 'online', title: 'MOD · Machine of Dreams, episodes 1:1 to 1:3', publisher: 'WEBTOON Canvas (Spanish)', role: 'Writer, comic artist & art manager', url: 'https://www.webtoons.com/es/canvas/mod-machine-of-dreams/list?title_no=521619' },
];

export const awards = [
  { year: '2023', title: 'Female creator of intellectual property', by: 'Peruvian Government Award' },
  { year: '2022', title: 'Young creators who shine', by: 'Peruvian Government Award' },
  { year: '2022', title: 'Scholarship for digital creators building 2SLGBTQ+ awareness projects', by: 'OUTtv, Canada' },
  { year: '2019', title: 'Finalist, Best illustrated book or comic · Mario. El universo Vargas Llosa', by: 'Premios Luces, El Comercio' },
  { year: '', title: 'Scholarship · Master of Digital Media', by: 'Centre for Digital Media, University of British Columbia' },
  { year: '', title: 'First of the class · Winternitz award', by: 'Pontifical Catholic University of Peru' },
];

// Press: articles that featured your work. `project` links it to a project
// id so it also shows on that project's page.
export const press = [
  { year: '2020', outlet: 'El Comercio', title: 'Premios Luces 2019: revisa la lista de nominados y vota aquí por tus favoritos', url: 'https://elcomercio.pe/luces/premios-luces-estos-son-todos-los-nominados-de-este-ano-noticia/', project: 'mario-vargas-llosa' },
  { year: '2019', outlet: 'Libros a mí', title: '«Mario. El universo Vargas Llosa»: nuestro comentario sobre el cómic de Carlos Enrique Freyre', url: 'https://librosami.pe/2019/07/mario-el-universo-vargas-llosa-nuestro-comentario-sobre-el-comic-de-carlos-enrique-freyre/', project: 'mario-vargas-llosa' },
  { year: '2022', outlet: 'Wayka', title: '«Rosa Cuchillo»: la novela de Óscar Colchado adaptada al manga', url: 'https://wayka.pe/rosa-cuchillo-la-novela-de-oscar-colchado-adaptada-al-manga/', project: 'rosa-cuchillo' },
  { year: '2021', outlet: 'El lector de historietas', title: '“Rosa Cuchillo. La novela gráfica”, de Óscar Colchado y Daniela Gamarra', url: 'https://ellectordehistorietas.blogspot.com/2021/03/rosa-cuchillo-la-novela-grafica-de.html', project: 'rosa-cuchillo' },
  { year: '2023', outlet: 'El Comercio', title: 'Empathy Hearts, el videojuego creado por escolares peruanas que busca erradicar la estigmatización de personas con TOC', url: 'https://elcomercio.pe/tecnologia/videojuegos/empathy-hearts-el-videojuego-creado-por-escolares-peruanas-que-busca-erradicar-la-estigmatizacion-de-personas-con-toc-videojuegos-e-sports-espana-mexico-usa-noticia/', project: 'empathy' },
  { year: '2023', outlet: 'La Nación', title: 'Empathy Hearts, el videojuego creado por colegialas de Perú para apoyar a personas con TOC', url: 'https://www.nacion.com/tecnologia/videojuegos/empathy-hearts-el-videojuego-creado-por-colegialas/FAINQF4WWNEQ5GEGFBTMGADAWI/story/', project: 'empathy' },
  { year: '2023', outlet: 'La República', title: 'Chorrillos: 4 escolares crean videojuego y este toca temas sobre la salud mental', url: 'https://larepublica.pe/videojuegos/Actualidad/2023/02/13/chorrillos-cuatro-escolares-crean-videojuego-toca-temas-salud-mental-toc-empathy-hearts-trastorno-obsesivocompulsivo-953953', project: 'empathy' },
];

// Talks you gave. Fill these in; empty ones show as a pencil note.
export const talks = [
  { year: '2026', title: 'Hand-drawn AI animation: turning 3D AI animation into 2D hand-drawn frames with my own tools', where: 'BC + AI Film Club · Vancouver AI', url: 'https://www.youtube.com/watch?v=TUXn235_Btw&t=19s' },
  { year: '2021', title: 'Rosa Cuchillo, the graphic novel: online book presentation with Óscar Colchado', where: 'Online presentation · PERÚ - Todas Las Sangres', url: 'https://www.youtube.com/watch?v=_xal_0b7Fyg' },
];

// ---------------------------------------------------------------- CV only
export const experience = [
  { role: 'Lead Designer, Producer', org: 'Indaga Studios', where: 'Lima, Peru', when: 'Nov 2021 – Mar 2025',
    points: ['Creative direction and brand strategy for interactive experiences: Empathy Hearts, Cusco Paradox, The Calling.', 'Art bible, briefs and pipelines for an 11-person team plus vendors across time zones.', 'Pitch decks, trailers, web and social for each launch.'] },
  { role: 'Product Designer, Main Artist', org: 'ThrivePal', where: 'New York (remote)', when: 'Apr 2024 – now',
    points: ['Mobile-first UX/UI from user research; art direction and brand guidelines.', 'Main artist on a cozy cafe game: character design, UI art and environment assets.'] },
  { role: 'UX/UI Designer, Visual Developer', org: 'Timeless Toucan Studios · Azoove', where: 'Seattle (remote)', when: 'Nov 2023 – Feb 2024',
    points: ['UI art direction that became the product\'s core identity; UX iterations from research.'] },
  { role: 'Art Lead', org: 'Innova Schools · Escuela Kadabra', where: 'Lima, Peru', when: 'Oct 2019 – Nov 2021',
    points: ['Built and ran the full art pipeline; mentored junior designers; print + digital.'] },
  { role: 'Illustrator', org: 'Penguin Random House', where: '', when: '',
    points: ['Book illustration.'] },
  { role: 'Content Creator', org: 'Personal brand', where: 'Lima, Peru', when: 'Mar – Nov 2020',
    points: ['Grew a TikTok audience to 50,000+.'] },
];

export const education = [
  { title: 'Master of Digital Media (MDM) · Product and Project Management', where: 'Centre for Digital Media, University of British Columbia' },
  { title: 'Bachelor of Art & Graphic Design · First of the class, Winternitz award', where: 'Pontifical Catholic University of Peru' },
];

export const skills = ['Creative direction', 'Directing', 'AI visual production', 'Art direction', 'Visual development', 'UX/UI', 'Brand systems', 'Comics + illustration', 'Production management', 'Content strategy'];
export const tools = ['Figma', 'Adobe Suite', 'ComfyUI', 'Midjourney', 'Google AI Studio', 'Coda', 'ClickUp', 'Jira'];
export const languages = ['Spanish (native)', 'English (fluent)'];

// ---------------------------------------------------------------- role links
// Each lens is its own link (danielagamarra.github.io/<path>/) showing only the
// work for one kind of job. Nothing is deleted: a lens hides and reorders.
//  - pages: [pageId, [column, row]] in reading order (cover stays at 0,0)
//  - projects: ids to show · move: { projectId: pageId } to show a project on
//    another page in this lens · talks/press/awards: filters · cv: overrides
// Branch rule: the manga-publications lens is Daga's hand-drawn branch, ZERO AI anywhere.
const noAI = (x) => !/\bAI\b|generative|midjourney|comfyui|google ai studio/i.test(JSON.stringify(x));
export const lenses = {
  // Was /comics/ (that folder now redirects here). plain: no doodles or scribbles.
  'manga-publications': {
    plain: true,
    links: ['Instagram', 'TikTok'], // contact rows shown (no LinkedIn, no CV row)
    title: 'Comics & manga', role: 'Mangaka, Comic Artist & Illustrator',
    tagline: 'Manga, comics, webtoons and my own art: zines, prints and stickers.',
    open: 'open to commissions, client work + IP development', // contact page note
    pulseTab: 'table', // this tab pulses on a first visit
    hero: "I draw manga, comics and webtoons, and a lot of my own art. More than ten years of penciling, inking and coloring stories, from graphic novels with Penguin Random House to my own webtoon, MOD. Now I make books and art you can hold: DISTORTION, The Infinity Zine, sketchbook zines, prints and stickers. This is my digibook, a digital sketchbook. Flip through the pages, or doodle in the margins.",
    heroMarks: ['manga', 'comics', 'webtoons', 'my own art', 'MOD', 'DISTORTION', 'The Infinity Zine', 'sketchbook zines', 'prints', 'stickers', 'digibook'],
    // artist bio (third person, for fair applications) shown in the speech bubble + CV profile
    about: "Daniela Gamarra (DAGA) is a queer Peruvian comic artist and mangaka based in Toronto, drawing manga, comics, webtoons, illustration and personal art for more than ten years. She penciled and art-directed Rosa Cuchillo (Penguin Random House, 2021), the manga adaptation of Óscar Colchado's novel, and led art production on Mario. El universo Vargas Llosa (Penguin Random House, 2019), a finalist for Best illustrated book or comic at Peru's Premios Luces. She writes and draws MOD · Machine of Dreams, her own webtoon about dreams, quantum computers and climate change, with long panels that read as optical illusions, and DISTORTION, a graphic novel about a girl reborn again and again. She also art-directs comic teams from style to print. A Peruvian government award winner for creators of original IP, she studied Art & Graphic Design at PUCP, graduating first of her class.",
    stats: [
      { n: '10+', label: 'years drawing for a living' },
      { n: '2', label: 'graphic novels with Penguin Random House' },
      { n: '50k + 10k', label: 'on TikTok + Instagram' },
    ],
    pages: [['editorial', [1, 0]], ['comics', [2, 0]], ['table', [1, 1]], ['awards', [0, 1]], ['about', [-1, 0]]],
    projects: ['mod', 'rosa-cuchillo', 'mario-vargas-llosa', 'distortion', 'infinity-zine', 'loose-lines', 'art-prints', 'stickers', 'illus', 'short-comics', '24-hours-of-rain'],
    // only on this page: the things at her fair table (names as on the Pro Plaza merchandise list)
    extraProjects: [
      { id: 'infinity-zine', page: 'table', title: 'The Infinity Zine', kind: 'interchangeable story cards · coming 2027', role: 'Artist', motif: '♾', fair: true,
        img: 'assets/img/table/infinity-zine-cards.jpg',
        tagline: '30 square cards, 5 × 5 in, in a sleeve or box · full layout 25 × 30 in',
        blurb: '30 connected original ink illustrations of my own creatures and worlds, as 30 interchangeable story cards. The cards connect on every side, so readers arrange them to create their own story. A full 5 × 6 layout alone has more than 10³² possible arrangements.',
        sections: [{ h: 'Some of the cards, one by one', gallery: ['assets/img/table/infinity-01-ring.jpg', 'assets/img/table/infinity-09-swing.jpg', 'assets/img/table/infinity-12-dragon.jpg', 'assets/img/table/infinity-13-ash.jpg', 'assets/img/table/infinity-14-overgrown.jpg', 'assets/img/table/infinity-29-injured.jpg'] }] },
      { id: 'loose-lines', page: 'table', title: 'Loose Lines', kind: 'sketchbook zines (3 volumes) · coming 2027', role: 'Artist', motif: '✎', fair: true,
        img: 'assets/img/table/loose-lines.jpg',
        tagline: 'Digest, 5.5 × 8.5 in, 16-24 pages each, cream paper',
        blurb: "DAGA's sketchbook collection: raw, unfiltered drawings, studies, characters, thoughts and ideas straight from my sketchbooks, from first lines to finished ideas, including the first concepts behind some of my current stories (and maybe a few future ones... shh), plus new pieces.",
        facts: ['Vol. 1 · Lima (2018-2020)', 'Vol. 2 · Lima/Vancouver (2021-2023)', 'Vol. 3 · Vancouver (2024-2026)'],
        sections: [{ h: 'The covers', gallery: ['assets/img/table/loose-lines-vol1.jpg', 'assets/img/table/loose-lines-vol2.jpg', 'assets/img/table/loose-lines-vol3.jpg'] }, { h: 'The zines', gallery: ['assets/img/table/loose-lines-vol1-mockup.jpg', 'assets/img/table/loose-lines-vol2-mockup.jpg', 'assets/img/table/loose-lines-vol3-mockup.jpg'] }] },
      { id: 'art-prints', page: 'table', title: 'Art prints', kind: 'prints · coming 2027', role: 'Artist', motif: '🖼', fair: true,
        img: 'assets/img/table/prints.jpg',
        tagline: 'A4 (21 × 29.7 cm) and square prints · The Infinity Zine full layout as a 25 × 30 in poster',
        blurb: 'Prints of my original artwork.',
        sections: [{ h: 'The prints', gallery: ['assets/img/table/print-dream-head.jpg', 'assets/img/table/print-striped-figure.jpg', 'assets/img/table/print-bird-head.jpg', 'assets/img/table/print-blue-field.jpg', 'assets/img/table/print-ink-girl.jpg', 'assets/img/table/print-magic-within.jpg', 'assets/img/table/print-floating-islands.jpg', 'assets/img/table/print-red-blue.jpg'] }] },
      { id: 'stickers', page: 'table', title: 'Stickers', kind: 'die-cut stickers · coming 2027', role: 'Artist', motif: '⭐', fair: true,
        img: 'assets/img/table/stickers.jpg',
        tagline: '5 to 8 cm, die-cut',
        blurb: 'Vinyl stickers of my original characters and art.',
        sections: [{ h: 'The set', gallery: ['assets/img/table/sticker-purple-goblin.png', 'assets/img/table/sticker-blue-figure.png', 'assets/img/table/sticker-smiley-scream.png', 'assets/img/table/sticker-knife-cosmos.png', 'assets/img/table/sticker-magic-within.png', 'assets/img/table/sticker-ink-girl.png', 'assets/img/table/sticker-mushroom-hat.png', 'assets/img/table/sticker-bird-head.png', 'assets/img/table/sticker-floating-islands.png'] }] },
      { id: 'short-comics', page: 'comics', title: 'Short comics', kind: 'my own comics', role: 'Writer & artist', motif: '💬',
        img: 'assets/img/illus/no-secrets-panel.jpg', pos: '50% 45%',
        blurb: 'Short comics and single panels of my own stories, plus the cover of Simple Beast.',
        sections: [{ h: 'Pages and panels', gallery: ['assets/img/illus/no-secrets-panel.jpg', 'assets/img/illus/panel-each-other.jpg', 'assets/img/illus/panel-woke-up.jpg', 'assets/img/illus/simple-beast-cover.jpg'] }] },
      { id: '24-hours-of-rain', page: 'comics', title: '24 Hours of Rain', kind: 'illustrated book · work in progress', role: 'Writer & artist', motif: '☔',
        img: 'assets/img/table/24hor-sketches.jpg',
        tagline: 'Work in progress: first sketches for the 13 chapters',
        blurb: 'My next illustrated book, now in the middle of conceptualization and writing: one rainy day told in 13 chapters about mirrors and the people we see in them.',
        sections: [{ h: 'Process sketches, chapter by chapter', text: 'No finished art yet: these are the first sketches from my notebook.', gallery: ['assets/img/table/24hor-01.jpg', 'assets/img/table/24hor-02.jpg', 'assets/img/table/24hor-03.jpg', 'assets/img/table/24hor-04.jpg', 'assets/img/table/24hor-05.jpg', 'assets/img/table/24hor-06.jpg', 'assets/img/table/24hor-07.jpg', 'assets/img/table/24hor-08.jpg', 'assets/img/table/24hor-09.jpg', 'assets/img/table/24hor-10.jpg', 'assets/img/table/24hor-11.jpg', 'assets/img/table/24hor-12.jpg', 'assets/img/table/24hor-13.jpg'] }] },
    ],
    override: {
      distortion: { title: 'Distortion', kind: 'manga / graphic novel · coming 2027', year: '', todo: null,
        tagline: 'B5 book (18.2 × 25.7 cm), ~48 pages, printed · self-published 2027',
        blurb: "Every time Maya turns 16, a strange force called the Distortion ends her life and she starts over, reliving the same years with her grandpa and her best friends. When her grandpa gives her a mirror necklace, she finally finds a way to fight back. A hand-drawn manga about loss, change and being brave enough to live a life you don't need to repeat." },
      mod: { kind: 'My own webtoon IP', blurb: (b) => b.replace('My most personal story, drawn fully by hand. No AI, ever. ', 'My most personal story. '), gallery: ['assets/img/comics/mod-phones-1.jpg', 'assets/img/comics/mod-phones-2.jpg', 'assets/img/comics/mod-phones-3.jpg', 'assets/img/comics/mod-phones-4.jpg'] },
      illus: { blurb: (b) => b.replace(', mosaics and short comics.', ' and mosaics.'), sections: (s) => s.filter((x) => x.h !== 'Short comics').map((x) => x.h === 'Color' ? { ...x, gallery: [...x.gallery, 'assets/img/illus/moon-boy.jpg'] } : x) },
      'rosa-cuchillo': { img: 'assets/img/comics/rosa-cover-wrap.jpg', pos: '70% 40%', gallery: null, sections: [{ h: 'The book', gallery: ['assets/img/comics/rosa-cover-fan.jpg', 'assets/img/comics/rosa-spread-1.jpg', 'assets/img/comics/rosa-spread-2.jpg', 'assets/img/comics/rosa-spread-3.jpg', 'assets/img/comics/rosa-spread-4.jpg'] }, { h: 'Pages from the book', text: 'Penciled, inked and colored by me, in black, white and red.', gallery: ['assets/img/comics/rosa-page-01.jpg', 'assets/img/comics/rosa-page-02.jpg', 'assets/img/comics/rosa-page-05.jpg', 'assets/img/comics/rosa-page-06.jpg', 'assets/img/comics/rosa-page-10.jpg', 'assets/img/comics/rosa-page-12.jpg', 'assets/img/comics/rosa-page-14.jpg', 'assets/img/comics/rosa-page-16.jpg', 'assets/img/comics/rosa-page-17.jpg', 'assets/img/comics/rosa-page-25.jpg', 'assets/img/comics/rosa-page-27.jpg', 'assets/img/comics/rosa-page-28.jpg'] }] },
      'mario-vargas-llosa': { img: 'assets/img/comics/mario-cover-thumb.jpg', pos: '50% 40%', gallery: ['assets/img/comics/mario-cover-fan.jpg', 'assets/img/comics/mario-spread-1.jpg', 'assets/img/comics/mario-spread-2.jpg', 'assets/img/comics/mario-spread-3.jpg', 'assets/img/comics/mario-spread-4.jpg'] },
    },
    move: { 'rosa-cuchillo': 'editorial', 'mario-vargas-llosa': 'editorial', distortion: 'table' },
    titles: {
      comics: { title: 'self-published', note: 'my own IP: webtoons, comics, zines + prints', roles: null }, // no "what I do" card here
      table: { title: 'at my table', note: 'coming 2027 · for sale at fairs', cols: 2, tint: 'blue',
        list: [
          ['Sketch commissions', 'live hand-drawn sketches of my original characters, or custom sketches, drawn at the table · postcard format (4 × 6 in), thick paper'],
        ] },
      editorial: { title: 'editorial publications', note: 'Penguin Random House', cols: 2, tint: 'blue' },
      awards: { title: 'publications & awards', note: 'in print + online' },
    },
    talks: noAI, press: noAI, awards: noAI,
    cv: { selected: ['mod', 'rosa-cuchillo', 'mario-vargas-llosa', 'distortion'],
          experience: (x) => /Penguin|Kadabra|Content Creator/.test(x.org + x.role),
          skills: ['Comics + manga', 'Penciling, inking, coloring', 'Page layout', 'Character + environment design', 'Cover design', 'Art direction', 'Art production management', 'Print preparation'],
          tools: ['Clip Studio Paint', 'Procreate', 'Adobe Suite', 'Figma'] },
  },
  direction: {
    title: 'Artist & creative director', role: 'Artist, Art & Creative Director',
    tagline: 'Comics, games and animated stories, from the first sketch to the team that ships it.',
    pages: [['films', [1, 0]], ['comics', [-1, 0]], ['games', [0, 1]], ['studio', [-1, 1]], ['awards', [0, -1]], ['about', [1, -1]]],
    projects: ['aota', 'appetite', 'behind', 'trash-squad', 'strands', 'awwm', 'hd-web', 'calling', 'cusco', 'kadabra', 'mod', 'rosa-cuchillo', 'mario-vargas-llosa', 'distortion', 'illus', 'indaga'],
    move: { 'hd-web': 'films' },
  },
  narrative: {
    title: 'Narrative & writing', role: 'Writer, Narrative Designer & Storyteller',
    tagline: 'Stories for comics, games, shows and interactive worlds.',
    hero: 'I write stories: queer animated shows, webtoons, comics and games. More than ten years of building worlds and characters, from my webtoon MOD to the game writing of Fusewave, Cusco Paradox and Escuela Kadabra. This is my digibook, a digital sketchbook. Drag the cat, flip through the pages, doodle in the margins.',
    heroMarks: ['write stories', 'MOD', 'game writing', 'digibook'],
    pages: [['films', [1, 0]], ['comics', [-1, 0]], ['games', [0, 1]], ['about', [0, -1]]],
    projects: ['aota', 'strands', 'awwm', 'appetite', 'behind', 'mod', 'distortion', 'fusewave', 'cusco', 'kadabra'],
  },
  product: {
    title: 'Product design & production', role: 'Product Designer, Producer & Project Manager',
    tagline: 'Products and teams, from research to launch.',
    pages: [['product', [1, 0]], ['tools', [-1, 0]], ['games', [0, 1]], ['studio', [1, 1]], ['about', [0, -1]]],
    projects: ['thrivepal', 'virtualtutors', 'hd-web', 'hd-draw', 'ganttier', 'giftagame', 'catpid', 'empathy', 'indaga'],
  },
  'game-ux': {
    title: 'Game UX/UI & game design', role: 'Game UX/UI Designer & Game Designer',
    tagline: 'Game interfaces and experiences players understand in seconds.',
    pages: [['games', [1, 0]], ['about', [-1, 0]]],
    projects: ['calling', 'kadabra', 'cusco', 'azoove', 'thrive-table', 'behind'],
    move: { behind: 'games' },
  },
};
