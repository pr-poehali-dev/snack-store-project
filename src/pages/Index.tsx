import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/ece62345-0ec3-4424-9f92-15fb3d2f395d/files/14daf86b-3c89-43fe-9927-fe22e955d0f4.jpg";

const PRODUCTS = [
  {
    id: 1, name: "Фуэт иберийский", category: "Мясные деликатесы",
    price: 1890, oldPrice: 2200, weight: "150г",
    badge: "Хит", image: HERO_IMAGE,
    desc: "Выдержанная колбаса из свинины иберийской породы с пряным ароматом",
  },
  {
    id: 2, name: "Тартюф де Бургонь", category: "Сыры",
    price: 2450, oldPrice: null, weight: "200г",
    badge: "Новинка", image: HERO_IMAGE,
    desc: "Мягкий французский сыр с трюфелем, нежная текстура и аромат леса",
  },
  {
    id: 3, name: "Микс орехов Deluxe", category: "Орехи и снеки",
    price: 890, oldPrice: null, weight: "250г",
    badge: null, image: HERO_IMAGE,
    desc: "Отборные кешью, макадамия, пекан и миндаль с морской солью",
  },
  {
    id: 4, name: "Оливки Каламата", category: "Средиземноморье",
    price: 650, oldPrice: 780, weight: "180г",
    badge: "Скидка", image: HERO_IMAGE,
    desc: "Греческие оливки в оливковом масле с розмарином и тимьяном",
  },
  {
    id: 5, name: "Крекеры с пармезаном", category: "Выпечка",
    price: 490, oldPrice: null, weight: "120г",
    badge: null, image: HERO_IMAGE,
    desc: "Хрустящие крекеры ручной работы с 24-месячным пармезаном",
  },
  {
    id: 6, name: "Икра Белуги", category: "Морепродукты",
    price: 8900, oldPrice: null, weight: "50г",
    badge: "Premium", image: HERO_IMAGE,
    desc: "Черная икра осетровых рыб высшего сорта, производство России",
  },
];

const CATEGORIES = ["Все", "Мясные деликатесы", "Сыры", "Орехи и снеки", "Средиземноморье", "Выпечка", "Морепродукты"];

const ORDERS = [
  { id: "SVR-2841", date: "08 мая 2026", status: "Доставлен", total: 4230, items: 3 },
  { id: "SVR-2799", date: "02 мая 2026", status: "Доставлен", total: 2890, items: 2 },
  { id: "SVR-2751", date: "24 апр 2026", status: "Доставлен", total: 6100, items: 5 },
];

