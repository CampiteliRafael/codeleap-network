# CodeLeap Network - Frontend Challenge

Uma aplicação de rede social completa construída com React, TypeScript, React Query e Framer Motion.

## 🚀 Live Demo
**Deploy:** [https://codeleap-network-sandy.vercel.app](https://codeleap-network-sandy.vercel.app)
**GitHub:** [https://github.com/CampiteliRafael/codeleap-network](https://github.com/CampiteliRafael/codeleap-network)

## 📋 Sobre o Projeto

Esta é uma solução completa para o desafio técnico da CodeLeap, implementando uma aplicação CRUD de posts com múltiplas funcionalidades avançadas e design responsivo.

## ✨ Funcionalidades Implementadas

### Core Features (Requisitos Obrigatórios)
- ✅ Sistema de signup/login com username
- ✅ Criar novos posts (título + conteúdo)
- ✅ Listar posts ordenados por mais recente
- ✅ Editar posts próprios
- ✅ Deletar posts próprios
- ✅ Validação de formulários (botões desabilitados quando vazios)
- ✅ Modais de confirmação
- ✅ Design fiel ao Figma

### Bonus Features (Implementadas)
- 🎯 **Login/Logout Persistente** - localStorage para manter sessão
- 🔍 **Busca e Filtros** - pesquisar por título, conteúdo ou autor
- 📊 **Ordenação** - ordenar por mais recente ou mais antigo
- ❤️ **Sistema de Likes** - curtir posts (fake API com localStorage)
- 💫 **Animações Suaves** - transições com Framer Motion
- 📱 **Design Responsivo** - otimizado para mobile, tablet e desktop
- ⏳ **Loading States** - skeleton screens e spinners
- 🎨 **Empty State** - mensagem amigável quando não há posts
- 🎭 **Hover Effects** - interações visuais polidas

## 🛠️ Tecnologias

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **React Query (TanStack Query)** - Gerenciamento de estado servidor
- **Axios** - Cliente HTTP
- **Framer Motion** - Animações
- **CSS3** - Estilização customizada

### Testes e Qualidade
- **Vitest** - Test runner
- **React Testing Library** - Testes de componentes
- **MSW** - Mock Service Worker
- **ESLint** - Linting

### DevOps
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **Vercel** - Deploy automático

## 📦 Como Executar Localmente

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Docker (opcional)

### Opção 1: Instalação Padrão

```bash
# Clone o repositório
git clone [seu-repositorio]

# Entre no diretório
cd codeleap-network

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Opção 2: Com Docker (Recomendado)

```bash
# Clone o repositório
git clone [seu-repositorio]

# Entre no diretório
cd codeleap-network

# Execute com Docker Compose
docker-compose up

# Ou em background
docker-compose up -d

# Para parar
docker-compose down
```

A aplicação estará disponível em `http://localhost:5173`

**Vantagens do Docker:**
- ✅ Ambiente isolado e consistente
- ✅ Não precisa instalar dependências localmente
- ✅ Hot reload funciona normalmente
- ✅ Fácil de compartilhar entre equipes

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

### Testes

```bash
# Rodar testes em watch mode
npm run test

# Rodar testes uma vez
npm run test:run

# Rodar testes com UI interativa
npm run test:ui

# Rodar testes com coverage
npm run test:coverage

# Rodar testes no CI (com coverage)
npm run test:ci
```

### Lint e Type Check

```bash
# Verificar linting
npm run lint

# Build TypeScript (type check)
npm run build
```

## 🌐 API

A aplicação se integra com a API de teste da CodeLeap:

**Base URL:** `https://dev.codeleap.co.uk/careers/`

### Endpoints Utilizados
- `GET /` - Lista todos os posts
- `POST /` - Cria um novo post
- `PATCH /:id/` - Atualiza um post
- `DELETE /:id/` - Deleta um post

## 📁 Estrutura do Projeto

Organizado por **features** para melhor escalabilidade:

```
src/
├── features/                    # Features organizadas por domínio
│   ├── auth/                   # Feature de autenticação
│   │   └── components/
│   │       └── SignupModal/    # Modal de login
│   ├── posts/                  # Feature de posts
│   │   ├── components/
│   │   │   ├── CreatePost/     # Criar post
│   │   │   ├── PostCard/       # Card de post
│   │   │   ├── EditModal/      # Editar post
│   │   │   ├── DeleteModal/    # Deletar post
│   │   │   └── FilterBar/      # Busca e filtros
│   │   └── hooks/
│   │       └── usePosts.ts     # Hook de posts
│   └── likes/                  # Feature de likes
│       └── hooks/
│           └── useLikes.ts     # Hook de likes
├── shared/                      # Código compartilhado
│   ├── components/             # Componentes reutilizáveis
│   │   ├── EmptyState/         # Estado vazio
│   │   └── PostSkeleton/       # Loading skeleton
│   ├── services/               # Serviços
│   │   └── api.ts              # Cliente Axios
│   └── types/                  # TypeScript types
│       └── index.ts            # Definições globais
├── App.tsx                      # Componente raiz
├── App.css                      # Estilos globais
└── main.tsx                     # Entry point
```

### Por que esta estrutura?

- **Escalabilidade**: Fácil adicionar novas features
- **Manutenibilidade**: Código organizado por domínio
- **Reutilização**: Componentes compartilhados em `/shared`
- **Clareza**: Estrutura auto-explicativa

## 🎨 Design e UX

### Cores Principais
- **Azul Primary:** #7695EC (Header, botões principais)
- **Vermelho Like:** #FF6B6B (Botão de curtir)
- **Verde Success:** #47B960 (Botão salvar)
- **Cinza Background:** #DDDDDD
- **Branco Cards:** #FFFFFF

### Responsividade
- **Desktop:** >768px - Layout completo
- **Tablet:** 768px - Ajustes de espaçamento
- **Mobile:** <768px - Layout otimizado vertical

### Animações
- Fade in/out nos modais
- Slide up nos posts novos
- Scale nos botões clicados
- Hover effects suaves

## 🔑 Funcionalidades Detalhadas

### Sistema de Likes (Fake Frontend)
- Contador de likes por post
- Visual feedback (coração preenchido)
- Persistência no localStorage
- Animação ao clicar

### Busca e Filtros
- Busca em tempo real
- Filtrar por título, conteúdo ou autor
- Ordenação por data (mais recente/mais antigo)
- Clear button para limpar busca

### Loading States
- Skeleton screens enquanto carrega
- Spinners em botões durante operações
- Estados de loading específicos (criar, editar, deletar)

### Persistência
- Username salvo no localStorage
- Likes salvos localmente
- Auto-login ao recarregar página
- Botão de logout para limpar sessão

## 📝 Notas Técnicas

- **React Query** gerencia cache e sincronização automática
- **Refetch interval** de 10 segundos para ver novos posts
- **Optimistic updates** para melhor UX
- **Error handling** em todas as operações
- **TypeScript strict mode** para segurança de tipos

## 🧪 Testes

O projeto possui uma suíte completa de testes com **alta cobertura**:

### Tipos de Testes

**Testes Unitários**
- ✅ usePosts hook - gerenciamento de posts
- ✅ useLikes hook - sistema de likes
- ✅ Componentes isolados

**Testes de Componentes**
- ✅ SignupModal - validação e submit
- ✅ CreatePost - formulário e validações
- ✅ PostCard - renderização e interações
- ✅ Modais - edit e delete

**Testes de Integração**
- ✅ Fluxo completo de signup
- ✅ Criar, editar e deletar posts
- ✅ Sistema de likes funcionando
- ✅ Busca e filtros
- ✅ Persistência de dados

### Tecnologias de Teste

- **Vitest** - Test runner rápido
- **React Testing Library** - Testes centrados no usuário
- **MSW (Mock Service Worker)** - Mock de API realista
- **Testing Library User Event** - Simulação de interações

### Coverage

O projeto mantém alta cobertura de testes em:
- Componentes críticos (>85%)
- Hooks personalizados (100%)
- Fluxos principais da aplicação (>80%)

## 🚀 Deploy e CI/CD

### Pipeline Automatizado (GitHub Actions)

O projeto possui CI/CD configurado com GitHub Actions que executa automaticamente:

**Em cada Push/PR:**
1. ✅ Instalação de dependências
2. ✅ ESLint (verificação de código)
3. ✅ TypeScript build (type check)
4. ✅ Testes com coverage
5. ✅ Upload de coverage para Codecov

**Em Push para Main:**
6. 🚀 Deploy automático para Vercel

### Configurar Secrets no GitHub

Para ativar o deploy automático, adicione as secrets no repositório:

```bash
# No GitHub: Settings > Secrets and variables > Actions

VERCEL_TOKEN          # Token da Vercel (vercel.com/account/tokens)
VERCEL_ORG_ID         # ID da organização Vercel
VERCEL_PROJECT_ID     # ID do projeto Vercel
```

### Deploy Manual

**Vercel** (Recomendado)
```bash
npm install -g vercel
vercel

# Ou para produção
vercel --prod
```

**Netlify**
```bash
npm run build
# Fazer upload da pasta dist/
```

**Outras Plataformas**
- Build: `npm run build`
- Pasta de saída: `dist/`
- Comando de dev: `npm run dev`

## 📧 Contato

Em caso de dúvidas sobre o desafio:
**Email:** vini.garcia@codeleap.co.uk

---

**Desenvolvido com ❤️ para o desafio CodeLeap**

🤖 Generated with Claude Code
