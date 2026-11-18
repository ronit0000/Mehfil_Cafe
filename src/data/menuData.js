// src/data/menuData.js
// Complete Mehfil Rooftop Cafe & Restro Menu with authentic Nawabi descriptions (Zero prices)

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
        veg: true,
        badge: "Chef's Pick",
        desc: 'Sun-ripened Deccan tomatoes slow-roasted over embers, harmonized with fragrant sweet basil and cold-pressed olive nectar—a comforting overture fit for royal chambers.',
      },
      {
        id: 'soup-2',
        name: 'Sweet Corn Soup',
        veg: true,
        desc: 'Tender golden maize kernels simmered gently in a courtly vegetable decoction, finished with cracked white pepper and fresh scallion ribbons.',
      },
      {
        id: 'soup-3',
        name: 'Manchow Soup',
        veg: true,
        desc: 'A regal, slow-simmered broth infused with fiery spices, shredded garden vegetables, and the delicate crunch of crisp fried noodles.',
      },
      {
        id: 'soup-4',
        name: 'Chicken Hot & Sour',
        veg: false,
        desc: 'Slow-braised country chicken infused with fiery Tellicherry black pepper, aged dark vinegar, and hand-ground chilli paste—a bold broth of regal warmth.',
      },
      {
        id: 'soup-5',
        name: 'Lemon Coriander Soup',
        veg: true,
        desc: 'A translucent, restorative elixir redolent with freshly plucked coriander sprigs and the luminous citrus essence of freshly squeezed sun-lemons.',
      },
      {
        id: 'soup-6',
        name: 'Mutton Paya Soup',
        veg: false,
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
        name: 'Paneer Tikka',
        veg: true,
        badge: 'Bestseller',
        desc: 'Blocks of artisanal dairy cottage cheese steeped in mustard-infused saffron yoghurt, charred to smoky perfection within the clay belly of our fiery tandoor.',
      },
      {
        id: 'st-2',
        name: 'Chicken Seekh Kebab',
        veg: false,
        badge: 'Bestseller',
        desc: 'Finely pounded morsels of tender chicken laced with roasted cumin, garden mint, and delicate royal mace, gently skewered and kissed by glowing embers.',
      },
      {
        id: 'st-3',
        name: 'Crispy Corn',
        veg: true,
        desc: 'Golden corn pearls tossed in seasoned rice flour, crackled to crisp perfection, and tumbled with fragrant peppers and courtly spices.',
      },
      {
        id: 'st-4',
        name: 'Veg Spring Roll',
        veg: true,
        desc: 'Delicate translucent pastry wraps encasing a julienned medley of crisp garden vegetables and glass noodles, fried to a pristine golden crunch.',
      },
      {
        id: 'st-5',
        name: 'Fish Amritsari',
        veg: false,
        desc: 'Choice river catch fillets steeped in crushed carom seeds and Punjabi spices, enrobed in spiced gram batter and fried crisp, crowned with royal chaat masala.',
      },
      {
        id: 'st-6',
        name: 'Hara Bhara Kebab',
        veg: true,
        desc: 'Velvety medallions of hand-pressed garden spinach, crushed cottage cheese, and sweet green peas, griddled with pure desi ghee.',
      },
      {
        id: 'st-7',
        name: 'Chicken Lollipop',
        veg: false,
        desc: 'Tender frenched winglets marinated in fragrant aromatics, crisp-fried and glazed in a glistening, sweet-spicy courtly glaze.',
      },
      {
        id: 'st-8',
        name: 'Dahi Ke Kebab',
        veg: true,
        badge: "Chef's Pick",
        desc: 'Melt-in-the-mouth patties of hand-hung creamy curd blended with cracked cardamom, roasted gram flour, and fresh herbs, griddled until golden.',
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
        veg: true,
        desc: 'Crisp garden cucumber ribbons, vine-ripened tomatoes, sweet shallots, and tender radishes tumbled with mountain mint and cold-pressed citrus vinaigrette.',
      },
      {
        id: 'sal-2',
        name: 'Classic Caesar Salad',
        veg: true,
        badge: "Chef's Pick",
        desc: 'Tender romaine hearts tossed in creamy garlic-parmesan dressing, crowned with crisp sourdough croutons and freshly ground Tellicherry black pepper.',
      },
      {
        id: 'sal-3',
        name: 'Grilled Chicken Tikka Salad',
        veg: false,
        badge: 'Signature',
        desc: 'Succulent embers-grilled chicken tikka morsels tossed over crisp seasonal foliage, sweet bell peppers, and a royal honey-mustard reduction.',
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
        name: 'Butter Chicken',
        veg: false,
        badge: 'Bestseller',
        desc: 'Tandoor-roasted chicken steeped in a silky reduction of vine-ripened tomatoes, churned farm butter, crushed kasoori methi, and artisanal cream.',
      },
      {
        id: 'mi-2',
        name: 'Paneer Makhani',
        veg: true,
        badge: 'Bestseller',
        desc: 'Pristine cubes of soft malai paneer bathed in an aromatic, golden-velvet sauce of slow-stewed tomatoes, roasted cashews, and green cardamom.',
      },
      {
        id: 'mi-3',
        name: 'Mutton Rogan Josh',
        veg: false,
        badge: 'Signature',
        desc: 'Prime cuts of tender mutton slow-braised in the royal Kashmiri tradition with alkanet root, sun-dried ginger, and crushed whole fennel spices.',
      },
      {
        id: 'mi-4',
        name: 'Kadhai Paneer',
        veg: true,
        desc: 'Artisanal paneer tossed in an iron kadhai with sweet bell peppers, crushed coriander seeds, and whole dried chillies in an assertive, rustic gravy.',
      },
      {
        id: 'mi-5',
        name: 'Chicken Tikka Masala',
        veg: false,
        desc: 'Succulent clay-oven grilled boneless chicken simmered in a spiced onion-tomato masala enriched with fresh ginger juliennes and sweet cream.',
      },
      {
        id: 'mi-6',
        name: 'Subz Meloni',
        veg: true,
        desc: 'A garden banquet of baby corn, carrots, French beans, and paneer gently simmered in an aromatic emerald spinach and cashew velvet puree.',
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
        name: 'Veg Hakka Noodles',
        veg: true,
        desc: 'Hand-pulled wheat noodles tossed vigorously over roaring flames with crunchy garden vegetables, scallions, and delicate Cantonese soy essence.',
      },
      {
        id: 'cn-2',
        name: 'Chicken Chilli Garlic Noodles',
        veg: false,
        badge: 'Bestseller',
        desc: 'Wok-charred noodles tumbled with shredded chicken, sweet bell peppers, crushed burnt garlic, and fiery artisanal chilli oil.',
      },
      {
        id: 'cn-3',
        name: 'Schezwan Fried Rice',
        veg: true,
        desc: 'Fragrant long-grain rice tossed with finely diced garden vegetables and our fiery house-ground Sichuan peppercorn paste.',
      },
      {
        id: 'cn-4',
        name: 'Egg Fried Rice',
        veg: false,
        desc: 'Fluffy basmati rice tossed with farm eggs, finely chopped scallions, cracked white pepper, and light aromatic soy seasoning.',
      },
      {
        id: 'cn-5',
        name: 'Veg Manchurian Gravy',
        veg: true,
        desc: 'Golden-fried garden vegetable dumplings bathed in a glistening, umami-rich dark soy, ginger, and garlic glaze.',
      },
      {
        id: 'cn-6',
        name: 'Chilli Chicken Gravy',
        veg: false,
        badge: 'Favourite',
        desc: 'Crispy batter-enrobed chicken morsels tossed with sweet peppers and fresh green chillies in a fiery, sweet-and-sour garlic reduction.',
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
        name: 'Tandoori Chicken',
        veg: false,
        badge: 'Bestseller',
        desc: 'Whole tender spring chicken steeped overnight in mustard oil, Kashmiri deghi mirch, and hung curd, roasted to smoky perfection over glowing coals.',
      },
      {
        id: 'gr-2',
        name: 'Chicken Malai Tikka',
        veg: false,
        badge: "Chef's Pick",
        desc: 'Melt-in-mouth chicken chunks steeped in fresh cream, roasted cashew paste, and green cardamom, gently charred to juicy succulence.',
      },
      {
        id: 'gr-3',
        name: 'Tandoori Mushroom Tikka',
        veg: true,
        desc: 'Plump button mushrooms filled with herb cheese, drenched in a fragrant ajwain-spiced yoghurt marinade and clay-oven grilled.',
      },
      {
        id: 'gr-4',
        name: 'Grilled Fish Lemon Herb',
        veg: false,
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
        name: 'Chicken Dum Biryani',
        veg: false,
        badge: 'Signature',
        desc: 'Our critically acclaimed masterpiece: succulent marinated chicken sealed in an earthenware handi with aged basmati, sweet mint, and rose water mist.',
      },
      {
        id: 'rb-2',
        name: 'Mutton Dum Biryani',
        veg: false,
        badge: 'Bestseller',
        desc: 'Prime cuts of tender goat slow-cooked on dum with fragrant long-grain basmati, golden fried shallots, and royal Kashmiri saffron strands.',
      },
      {
        id: 'rb-3',
        name: 'Veg Dum Biryani',
        veg: true,
        desc: 'Fragrant aged basmati rice layered with garden vegetables, caramelized onions, fresh mint, and saffron milk, sealed under earthen dum.',
      },
      {
        id: 'rb-4',
        name: 'Jeera Rice',
        veg: true,
        desc: 'Aged long-grain basmati rice tempered in pure desi ghee with roasted cumin seeds and fresh coriander leaves.',
      },
      {
        id: 'rb-5',
        name: 'Steamed Basmati Rice',
        veg: true,
        desc: 'Pristine, fluffy long grains of aged royal basmati rice, steamed to fragrant perfection to complement rich gravies.',
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
        veg: true,
        badge: 'Signature',
        desc: 'Prized black urad lentils and kidney beans slow-simmered over smoldering coals for thirty-six hours, enriched with hand-churned white butter and velvety cream.',
      },
      {
        id: 'dal-2',
        name: 'Dal Tadka',
        veg: true,
        badge: 'Bestseller',
        desc: 'Yellow toor lentils slow-cooked with turmeric, crowned with a sizzling ghee tempering of cumin, golden garlic, and whole dried red chillies.',
      },
      {
        id: 'dal-3',
        name: 'Dal Fry',
        veg: true,
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
        name: 'Classic Crunchy Veg Burger',
        veg: true,
        desc: 'A spiced golden potato and garden pea patty topped with crisp iceberg lettuce, sliced plum tomatoes, and our signature herb emulsion in a toasted sesame bun.',
      },
      {
        id: 'bg-2',
        name: 'Mehfil Crispy Chicken Burger',
        veg: false,
        badge: 'Bestseller',
        desc: 'Crispy golden buttermilk-fried chicken fillet blanketed in melted cheddar, spicy paprika relish, and crunchy slaw in a butter-toasted brioche bun.',
      },
      {
        id: 'bg-3',
        name: 'BBQ Paneer Burger',
        veg: true,
        desc: 'A thick slab of fresh cottage cheese grilled with smoky barbecue glaze, topped with caramelized shallots and molten cheese.',
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
        veg: true,
        desc: 'A classic thin-crust masterpiece smothered in sweet crushed tomato sauce, fresh buffalo mozzarella, and fragrant garden basil leaves.',
      },
      {
        id: 'pz-2',
        name: 'Farmhouse Veg Pizza',
        veg: true,
        badge: 'Bestseller',
        desc: 'Hand-stretched crust loaded with crisp bell peppers, red onions, button mushrooms, sweet golden corn, black olives, and rich mozzarella.',
      },
      {
        id: 'pz-3',
        name: 'Tandoori Chicken Tikka Pizza',
        veg: false,
        badge: 'Signature',
        desc: 'Smoky clay-oven chicken tikka chunks, pickled onions, chopped coriander, and melted mozzarella over a spiced makhani tomato reduction.',
      },
      {
        id: 'pz-4',
        name: 'Peri Peri Paneer Pizza',
        veg: true,
        desc: 'Zesty peri-peri tossed cottage cheese, fiery jalapeños, sweet paprika peppers, and a double layer of golden melted mozzarella cheese.',
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
        name: 'Bombay Grilled Sandwich',
        veg: true,
        badge: 'Favourite',
        desc: 'Tri-layered toasted bread layered with spiced potato masala, crisp cucumber, beetroot, mint-coriander chutney, and a river of molten cheese.',
      },
      {
        id: 'sw-2',
        name: 'Classic Chicken Club Sandwich',
        veg: false,
        badge: 'Bestseller',
        desc: 'Double-decked toasted artisan bread with tender roasted chicken slices, farm egg, crisp garden lettuce, juicy tomatoes, and garlic mayonnaise.',
      },
      {
        id: 'sw-3',
        name: 'Corn & Cheese Grilled Sandwich',
        veg: true,
        desc: 'Sweet golden corn pearls folded into creamy béchamel and sharp cheddar cheese, griddled golden brown until molten and crisp.',
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
        veg: true,
        desc: 'Durum wheat penne tossed in a spirited reduction of slow-simmered San Marzano tomatoes, roasted garlic, and fiery red pepper flakes.',
      },
      {
        id: 'ps-2',
        name: 'Fettuccine Alfredo',
        veg: true,
        badge: "Chef's Pick",
        desc: 'Silky ribbons of pasta enrobed in a decadent sauce of churned farm butter, heavy cream, cracked pepper, and aged parmesan with sautéed mushrooms.',
      },
      {
        id: 'ps-3',
        name: 'Chicken Penne Pink Sauce',
        veg: false,
        badge: 'Signature',
        desc: 'Tender morsels of chicken and penne tossed in a harmonious marriage of ripe tomato coulis and luxurious garlic cream, crowned with fresh basil.',
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
        veg: true,
        badge: 'Favourite',
        desc: 'Bold South Indian espresso decoction chilled and whipped with whole creamy milk, crowned with rich Madagascar vanilla bean cream.',
      },
      {
        id: 'bv-2',
        name: 'Royal Mango Lassi',
        veg: true,
        desc: 'Sun-drenched Alphonso mangoes churned with thick set curd, perfumed with crushed green cardamom and slivered pistachios.',
      },
      {
        id: 'bv-3',
        name: 'Virgin Mint Mojito',
        veg: true,
        desc: 'Fresh garden mint leaves and tart lime muddled with sparkling fizz over crushed mountain ice—a timeless, refreshing palate cleanser.',
      },
      {
        id: 'bv-4',
        name: 'Rooftop Watermelon Cooler',
        veg: true,
        badge: 'Signature',
        desc: 'Mehfil’s signature rooftop libation: freshly cold-pressed watermelon, bruised sweet basil, and mountain lime topped with cooling soda.',
      },
      {
        id: 'bv-5',
        name: 'Masala Kulhad Chai',
        veg: true,
        desc: 'Assam tea leaves slow-boiled with whole milk, crushed ginger root, holy tulsi, and aromatic green cardamom pods.',
      },
      {
        id: 'bv-6',
        name: 'Blue Lagoon Mocktail',
        veg: true,
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
        veg: true,
        desc: 'Hand-stretched leavened flatbread slapped onto the curved clay of the tandoor, pulled piping hot and bathed in churned farm butter.',
      },
      {
        id: 'br-2',
        name: 'Garlic Naan',
        veg: true,
        badge: 'Bestseller',
        desc: 'Fragrant tandoor-baked bread studded with roasted garlic cloves and cilantro leaves, glistened with golden desi ghee.',
      },
      {
        id: 'br-3',
        name: 'Cheese Garlic Naan',
        veg: true,
        badge: "Chef's Pick",
        desc: 'Soft leavened dough stuffed with rich artisanal cheese and garlic, toasted until bubbling and finished with fine fresh herbs.',
      },
      {
        id: 'br-4',
        name: 'Tandoori Roti (Plain/Butter)',
        veg: true,
        desc: 'Traditional stone-ground whole-wheat flatbread cooked crisp over glowing tandoor coals, brushed with churned butter.',
      },
      {
        id: 'br-5',
        name: 'Laccha Paratha',
        veg: true,
        desc: 'Multi-layered, spiral-rolled whole-wheat bread baked to an airy, crispy crunch that flakes into delicate golden ribbons.',
      },
      {
        id: 'br-6',
        name: 'Rumali Roti',
        veg: true,
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
        name: 'Crispy French Fries (Plain / Peri Peri)',
        veg: true,
        desc: 'Golden-fried Russet potato batons tossed in sea salt or dusted with fiery house-blended peri-peri spices.',
      },
      {
        id: 'sd-2',
        name: 'Loaded Cheese Nachos',
        veg: true,
        badge: 'Bestseller',
        desc: 'Crisp stone-ground corn tortilla chips blanketed in warm spiced cheese sauce, fresh jalapeños, and tangy tomato salsa.',
      },
      {
        id: 'sd-3',
        name: 'Boondi Raita / Mix Veg Raita',
        veg: true,
        desc: 'Chilled artisanal yoghurt whisked with crisp chickpea droplets or garden vegetables, roasted cumin, and black rock salt.',
      },
      {
        id: 'sd-4',
        name: 'Masala Papad (Fried / Roasted)',
        veg: true,
        desc: 'Crispy lentil cracker topped with finely diced onions, ripe tomatoes, fresh green chillies, coriander, and tangy chaat masala.',
      },
    ],
  },
];
