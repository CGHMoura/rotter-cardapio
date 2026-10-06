import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  formatPrice,
  type Category,
  type Product,
} from "@/data/menu";

const TITLE = "Rotter · Bistrô & Bar — Cardápio Digital";
const DESC =
  "Cardápio digital do Rotter: entradas, pratos principais, sobremesas e coquetéis de cozinha de autor. Busque, filtre e monte seu pedido.";
const SERVICE_RATE = 0.1;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

type Filter = Category | "Todos";
type Cart = Record<string, number>;

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function MenuPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [cart, setCart] = useState<Cart>({});

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return PRODUCTS.filter(
      (p) =>
        (filter === "Todos" || p.category === filter) &&
        (!q || normalize(`${p.name} ${p.description} ${p.category}`).includes(q)),
    );
  }, [query, filter]);

  const setQty = (id: string, qty: number) =>
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });

  const items = PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0);
  const count = items.reduce((n, p) => n + (cart[p.id] ?? 0), 0);
  const subtotal = items.reduce((s, p) => s + p.price * (cart[p.id] ?? 0), 0);
  const service = subtotal * SERVICE_RATE;
  const total = subtotal + service;

  return (
    <div className="min-h-screen antialiased">
      <a
        href="#cardapio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o cardápio
      </a>

      <header className="glass-strong sticky top-0 z-30 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-semibold text-primary-foreground"
          >
            R
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Rotter</span>
          <nav aria-label="Principal" className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <a href="#cardapio" className="hidden rounded-lg px-3 py-1.5 transition hover:bg-muted hover:text-foreground sm:block">
              Cardápio
            </a>
            <a href="#carrinho" className="hidden rounded-lg px-3 py-1.5 transition hover:bg-muted hover:text-foreground sm:block">
              Seu pedido
            </a>
            <a
              href="#carrinho"
              aria-label={`Ver pedido, ${count} ${count === 1 ? "item" : "itens"}`}
              className="ml-1 grid size-9 place-items-center rounded-xl border border-border bg-secondary font-medium text-accent"
            >
              {count}
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pt-16">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Bistrô &amp; Bar · desde 2019
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Um cardápio que você <span className="text-gradient-brand">sente</span> antes de provar.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pratos de cozinha de autor, servidos com precisão e leveza. Monte seu pedido, ajuste
            quantidades e acompanhe o total em tempo real.
          </p>
        </div>

        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="glass shadow-glow mt-8 flex items-center gap-2 rounded-2xl p-2 focus-within:border-primary/50"
        >
          <span aria-hidden="true" className="pl-2 text-muted-foreground">⌕</span>
          <label htmlFor="busca" className="sr-only">Buscar no cardápio</label>
          <input
            id="busca"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por prato, categoria ou ingrediente…"
            className="w-full bg-transparent px-2 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
          />
        </form>

        <div role="group" aria-label="Filtrar por categoria" className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
          {(["Todos", ...CATEGORIES] as Filter[]).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-ring ${
                  active
                    ? "border-primary/40 bg-primary/15 font-medium text-foreground"
                    : "border-border bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <main id="cardapio" className="mx-auto grid max-w-6xl gap-6 px-4 pb-28 lg:grid-cols-[1fr_340px] lg:pb-20">
        <section aria-labelledby="produtos-titulo">
          <h2 id="produtos-titulo" className="sr-only">Produtos</h2>
          <p aria-live="polite" className="mb-4 text-sm text-muted-foreground">
            {visible.length} {visible.length === 1 ? "prato encontrado" : "pratos encontrados"}
          </p>
          {visible.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center text-muted-foreground">
              Nenhum prato encontrado. Tente outra busca ou categoria.
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {visible.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={cart[p.id] ?? 0}
                  onQty={setQty}
                  eager={i < 2}
                />
              ))}
            </ul>
          )}
        </section>

        <aside
          id="carrinho"
          aria-labelledby="carrinho-titulo"
          className="glass shadow-glow h-fit scroll-mt-20 rounded-3xl p-5 lg:sticky lg:top-20"
        >
          <div className="flex items-center justify-between">
            <h2 id="carrinho-titulo" className="font-display text-lg font-semibold">Seu pedido</h2>
            <span className="text-xs text-muted-foreground">
              {count} {count === 1 ? "item" : "itens"}
            </span>
          </div>

          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Seu pedido está vazio. Adicione pratos do cardápio.
            </p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((p) => {
                const q = cart[p.id] ?? 0;
                return (
                  <li key={p.id} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(p.price)} un.</p>
                    </div>
                    <QtyControl name={p.name} qty={q} onChange={(v) => setQty(p.id, v)} small />
                    <span className="w-20 shrink-0 text-right font-medium tabular-nums">
                      {formatPrice(p.price * q)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <dl className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <dt>Taxa de serviço (10%)</dt>
              <dd className="tabular-nums">{formatPrice(service)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums text-accent">{formatPrice(total)}</dd>
            </div>
          </dl>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => setCart({})}
              className="mt-4 w-full rounded-2xl border border-border py-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Limpar pedido
            </button>
          )}
        </aside>
      </main>

      {count > 0 && (
        <a
          href="#carrinho"
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow lg:hidden"
        >
          <span>Ver pedido · {count} {count === 1 ? "item" : "itens"}</span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </a>
      )}

      <footer className="glass-strong border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display font-medium text-foreground">Rotter · Bistrô &amp; Bar</span>
          <span>Alameda das Luzes, 128 · São Paulo · Aberto 18h–00h</span>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({
  product: p,
  qty,
  onQty,
  eager,
}: {
  product: Product;
  qty: number;
  onQty: (id: string, qty: number) => void;
  eager: boolean;
}) {
  return (
    <li className="glass shadow-glow animate-fade-up group flex flex-col overflow-hidden rounded-3xl transition hover:border-primary/30">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          width={1024}
          height={768}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">{p.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-accent">{formatPrice(p.price)}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</span>
          {qty > 0 ? (
            <QtyControl name={p.name} qty={qty} onChange={(q) => onQty(p.id, q)} />
          ) : (
            <button
              type="button"
              onClick={() => onQty(p.id, 1)}
              aria-label={`Adicionar ${p.name} ao pedido`}
              className="rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-xs font-semibold text-accent transition hover:bg-primary/30"
            >
              Adicionar
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function QtyControl({
  name,
  qty,
  onChange,
  small,
}: {
  name: string;
  qty: number;
  onChange: (q: number) => void;
  small?: boolean;
}) {
  const btn = `grid ${small ? "size-7" : "size-8"} place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground`;
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted p-1">
      <button type="button" aria-label={`Diminuir quantidade de ${name}`} onClick={() => onChange(qty - 1)} className={btn}>
        −
      </button>
      <span aria-live="polite" aria-label={`${qty} unidades`} className="w-6 text-center text-sm font-medium tabular-nums">
        {qty}
      </span>
      <button type="button" aria-label={`Aumentar quantidade de ${name}`} onClick={() => onChange(qty + 1)} className={btn}>
        +
      </button>
    </div>
  );
}