type Page = "home" | "catalog" | "about" | "delivery" | "contacts" | "account";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [accountTab, setAccountTab] = useState<"profile" | "orders" | "favorites" | "addresses">("profile");
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginView, setLoginView] = useState<"login" | "register">("login");
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (id: number) => setCart(prev => [...prev, id]);
  const removeFromCart = (id: number) => setCart(prev => {
    const i = prev.indexOf(id);
    return i !== -1 ? [...prev.slice(0, i), ...prev.slice(i + 1)] : prev;
  });
  const toggleFavorite = (id: number) => setFavorites(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  );

  const cartTotal = PRODUCTS.reduce((sum, p) => {
    const count = cart.filter(id => id === p.id).length;
    return sum + p.price * count;
  }, 0);

  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const navItems: { label: string; page: Page }[] = [
    { label: "Главная", page: "home" },
    { label: "Каталог", page: "catalog" },
    { label: "О компании", page: "about" },
    { label: "Доставка", page: "delivery" },
    { label: "Контакты", page: "contacts" },
  ];

  const navigate = (p: Page) => {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="font-cormorant text-2xl font-light tracking-[0.3em] text-gold uppercase">
            SAVEUR
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(n => (
              <button
                key={n.page}
                onClick={() => navigate(n.page)}
                className={`font-golos text-xs tracking-[0.15em] uppercase transition-colors ${
                  page === n.page ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative text-muted-foreground hover:text-gold transition-colors">
              <Icon name="ShoppingBag" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-background rounded-full text-[10px] font-golos font-medium flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => navigate("account")} className={`transition-colors ${page === "account" ? "text-gold" : "text-muted-foreground hover:text-gold"}`}>
              <Icon name="User" size={20} />
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-muted-foreground hover:text-gold transition-colors">
              <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-background animate-slide-down">
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map(n => (
                <button key={n.page} onClick={() => navigate(n.page)} className="text-left font-golos text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors">
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col animate-slide-down">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h3 className="font-cormorant text-2xl font-light">Корзина</h3>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-gold transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <Icon name="ShoppingBag" size={48} />
                  <p className="font-golos">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {PRODUCTS.filter(p => [...new Set(cart)].includes(p.id)).map(p => {
                    const count = cart.filter(id => id === p.id).length;
                    return (
                      <div key={p.id} className="flex gap-4 pb-4 border-b border-border">
                        <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-golos text-sm font-medium">{p.name}</p>
                          <p className="font-golos text-xs text-muted-foreground mt-0.5">{p.weight}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeFromCart(p.id)} className="w-6 h-6 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                                <Icon name="Minus" size={12} />
                              </button>
                              <span className="font-golos text-sm w-4 text-center">{count}</span>
                              <button onClick={() => addToCart(p.id)} className="w-6 h-6 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                                <Icon name="Plus" size={12} />
                              </button>
                            </div>
                            <p className="font-cormorant text-lg text-gold">{(p.price * count).toLocaleString()} ₽</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="font-golos text-sm text-muted-foreground">Итого</span>
                  <span className="font-cormorant text-2xl text-gold">{cartTotal.toLocaleString()} ₽</span>
                </div>
                <button className="w-full py-3 bg-gold text-background font-golos text-sm tracking-widest uppercase hover:bg-gold-light transition-colors">
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAGES */}
      <main className="pt-16">
        {page === "home" && <HomePage navigate={navigate} addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} />}
        {page === "catalog" && <CatalogPage activeCategory={activeCategory} setActiveCategory={setActiveCategory} filteredProducts={filteredProducts} addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} />}
        {page === "about" && <AboutPage />}
        {page === "delivery" && <DeliveryPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "account" && (
          <AccountPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            loginView={loginView}
            setLoginView={setLoginView}
            accountTab={accountTab}
            setAccountTab={setAccountTab}
            orders={ORDERS}
            favorites={favorites}
            navigate={navigate}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-cormorant text-2xl text-gold mb-3">SAVEUR</h4>
              <p className="font-golos text-xs text-muted-foreground leading-relaxed">
                Премиальные закуски и деликатесы со всего мира для ценителей настоящего вкуса
              </p>
            </div>
            <div>
              <h5 className="font-golos text-xs tracking-widest uppercase text-foreground mb-4">Навигация</h5>
              <div className="space-y-2">
                {navItems.map(n => (
                  <button key={n.page} onClick={() => navigate(n.page)} className="block font-golos text-xs text-muted-foreground hover:text-gold transition-colors">
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-golos text-xs tracking-widest uppercase text-foreground mb-4">Контакты</h5>
              <div className="space-y-2 font-golos text-xs text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>hello@saveur.ru</p>
                <p>Москва, Тверская ул. 12</p>
              </div>
            </div>
            <div>
              <h5 className="font-golos text-xs tracking-widest uppercase text-foreground mb-4">Соцсети</h5>
              <div className="flex gap-3">
                {["Instagram", "Send", "Youtube"].map(icon => (
                  <button key={icon} className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all">
                    <Icon name={icon} size={14} fallback="Link" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="divider-gold mb-6" />
          <p className="font-golos text-xs text-muted-foreground text-center">© 2026 SAVEUR. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────
function HomePage({ navigate, addToCart, cart, favorites, toggleFavorite }: {
  navigate: (p: Page) => void;
  addToCart: (id: number) => void;
  cart: number[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative container mx-auto px-6 max-w-2xl">
          <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold mb-6 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: "forwards" }}>
            Искусство вкуса
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light leading-none mb-6 opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: "forwards" }}>
            Премиум<br />
            <span className="italic text-gold">закуски</span><br />
            для гурманов
          </h1>
          <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-10 max-w-md opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: "forwards" }}>
            Деликатесы из лучших регионов мира. Тщательный отбор, строгий контроль качества, доставка по Москве и России.
          </p>
          <div className="flex gap-4 opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: "forwards" }}>
            <button onClick={() => navigate("catalog")} className="px-8 py-3 bg-gold text-background font-golos text-xs tracking-widest uppercase hover:bg-gold-light transition-colors">
              В каталог
            </button>
            <button onClick={() => navigate("about")} className="px-8 py-3 border border-gold text-gold font-golos text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all">
              О нас
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-golos text-[10px] tracking-widest uppercase">Листать вниз</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "500+", label: "Товаров в каталоге" },
              { num: "12", label: "Стран-производителей" },
              { num: "15 000+", label: "Довольных клиентов" },
              { num: "2 часа", label: "Доставка по Москве" },
            ].map(s => (
              <div key={s.label}>
                <p className="font-cormorant text-4xl text-gold">{s.num}</p>
                <p className="font-golos text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">Подборка</p>
            <h2 className="font-cormorant text-5xl font-light">Избранное</h2>
          </div>
          <button onClick={() => navigate("catalog")} className="font-golos text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors flex items-center gap-2">
            Все товары <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="relative overflow-hidden my-8">
        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-background/75 flex items-center justify-center">
          <div className="text-center">
            <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold mb-3">Специальное предложение</p>
            <h3 className="font-cormorant text-4xl md:text-6xl italic">Бесплатная доставка<br />от 3 000 ₽</h3>
            <button onClick={() => navigate("catalog")} className="mt-6 px-8 py-3 border border-gold text-gold font-golos text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all">
              Сделать заказ
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-16">
        <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">Ассортимент</p>
        <h2 className="font-cormorant text-5xl font-light mb-10">Категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.filter(c => c !== "Все").map(cat => (
            <button key={cat} onClick={() => navigate("catalog")} className="relative h-32 bg-card border border-border hover:border-gold transition-all group overflow-hidden">
              <img src={HERO_IMAGE} alt={cat} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center justify-center h-full">
                <span className="font-cormorant text-xl font-light">{cat}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CATALOG PAGE ──────────────────────────────────────────
function CatalogPage({ activeCategory, setActiveCategory, filteredProducts, addToCart, cart, favorites, toggleFavorite }: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  filteredProducts: typeof PRODUCTS;
  addToCart: (id: number) => void;
  cart: number[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">Магазин</p>
        <h1 className="font-cormorant text-5xl font-light">Каталог</h1>
      </div>
      <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-border">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 font-golos text-xs tracking-widest uppercase transition-all border ${
              activeCategory === cat ? "bg-gold text-background border-gold" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────
function ProductCard({ product: p, addToCart, cart, favorites, toggleFavorite, delay = 0 }: {
  product: typeof PRODUCTS[0];
  addToCart: (id: number) => void;
  cart: number[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  delay?: number;
}) {
  const inCart = cart.includes(p.id);
  const isFav = favorites.includes(p.id);
  return (
    <div className="bg-card border border-border card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}>
      <div className="relative overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
        {p.badge && (
          <span className={`absolute top-3 left-3 font-golos text-[10px] tracking-widest uppercase px-2 py-1 ${p.badge === "Premium" ? "bg-gold text-background" : "bg-background/90 text-foreground"}`}>
            {p.badge}
          </span>
        )}
        <button onClick={() => toggleFavorite(p.id)} className="absolute top-3 right-3 w-8 h-8 bg-background/80 flex items-center justify-center hover:bg-background transition-all">
          <Icon name="Heart" size={16} className={isFav ? "text-gold" : "text-muted-foreground"} />
        </button>
      </div>
      <div className="p-5">
        <p className="font-golos text-[10px] tracking-widest uppercase text-gold mb-1">{p.category}</p>
        <h3 className="font-cormorant text-xl font-medium mb-2">{p.name}</h3>
        <p className="font-golos text-xs text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
        <p className="font-golos text-xs text-muted-foreground mb-4">{p.weight}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-cormorant text-2xl text-gold">{p.price.toLocaleString()} ₽</span>
            {p.oldPrice && (
              <span className="font-golos text-xs text-muted-foreground line-through ml-2">{p.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          <button
            onClick={() => addToCart(p.id)}
            className={`px-4 py-2 font-golos text-xs tracking-widest uppercase transition-all ${
              inCart ? "bg-gold text-background" : "border border-gold text-gold hover:bg-gold hover:text-background"
            }`}
          >
            {inCart ? "В корзине" : "Купить"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────
function AboutPage() {
  return (
    <div>
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative container mx-auto px-6 h-full flex items-end pb-10">
          <div>
            <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">История</p>
            <h1 className="font-cormorant text-5xl font-light">О компании</h1>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-cormorant text-4xl font-light mb-6">Мы — <span className="italic text-gold">кураторы вкуса</span></h2>
            <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-4">
              SAVEUR основан в 2018 году командой гастрономических энтузиастов, которые хотели сделать лучшие деликатесы мира доступными в России. Мы лично объезжаем фермы, производства и рынки в поисках уникальных продуктов.
            </p>
            <p className="font-golos text-sm text-muted-foreground leading-relaxed">
              Каждый продукт в нашем каталоге прошёл строгий отбор. Мы работаем только с производителями, которые разделяют наши ценности: натуральные ингредиенты, традиционные методы производства, уважение к продукту.
            </p>
          </div>
          <div className="relative">
            <img src={HERO_IMAGE} alt="О компании" className="w-full h-72 object-cover" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold opacity-30" />
          </div>
        </div>
        <div className="divider-gold mb-16" />
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: "Award", title: "Качество", text: "Каждый товар проходит проверку перед попаданием в каталог. Никаких компромиссов." },
            { icon: "Globe", title: "Происхождение", text: "Мы знаем историю каждого продукта — от фермы до вашего стола." },
            { icon: "Heart", title: "Страсть", text: "Мы сами едим то, что продаём. Это не просто бизнес — это наш образ жизни." },
          ].map(v => (
            <div key={v.title} className="border border-border p-8 hover:border-gold transition-colors">
              <Icon name={v.icon} size={32} className="text-gold mb-4" fallback="Star" />
              <h3 className="font-cormorant text-2xl mb-3">{v.title}</h3>
              <p className="font-golos text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border p-10 text-center">
          <p className="font-cormorant text-5xl italic text-gold mb-4">"</p>
          <p className="font-cormorant text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
            Хороший вкус — это не роскошь. Это образ мышления.
          </p>
          <p className="font-golos text-xs tracking-widest uppercase text-muted-foreground mt-4">— Основатель SAVEUR</p>
        </div>
      </div>
    </div>
  );
}

// ─── DELIVERY PAGE ─────────────────────────────────────────
function DeliveryPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">Логистика</p>
        <h1 className="font-cormorant text-5xl font-light">Доставка</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: "Zap", title: "Экспресс", subtitle: "2–4 часа", price: "от 490 ₽", desc: "По Москве в пределах МКАД. Заказы до 16:00 в день доставки." },
          { icon: "Truck", title: "Стандарт", subtitle: "На следующий день", price: "от 290 ₽", desc: "По Москве и ближнему Подмосковью. Временной слот на выбор." },
          { icon: "Package", title: "По России", subtitle: "3–7 дней", price: "от 390 ₽", desc: "СДЭК или Почта России. Бережная упаковка с термовкладышами." },
        ].map(d => (
          <div key={d.title} className="border border-border p-8 hover:border-gold transition-colors">
            <Icon name={d.icon} size={32} className="text-gold mb-4" fallback="Package" />
            <h3 className="font-cormorant text-2xl mb-1">{d.title}</h3>
            <p className="font-golos text-sm text-muted-foreground mb-3">{d.subtitle}</p>
            <p className="font-cormorant text-3xl text-gold mb-4">{d.price}</p>
            <p className="font-golos text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
      <div className="divider-gold mb-16" />
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-cormorant text-3xl mb-6">Условия доставки</h2>
          <div className="space-y-4">
            {[
              "Бесплатная доставка при заказе от 3 000 ₽ по Москве",
              "Минимальная сумма заказа — 500 ₽",
              "Деликатесы упаковываются в изотермические контейнеры",
              "Уведомления о статусе заказа по SMS и email",
              "Самовывоз: Москва, Тверская ул. 12 (пн–вс 10:00–22:00)",
            ].map(item => (
              <div key={item} className="flex gap-3 items-start">
                <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                <p className="font-golos text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-cormorant text-3xl mb-6">Зоны доставки</h2>
          <div className="border border-border">
            {[
              ["Москва (в пределах МКАД)", "Экспресс / Стандарт"],
              ["Подмосковье (до 30 км)", "Стандарт"],
              ["Остальная Россия", "Транспортная компания"],
              ["Международная", "По запросу"],
            ].map(([zone, type]) => (
              <div key={zone} className="flex justify-between items-center px-5 py-3 border-b border-border last:border-0">
                <span className="font-golos text-sm">{zone}</span>
                <span className="font-golos text-xs text-gold">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACTS PAGE ─────────────────────────────────────────
function ContactsPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-golos text-xs tracking-widest uppercase text-gold mb-2">Связь</p>
        <h1 className="font-cormorant text-5xl font-light">Контакты</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="space-y-8 mb-10">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", sub: "Пн–Вс с 9:00 до 21:00" },
              { icon: "Mail", label: "Email", value: "hello@saveur.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", label: "Адрес", value: "Москва, Тверская ул. 12", sub: "Самовывоз и шоурум" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Вс 10:00–22:00", sub: "Без выходных" },
            ].map(c => (
              <div key={c.label} className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} size={18} className="text-gold" fallback="Info" />
                </div>
                <div>
                  <p className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground">{c.label}</p>
                  <p className="font-cormorant text-xl mt-0.5">{c.value}</p>
                  <p className="font-golos text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-cormorant text-3xl mb-6">Написать нам</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                <input className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Ваше имя" />
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Телефон</label>
                <input className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
            <div>
              <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
              <input className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
              <textarea className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors resize-none h-32" placeholder="Ваш вопрос или пожелание..." />
            </div>
            <button type="button" className="px-8 py-3 bg-gold text-background font-golos text-xs tracking-widest uppercase hover:bg-gold-light transition-colors">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ──────────────────────────────────────────
function AccountPage({ isLoggedIn, setIsLoggedIn, loginView, setLoginView, accountTab, setAccountTab, orders, favorites, navigate }: {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  loginView: "login" | "register";
  setLoginView: (v: "login" | "register") => void;
  accountTab: "profile" | "orders" | "favorites" | "addresses";
  setAccountTab: (t: "profile" | "orders" | "favorites" | "addresses") => void;
  orders: typeof ORDERS;
  favorites: number[];
  navigate: (p: Page) => void;
}) {
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-cormorant text-5xl font-light mb-2">
              {loginView === "login" ? "Войти" : "Регистрация"}
            </h1>
            <p className="font-golos text-xs text-muted-foreground">
              {loginView === "login" ? "Войдите в личный кабинет SAVEUR" : "Создайте аккаунт SAVEUR"}
            </p>
          </div>
          <div className="flex border border-border mb-8">
            <button onClick={() => setLoginView("login")} className={`flex-1 py-3 font-golos text-xs tracking-widest uppercase transition-all ${loginView === "login" ? "bg-gold text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Войти
            </button>
            <button onClick={() => setLoginView("register")} className={`flex-1 py-3 font-golos text-xs tracking-widest uppercase transition-all ${loginView === "register" ? "bg-gold text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Регистрация
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            {loginView === "register" && (
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                <input className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Ваше имя" />
              </div>
            )}
            <div>
              <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
              <input type="email" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Пароль</label>
              <input type="password" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
            </div>
            {loginView === "register" && (
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Телефон</label>
                <input className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="+7 (___) ___-__-__" />
              </div>
            )}
            {loginView === "login" && (
              <div className="text-right">
                <button type="button" className="font-golos text-xs text-gold hover:text-gold-light transition-colors">Забыли пароль?</button>
              </div>
            )}
            <button type="submit" className="w-full py-3 bg-gold text-background font-golos text-xs tracking-widest uppercase hover:bg-gold-light transition-colors mt-2">
              {loginView === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>
          <div className="relative my-6">
            <div className="divider-gold" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 font-golos text-xs text-muted-foreground">или</span>
          </div>
          <button type="button" className="w-full py-3 border border-border text-foreground font-golos text-xs tracking-widest uppercase hover:border-gold transition-all flex items-center justify-center gap-3">
            <Icon name="Mail" size={16} /> Войти через Google
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile" as const, label: "Профиль", icon: "User" },
    { id: "orders" as const, label: "Заказы", icon: "Package" },
    { id: "favorites" as const, label: "Избранное", icon: "Heart" },
    { id: "addresses" as const, label: "Адреса", icon: "MapPin" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">Личный кабинет</p>
          <h1 className="font-cormorant text-4xl font-light">Александр Петров</h1>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="font-golos text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors flex items-center gap-2">
          <Icon name="LogOut" size={14} /> Выйти
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Заказов", value: "12", icon: "ShoppingBag" },
          { label: "Сумма покупок", value: "47 300 ₽", icon: "CreditCard" },
          { label: "Бонусов", value: "2 365", icon: "Star" },
          { label: "Уровень", value: "Гурман", icon: "Award" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={s.icon} size={16} className="text-gold" fallback="Info" />
              <span className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-cormorant text-2xl text-gold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setAccountTab(t.id)}
            className={`flex items-center gap-2 px-6 py-3 font-golos text-xs tracking-widest uppercase transition-all border-b-2 -mb-px ${
              accountTab === t.id ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={t.icon} size={14} fallback="User" />
            <span className="hidden md:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {accountTab === "profile" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-cormorant text-2xl mb-6">Личные данные</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                  <input defaultValue="Александр" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Фамилия</label>
                  <input defaultValue="Петров" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                <input defaultValue="alex@petrov.ru" type="email" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Телефон</label>
                <input defaultValue="+7 (916) 555-22-33" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Дата рождения</label>
                <input defaultValue="1990-05-15" type="date" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <button type="button" className="px-8 py-3 bg-gold text-background font-golos text-xs tracking-widest uppercase hover:bg-gold-light transition-colors">
                Сохранить
              </button>
            </form>
          </div>
          <div>
            <h2 className="font-cormorant text-2xl mb-6">Смена пароля</h2>
            <form className="space-y-4">
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Текущий пароль</label>
                <input type="password" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Новый пароль</label>
                <input type="password" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Подтверждение</label>
                <input type="password" className="w-full bg-card border border-border px-4 py-3 font-golos text-sm focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
              </div>
              <button type="button" className="px-8 py-3 border border-gold text-gold font-golos text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all">
                Изменить пароль
              </button>
            </form>
            <div className="mt-8 border border-border p-6">
              <h3 className="font-cormorant text-xl mb-4">Уведомления</h3>
              <div className="space-y-3">
                {["Email о статусе заказа", "SMS при доставке", "Акции и скидки", "Новинки каталога"].map(notif => (
                  <label key={notif} className="flex items-center justify-between cursor-pointer">
                    <span className="font-golos text-sm">{notif}</span>
                    <div className="relative inline-flex items-center">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-gold transition-colors cursor-pointer" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5 pointer-events-none" />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {accountTab === "orders" && (
        <div>
          <h2 className="font-cormorant text-2xl mb-6">История заказов</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-border p-6 hover:border-gold transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-cormorant text-xl">{order.id}</p>
                      <span className="font-golos text-[10px] tracking-widest uppercase px-2 py-1 bg-card text-gold border border-gold/30">
                        {order.status}
                      </span>
                    </div>
                    <p className="font-golos text-xs text-muted-foreground">{order.date} · {order.items} позиции</p>
                  </div>
                  <div className="text-right">
                    <p className="font-cormorant text-2xl text-gold">{order.total.toLocaleString()} ₽</p>
                    <button type="button" className="font-golos text-xs text-muted-foreground hover:text-gold transition-colors mt-1">
                      Повторить заказ →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {accountTab === "favorites" && (
        <div>
          <h2 className="font-cormorant text-2xl mb-6">Избранное</h2>
          {favorites.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="Heart" size={48} className="mx-auto mb-4" />
              <p className="font-cormorant text-2xl mb-2">Пока пусто</p>
              <p className="font-golos text-sm">Добавляйте товары в избранное через каталог</p>
              <button type="button" onClick={() => navigate("catalog")} className="mt-4 px-6 py-2 border border-gold text-gold font-golos text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all">
                В каталог
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.filter(p => favorites.includes(p.id)).map(p => (
                <div key={p.id} className="bg-card border border-border p-5 hover:border-gold transition-colors">
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-4" />
                  <p className="font-cormorant text-xl mb-1">{p.name}</p>
                  <p className="font-cormorant text-xl text-gold">{p.price.toLocaleString()} ₽</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {accountTab === "addresses" && (
        <div>
          <h2 className="font-cormorant text-2xl mb-6">Адреса доставки</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { label: "Дом", address: "Москва, ул. Арбат 25, кв. 12", main: true },
              { label: "Работа", address: "Москва, Тверская ул. 6, оф. 301", main: false },
            ].map(addr => (
              <div key={addr.label} className={`border p-6 relative ${addr.main ? "border-gold" : "border-border"}`}>
                {addr.main && (
                  <span className="absolute top-3 right-3 font-golos text-[10px] tracking-widest uppercase text-gold">Основной</span>
                )}
                <p className="font-cormorant text-xl mb-2">{addr.label}</p>
                <p className="font-golos text-sm text-muted-foreground">{addr.address}</p>
                <div className="flex gap-3 mt-4">
                  <button type="button" className="font-golos text-xs text-gold hover:text-gold-light transition-colors">Изменить</button>
                  <button type="button" className="font-golos text-xs text-muted-foreground hover:text-foreground transition-colors">Удалить</button>
                </div>
              </div>
            ))}
            <button type="button" className="border border-dashed border-border p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-gold hover:text-gold transition-all h-32">
              <Icon name="Plus" size={24} />
              <span className="font-golos text-xs tracking-widest uppercase">Добавить адрес</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
