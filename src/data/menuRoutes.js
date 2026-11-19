import { menuPages } from './menuData.js';

const categoryDetails = {
  soups: {
    slug: 'soups',
    label: 'Soups',
    examples: 'Manchow Soup, Lemon Coriander Soup and Crab Soup',
  },
  starters: {
    slug: 'starters',
    label: 'Starters & Appetizers',
    examples: 'Paneer Majestic, Chilli Chicken and Prawn Pakoda',
  },
  salads: {
    slug: 'salads',
    label: 'Salads',
    examples: 'Greek Salad, Green Salad and vegetarian or chicken Caesar salad',
  },
  mains_indian: {
    slug: 'indian-main-course',
    label: 'Indian Main Course',
    examples: 'Paneer Butter Masala, Palak Paneer and Indian curries',
  },
  chinese: {
    slug: 'chinese-rice-and-noodles',
    label: 'Chinese Rice & Noodles',
    examples: 'Chicken Hakka Noodles, Schezwan fried rice and vegetarian noodles',
  },
  grilled: {
    slug: 'grilled',
    label: 'Grilled Dishes',
    examples: 'Grilled Paneer, Grilled Chicken, Grilled Fish and Grilled Prawn',
  },
  rice_biryani: {
    slug: 'biryani-and-rice',
    label: 'Biryani & Rice',
    examples: 'Chicken Dum Biryani, Mutton Dum Biryani and Mehfil Special Seafood Biryani',
  },
  dal: {
    slug: 'dal',
    label: 'Dal',
    examples: 'Dal Fry, Dal Tadka and Dal Makhani',
  },
  burgers: {
    slug: 'burgers',
    label: 'Burgers',
    examples: 'Aloo Tikki Cheese Burger, Barbeque Paneer Burger and Fiery Chicken Burger',
  },
  pizza: {
    slug: 'pizza',
    label: 'Pizza',
    examples: 'Margherita Pizza, Paneer Pizza and BBQ Chicken Pizza',
  },
  sandwiches: {
    slug: 'sandwiches',
    label: 'Sandwiches',
    examples: 'Corn Cheese Sandwich, Mushroom Grilled Sandwich and Chicken Club Sandwich',
  },
  pastas: {
    slug: 'pasta',
    label: 'Pasta',
    examples: 'Arrabbiata, Alfredo and Pink Sauce Pasta in vegetarian and non-vegetarian versions',
  },
  desserts: {
    slug: 'desserts',
    label: 'Desserts',
    examples: 'Rasgulla, Gulab Jamun, Pudding and Ice Cream',
  },
  beverages: {
    slug: 'beverages',
    label: 'Beverages',
    examples: 'Cold Coffee, Banana Milk Shake and Virgin Mojito',
  },
  breads: {
    slug: 'indian-breads',
    label: 'Indian Breads',
    examples: 'Phulka and Butter Naan',
  },
  sides: {
    slug: 'sides',
    label: 'Sides',
    examples: 'Plain Curd',
  },
};

export const menuHome = {
  path: '/menu/',
  title: 'Menu in Berhampur | Mehfil Rooftop Cafe & Restro',
  description:
    'Browse the Mehfil Rooftop Cafe & Restro menu in Berhampur, Odisha. Find biryani, appetizers, Chinese rice and noodles, pizza, pasta, desserts and more.',
};

export const menuRoutes = menuPages.map((page) => {
  const { slug, label, examples } = categoryDetails[page.category];

  return {
    path: `${menuHome.path}${slug}/`,
    slug,
    label,
    page,
    title: `${label} in Berhampur | Mehfil Rooftop Cafe`,
    description: `Find ${examples} on the menu at Mehfil Rooftop Cafe & Restro in Berhampur, Odisha.`,
  };
});
