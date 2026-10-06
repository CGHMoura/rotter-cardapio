# Rotter — Cardápio Digital

Cardápio digital do restaurante Rotter: uma página só, rápida e responsiva, pensada para o celular.

## O que tem

- **Busca em tempo real** por nome, descrição ou categoria
- **Filtros por categoria**: Entradas, Principais, Sobremesas e Coquetéis
- **8 pratos** com foto, descrição e preço
- **Carrinho** com quantidade, subtotal, taxa de serviço e total
- **Botão flutuante no celular** que mostra o total e abre o pedido
- Funciona **offline e sem serviços externos**: nada de WhatsApp, pagamentos ou APIs de terceiros

## Design e técnica

Interface escura em "vidro fosco", tipografia única, animações leves e foco visível para navegação por teclado. Imagens são servidas em `WebP`/`JPG` otimizados e o carregamento é priorizado (lazy load fora da primeira dobra).

- **Acessibilidade**: landmarks, `aria-label` nos filtros, contraste AA, `alt` nas fotos, área de toque mínima de 44px
- **SEO**: título e descrição por página, `og:`/`twitter:`, `robots.txt` e marcação `JSON-LD` do restaurante

## Rodando localmente

Requer Node.js 20+ e npm.

```sh
git clone <url-deste-repositorio>
cd rotter-cardapio
npm install
npm run dev
```

Abra `http://localhost:8080`.

Para gerar a versão de produção:

```sh
npm run build
npm run preview
```

## Editando o cardápio

Pratos, preços, categorias e os dados do restaurante (endereço, horário) ficam em um único arquivo: `src/data/menu.ts`. As fotos estão em `src/assets/`.

## Stack

TanStack Start (React 19 + Vite), TypeScript, Tailwind CSS v4 e shadcn/ui. Testes com Vitest.
