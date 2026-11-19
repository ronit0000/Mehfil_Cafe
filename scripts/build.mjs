import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import { site, sitePages } from '../src/data/site.js';
import { menuHome } from '../src/data/menuRoutes.js';

const dist = new URL('../dist/', import.meta.url);
const menuUrl = site.origin + menuHome.path;
const image = site.origin + '/images/hero2.jpg';

const restaurant = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': site.origin + '/#restaurant',
  name: site.name,
  url: site.origin + '/',
  image: ['/images/hero1.jpg', '/images/hero2.jpg', '/images/hero3.jpg'].map((path) => site.origin + path),
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', ...site.coordinates },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
  servesCuisine: ['North Indian', 'Mughlai', 'Indo-Chinese', 'Italian'],
  hasMap: site.mapsUrl,
  sameAs: [site.instagramUrl],
  menu: menuUrl,
  hasMenu: menuUrl,
  acceptsReservations: site.origin + '/#reservation',
};

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function structuredData(page) {
  if (page.path === '/') return restaurant;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: menuHome.path },
  ];
  if (page.page) breadcrumbs.push({ name: page.label, path: page.path });

  const data = [{
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: site.origin + path,
    })),
  }];

  if (page.page) {
    data.push({
      '@type': 'MenuSection',
      name: page.label,
      url: site.origin + page.path,
      isPartOf: { '@type': 'Menu', name: 'Mehfil Menu', url: menuUrl },
      hasMenuItem: page.page.items.map(({ id, name, desc }) => ({
        '@type': 'MenuItem',
        name,
        description: desc,
        url: site.origin + page.path + '#dish-' + id,
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': data };
}

function renderHead(page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(site.origin + page.path);
  const schema = JSON.stringify(structuredData(page)).replace(/</g, '\\u003c');

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${canonical}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${schema}</script>`,
  ].join('\n    ');
}

await build();
await build({
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist-ssr',
    copyPublicDir: false,
  },
});

const { renderPage } = await import('../dist-ssr/entry-server.js');
const template = await readFile(new URL('index.html', dist), 'utf8');
const root = '<div id="root"></div>';
const pageHead = /<!-- page-head -->[\s\S]*?<!-- \/page-head -->/;

if (!template.includes(root) || !pageHead.test(template)) {
  throw new Error('The HTML template is missing a page rendering placeholder.');
}

for (const page of sitePages) {
  const directory = new URL('.' + page.path, dist);
  const html = template
    .replace(pageHead, () => renderHead(page))
    .replace(root, () => `<div id="root">${renderPage(page)}</div>`);

  await mkdir(directory, { recursive: true });
  await writeFile(
    new URL('index.html', directory),
    page.path === '/' ? html : html.replace(/^[ \t]*<script type="module"[^>]*><\/script>\r?\n/gm, ''),
  );
}

const sitemap = sitePages.map(({ path }) => `  <url><loc>${escapeHtml(site.origin + path)}</loc></url>`).join('\n');
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`,
);
