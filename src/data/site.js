import { menuHome, menuRoutes } from './menuRoutes.js';

export const site = {
  origin: 'https://mehfilrooftopcafe.in',
  name: 'Mehfil Rooftop Cafe & Restro',
  phone: '+917789922251',
  phoneLabel: '+91 77899 22251',
  street: 'Near NH Side',
  city: 'Berhampur',
  region: 'Odisha',
  coordinates: { latitude: 19.2800601, longitude: 84.7867065 },
  mapsUrl: 'https://www.google.com/maps?cid=4968268481454345290',
  instagramUrl: 'https://www.instagram.com/_mehfil_berhampur/',
  hours: { opens: '11:00', closes: '23:00', label: '11:00 AM – 11:00 PM' },
};

export const addressLabel = [site.street, site.city, site.region].join(', ');

export const homePage = {
  path: '/',
  title: 'Mehfil Rooftop Cafe & Restro in Berhampur, Odisha',
  description: 'Visit Mehfil Rooftop Cafe & Restro for open-air dining in Berhampur (Brahmapur), Odisha. Browse biryani, grills, Chinese dishes, pizza and pasta, or request a table.',
};

export const sitePages = [homePage, menuHome, ...menuRoutes];

export function getSitePage(pathname) {
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  return sitePages.find((page) => page.path === path) ?? homePage;
}
