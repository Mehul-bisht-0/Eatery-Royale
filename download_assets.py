from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import urllib.request
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).parent
OUT = ROOT / 'dist' / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
ASSETS = {
    'garden-hero': '0a9a587255fc42eaba173225a373a34b',
    'drums-of-heaven': 'c92bd3ea436a44b09cf15a40e88ac488',
    'mutton-roganjosh': '8db6240f7c4c4e4eacbf98f017eb7c6b',
    'pasta': 'ecdfef5876fe4f10842a522a7f1f3721',
    'garden-portrait': '71dc8b811a244dc1a8c6b1705e1d4c24',
    'garden-evening': 'b54a4b294b8b429dbce040f089b50b7e',
    'garden-seating': '797feb4e3fd64b0da575456a54847aec',
    'gallery-01': '2e0d728fcf6047fb96a82e5942d0e63c',
    'gallery-02': '6d6521db524f468baf382e69afbc3ab8',
    'gallery-03': '6e56510b896f4e6da47fee7cb4a6dabf',
    'gallery-04': '2159b5f00ef34c2c8d6c3976bd16bd98',
    'gallery-05': 'f1ffbd08d33540e6a9581869b950f84b',
    'gallery-06': '8773bdbc667449e59d099fd41f4d9989',
    'gallery-07': '86dd3b207ecb4000b01fb5af467182e6',
    'gallery-08': 'df7ff69493424636a370a0b7fe441423',
    'gallery-09': '3c48ae6ea0b94d59ba30238a289fc093',
    'gallery-10': 'fe4c7c4beea34f3c8aace0caa62440b0',
}

def download(entry):
    name, asset = entry
    url = f'https://static.wixstatic.com/media/977577_{asset}~mv2.jpg'
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=40) as res:
        data = res.read()
    path = OUT / f'{name}.webp'
    import io
    im = Image.open(io.BytesIO(data)).convert('RGB')
    im.thumbnail((1920,1920))
    im.save(path, 'WEBP', quality=86)
    return name, im.size, len(data), url

with ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(download, ASSETS.items()))
for name, size, count, url in results:
    print(name, size, count)
sheet = Image.new('RGB', (1000, ((len(results)+3)//4)*190), '#f4f1e8')
draw = ImageDraw.Draw(sheet)
for i, (name, *_) in enumerate(results):
    im = Image.open(OUT / f'{name}.webp')
    thumb = ImageOps.fit(im, (240,155))
    x,y = (i%4)*250, (i//4)*190
    sheet.paste(thumb,(x,y))
    draw.text((x+5,y+160), name, fill='#172b23')
sheet.save(ROOT / 'asset-contact-sheet.jpg')
(ROOT / 'ASSETS.md').write_text('# Original photography\n\nPhotographs sourced from the user-provided Eatery Royale website.\n\n'+'\n'.join(f'- `{name}.webp`: {url}' for name,_,_,url in results)+'\n', encoding='utf-8')
