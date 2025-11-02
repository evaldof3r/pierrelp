# Pierre Landing Page

Landing page moderna e responsiva para o Pierre, assistente de IA financeiro.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Design Tokens** (sistema de design baseado em Figma)

## 📁 Estrutura do Projeto

```
pierrelp/
├── app/
│   ├── globals.css          # CSS variables dos design tokens
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── sections/            # Seções da landing page
│   │   ├── Navbar.tsx       # Navbar com glassmorphism
│   │   ├── HeroSection.tsx  # Hero section com título e iPhone
│   │   └── FeaturesSection.tsx # Features com cards e highlights
│   └── ui/                  # Componentes base
│       ├── Button.tsx       # Botão com variantes
│       └── Container.tsx    # Container responsivo
├── lib/
│   ├── design-tokens.json   # Design tokens do Figma
│   ├── design-tokens.ts     # Utilitário TypeScript para tokens
│   └── landing-page-structure.json # Estrutura completa da página
└── public/
    └── images/              # Imagens WebP
```

## 🎨 Design System

O projeto utiliza um sistema de design tokens extraído do Figma, incluindo:

- **Cores**: Primary, Secondary, Neutral, Accent
- **Tipografia**: Tamanhos, pesos, line heights, letter spacing
- **Espaçamento**: Padding, margin, gap scales
- **Border Radius**: Valores de arredondamento
- **Shadows**: Efeitos de sombra
- **Breakpoints**: Responsive design

Todos os tokens estão mapeados em `lib/design-tokens.json` e disponíveis como CSS variables em `app/globals.css`.

## 📦 Seções Implementadas

- ✅ **Navbar**: Glassmorphism com logo e CTAs
- ✅ **Hero Section**: Título impactante e mockup do iPhone
- ✅ **Features Section**: Grid de cards e highlights
- 🔄 **FAQ Section**: Em desenvolvimento
- 🔄 **Footer**: Em desenvolvimento

## 🛠️ Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📝 Design Tokens

Os design tokens podem ser acessados de duas formas:

1. **CSS Variables**: Diretamente no CSS usando `var(--color-primary-background)`
2. **TypeScript**: Importando de `lib/design-tokens.ts`

## 🎯 Próximos Passos

- [ ] Implementar FAQ Section com accordion
- [ ] Implementar Footer com links e QR code
- [ ] Adicionar animações GSAP
- [ ] Otimizar imagens WebP
- [ ] Implementar responsividade completa
- [ ] Adicionar testes

## 📄 Licença

Proprietário - CloudWalk, Inc.
