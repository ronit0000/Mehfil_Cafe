// src/data/menuData.js
// Complete Mehfil Rooftop Cafe & Restro Menu with consolidated Veg/Non-Veg variants,
// dietaryType indicators ('veg' | 'non-veg' | 'both'), and royal Nawabi descriptions (Zero prices).

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
  { id: 'beverages',        label: 'Beverages' },
  { id: 'breads',           label: 'Indian Breads' },
  { id: 'sides',            label: 'Sides' },
];

export const menuPages = [
  // 1. SOUPS
  {
    category: 'soups',
    title: 'Soups',
    subtitle: 'Slow-simmered broths infused with aromatic garden herbs and courtly spices',
    items: [
      {
        id: 'soup-1',
        name: 'Tomato Basil Soup',
        dietaryType: 'veg',
        badge: "Chef's Pick",
        desc: 'Sun-ripened Deccan tomatoes slow-roasted over smoldering embers, harmonized with fragrant sweet basil and cold-pressed olive nectar—a comforting overture fit for royal chambers.',
      },
      {
        id: 'soup-2',
        name: 'Sweet Corn Soup',
        dietaryType: 'both',
        desc: 'Tender golden maize kernels simmered gently in a courtly broth, prepared to your preference with garden-fresh vegetables or succulent pulled chicken.',
      },
      {
        id: 'soup-3',
        name: 'Manchow Soup',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'A regal, fiery Indo-Chinese broth crafted in the imperial style, served to your preference with either garden-fresh vegetables or tender morsels of chicken, crowned with crisp fried noodles.',
      },
      {
        id: 'soup-4',
        name: 'Hot & Sour Soup',
        dietaryType: 'both',
        desc: 'An assertive broth infused with Tellicherry black pepper, aged dark vinegar, and courtly chilli paste, available to your choosing with crisp garden juliennes or braised country chicken.',
      },
      {
        id: 'soup-5',
        name: 'Lemon Coriander Soup',
        dietaryType: 'both',
        desc: 'A luminous, restorative elixir redolent with freshly plucked coriander and sun-drenched lemons, served with a delicate garden medley or shredded chicken.',
      },
      {
        id: 'soup-6',
        name: 'Mutton Paya Soup',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'A revered legacy recipe of prime trotters simmered through the stillness of night with whole imperial spices, yielding a gelatinous, deeply nourishing royal broth.',
      },
    ],
  },

  // 2. STARTERS AND APPETIZERS
  {
    category: 'starters',
    title: 'Starters & Appetizers',
    subtitle: 'Charcoal-kissed kebabs and golden crisp delicacies crafted with artisanal care',
    items: [
      {
        id: 'st-1',
        name: 'Tandoori Tikka Specialties',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Steeped in mustard-infused saffron yoghurt and charred to smoky perfection in our fiery clay oven—available with artisanal dairy cottage cheese or succulent chicken chunks.',
      },
      {
        id: 'st-2',
        name: 'Seekh Kebab Royale',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'Delicately pounded morsels laced with roasted cumin, garden mint, and royal mace, kissed by glowing charcoal embers—crafted with vegetable mince or finely minced country chicken.',
      },
      {
        id: 'st-3',
        name: 'Chilli Tossed Appetizers',
        dietaryType: 'both',
        badge: 'Must Try',
        desc: 'Wok-charred appetisers tossed vigorously with sweet bell peppers, cracked garlic, and spring onions—available to your preference with malai paneer, fresh mushrooms, or crispy chicken.',
      },
      {
        id: 'st-4',
        name: 'Crispy Corn',
        dietaryType: 'veg',
        desc: 'Golden corn pearls tossed in seasoned rice flour, crackled to crisp perfection, and tumbled with fragrant peppers and courtly spices.',
      },
      {
        id: 'st-5',
        name: 'Imperial Spring Rolls',
        dietaryType: 'both',
        desc: 'Translucent pastry wraps encasing crisp garden vegetables and glass noodles, served classic vegetarian or enriched with tender minced chicken.',
      },
      {
        id: 'st-6',
        name: 'Fish Amritsari',
        dietaryType: 'non-veg',
        badge: "Chef's Pick",
        desc: 'Choice river catch fillets steeped in crushed carom seeds and Punjabi spices, enrobed in spiced gram batter and fried crisp, crowned with royal chaat masala.',
      },
      {
        id: 'st-7',
        name: 'Dahi Ke Kebab',
        dietaryType: 'veg',
        desc: 'Melt-in-the-mouth griddled patties of hand-hung creamy curd blended with cracked cardamom, roasted gram flour, and fresh herbs.',
      },
      {
        id: 'st-8',
        name: 'Coastal Prawn Koliwada',
        dietaryType: 'non-veg',
        desc: 'Plump coastal bay prawns dredged in a vibrant crimson rub of seaside spices, flash-fried to retain ocean sweetness beneath an irresistible crunch.',
      },
    ],
  },

  // 3. SALADS
  {
    category: 'salads',
    title: 'Salads',
    subtitle: 'Crisp garden greens, artisanal dressings, and refreshing cold pressings',
    items: [
      {
        id: 'sal-1',
        name: 'Mehfil Garden Green Salad',
        dietaryType: 'veg',
        desc: 'Crisp cucumber ribbons, vine-ripened tomatoes, sweet shallots, and tender radishes tumbled with mountain mint and cold-pressed citrus vinaigrette.',
      },
      {
        id: 'sal-2',
        name: 'Caesar Salad Royale',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'Tender romaine hearts tossed in velvety garlic-parmesan emulsion with golden sourdough croutons, served classic or crowned with embers-grilled chicken.',
      },
      {
        id: 'sal-3',
        name: 'Tandoori Tikka Salad',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'Mixed seasonal greens and sweet bell peppers tossed in a royal honey-mustard reduction, crowned with your choice of grilled paneer or juicy chicken tikka.',
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
        name: 'The Makhani Imperial',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'A legendary golden-velvet sauce of vine-ripened tomatoes, churned farm butter, roasted cashews, and kasoori methi—prepared with soft malai paneer or tandoor-roasted chicken.',
      },
      {
        id: 'mi-2',
        name: 'Kadhai Specialties',
        dietaryType: 'both',
        desc: 'Tossed in a cast-iron wok with sweet bell peppers, pounded coriander seeds, and whole dried chillies in an assertive rustic gravy—available with artisanal paneer or chicken.',
      },
      {
        id: 'mi-3',
        name: 'Tikka Masala Royale',
        dietaryType: 'both',
        badge: 'Must Try',
        desc: 'Clay-oven charred morsels finished in an aromatic spiced onion-tomato gravy with ginger ribbons and sweet cream, offered with fresh paneer or boneless chicken.',
      },
      {
        id: 'mi-4',
        name: 'Mutton Rogan Josh',
        dietaryType: 'non-veg',
        badge: 'Signature',
        desc: 'Prime cuts of tender mutton slow-braised in the royal Kashmiri tradition with alkanet root, sun-dried ginger, and crushed whole fennel spices.',
      },
      {
        id: 'mi-5',
        name: 'Subz Meloni',
        dietaryType: 'veg',
        desc: 'A garden banquet of baby corn, carrots, French beans, and paneer gently simmered in an aromatic emerald spinach and cashew velvet puree.',
      },
      {
        id: 'mi-6',
        name: 'Prawn Malabar Masala',
        dietaryType: 'non-veg',
        desc: 'Coastal bay prawns tossed in a fragrant, thick reduction of caramelized shallots, ripe tomatoes, and freshly ground seaside spices.',
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
        name: 'Hakka Noodles',
        dietaryType: 'both',
        desc: 'Hand-pulled wheat noodles tossed vigorously over roaring flames with crunchy garden vegetables and Cantonese soy—prepared with vegetables, egg, or chicken.',
      },
      {
        id: 'cn-2',
        name: 'Chilli Garlic Noodles',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Wok-charred noodles with crushed burnt garlic, sweet peppers, and fiery artisanal chilli oil, prepared to your preference with vegetables, farm egg, or chicken.',
      },
      {
        id: 'cn-3',
        name: 'Classic Wok Fried Rice',
        dietaryType: 'both',
        desc: 'Fluffy aged basmati rice tossed with finely diced scallions and light aromatic soy, custom-made with garden vegetables, farm eggs, or chicken.',
      },
      {
        id: 'cn-4',
        name: 'Schezwan Fried Rice',
        dietaryType: 'both',
        desc: 'Fragrant long-grain rice wok-tossed with our house-ground Sichuan peppercorn paste, prepared with crunchy vegetables, farm eggs, or shredded chicken.',
      },
      {
        id: 'cn-5',
        name: 'Manchurian Gravy',
        dietaryType: 'both',
        desc: 'Golden-fried dumplings bathed in a glistening, umami-rich dark soy, ginger, and garlic glaze—crafted from garden vegetables or tender chicken.',
      },
      {
        id: 'cn-6',
        name: 'Chilli Tossed Gravy',
        dietaryType: 'both',
        badge: 'Favourite',
        desc: 'Sweet peppers and fiery green chillies in a sweet-and-sour garlic reduction, served to your preference with crispy cottage cheese or chicken bites.',
      },
    ],
  },

  // 6. GRILLED
  {
    category: 'grilled',
    title: 'Grilled',
    subtitle: 'Live charcoal-roasted specialties basted with aromatic ghee and secret spices',
    items: [
      {
        id: 'gr-1',
        name: 'Tandoori Chicken (Half / Full)',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Whole spring chicken steeped overnight in mustard oil, Kashmiri deghi mirch, and hung curd, roasted to smoky perfection over glowing coals.',
      },
      {
        id: 'gr-2',
        name: 'Malai Tikka Royale',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'Steeped in heavy dairy cream, roasted cashew paste, and green cardamom, gently charred to juicy succulence—offered with malai paneer or chicken.',
      },
      {
        id: 'gr-3',
        name: 'Tandoori Mushroom Tikka',
        dietaryType: 'veg',
        desc: 'Plump button mushrooms filled with herb cheese, drenched in a fragrant ajwain-spiced yoghurt marinade and clay-oven grilled.',
      },
      {
        id: 'gr-4',
        name: 'Grilled Fish Lemon Herb',
        dietaryType: 'non-veg',
        desc: 'Fresh river fish fillet lightly dusted with ground pepper and garden herbs, pan-grilled with golden churned butter and fresh lemon drizzle.',
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
        name: 'Mehfil Dum Biryani',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'Our critically acclaimed masterpiece: aged basmati rice layered with saffron milk, caramelized shallots, and fresh mint, sealed under an earthenware dum—prepared with royal garden vegetables or succulent chicken.',
      },
      {
        id: 'rb-2',
        name: 'Mutton Dum Biryani',
        dietaryType: 'non-veg',
        badge: 'Bestseller',
        desc: 'Prime cuts of tender goat slow-cooked on dum with fragrant long-grain basmati, golden fried shallots, and royal Kashmiri saffron strands.',
      },
      {
        id: 'rb-3',
        name: 'Jeera Rice',
        dietaryType: 'veg',
        desc: 'Aged long-grain basmati rice tempered in pure desi ghee with roasted cumin seeds and fresh coriander leaves.',
      },
      {
        id: 'rb-4',
        name: 'Steamed Basmati Rice',
        dietaryType: 'veg',
        desc: 'Pristine, fluffy long grains of aged royal basmati rice, steamed to fragrant perfection to complement rich curries.',
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
        desc: 'Prized black urad lentils and kidney beans slow-simmered over smoldering coals for thirty-six hours, enriched with hand-churned white butter and velvety cream.',
      },
      {
        id: 'dal-2',
        name: 'Dal Tadka',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'Yellow toor lentils slow-cooked with turmeric, crowned with a sizzling ghee tempering of cumin, golden garlic, and whole dried red chillies.',
      },
      {
        id: 'dal-3',
        name: 'Dal Fry',
        dietaryType: 'veg',
        desc: 'Homestyle yellow lentils braised in a rich pan masala of caramelized onions, fresh tomatoes, grated ginger, and chopped green herbs.',
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
        name: 'The Mehfil Royale Burger',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Served in a butter-toasted brioche bun with crisp lettuce, cheddar slice, and house paprika relish—featuring your choice of a spiced crunchy veg patty or buttermilk crispy chicken breast.',
      },
      {
        id: 'bg-2',
        name: 'BBQ Smoked Burger',
        dietaryType: 'both',
        desc: 'Glazed in hickory barbecue sauce with caramelized shallots and molten cheese, prepared with a thick grilled paneer steak or smoked chicken breast.',
      },
      {
        id: 'bg-3',
        name: 'Classic Cheese Burger',
        dietaryType: 'both',
        desc: 'Toasted sesame bun with herb mayo, crisp pickles, and melted cheese, prepared with a golden vegetable patty or seasoned chicken patty.',
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
        name: 'Margherita Royale',
        dietaryType: 'veg',
        desc: 'A classic thin-crust masterpiece smothered in sweet crushed tomato sauce, fresh buffalo mozzarella, and fragrant garden basil leaves.',
      },
      {
        id: 'pz-2',
        name: 'Farmhouse & Feast Pizza',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Hand-stretched sourdough loaded with sweet peppers, red onions, mushrooms, and mozzarella—available garden-fresh or enhanced with tender chicken tikka.',
      },
      {
        id: 'pz-3',
        name: 'Tandoori Tikka Pizza',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'Smoky clay-oven charred cubes, pickled shallots, coriander, and mozzarella over a spiced makhani reduction—offered with paneer or chicken.',
      },
      {
        id: 'pz-4',
        name: 'Peri Peri Pizza',
        dietaryType: 'both',
        desc: 'Fiery peri-peri spice, jalapeños, sweet paprika, and double mozzarella cheese, featuring your choice of cottage cheese or spicy chicken.',
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
        name: 'Bombay Toasted Club',
        dietaryType: 'both',
        badge: 'Favourite',
        desc: 'Multi-layered toasted artisan bread layered with mint chutney, cucumber, tomatoes, and molten cheese—crafted with spiced potato masala or roasted chicken slices.',
      },
      {
        id: 'sw-2',
        name: 'Grilled Cheese Supreme',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Golden griddled artisan bread with melted cheddar and herb béchamel, available classic vegetarian or stuffed with seasoned chicken shreds.',
      },
      {
        id: 'sw-3',
        name: 'Corn & Pepper Melt',
        dietaryType: 'veg',
        desc: 'Sweet golden corn pearls and bell peppers folded into creamy béchamel and sharp cheddar cheese, griddled golden brown until molten.',
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
        name: 'Penne Arrabbiata',
        dietaryType: 'both',
        desc: 'Durum wheat penne tossed in a spirited reduction of slow-simmered San Marzano tomatoes, roasted garlic, and fiery red pepper flakes—served classic or with chicken.',
      },
      {
        id: 'ps-2',
        name: 'Fettuccine Alfredo',
        dietaryType: 'both',
        badge: "Chef's Pick",
        desc: 'Silky ribbons of pasta enrobed in heavy cream, farm butter, and aged parmesan with sautéed mushrooms—available vegetarian or enhanced with tender chicken.',
      },
      {
        id: 'ps-3',
        name: 'Penne Pink Sauce Royale',
        dietaryType: 'both',
        badge: 'Signature',
        desc: 'A harmonious marriage of sweet tomato coulis and luxurious garlic cream, prepared to order with garden broccoli and zucchini or succulent chicken.',
      },
    ],
  },

  // 13. BEVERAGES
  {
    category: 'beverages',
    title: 'Beverages',
    subtitle: 'Twilight terrace mocktails, hand-whipped espresso, and chilled royal nectars',
    items: [
      {
        id: 'bv-1',
        name: 'Mehfil Cold Coffee with Ice Cream',
        dietaryType: 'veg',
        badge: 'Favourite',
        desc: 'Bold South Indian espresso decoction chilled and whipped with whole creamy milk, crowned with rich Madagascar vanilla bean cream.',
      },
      {
        id: 'bv-2',
        name: 'Royal Mango Lassi',
        dietaryType: 'veg',
        desc: 'Sun-drenched Alphonso mangoes churned with thick set curd, perfumed with crushed green cardamom and slivered pistachios.',
      },
      {
        id: 'bv-3',
        name: 'Virgin Mint Mojito',
        dietaryType: 'veg',
        desc: 'Fresh garden mint leaves and tart lime muddled with sparkling fizz over crushed mountain ice—a timeless, refreshing palate cleanser.',
      },
      {
        id: 'bv-4',
        name: 'Rooftop Watermelon Cooler',
        dietaryType: 'veg',
        badge: 'Signature',
        desc: 'Mehfil’s signature rooftop libation: freshly cold-pressed watermelon, bruised sweet basil, and mountain lime topped with cooling soda.',
      },
      {
        id: 'bv-5',
        name: 'Masala Kulhad Chai',
        dietaryType: 'veg',
        desc: 'Assam tea leaves slow-boiled with whole milk, crushed ginger root, holy tulsi, and aromatic green cardamom pods.',
      },
      {
        id: 'bv-6',
        name: 'Blue Lagoon Mocktail',
        dietaryType: 'veg',
        desc: 'An electric azure elixir of bitter orange curacao, zesty citrus, and effervescent bubbles served over shaved ice.',
      },
    ],
  },

  // 14. INDIAN BREADS
  {
    category: 'breads',
    title: 'Indian Breads',
    subtitle: 'Handcrafted flatbreads slapped onto the fiery walls of the earthen tandoor',
    items: [
      {
        id: 'br-1',
        name: 'Butter Naan',
        dietaryType: 'veg',
        desc: 'Hand-stretched leavened flatbread slapped onto the curved clay of the tandoor, pulled piping hot and bathed in churned farm butter.',
      },
      {
        id: 'br-2',
        name: 'Garlic Naan',
        dietaryType: 'veg',
        badge: 'Bestseller',
        desc: 'Fragrant tandoor-baked bread studded with roasted garlic cloves and cilantro leaves, glistened with golden desi ghee.',
      },
      {
        id: 'br-3',
        name: 'Cheese Garlic Naan',
        dietaryType: 'veg',
        badge: "Chef's Pick",
        desc: 'Soft leavened dough stuffed with rich artisanal cheese and garlic, toasted until bubbling and finished with fine fresh herbs.',
      },
      {
        id: 'br-4',
        name: 'Tandoori Roti (Plain / Butter)',
        dietaryType: 'veg',
        desc: 'Traditional stone-ground whole-wheat flatbread cooked crisp over glowing tandoor coals, brushed with churned butter.',
      },
      {
        id: 'br-5',
        name: 'Laccha Paratha',
        dietaryType: 'veg',
        desc: 'Multi-layered, spiral-rolled whole-wheat bread baked to an airy, crispy crunch that flakes into delicate golden ribbons.',
      },
      {
        id: 'br-6',
        name: 'Rumali Roti',
        dietaryType: 'veg',
        desc: 'Silken, handkerchief-thin unleavened bread tossed deftly in the air and baked on an inverted copper tawa.',
      },
    ],
  },

  // 15. SIDES
  {
    category: 'sides',
    title: 'Sides',
    subtitle: 'Crispy accompaniments, cooling raitas, and crunchy savouries',
    items: [
      {
        id: 'sd-1',
        name: 'French Fries (Plain / Peri Peri)',
        dietaryType: 'veg',
        desc: 'Golden-fried Russet potato batons tossed in sea salt or dusted with fiery house-blended peri-peri spices.',
      },
      {
        id: 'sd-2',
        name: 'Loaded Cheese Nachos',
        dietaryType: 'both',
        badge: 'Bestseller',
        desc: 'Crisp stone-ground corn tortilla chips blanketed in warm spiced cheese sauce and jalapeños, served classic or enhanced with seasoned chicken tinga.',
      },
      {
        id: 'sd-3',
        name: 'Boondi / Mix Veg Raita',
        dietaryType: 'veg',
        desc: 'Chilled artisanal yoghurt whisked with crisp chickpea droplets or garden vegetables, roasted cumin, and black rock salt.',
      },
      {
        id: 'sd-4',
        name: 'Masala Papad (Fried / Roasted)',
        dietaryType: 'veg',
        desc: 'Crispy lentil cracker topped with finely diced onions, ripe tomatoes, fresh green chillies, coriander, and tangy chaat masala.',
      },
    ],
  },
];
