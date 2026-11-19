"""Writes the MediConnect brand SVGs (mark + feature icons), redrawn from the brand sheet."""
import os, sys

out = sys.argv[1]
os.makedirs(os.path.join(out, 'icons'), exist_ok=True)

BLUE = '#1E6FD9'    # sheet blue
TEAL = '#14A38F'    # sheet teal
NAVY = '#0E3A66'    # outline / dark details
SOFT = '#D6E9F8'    # light fill
WHITE = '#FFFFFF'

HEART = 'M32 54 C27 49 9 38 9 23.5 C9 15.5 15 10 22 10 C26.6 10 30 12.4 32 15.6 C34 12.4 37.4 10 42 10 C49 10 55 15.5 55 23.5 C55 38 37 49 32 54 Z'

def mark(gid='g'):
    return f'''<defs><linearGradient id="{gid}" x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{BLUE}"/><stop offset="1" stop-color="{TEAL}"/></linearGradient></defs>
  <path d="{HEART}" fill="none" stroke="url(#{gid})" stroke-width="7" stroke-linejoin="round"/>
  <g transform="translate(38 37)"><rect x="-11.5" y="-4.5" width="23" height="9" rx="2.5" fill="{TEAL}" stroke="{WHITE}" stroke-width="2.5" paint-order="stroke"/><rect x="-4.5" y="-11.5" width="9" height="23" rx="2.5" fill="{TEAL}" stroke="{WHITE}" stroke-width="2.5" paint-order="stroke"/><rect x="-11.5" y="-4.5" width="23" height="9" rx="2.5" fill="{TEAL}"/></g>'''

def svg(body, title, size=64, label=True):
    role = f'role="img" aria-labelledby="t"' if label else 'aria-hidden="true"'
    t = f'<title id="t">{title}</title>' if label else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}" {role}>{t}\n  {body}\n</svg>\n'

with open(os.path.join(out, 'logo-mark.svg'), 'w') as f:
    f.write(svg(mark(), 'MediConnect'))

# Mark on a filled app-icon tile (sheet: blue tile, white heart). Used to render PNG app icons.
tile = f'''<defs><linearGradient id="bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{BLUE}"/><stop offset="1" stop-color="#1557B0"/></linearGradient></defs>
  <rect width="64" height="64" fill="url(#bg)"/>
  <g transform="translate(8.3 8.6) scale(0.74)"><path d="{HEART}" fill="none" stroke="{WHITE}" stroke-width="7" stroke-linejoin="round"/>
  <g transform="translate(38 37)"><rect x="-11.5" y="-4.5" width="23" height="9" rx="2.5" fill="{WHITE}" stroke="#1866C8" stroke-width="2.5" paint-order="stroke"/><rect x="-4.5" y="-11.5" width="9" height="23" rx="2.5" fill="{WHITE}" stroke="#1866C8" stroke-width="2.5" paint-order="stroke"/><rect x="-11.5" y="-4.5" width="23" height="9" rx="2.5" fill="{WHITE}"/></g></g>'''
with open(os.path.join(out, 'app-icon.svg'), 'w') as f:
    f.write(svg(tile, 'MediConnect'))

# Monochrome mark for Android themed icons and single-colour contexts.
mono = f'''<path d="{HEART}" fill="none" stroke="#000" stroke-width="7" stroke-linejoin="round"/>
  <g transform="translate(38 37)"><rect x="-11.5" y="-4.5" width="23" height="9" rx="2.5" fill="#000"/><rect x="-4.5" y="-11.5" width="9" height="23" rx="2.5" fill="#000"/></g>'''
with open(os.path.join(out, 'logo-mark-mono.svg'), 'w') as f:
    f.write(svg(mono, 'MediConnect'))

# Feature icons, 48x48, two-tone. Glyph only: the app places them on its own surfaces.
I = {}
I['book-appointment'] = ('Book appointment', f'''<rect x="6" y="9" width="32" height="30" rx="5" fill="{WHITE}" stroke="{NAVY}" stroke-width="3"/>
  <path d="M6 14a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v5H6z" fill="{BLUE}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M14 5v8M30 5v8" stroke="{NAVY}" stroke-width="3" stroke-linecap="round"/>
  <g fill="{BLUE}"><rect x="11" y="23" width="5" height="4" rx="1"/><rect x="19.5" y="23" width="5" height="4" rx="1"/><rect x="11" y="30" width="5" height="4" rx="1"/></g>
  <circle cx="35" cy="34" r="9" fill="{TEAL}" stroke="{WHITE}" stroke-width="2.5"/>
  <path d="M30.8 34.2l3 3 5.6-6" fill="none" stroke="{WHITE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>''')
