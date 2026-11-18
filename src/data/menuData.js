// src/data/menuData.js
// Complete & Official Mehfil Rooftop Cafe & Restro Menu with authentic items,
// consolidated Veg/Non-Veg variants, dietaryType indicators ('veg' | 'non-veg' | 'both'),
// and heritage-rich Nawabi descriptions (Zero prices).

export const menuCategories = [
  { id: 'soups',            label: 'Soups' },
  { id: 'starters',         label: 'Starters & Appetizers' },
  { id: 'salads',           label: 'Salads' },
  { id: 'mains_indian',     label: 'Main Course Indian' },
  { id: 'chinese',          label: 'Chinese Rice & Noodles' },
  { id: 'grilled',          label: 'Grilled' },
  { id: 'rice_biryani',     label: 'Rice & Biryani' },
  { id: 'dal',              label: 'Dal' },
  { id: 'burgers',          label: 'Burgers' },
  { id: 'pizza',            label: 'Pizza' },
  { id: 'sandwiches',       label: 'Sandwiches' },
  { id: 'pastas',           label: 'Pastas' },
  { id: 'desserts',         label: 'Desserts' },
  { id: 'beverages',        label: 'Beverages' },
  { id: 'breads',           label: 'Indian Breads' },
  { id: 'sides',            label: 'Sides' },
];

