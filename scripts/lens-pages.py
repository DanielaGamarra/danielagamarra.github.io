# Builds one folder page per role link from index.html (run after editing index.html):
#   python3 scripts/lens-pages.py
# Each <path>/index.html = index.html + <base href="../"> + window.LENS + its own title/description.
import json, re, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://danielagamarra.github.io/'
LENSES = {
  'manga-publications': ('Mangaka, Comic Artist & Illustrator', 'Daga (Daniela Gamarra): mangaka, comic artist and illustrator in Toronto. Manga, comics, webtoons and original art: Rosa Cuchillo and Mario with Penguin Random House, MOD, DISTORTION, zines, prints and stickers.', 'assets/img/og-manga.jpg'),
  'direction': ('Artist, Art & Creative Director', 'Daga (Daniela Gamarra): artist, art and creative director in Toronto. Comics, games and animated stories, from the first sketch to the team that ships it.', 'assets/og.jpg'),
  'narrative': ('Writer, Narrative Designer & Storyteller', 'Daga (Daniela Gamarra): writer and narrative designer in Toronto. Stories for comics, webtoons, games and animated shows.', 'assets/og.jpg'),
  'product':   ('Product Designer, Producer & Project Manager', 'Daga (Daniela Gamarra): product designer, producer and project manager in Toronto. Apps, tools and games from research to launch.', 'assets/og.jpg'),
  'game-ux':   ('Game UX/UI Designer & Game Designer', 'Daga (Daniela Gamarra): game UX/UI designer and game designer in Toronto. The Calling, Escuela Kadabra, Cusco Paradox, Azoove.', 'assets/og.jpg'),
}
src = (R / 'index.html').read_text()
for path, (role, desc, og) in LENSES.items():
    h = src
    h = h.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="../">', 1)
    h = re.sub(r'<title>.*?</title>', f"<title>DAGA's digibook · Daniela Gamarra · {role}</title>", h, count=1)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', h, count=1)
    h = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="DAGA · {role}">', h, count=1)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{desc}">', h, count=1)
    h = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{SITE}{path}/">', h, count=1)
    h = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{SITE}{og}">', h, count=1)
    h = re.sub(r'<meta property="og:image:alt" content="[^"]*">', f'<meta property="og:image:alt" content="DAGA · {role}">', h, count=1)
    h = re.sub(r'<meta name="twitter:image" content="[^"]*">', f'<meta name="twitter:image" content="{SITE}{og}">', h, count=1)
    h = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{SITE}{path}/">', h, count=1)
    h = re.sub(r'"jobTitle":"[^"]*"', f'"jobTitle":"{role}"', h, count=1)
    h = re.sub(r'<noscript>.*?</noscript>', f'<noscript><p style="padding:24px;font:16px/1.5 sans-serif">Daga (Daniela Gamarra) · {role} · Toronto. This digibook needs JavaScript.</p></noscript>', h, count=1, flags=re.S)
    h = h.replace('<script type="module" src="assets/app.js"></script>', f"<script>window.LENS = {json.dumps(path)};</script>\n<script type=\"module\" src=\"assets/app.js\"></script>", 1)
    assert h.count('window.LENS') == 1 and '<base href="../">' in h, path
    (R / path).mkdir(exist_ok=True)
    (R / path / 'index.html').write_text(h)
    print('wrote', path)

# Old links: /comics/ -> /manga-publications/ (keeps #hash)
(R / 'comics').mkdir(exist_ok=True)
(R / 'comics' / 'index.html').write_text('''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>DAGA · Manga & publications</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://danielagamarra.github.io/manga-publications/">
<meta http-equiv="refresh" content="0; url=../manga-publications/">
<script>location.replace('../manga-publications/' + location.hash)</script>
</head><body><a href="../manga-publications/">DAGA · Manga & publications</a></body></html>
''')
print('wrote comics redirect')