I['find-a-doctor'] = ('Find a doctor', f'''<path d="M8 44c0-9 7-14 16-14s16 5 16 14z" fill="{WHITE}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M19 30.6l5 6 5-6" fill="{BLUE}" stroke="{NAVY}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="24" cy="17" r="9" fill="#F4D2B5" stroke="{NAVY}" stroke-width="3"/>
  <path d="M15.2 15.5C16 10 19.5 7.5 24 7.5s8 2.5 8.8 8c-3-1.8-6-4-8.8-4.6-2.6.8-5.6 2.8-8.8 4.6z" fill="{NAVY}"/>
  <path d="M15 31v5a4 4 0 0 0 8 0M33 31v6" fill="none" stroke="{TEAL}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="33" cy="39" r="2.6" fill="{WHITE}" stroke="{TEAL}" stroke-width="2.5"/>''')
I['hospitals-clinics'] = ('Hospitals and clinics', f'''<rect x="8" y="14" width="32" height="28" rx="2" fill="{SOFT}" stroke="{NAVY}" stroke-width="3"/>
  <rect x="17" y="4" width="14" height="14" rx="3" fill="{BLUE}" stroke="{NAVY}" stroke-width="2.5"/>
  <path d="M24 7.5v7M20.5 11h7" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>
  <g fill="{BLUE}"><rect x="12.5" y="22" width="5" height="4" rx="1"/><rect x="21.5" y="22" width="5" height="4" rx="1"/><rect x="30.5" y="22" width="5" height="4" rx="1"/><rect x="12.5" y="30" width="5" height="4" rx="1"/><rect x="30.5" y="30" width="5" height="4" rx="1"/></g>
  <rect x="20.5" y="31" width="7" height="11" rx="1" fill="{NAVY}"/>
  <path d="M4 42h40" stroke="{NAVY}" stroke-width="3" stroke-linecap="round"/>''')
I['video-consultation'] = ('Video consultation', f'''<rect x="4" y="12" width="28" height="24" rx="6" fill="{BLUE}" stroke="{NAVY}" stroke-width="3"/>
  <path d="M32 21l10-6v18l-10-6z" fill="{TEAL}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="18" cy="22" r="4" fill="{WHITE}"/><path d="M11 32c1-4 3.8-5.5 7-5.5s6 1.5 7 5.5z" fill="{WHITE}"/>''')
I['prescriptions'] = ('Prescriptions', f'''<path d="M10 7a3 3 0 0 1 3-3h16l9 9v28a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z" fill="{WHITE}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M29 4v9h9" fill="{SOFT}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M16 14h8M16 20h12" stroke="{BLUE}" stroke-width="3" stroke-linecap="round"/>
  <path d="M17 38V26h4.5a3.5 3.5 0 0 1 0 7H17M21 33l7 7M28 33l-6 7" fill="none" stroke="{NAVY}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>''')
I['medical-records'] = ('Medical records', f'''<path d="M4 13a4 4 0 0 1 4-4h10l4 4h18a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="{TEAL}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M4 19h40" stroke="{NAVY}" stroke-width="3"/>
  <path d="M24 24v12M18 30h12" stroke="{WHITE}" stroke-width="4" stroke-linecap="round"/>''')
I['hmo-coverage'] = ('HMO coverage', f'''<path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z" fill="{TEAL}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M16.5 23.5l5 5 10-10" fill="none" stroke="{WHITE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>''')
I['secure-payment'] = ('Secure payment', f'''<rect x="4" y="10" width="40" height="28" rx="5" fill="{BLUE}" stroke="{NAVY}" stroke-width="3"/>
  <path d="M4 18h40" stroke="{NAVY}" stroke-width="5"/>
  <path d="M10 30h12" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>
  <rect x="31" y="27" width="7" height="5" rx="2" fill="{WHITE}"/>''')
