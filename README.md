<h1 align="center">🛒 Ignite Shop</h1>

<p align="center">
  <img src="https://user-images.githubusercontent.com/82176047/223178716-32d3a2c2-3abf-4f1b-9334-6e41366d758d.png" width="500" alt="Prévia do Ignite Shop" />
</p>

Aplicação para gerenciar o carrinho de compras de uma loja de roupas fictícia, desenvolvida no **quarto desafio** do Ignite, bootcamp da [Rocketseat](https://www.rocketseat.com.br/), na trilha de ReactJS.

O projeto foi construído a partir de um [template do Figma](https://www.figma.com/file/FxlDRKOmznBbTH8DsTgnZU/Ignite-Shop-2.0/duplicate) disponibilizado pela Rocketseat.

## 🔧 Funcionalidades

- Listagem de produtos (camisas) obtidos da API do Stripe
- Adição de itens à sacola
- Exibição da quantidade de itens da sacola no header
- Exibição do valor total dos itens da sacola
- Checkout com todos os itens selecionados e finalização da compra

## 💻 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [Next.js](https://nextjs.org/)
- [Stitches](https://stitches.dev/)
- [Stripe](https://stripe.com/en-br)
- [Radix UI](https://www.radix-ui.com/)
- [Keen Slider](https://keen-slider.io/)
- [Axios](https://axios-http.com/docs/intro)
- [Phosphor Icons](https://phosphoricons.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## ⚙️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Uma conta no [Stripe](https://dashboard.stripe.com/register) com produtos cadastrados em **modo de teste**

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/Lucas-M01/Ignite-shop.git

# Acessar a pasta do projeto
cd Ignite-shop

# Instalar as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o conteúdo abaixo:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
NEXT_URL=http://localhost:3000
```

- `STRIPE_SECRET_KEY`: chave secreta de teste, disponível em [Developers → API keys](https://dashboard.stripe.com/test/apikeys) no dashboard do Stripe.
- `NEXT_URL`: URL base da aplicação, usada nas URLs de sucesso e cancelamento do checkout. Deve incluir `http://` ou `https://`, sem barra no final.

> ⚠️ Nunca envie o `.env.local` para o GitHub.

### Executando

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.
