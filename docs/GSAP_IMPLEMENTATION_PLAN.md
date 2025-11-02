# 🎬 Plano de Implementação GSAP - Pierre Landing Page

## 📋 Visão Geral

Plano completo para implementar animações GSAP fluidas, performáticas e alinhadas à identidade visual do Pierre (calm, intelligent, approachable).

---

## 🎯 Objetivos

- **Experiência Premium**: Animações sutis que elevam a percepção da marca
- **Performance First**: Sem comprometer Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Acessibilidade**: Respeitar `prefers-reduced-motion` e garantir fallbacks
- **Conversão**: Micro-interações que guiam o olhar para CTAs

---

## 📁 Estrutura de Arquivos

```
pierrelp/
├── lib/
│   └── animations/
│       ├── index.ts                    # Exports principais
│       ├── config.ts                   # Configurações globais GSAP
│       ├── hooks/
│       │   ├── useScrollAnimation.ts   # Hook para scroll animations
│       │   ├── useStaggerAnimation.ts  # Hook para stagger effects
│       │   └── useParallax.ts          # Hook para parallax sutil
│       ├── utils/
│       │   ├── animationUtils.ts       # Helpers e utilities
│       │   └── easingPresets.ts        # Easing functions customizadas
│       └── presets/
│           ├── fadeInUp.ts             # Preset: fade in + move up
│           ├── fadeInScale.ts          # Preset: fade + scale
│           └── staggerChildren.ts      # Preset: stagger children
└── components/
    └── shared/
        └── AnimatedSection.tsx         # Wrapper reutilizável para seções
```

---

## 🎨 Animações por Seção

### 1. **Navbar** (`Navbar.tsx`)

#### Objetivos
- Entrada suave ao carregar
- Comportamento no scroll (fade/blur dinâmico)
- Micro-interação nos botões

#### Animações Implementadas

**1.1 Entrada Inicial**
```typescript
// Ao montar: fade in + slide down sutil
- Logo: opacity 0 → 1, y: -20 → 0
- Botões: stagger 0.1s, opacity 0 → 1
- Duração: 0.6s
- Easing: easeOut
```

**1.2 Scroll Behavior**
```typescript
// Quando scroll > 100px:
- Aumentar blur do glassmorphism
- Adicionar sombra sutil
- Transição suave de 0.3s
```

**1.3 Botões Hover**
```typescript
// Micro-interação nos CTAs
- Scale: 1 → 1.02
- Duração: 0.2s
- Easing: easeInOut
```

---

### 2. **Hero Section** (`HeroSection.tsx`)

#### Objetivos
- Impacto visual imediato
- Título animado com stagger por linha
- iPhone reveal elegante
- Parallax sutil no background

#### Animações Implementadas

**2.1 Título Principal (Stagger Lines)**
```typescript
// Linha 1: "ASSISTENTE IA QUE"
// Linha 2: "FALA SUA LÍNGUA CHEGOU!"
- Opacity: 0 → 1
- Y: 30 → 0
- Stagger: 0.15s entre linhas
- Duração: 0.8s por linha
- Easing: power2.out
```

**2.2 Subtitle**
```typescript
// Após título (delay: 0.4s)
- Opacity: 0 → 1
- Y: 20 → 0
- Duração: 0.6s
- Easing: easeOut
```

**2.3 iPhone Mockup**
```typescript
// Após subtitle (delay: 0.8s)
- Scale: 0.85 → 1
- Opacity: 0 → 1
- Y: 40 → 0
- Duração: 1s
- Easing: power3.out
- Rotate: -2deg → 0deg (sutil)
```

**2.4 Parallax Background (Opcional)**
```typescript
// Scroll parallax sutil (se houver background)
- Speed: 0.5 (metade da velocidade do scroll)
```

---

### 3. **Features Section** (`FeaturesSection.tsx`)

#### Objetivos
- Cards aparecem conforme scroll
- Highlight cards com animação sequencial (imagem + texto)
- Stagger entre cards da mesma linha