I['family-dependents'] = ('Family and dependents', f'''<circle cx="24" cy="13" r="6" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.5"/>
  <circle cx="11" cy="19" r="4.5" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.5"/><circle cx="37" cy="19" r="4.5" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.5"/>
  <path d="M3 40v-5a7 7 0 0 1 12-5M45 40v-5a7 7 0 0 0-12-5" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M13 42v-6a11 11 0 0 1 22 0v6z" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.5" stroke-linejoin="round"/>''')
I['notifications'] = ('Notifications', f'''<path d="M24 5c-7 0-12 5.5-12 12.5V27l-4 6h32l-4-6v-9.5C36 10.5 31 5 24 5z" fill="{BLUE}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M19 37a5 5 0 0 0 10 0" fill="{NAVY}"/><circle cx="24" cy="4.5" r="2.5" fill="{NAVY}"/>''')
I['health-support'] = ('Health support', f'''<path d="M19 21a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-1v6l-7-6h-8a4 4 0 0 1-4-4z" fill="{BLUE}" stroke="{NAVY}" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M5 9a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H15l-7 6v-6H9a4 4 0 0 1-4-4z" fill="{TEAL}" stroke="{NAVY}" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M11 13h15M11 18.5h10" stroke="{WHITE}" stroke-width="2.8" stroke-linecap="round"/>''')
I['health-wellness'] = ('Health and wellness', f'''<path d="M24 43C20 39 5 30 5 18.5 5 11.5 10 7 16 7c3.6 0 6.3 2 8 4.6C25.7 9 28.4 7 32 7c6 0 11 4.5 11 11.5C43 30 28 39 24 43z" fill="{TEAL}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M9 23h8l3-6 5 12 3-6h11" fill="none" stroke="{WHITE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>''')
I['lab-tests'] = ('Lab tests', f'''<path d="M17 4h14M19.5 4v13L8 38a4 4 0 0 0 3.5 6h25A4 4 0 0 0 40 38L28.5 17V4" fill="{WHITE}" stroke="{NAVY}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.5 29h21L40 38a4 4 0 0 1-3.5 6h-25A4 4 0 0 1 8 38z" fill="{TEAL}"/>
  <path d="M19.5 4v13L8 38a4 4 0 0 0 3.5 6h25A4 4 0 0 0 40 38L28.5 17V4" fill="none" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>''')
I['medications'] = ('Medications', f'''<g transform="rotate(-40 20 22)"><rect x="4" y="15" width="32" height="14" rx="7" fill="{WHITE}" stroke="{NAVY}" stroke-width="3"/><path d="M20 15h9a7 7 0 0 1 0 14h-9z" fill="{TEAL}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/></g>
  <circle cx="35" cy="35" r="8" fill="{SOFT}" stroke="{NAVY}" stroke-width="3"/><path d="M29.5 35h11" stroke="{NAVY}" stroke-width="2.5" stroke-linecap="round"/>''')
I['verified-doctors'] = ('Verified doctors', f'''<path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z" fill="{BLUE}" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M24 15v15M16.5 22.5h15" stroke="{WHITE}" stroke-width="5" stroke-linecap="round"/>''')
I['help-support'] = ('Help and support', f'''<path d="M8 27v-5a16 16 0 0 1 32 0v5" fill="none" stroke="{NAVY}" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="5" y="24" width="9" height="14" rx="4" fill="{BLUE}" stroke="{NAVY}" stroke-width="2.5"/><rect x="34" y="24" width="9" height="14" rx="4" fill="{BLUE}" stroke="{NAVY}" stroke-width="2.5"/>
  <path d="M38.5 38c0 4-4 6-9 6" fill="none" stroke="{NAVY}" stroke-width="2.5" stroke-linecap="round"/><rect x="23" y="41.5" width="7" height="5" rx="2.5" fill="{TEAL}" stroke="{NAVY}" stroke-width="2"/>''')

for name, (title, body) in I.items():
    with open(os.path.join(out, 'icons', name + '.svg'), 'w') as f:
        f.write(svg(body, title, 48))

print(len(I), 'icons written to', out)