export const menuPages = [
  // 1. SOUPS
  {
    category: 'soups',
    title: 'Soups',
    subtitle: 'Slow-simmered broths infused with courtly aromatics, fresh cream, and herbs',
    items: [
      {
        id: 'sp-1',
        name: 'Manchow Soup',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'A dark, fiery Indo-Chinese broth infused with toasted garlic, chillies, and garden herbs, served to your preference with finely chopped vegetables or tender chicken, crowned with crispy noodles.',
      },
      {
        id: 'sp-2',
        name: 'Hot & Sour Soup',
        dietaryType: 'both',
        desc: 'A thick, velvety broth harmonizing fiery heat with sharp aged vinegar, prepared to your choosing with crunchy garden vegetables or shredded braised chicken.',
      },
      {
        id: 'sp-3',
        name: 'Lemon Coriander Soup',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'A luminous, restorative clear broth vibrant with freshly squeezed lemon juice and courtly coriander sprigs, offered with crisp vegetables or chicken shreds.',
      },
      {
        id: 'sp-4',
        name: 'Sweet Corn Soup',
        dietaryType: 'both',
        desc: 'An imperial favourite featuring a mildly sweet, creamy broth with sweet golden corn kernels, served with diced farm vegetables or succulent chicken.',
      },
      {
        id: 'sp-5',
        name: 'Mutton Paya Bone Broth',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'A deeply rich, slow-simmered Mughlai bone broth crafted from prime goat trotters simmered through the stillness of night with whole royal spices.',
      },
      {
        id: 'sp-6',
        name: 'Royal Crab Soup',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'A decadent coastal soup highlighting the sweet, delicate sweetness of tender crab meat simmered in a seasoned courtly seafood broth.',
      },
      {
        id: 'sp-7',
        name: 'Velvety Cream Soups',
        dietaryType: 'both',
        desc: 'Luxuriously smooth purees blended with farm butter and dairy cream—crafted with your choice of sun-ripened tomatoes, broccoli florets, button mushrooms, or pulled chicken.',
      },
    ],
  },

  // 2. STARTERS AND APPETIZERS
  {
    category: 'starters',
    title: 'Starters & Appetizers',
    subtitle: 'Charcoal-kissed kebabs, crunchy tossed morsels, and golden fried delicacies',
    items: [
      {
        id: 'st-1',
        name: 'Chilli Tossed Appetizers',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Wok-charred delicacies stir-fried with crunchy onions, bell peppers, and spicy green chillies in a glistening dark sauce—available with Paneer, Mushroom, Chicken, Fish, or Prawn.',
      },
      {
        id: 'st-2',
        name: 'Majestic Specials',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'A celebrated Hyderabadi court appetizer featuring crisp fried morsels tossed in a rich, velvety yoghurt sauce infused with garlic, curry leaves, and a touch of soya—available with Paneer or Chicken.',
      },
      {
        id: 'st-3',
        name: 'Chatpata Dry Roasts',
        dietaryType: 'veg',
        desc: 'Juicy cubes of cottage cheese or plump button mushrooms tossed in a fiery, tangy, semi-dry spice mix with sweet and sour courtly accents.',
      },
      {
        id: 'st-4',
        name: 'Crispy Corn Salt & Pepper',
        dietaryType: 'veg',
        desc: 'Golden sweet corn pearls crackled to crisp perfection and tumbled with finely diced spring onions, peppers, and freshly ground Tellicherry black pepper.',
      },
      {
        id: 'st-5',
        name: 'Crispy Chilli Baby Corn',
        dietaryType: 'veg',
        desc: 'Tender baby corn spears golden-fried and tossed with chopped garlic, shallots, and a vibrant, glossy sweet-and-spicy glaze.',
      },
      {
        id: 'st-6',
        name: 'Crispy Pakoda Specialties',
        dietaryType: 'both',
        desc: 'Morsels steeped in seasoned gram flour and carom seeds, fried until crunchily golden—served with your choice of soft Paneer, Chicken, or River Prawns.',
      },
      {
        id: 'st-7',
        name: 'Imperial Spring Rolls',
        dietaryType: 'both',
        desc: 'Delicate translucent pastry sheets wrapped around shredded seasonal vegetables or chicken, fried to a pristine golden crunch.',
      },
      {
        id: 'st-8',
        name: 'Jalapeno Cheese Balls & Fries',
        dietaryType: 'veg',
        desc: 'A rich molten cheese blend spiked with diced fiery jalapenos in crisp crumb coating, served alongside golden Russet fries dusted with salt or peri-peri.',
      },
      {
        id: 'st-9',
        name: 'Salt & Pepper Wok Crunch',
        dietaryType: 'non-veg',
        desc: 'Crispy seasoned morsels tossed with stir-fried scallions, cracked pepper, and aromatics—available with Chicken, Fish, or Prawns.',
      },
      {
        id: 'st-10',
        name: 'Butter Garlic Delicacies',
        dietaryType: 'non-veg',
        badge: "Chef's Pick",
        desc: 'Tender morsels bathed in a rich, comforting reduction dominated by sweet farm butter and mellow roasted garlic—prepared with Chicken, Fish, or Prawns.',
      },
      {
        id: 'st-11',
        name: 'Heritage 65 & Apollo Fish',
        dietaryType: 'non-veg',
        desc: 'Marinated in yoghurt and southern spices, flash-fried and tossed with fresh curry leaves and green chillies—featuring Chicken 65, Fish 65, or Apollo Fish.',
      },
      {
        id: 'st-12',
        name: 'Chicken Lollipop & Pakoda',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Crisp chicken wingette drumettes tossed in a tangy reduction, served alongside spiced, crunchy gram flour coated chicken bites.',
      },
      {
        id: 'st-13',
        name: 'Coastal Prawn Delights',
        dietaryType: 'non-veg',
        desc: 'Succulent bay prawns prepared in your choice of crunchy Barley crust, Lewis pan glaze, or delicate Japanese Tempura batter.',
      },
      {
        id: 'st-14',
        name: 'Crumb Fried Fish & Chips',
        dietaryType: 'non-veg',
        desc: 'Flaky white river fish fillets coated in seasoned breadcrumbs and fried golden crisp, served with crisp potato chips and house tartar.',
      },
      {
        id: 'st-15',
        name: 'Devilled Eggs Royale',
        dietaryType: 'non-veg',
        desc: 'A classic royal appetizer of halved farm-fresh boiled eggs filled with a whipped, spiced yolk emulsion and fine garden herbs.',
      },
    ],
  },

  // 3. SALADS
  {
    category: 'salads',
    title: 'Salads',
    subtitle: 'Crisp garden foliage, imported feta, and artisanal courtly dressings',
    items: [
      {
        id: 'sal-1',
        name: 'Mehfil Royal Green Salad',
        dietaryType: 'veg',
        desc: 'Crisp carrots, cucumber ribbons, shallots, and vine-ripened tomatoes served with green chillies and fresh lemon mist.',
      },
      {
        id: 'sal-2',
        name: 'Classic Greek Salad',
        dietaryType: 'veg',
        desc: 'Garden cucumbers, juicy tomatoes, and red onions tumbled with Greek kalamata olives and creamy feta cheese in cold-pressed extra virgin olive oil.',
      },
      {
        id: 'sal-3',
        name: 'Caesar Salad Royale',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'Crisp romaine lettuce hearts and crunchy herb croutons tossed in a velvety parmesan dressing, served vegetarian or crowned with grilled chicken.',
      },
      {
        id: 'sal-4',
        name: 'Heritage Mixed Raita',
        dietaryType: 'veg',
        desc: 'Chilled artisanal yoghurt whisked with diced cucumbers, onions, and ripe tomatoes, seasoned with roasted cumin and black rock salt.',
      },
    ],
  },

  // 4. MAIN COURSE INDIAN
  {
    category: 'mains_indian',
    title: 'Main Course Indian',
    subtitle: 'Overnight slow-cooked gravies, royal curries, and rich imperial reductions',
    items: [
      {
        id: 'mi-1',
        name: 'The Makhani Imperial (Butter Masala)',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Soft cottage cheese cubes or grilled tandoori chicken simmered in a rich, creamy, mildly sweet tomato-butter gravy finished with honey and fresh cream.',
      },
      {
        id: 'mi-2',
        name: 'Kadai Specialties',
        dietaryType: 'both',
        desc: 'Prepared in a cast-iron wok with sweet bell peppers, onions, and freshly ground coriander spices—available with Vegetables, Paneer, Mushroom, or Chicken.',
      },
      {
        id: 'mi-3',
        name: 'Paneer & Mushroom Do Pyaza',
        dietaryType: 'veg',
        desc: 'Tender cottage cheese or button mushrooms braised in a rich, semi-dry aromatic gravy with a generous double helping of caramelized onions.',
      },
      {
        id: 'mi-4',
        name: 'Palak & Makai Creations',
        dietaryType: 'veg',
        desc: 'Vibrant, slow-stewed spinach puree infused with mild spices and garlic, folded with golden sweet corn kernels or soft paneer cubes.',
      },
      {
        id: 'mi-5',
        name: 'Veg Kolhapuri & Jhal Frezi',
        dietaryType: 'veg',
        desc: 'Spicy mixed vegetables tossed in a fiery red gravy of roasted coconut and red chillies, or baton-cut vegetables in a tangy tomato-onion base.',
      },
      {
        id: 'mi-6',
        name: 'Aloo Potal Rasa & Seasonal Fry',
        dietaryType: 'veg',
        badge: 'Regional Pride',
        desc: 'Odisha’s beloved heritage preparation: shallow-fried potatoes and pointed gourd tossed in a fragrant, flavour-rich home gravy with whole spices.',
      },
      {
        id: 'mi-7',
        name: 'Chicken Mughlai & Hyderabadi',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Chicken poached in a velvety paste of cashews, almonds, and saffron cream, or slow-cooked in a mint-coriander gravy with fried onions and yogurt.',
      },
      {
        id: 'mi-8',
        name: 'Chicken Kasa & Lababdar',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Chicken slow-cooked in a deeply caramelized, thick onion-tomato gravy, or braised in a luscious creamy tomato reduction with grated paneer.',
      },
      {
        id: 'mi-9',
        name: 'Home Style Heritage Curries',
        dietaryType: 'non-veg',
        desc: 'Tender meat or fish and country potatoes simmered in a light, fragrant ginger-onion-tomato gravy—available with Chicken, Rohu Fish, or Mutton.',
      },
      {
        id: 'mi-10',
        name: 'Fish Sarsowali & Chepala Pulusu',
        dietaryType: 'non-veg',
        badge: "Chef's Pick",
        desc: 'Golden-fried Rohu fish simmered in an aromatic ground mustard seed and green chilli gravy, or prepared in a coastal tangy tamarind reduction.',
      },
      {
        id: 'mi-11',
        name: 'Prawn Malai Curry & Tawa Masala',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Succulent bay prawns simmered in a velvety coconut milk reduction with cardamom, or flash-seared on a tawa with concentrated onion-tomato masala.',
      },
      {
        id: 'mi-12',
        name: 'Royal Crab Curry & Crab Masala',
        dietaryType: 'non-veg',
        desc: 'Succulent crab simmered in a robust, aromatic coastal gravy, or coated in a thick, highly spiced onion-tomato reduction.',
      },
      {
        id: 'mi-13',
        name: 'Mutton Rogan Josh & Lal Maas',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Aromatic Kashmiri lamb braised with alkanet root and fennel, or fierce Rajasthani lamb simmered with smoky Mathania red chillies.',
      },
      {
        id: 'mi-14',
        name: 'Egg Curry & Egg Bhurji Masala',
        dietaryType: 'non-veg',
        desc: 'Hard-boiled farm eggs simmered in a spiced onion gravy, or Indian-style scrambled eggs tossed with onions, tomatoes, and green chillies.',
      },
    ],
  },

  // 5. CHINESE RICE AND NOODLES
  {
    category: 'chinese',
    title: 'Chinese Rice & Noodles',
    subtitle: 'Wok-tossed delights kissed by high flame, fragrant garlic, and authentic sauces',
    items: [
      {
        id: 'cn-1',
        name: 'Classic Wok Fried Rice',
        dietaryType: 'both',
        desc: 'Steamed basmati rice wok-tossed over roaring flame with crunchy vegetables and aromatics—prepared to order with Vegetables, Farm Egg, Chicken, or Mixed Meats.',
      },
      {
        id: 'cn-2',
        name: 'Fiery Schezwan Fried Rice',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'A spicy Indo-Chinese classic tossed in our house-ground Sichuan peppercorn paste—available with Vegetables, Farm Egg, Chicken, or Mixed Meats.',
      },
      {
        id: 'cn-3',
        name: 'Classic Hakka Noodles',
        dietaryType: 'both',
        desc: 'Hand-pulled soft wheat noodles tossed with julienned vegetables and light Cantonese soy—served with Vegetables, Egg, Chicken, or Mixed Meats.',
      },
      {
        id: 'cn-4',
        name: 'Schezwan Tossed Noodles',
        dietaryType: 'both',
        desc: 'Fiery noodles tumbled in pungent Schezwan sauce with scallions and crushed chillies—customized with Vegetables, Egg, Chicken, or Mixed Meats.',
      },
      {
        id: 'cn-5',
        name: 'Crispy American Chop Suey',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'Crispy fried golden noodles crowned with a thick, savory-sweet Cantonese vegetable or chicken glaze with bean sprouts and bell peppers.',
      },
    ],
  },

  // 6. GRILLED
  {
    category: 'grilled',
    title: 'Grilled',
    subtitle: 'Sizzled live on a hot iron grill and basted with house sauces and herbs',
    items: [
      {
        id: 'gr-1',
        name: 'Grilled Cottage Cheese Steak',
        dietaryType: 'veg',
        desc: 'Marinated Indian paneer seared on a hot grill until caramelized, served with sautéed garden vegetables, smashed potatoes, and butter garlic sauce.',
      },
      {
        id: 'gr-2',
        name: 'Grilled Herb Chicken',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Tender marinated chicken breast pan-grilled to juicy tenderness, served with sautéed vegetables, smashed potatoes, and creamy mushroom sauce.',
      },
      {
        id: 'gr-3',
        name: 'Pan-Grilled River Fish',
        dietaryType: 'non-veg',
        badge: "Chef's Pick",
        desc: 'Boneless basa fish fillet grilled with herbs for a delicate, flaky texture, accompanied by sautéed greens, potatoes, and zesty lemon butter sauce.',
      },
      {
        id: 'gr-4',
        name: 'Grilled Jumbo Prawns',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Seasoned jumbo prawns flame-grilled over high heat, served with sautéed garden vegetables, smashed potatoes, and roasted garlic butter glaze.',
      },
    ],
  },

  // 7. RICE AND BIRIYANI
  {
    category: 'rice_biryani',
    title: 'Rice & Biryani',
    subtitle: 'Sealed dum handis with aged basmati, royal saffron, and slow-braised spices',
    items: [
      {
        id: 'rb-1',
        name: 'Hyderabadi Dum Biryani',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'A world-renowned regal dish of aged basmati layered with saffron, mint, and cilantro—sealed under dum with your choice of Vegetables, Paneer, Mushroom, or Chicken.',
      },
      {
        id: 'rb-2',
        name: 'Mughlai Chicken Biryani',
        dietaryType: 'non-veg',
        desc: 'Combining fragrant basmati rice with chicken marinated in a luxurious blend of yogurt, cream, almond-cashew paste, and mild aromatic spices.',
      },
      {
        id: 'rb-3',
        name: 'Mutton Dum Biryani',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Prime cuts of tender goat marinated in spiced yogurt and layered with partially cooked aged basmati, saffron milk, and caramelized golden onions.',
      },
      {
        id: 'rb-4',
        name: 'Prawn & Seafood Biryani',
        dietaryType: 'non-veg',
        desc: 'Succulent bay prawns or boneless river basa infused with coastal spices, saffron, and mint, slow-cooked between fragrant layers of basmati rice.',
      },
      {
        id: 'rb-5',
        name: 'Mehfil Special Non-Veg Biryani',
        dietaryType: 'non-veg',
        badge: 'House Specialty',
        desc: 'Our supreme banquet biryani: fragrant basmati layered with a lavish trio of marinated chicken, spiced coastal prawns, and farm egg.',
      },
      {
        id: 'rb-6',
        name: 'Vegetable Pulao & Curd Rice',
        dietaryType: 'veg',
        desc: 'Fragrant basmati rice tossed with colorful garden vegetables and herbs, or comforting South Indian soft rice folded with fresh thick curd.',
      },
      {
        id: 'rb-7',
        name: 'Jeera & Masala Tempered Rice',
        dietaryType: 'veg',
        desc: 'Aged steamed basmati tossed in desi ghee with roasted cumin seeds, or tempered with caramelized onions, whole spices, and mint leaves.',
      },
    ],
  },

  // 8. DAL
  {
    category: 'dal',
    title: 'Dal',
    subtitle: 'Slow-simmered lentils tempered in pure desi ghee with aromatic spices',
    items: [
      {
        id: 'dal-1',
        name: 'Dal Makhani',
        dietaryType: 'veg',
        badge: 'Signature',
        desc: 'A rich, creamy classic crafted from whole black urad lentils and kidney beans slow-cooked overnight with ripe tomatoes, white butter, and ginger.',
      },
      {
        id: 'dal-2',
        name: 'Dal Tadka',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'Golden toor lentils cooked with turmeric and topped with a dramatic, sizzling desi ghee tempering of cumin seeds, garlic, and dried red chillies.',
      },
      {
        id: 'dal-3',
        name: 'Dal Fry',
        dietaryType: 'veg',
        desc: 'Yellow lentils fried in a fragrant pan mixture of desi ghee, cumin seeds, caramelized onions, juicy tomatoes, and fresh garden spices.',
      },
    ],
  },

  // 9. BURGERS
  {
    category: 'burgers',
    title: 'Burgers',
    subtitle: 'Artisanal grilled patties tucked into butter-toasted brioche with house sauces',
    items: [
      {
        id: 'bg-1',
        name: 'Bun Maska Classic',
        dietaryType: 'veg',
        badge: 'Old World Charm',
        desc: 'Warm, soft bakery bun slit and generously slathered with sweet churned farm butter, perfect alongside a piping hot cup of tea or coffee.',
      },
      {
        id: 'bg-2',
        name: 'Aloo Tikki & Mix Veg Cheese Burger',
        dietaryType: 'veg',
        desc: 'Crispy spiced potato patty or seasoned garden vegetable patty topped with melted cheddar, lettuce, sliced onions, and tangy herb mayo in a toasted bun.',
      },
      {
        id: 'bg-3',
        name: 'Smoked Barbeque Burger',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Grilled patty generously glazed in tangy, smoky barbecue sauce with caramelized shallots and molten cheese—featuring grilled Paneer or Chicken breast.',
      },
      {
        id: 'bg-4',
        name: 'Classic Chicken Patty Burger',
        dietaryType: 'non-veg',
        desc: 'Golden-fried seasoned chicken patty topped with crisp lettuce, ripe tomatoes, and a generous spread of creamy garlic mayonnaise.',
      },
      {
        id: 'bg-5',
        name: 'Fiery Bird’s Eye Chilli Chicken Burger',
        dietaryType: 'non-veg',
        badge: "Chef's Pick",
        desc: 'Juicy chicken patty coated in a scorching hot chilli glaze, balanced with crisp lettuce, cooling mayo, and sharp jalapeños inside toasted brioche.',
      },
    ],
  },

  // 10. PIZZA
  {
    category: 'pizza',
    title: 'Pizza',
    subtitle: 'Hand-stretched sourdough bases baked with crushed Italian tomatoes and melted cheese',
    items: [
      {
        id: 'pz-1',
        name: 'Margherita Pizza Royale',
        dietaryType: 'veg',
        desc: 'A classic Italian pizza topped with crushed San Marzano tomatoes, fresh mozzarella cheese, aromatic garden basil leaves, and cold-pressed olive oil.',
      },
      {
        id: 'pz-2',
        name: 'Corn & Black Olive Pizza',
        dietaryType: 'veg',
        desc: 'Crispy golden crust topped with rich tomato sauce, melted mozzarella, tender sweet corn pearls, and savory, briny Mediterranean black olives.',
      },
      {
        id: 'pz-3',
        name: 'Gourmet Paneer & Mushroom Pizza',
        dietaryType: 'veg',
        badge: 'Favourite',
        desc: 'Indo-Western fusion pie featuring marinated tandoori cottage cheese cubes or earthy sautéed button mushrooms over molten mozzarella.',
      },
      {
        id: 'pz-4',
        name: 'Smoked BBQ Chicken Pizza',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Topped with tender grilled chicken chunks tossed in sweet and smoky barbecue sauce, caramelized shallots, and stringy mozzarella.',
      },
      {
        id: 'pz-5',
        name: 'Fiery Peri-Peri Chicken Pizza',
        dietaryType: 'non-veg',
        desc: 'Topped with succulent chicken morsels marinated in spicy, tangy African bird’s eye chilli sauce, sweet paprika, and double mozzarella.',
      },
      {
        id: 'pz-6',
        name: 'Ocean Catch Seafood Pizza',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'A rich, savory coastal pie loaded with a medley of ocean catches including river fish, juicy prawns, and delicate crab meat.',
      },
    ],
  },

  // 11. SANDWICHES
  {
    category: 'sandwiches',
    title: 'Sandwiches',
    subtitle: 'Multi-layered toasted gourmet breads layered with fillings and chutneys',
    items: [
      {
        id: 'sw-1',
        name: 'Tri-Special Veg Club Sandwich',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'A vibrant three-layered toasted club sandwich packed with spiced potato masala, crisp cucumber, tomatoes, mint chutney, and melted cheese.',
      },
      {
        id: 'sw-2',
        name: 'Sweet Corn & Melted Cheese Toastie',
        dietaryType: 'veg',
        desc: 'Golden-grilled artisan bread filled with a warm, comforting mixture of sweet American corn, melted cheddar cheese, and aromatic herbs.',
      },
      {
        id: 'sw-3',
        name: 'Paneer & Sautéed Mushroom Toastie',
        dietaryType: 'veg',
        desc: 'Gourmet toastie packed with spiced cottage cheese or butter-sautéed button mushrooms, gooey mozzarella, and tangy house spread.',
      },
      {
        id: 'sw-4',
        name: 'Classic Chicken Club Sandwich',
        dietaryType: 'non-veg',
        badge: 'Favourite',
        desc: 'A triple-decker delight layered with tender roasted chicken, fried farm egg, crisp lettuce, ripe tomatoes, and herb garlic spread.',
      },
      {
        id: 'sw-5',
        name: 'Grilled & BBQ Chicken Sandwiches',
        dietaryType: 'non-veg',
        desc: 'Juicy marinated chicken breast pan-grilled with savory herbs or tossed in smoky barbecue sauce with crisp onions and coleslaw.',
      },
    ],
  },

  // 12. PASTAS
  {
    category: 'pastas',
    title: 'Pastas',
    subtitle: 'Al dente Italian durum pasta enveloped in slow-simmered sauces and parmesan',
    items: [
      {
        id: 'ps-1',
        name: 'Pasta Arrabbiata',
        dietaryType: 'both',
        desc: 'Penne pasta tossed in a fiery, spirited sauce of San Marzano tomatoes, roasted garlic, and dried red chilli flakes—available vegetarian or with chicken.',
      },
      {
        id: 'ps-2',
        name: 'Pasta Alfredo',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Pasta enveloped in a velvety reduction of sweet farm butter, heavy cream, and finely grated parmesan cheese, prepared classic or with tender chicken.',
      },
      {
        id: 'ps-3',
        name: 'Pink Sauce Pasta Royale',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'A harmonious blend of ripe tomato coulis and rich Alfredo cream with fine herbs, served to your preference vegetarian or with chicken pieces.',
      },
      {
        id: 'ps-4',
        name: 'Indo-Italian Schezwan Pasta',
        dietaryType: 'both',
        desc: 'A vibrant fusion dish where al dente Italian pasta is tossed in a fiery, pungent Schezwan sauce with bell peppers, served vegetarian or with chicken.',
      },
    ],
  },

  // 13. DESSERTS
  {
    category: 'desserts',
    title: 'Desserts',
    subtitle: 'Traditional sweet confections, chilled puddings, and molten creations',
    items: [
      {
        id: 'ds-1',
        name: 'Royal Odisha Rasgulla',
        dietaryType: 'veg',
        badge: 'Heritage Pride',
        desc: 'Odisha’s timeless crown jewel: ball-shaped dumplings of pristine chena poached in a delicate, crystal-clear sugar syrup of pure purity.',
      },
      {
        id: 'ds-2',
        name: 'Gulab Jamun Shahi',
        dietaryType: 'veg',
        badge: 'Favourite',
        desc: 'Soft, golden-fried dumplings crafted from reduced milk khoya, steeped in warm sugar syrup perfumed with green cardamom and rose water.',
      },
      {
        id: 'ds-3',
        name: 'Velvety Caramel Pudding',
        dietaryType: 'both',
        desc: 'A smooth, milk-based sweet custard delicately thickened and baked with a glossy golden amber caramel crown that melts upon the tongue.',
      },
      {
        id: 'ds-4',
        name: 'Artisanal Ice Cream Selection',
        dietaryType: 'veg',
        desc: 'Rich, dense scoops of handcrafted gourmet ice cream served chilled to conclude your rooftop evening on a sweet note.',
      },
    ],
  },

  // 14. BEVERAGES
  {
    category: 'beverages',
    title: 'Beverages',
    subtitle: 'Chilled nectars, whipped espresso brews, and twilight terrace refreshments',
    items: [
      {
        id: 'bv-1',
        name: 'Mehfil Cold Coffee with Ice Cream',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'Bold South Indian espresso decoction chilled and whipped with whole creamy milk, crowned with rich Madagascar vanilla bean cream.',
      },
      {
        id: 'bv-2',
        name: 'Freshly Brewed Hot Coffee & Tea',
        dietaryType: 'veg',
        desc: 'Traditional freshly brewed milk coffee, strong black brew, or aromatic spiced Assam tea prepared with ginger and green cardamom.',
      },
      {
        id: 'bv-3',
        name: 'Velvety Hot Chocolate',
        dietaryType: 'veg',
        desc: 'Rich melted cocoa simmered in scalding creamy milk, topped with a velvety froth of chocolate dust.',
      },
      {
        id: 'bv-4',
        name: 'Artisanal Milkshakes',
        dietaryType: 'veg',
        badge: 'Favourite',
        desc: 'Thick, creamy shakes blended to order—choose from fresh Sweet Banana, crunchy Kit Kat chocolate, or crushed Oreo cookie velvet.',
      },
      {
        id: 'bv-5',
        name: 'Virgin Mojito & Fresh Lime Soda',
        dietaryType: 'veg',
        desc: 'Crushed garden mint and lime muddled with sparkling fizz, or classic freshly squeezed sun-lemon soda prepared sweet, salted, or mixed.',
      },
      {
        id: 'bv-6',
        name: 'Chilled Refreshments & Red Bull',
        dietaryType: 'veg',
        desc: 'Thums Up, Diet Coke, Red Bull Energy drink served over crushed ice, along with packaged natural mineral water.',
      },
    ],
  },

  // 15. INDIAN BREADS
  {
    category: 'breads',
    title: 'Indian Breads',
    subtitle: 'Handcrafted flatbreads slapped onto the fiery walls of the earthen tandoor',
    items: [
      {
        id: 'br-1',
        name: 'Butter Naan',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'Hand-stretched leavened flatbread slapped onto the curved clay of the fiery tandoor, pulled piping hot and bathed in churned farm butter.',
      },
      {
        id: 'br-2',
        name: 'Phulka (Plain / Desi Ghee)',
        dietaryType: 'veg',
        desc: 'Light, whole-wheat flatbread puffed over an open flame until pillowy soft, brushed with pure desi ghee upon request.',
      },
    ],
  },

  // 16. SIDES
  {
    category: 'sides',
    title: 'Sides',
    subtitle: 'Crispy accompaniments, cooling raitas, and crunchy savouries',
    items: [
      {
        id: 'sd-1',
        name: 'Fresh Set Plain Curd',
        dietaryType: 'veg',
        desc: 'Traditional clay-pot set artisanal curd, cool, creamy, and soothing on the palate.',
      },
      {
        id: 'sd-2',
        name: 'Crispy Masala Papad',
        dietaryType: 'veg',
        desc: 'Crispy lentil wafer roasted or fried, topped with finely diced onions, ripe tomatoes, green chillies, and tangy chaat masala.',
      },
      {
        id: 'sd-3',
        name: 'Garden Mixed Raita',
        dietaryType: 'veg',
        desc: 'Chilled whisked yogurt folded with crisp cucumber, onions, roasted cumin, and black rock salt.',
      },
    ],
  },
];