#### Animações Implementadas

**3.1 Feature Cards (Scroll-Triggered)**
```typescript
// Cada card individualmente
- Trigger: top 80% da viewport
- Opacity: 0 → 1
- Y: 50 → 0
- Scale: 0.95 → 1
- Duração: 0.7s
- Easing: power2.out
- Stagger: 0.15s entre cards da mesma linha
```

**3.2 Feature Highlights**
```typescript
// Imagem e texto animados separadamente
- Texto: opacity 0 → 1, x: -30 → 0 (se left) ou x: 30 → 0 (se right)
- Imagem: opacity 0 → 1, scale: 0.9 → 1
- Stagger interno: 0.2s
- Duração: 0.8s
```

**3.3 Card Hover (Micro-interação)**
```typescript
// Hover state
- Scale: 1 → 1.02
- Y: 0 → -4px
- Shadow: aumenta
- Duração: 0.3s
```

---

### 4. **FAQ Section** (`FAQSection.tsx`)

#### Objetivos
- Accordion animado (se aplicável)
- Entrada suave dos itens
- Transição suave ao abrir/fechar

#### Animações Implementadas

**4.1 FAQ Items (Scroll-Triggered)**
```typescript
// Cada item aparece no scroll
- Opacity: 0 → 1
- Y: 30 → 0
- Duração: 0.5s
- Stagger: 0.1s
```

**4.2 Accordion Animation**
```typescript
// Ao abrir/fechar
- Height: animado com ease
- Opacity: fade in/out
- Duração: 0.4s
```

---

### 5. **Footer** (`Footer.tsx`)

#### Objetivos
- Entrada suave no final do scroll
- Links com hover sutil

#### Animações Implementadas

**5.1 Footer Reveal**
```typescript
// Scroll-triggered quando aparece
- Opacity: 0 → 1
- Y: 30 → 0
- Duração: 0.6s
```

**5.2 Social Links Hover**
```typescript
// Micro-interação
- Scale: 1 → 1.1
- Rotate: 0 → 5deg (sutil)
- Duração: 0.2s
```

---

## 🎯 Micro-Interações Globais

### CTAs (Call-to-Action Buttons)

```typescript
// Hover state
- Scale: 1 → 1.05
- Shadow: aumenta sutilmente
- Duração: 0.2s

// Active state
- Scale: 1.05 → 0.98
- Duração: 0.1s

// Ripple effect (opcional)
- Expandir círculo a partir do click
```

### Cards Hover

```typescript
// Todos os cards compartilham
- Scale: 1 → 1.02
- Y: 0 → -4px
- Shadow: aumenta
- Duração: 0.3s
- Easing: easeOut
```

---

## ⚙️ Configurações e Utilities

### 1. Configuração Global GSAP

```typescript
// lib/animations/config.ts
- ScrollTrigger plugin registration
- Configurações de easing padrão
- Breakpoints para animações responsivas
- Reduced motion detection
```

### 2. Hooks Customizados

**useScrollAnimation**
- Wrapper para ScrollTrigger
- Auto-cleanup
- Respeita reduced motion

**useStaggerAnimation**
- Facilita stagger effects
- Configuração simples

**useParallax**
- Parallax sutil e performático
- Throttle automático

### 3. Easing Presets

```typescript
// Pierre Brand Easing
- calm: easeOut (para entradas suaves)
- intelligent: power2.out (para elementos importantes)
- approachable: easeInOut (para interações)
```

---

## 🚀 Fases de Implementação

### **Fase 1: Setup Base** (30min)
- [ ] Criar estrutura de pastas `/lib/animations`
- [ ] Instalar/verificar GSAP ScrollTrigger plugin
- [ ] Configurar `config.ts` com settings globais
- [ ] Criar `useScrollAnimation` hook
- [ ] Testar reduced motion detection

