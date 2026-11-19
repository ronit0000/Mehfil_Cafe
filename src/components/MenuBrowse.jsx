import { menuHome, menuRoutes } from '../data/menuRoutes.js';

const categoryLinkClass = 'rounded-full border px-4 py-2.5 text-sm transition-colors';
const dietaryLabels = {
  veg: { text: 'Vegetarian', color: 'text-emerald-300' },
  'non-veg': { text: 'Non-vegetarian', color: 'text-rose-300' },
  both: { text: 'Vegetarian & non-vegetarian options', color: 'text-mehfil-gold' },
};

function CategoryCards() {
  return (
    <nav aria-label="Menu categories">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {menuRoutes.map(({ path, label, page }) => (
          <li key={path}>
            <a
              href={path}
              className="flex h-full items-center justify-between gap-4 rounded-2xl border border-mehfil-gold/20 bg-mehfil-charcoal px-5 py-5 transition-colors hover:border-mehfil-gold hover:bg-mehfil-warm sm:px-6"
            >
              <span>
                <span className="block font-serif text-xl font-semibold text-mehfil-cream">{label}</span>
                <span className="mt-1 block text-sm text-mehfil-cream/70">
                  {page.items.length} {page.items.length === 1 ? 'item' : 'items'}
                </span>
              </span>
              <span aria-hidden="true" className="text-xl text-mehfil-gold">→</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function CategoryLinks({ currentPath }) {
  return (
    <nav aria-labelledby="menu-categories-title" className="mt-14 border-t border-mehfil-gold/20 pt-8">
      <h2 id="menu-categories-title" className="mb-5 font-serif text-2xl text-mehfil-cream">Browse the menu</h2>
      <ul className="flex flex-wrap gap-2">
        {menuRoutes.map(({ path, label }) => (
          <li key={path}>
            <a
              href={path}
              aria-current={path === currentPath ? 'page' : undefined}
              className={`block ${categoryLinkClass} ${path === currentPath
                ? 'border-mehfil-gold bg-mehfil-gold text-mehfil-dark'
                : 'border-mehfil-gold/30 text-mehfil-cream hover:border-mehfil-gold hover:text-mehfil-gold'}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MenuItems({ items }) {
  return (
    <ul role="list" className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const dietary = dietaryLabels[item.dietaryType];

        return (
          <li
            key={item.id}
            id={`dish-${item.id}`}
            className="scroll-mt-8 rounded-2xl border border-mehfil-gold/20 bg-mehfil-charcoal p-5 target:border-mehfil-gold sm:p-6"
          >
            <h2 className="font-serif text-xl font-semibold text-mehfil-cream">{item.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mehfil-cream/80">{item.desc}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium">
              {dietary && <span className={dietary.color}>{dietary.text}</span>}
              {item.badge && <span className="text-mehfil-gold">{item.badge}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function MenuBrowse({ menuPage = null }) {
  return (
    <>
      <header className="border-b border-mehfil-gold/20 bg-mehfil-charcoal">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-2 rounded-lg text-mehfil-cream hover:text-mehfil-gold sm:gap-3">
            <img src="/images/logo_circle.jpg" width="40" height="40" alt="" className="h-10 w-10 shrink-0 rounded-full" />
            <span className="font-serif text-sm font-semibold sm:text-lg">Mehfil Rooftop Cafe &amp; Restro</span>
          </a>
          <a href="/#reservation" className="shrink-0 rounded-full border border-mehfil-gold/60 px-3 py-2.5 text-xs font-semibold text-mehfil-gold transition-colors hover:bg-mehfil-gold hover:text-mehfil-dark sm:px-5 sm:text-sm">
            Reserve a Table
          </a>
        </div>
      </header>

      <main className="bg-[radial-gradient(ellipse_at_top,_#2A2015,_#0A0A0A_32rem)]">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-mehfil-cream/70">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li><a href="/" className="text-mehfil-gold hover:underline">Home</a></li>
              <li aria-hidden="true">/</li>
              <li>
                {menuPage ? (
                  <a href={menuHome.path} className="text-mehfil-gold hover:underline">Menu</a>
                ) : (
                  <span aria-current="page">Menu</span>
                )}
              </li>
              {menuPage && (
                <>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{menuPage.label}</li>
                </>
              )}
            </ol>
          </nav>

          <div className="mb-8 sm:mb-10">
            <h1 className="section-heading text-pretty">{menuPage ? `${menuPage.label} in Berhampur` : 'Mehfil Menu in Berhampur'}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-mehfil-cream/80">
              {menuPage ? menuPage.description : menuHome.description}
            </p>
          </div>

          {menuPage ? (
            <>
              <MenuItems items={menuPage.page.items} />
              <CategoryLinks currentPath={menuPage.path} />
            </>
          ) : (
            <CategoryCards />
          )}
        </div>
      </main>

      <footer className="border-t border-mehfil-gold/20 bg-mehfil-charcoal">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
          <span className="font-serif text-lg text-mehfil-cream">Mehfil Rooftop Cafe &amp; Restro</span>
          <a href="/#contact" className="text-mehfil-gold hover:underline">Hours, contact and directions</a>
        </div>
      </footer>
    </>
  );
}
