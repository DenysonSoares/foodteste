# 🛒 Projeto de aiqfome desenvolvido com React e Next.js

Este é um projeto simples de um aplicativo de delivery desenvolvido utilizando **React** e **Next.js**. A aplicação foca em performance, boa experiência do usuário e uma estrutura limpa e escalável.

## 🚀 Tecnologias Utilizadas

- **React**
- **Next.js**
- **Tailwind CSS**
- **SASS**
- **shadcn/ui** – biblioteca de componentes estilizados
- **Context API** – gerenciamento de estado global

## 🧱 Estrutura do Projeto

A aplicação faz uso de **Server Components** para otimizar o carregamento sempre que possível. **Client Components** são utilizados somente quando realmente necessários, como em interações com o estado ou eventos do navegador.

Além disso, foi utilizada a **Context API** para gerenciar o estado do carrinho de compras de forma simples e eficiente, sem a necessidade de bibliotecas externas como Redux.

## 💅 Estilização

Para a estilização, foi utilizada uma combinação entre:

- **Tailwind CSS**: para estilização utilitária e rápida.
- **SASS**: para estilos mais estruturados e reutilizáveis.
- **shadcn/ui**: para alguns componentes prontos com uma boa base de acessibilidade e design consistente.

## 📁 Estrutura de Pastas

O projeto segue uma organização modular baseada em design atômico e melhores práticas com Next.js:

src/
├── app/ # Páginas da aplicação (Next.js App Router)
│ ├── cart/ # Página do carrinho
│ ├── stores/ # Página de listagem de lojas
│ ├── globals.css # Estilos globais (Tailwind + SASS)
│ ├── layout.tsx # Layout padrão da aplicação
│ └── page.tsx # Página inicial
├── components/ # Componentes reutilizáveis
│ ├── atoms/ # Elementos básicos (botões, ícones, e os demais componentes compartilhados.)
│ ├── molecules/ # Combinação de atoms (componentes que podem ser compartilhados mais tem mais complexidade)
│ ├── organisms/ # Blocos de UI mais complexos (header, footer, sidebar e tudo que é mais fixo no layout)
│ ├── sections/ # Seções completas de páginas (Carousel, catalogos, banners)
│ └── ui/ # Componentes da biblioteca shadcn/ui e personalizados
├── contexts/ # Context API (ex: carrinho de compras)
├── lib/ # Funções auxiliares e utilitárias
├── services/ # Comunicação com APIs ou mock de dados
└── types/ # Tipagens globais do TypeScript

## ⚙️ Funcionalidades

- Adição e remoção de produtos do carrinho
- Atualização dinâmica do conteúdo do carrinho
- Uso de **loading states** e **skeletons** para melhorar a experiência do usuário durante o carregamento de dados

## ▶️ Como rodar o projeto

### Pré-requisitos

- Node.js (recomendado: versão LTS)
- Yarn ou npm

### Passos para execução

# 1. Instale as dependências

yarn install

# ou

npm install

# 2. Rode o servidor de desenvolvimento

yarn dev

# ou

npm run dev

## 💡 Considerações

O projeto foi desenvolvido com base no layout enviado no Figma. Algumas funcionalidades foram adicionadas pensando no fluxo de um aplicativo de comida focando sempre a experiência do usuário.

### Layout

## https://www.figma.com/design/mgLRWavLkkZnDTVKOKQPie/-aiqfome--teste-front-end---MOBILE?node-id=2455-2935&t=UMim72rBCibcKZZ7-0

Feito com ❤️ usando React, Next.js e boas práticas.