### **Fase 2: Navbar + Hero** (45min)
- [ ] Navbar: entrada suave + scroll behavior
- [ ] Hero: título stagger + subtitle
- [ ] Hero: iPhone reveal
- [ ] Testar performance e timing

### **Fase 3: Features Section** (60min)
- [ ] Cards: scroll-triggered animations
- [ ] Highlights: animação sequencial
- [ ] Card hover states
- [ ] Stagger entre linhas

### **Fase 4: FAQ + Footer** (30min)
- [ ] FAQ items scroll-in
- [ ] Accordion animations (se aplicável)
- [ ] Footer reveal
- [ ] Social links hover

### **Fase 5: Micro-Interações Globais** (30min)
- [ ] Button hover/active states
- [ ] CTA enhancements
- [ ] Smooth scroll behavior
- [ ] Polimento final

### **Fase 6: Otimização e Polimento** (30min)
- [ ] Performance audit
- [ ] Lazy loading de animações pesadas
- [ ] Reduced motion completo
- [ ] Testes cross-browser
- [ ] Mobile optimization

---

## ⚡ Performance Guidelines

### Regras de Ouro

1. **Lazy Load**: Animações pesadas só após interação ou viewport
2. **GPU Acceleration**: Usar `transform` e `opacity` sempre que possível
3. **Will-Change**: Aplicar apenas durante animação, remover depois
4. **Throttle Scroll**: Parallax com `requestAnimationFrame`
5. **Cleanup**: Sempre limpar ScrollTriggers no unmount

### Otimizações Específicas

```typescript
// ✅ BOM: Transform + Opacity
gsap.to(element, { x: 100, opacity: 1 });

// ❌ EVITAR: Left/Top (causa reflow)
gsap.to(element, { left: 100 });
```

---

## ♿ Acessibilidade

### Reduced Motion

```typescript
// Detectar preferência do usuário
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Se true: desabilitar animações ou usar instantâneas
```

### Fallbacks

- Todas as animações devem ter fallback CSS
- Estado inicial visível (sem `opacity: 0` permanente)
- Não depender de JS para conteúdo crítico

---

## 📊 Métricas de Sucesso

### Performance
- ✅ LCP mantido < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ Lighthouse Score > 90

### UX
- ✅ Animações percebidas como premium
- ✅ Micro-interações aumentam engajamento
- ✅ Scroll suave e natural

---

## 🔧 Dependências Necessárias

```json
{
  "gsap": "^3.13.0", // Já instalado ✅
  "gsap/ScrollTrigger": "Plugin necessário"
}
```

**Instalação ScrollTrigger:**
```bash
# ScrollTrigger vem com GSAP, apenas registrar
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

---

## 📝 Checklist Final

Antes de considerar completo:

- [ ] Todas as seções animadas conforme plano
- [ ] Micro-interações em CTAs e cards
- [ ] Reduced motion implementado
- [ ] Performance audit passou
- [ ] Testes mobile/desktop ok
- [ ] Animações alinhadas à identidade Pierre (calm, intelligent)
- [ ] Código documentado e limpo
- [ ] Zero console errors/warnings

---

## 🎨 Notas de Design

### Timing (Pierre Brand)
- **Entradas**: 0.6s - 1s (sutis, não apressadas)
- **Micro-interações**: 0.2s - 0.3s (rápidas, responsivas)
- **Staggers**: 0.1s - 0.2s (naturais, não mecânicos)

### Easing (Pierre Brand)
- **Calm**: `easeOut` / `power2.out`
- **Intelligent**: `power3.out` (mais dramático para hero)
- **Approachable**: `easeInOut` (interações)

---

## 🚀 Próximos Passos

1. Revisar plano com time
2. Começar Fase 1 (Setup Base)
3. Implementar iterativamente (uma seção por vez)
4. Testar e ajustar timing
5. Performance audit
6. Deploy e monitorar

---

**Status**: 📋 Plano criado - Pronto para implementação

