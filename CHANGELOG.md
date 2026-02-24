# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.5.0] - 2025-12-18

### 🔄 Alterado
- **Refatoração de Arquitetura - Consolidação de Selectors em Page Objects**:
  - Removida pasta `selectors/` e suas classes (`common-selectors.ts`, `conta-corrente-selectors.ts`)
  - Selectors movidos para dentro das classes Page Objects como getters
  - Page Objects agora seguem padrão mais coeso: selectors + métodos na mesma classe
  - Benefícios:
    - Menos arquivos para manter (redução de complexidade)
    - Selectors próximos aos métodos que os utilizam
    - Facilita manutenção e entendimento do código

- **Padronização de Imports com Path Aliases**:
  - Todos os imports relativos (`../`, `./`) substituídos por aliases do TypeScript

- **Limpeza de Code Smells no TypeScript**:
  - `support/utils.ts`: Removido import não utilizado `Locator` de `@playwright/test`
  - `support/utils.ts`: Propriedade `renavam` alterada de `string | undefined` para `renavam?: string` (sintaxe mais idiomática)

### 📚 Documentação
- **README atualizado**:
  - Seção "Estrutura do Projeto" simplificada
  - Removida referência à pasta `selectors/`
  - Descrição de `pages/` atualizada para incluir selectors

## [2.4.0] - 2025-12-12

### 🔄 Alterado
- **Refatoração de Labels Allure (Redução de Duplicação)**:
  - `feature` e `issue` movidos para nível do `test.describe()` via `test.beforeEach()` (executados uma única vez por bloco de testes)
  - Método `definirParametrosAllureReport()` simplificado em `support/utils.ts`:
    - Agora aceita apenas `severity` e `description`
    - Remove repetição de `feature` e `issue` em cada teste individual
  - Padrão em testes (`tests/*.spec.ts`):
    - **No `describe`**: Define `feature` (user_story) e `issue` (constante da US) via `beforeEach`
    - **No `test`**: Define apenas `severity` e `description` via `definirParametrosAllureReport()`
  - Evita redundância: informações de contexto (user_story, issue) definidas uma única vez para todos os cenários do bloco

## [2.3.0] - 2025-12-10

### ✨ Adicionado
- **Configuração Otimizada para CI/CD (FAQ)**: Configurações específicas para pipelines usando variável de ambiente `TF_BUILD`
  - `forbidOnly`: Bloqueia build se houver `test.only()` esquecido no código
  - `maxFailures`: Limita execução a 10 falhas antes de parar (apenas em pipeline)
  - Reporters condicionais: todos os reporters em CI/CD, apenas Allure e HTML localmente

### 🔄 Alterado
- **Otimização de Workers e Retries**:
  - `workers`: 4 em pipeline, 2 localmente (melhor performance vs consumo de recursos)
  - `retries`: 2 em pipeline (lidar com flakiness), 0 localmente (feedback rápido)

- **Estratégia de Evidências Aprimorada**:
  - `trace`: Alterado de `retain-on-failure` para `on-first-retry` (reduz armazenamento)
  - `video`: Apenas `on-first-retry` em pipeline, `off` localmente (economia de espaço)
  - `outputDir`: Centralizado em `./test-results` para screenshots, vídeos e traces

- **Reporters Condicionais**:
  - **Pipeline (TF_BUILD)**: list, HTML, Allure, JSON, JUnit
  - **Local**: Allure (outputFolder: `./allure-results`), HTML (open: `on-failure`)
  - HTML reporter movido para `./test-results` em pipeline

- **Scripts NPM Atualizados**:
  - `clean` renomeado para `test:clean` (padronização com prefixo `test:`)
  - Atualização de dependência: `allure-playwright` 3.4.2 → 3.4.3

### 🐛 Corrigido
- **Correções na classe Utils (support/utils.ts)**:
  - Corrigidos 4 métodos que não propagavam erros corretamente:
    - `elementoNaoEstaPresente`: Agora propaga erro com `throw error` no catch
    - `contemTextoPresentePorElemento`: Alterado de `Promise<boolean>` para `Promise<void>`, remove returns inconsistentes
    - `elementoEstaDesabilitado`: Alterado de `Promise<boolean>` para `Promise<void>`, remove returns inconsistentes
    - `naoContemTextoPresentePorElemento`: Alterado de `Promise<boolean>` para `Promise<void>`, remove returns inconsistentes
  - Métodos agora falham corretamente quando validações não são atendidas

### 📚 Documentação
- **README - Seção "Como executar" aprimorada**:
  - Instruções simplificadas: `npm install` (ao invés de instalar pacotes individuais)
  - Ordem lógica: npm install → playwright install → allure-commandline
  - Comando de relatório atualizado: `npx allure serve allure-results` (sem necessidade de instalação global)
  - Exemplos de execução com variáveis de ambiente:
    - Comando para limpar variável: `Remove-Item Env:\PLAYWRIGHT_PROJECT`
    - Execução temporária sem persistir variável: `& { $env:PLAYWRIGHT_PROJECT='edge'; npx playwright test }`
  - Esclarecimento sobre persistência da variável `$env:PLAYWRIGHT_PROJECT` na sessão do PowerShell

- **README - Seção "Paralelismo" atualizada**:
  - Esclarecimento sobre workers: 2 localmente, 4 em pipeline

- **README - Seção "Uso da biblioteca SEF/MG - Playwright Utils" expandida**:
  - Instruções detalhadas de autenticação com `vsts-npm-auth`
  - Uso correto de `npm install` ao invés de instalar pacote individual

- **README - Seção "O que precisa ser ajustado no projeto de desenvolvimento" expandida**:
  - Adicionada instrução sobre `playwright.config.ts` na raiz apontando para `./__e2e__/`
  - Adicionada instrução sobre uso exclusivo do `package.json` da raiz do projeto

## [2.2.0] - 2025-12-02

### ✨ Adicionado
- **JUnit Reporter**: Adicionado reporter JUnit XML para integração com CI/CD
  - Configuração em `playwright.config.ts`: `outputFile: './test-results/junit.xml'`
  - Compatível com Jenkins, GitLab CI, GitHub Actions e outras ferramentas de CI/CD

### 🔄 Alterado
- **Configuração de Reporters Aprimorada**: 
  - Padronização de caminhos com prefixo `./` em todos os reporters
  - HTML: `outputFolder: './playwright-report'`
  - Allure: `outputFolder: './allure-results'`
  - JSON: `outputFile: './test-results/results.json'`
  
- **Test Match Pattern**: Adicionado `testMatch: '**/*.spec.ts'` para execução explícita apenas de arquivos `.spec.ts`

### 📚 Documentação
- README atualizado com seção "O que precisa ser ajustado no projeto de desenvolvimento"
  - Instruções para exclusão da pasta `__e2e_folder__` no `tsconfig.json`
  - Configuração do `.gitignore` para pastas de reports
  - Ajustes no `vitest.config.mts` para exclusão de testes E2E
  - Configuração do `sonar-project.properties` para exclusão de análise e cobertura

## [2.1.0] - 2025-11-26

### ✨ Adicionado
- **Projeto Padrão via Variável de Ambiente**: Configuração de projeto/navegador padrão no `playwright.config.ts`
  - Projeto padrão: `chromium` (sem necessidade de flag `--project`)
  - Suporte a override via variável de ambiente `PLAYWRIGHT_PROJECT`
  - Filtragem automática do array de projetos baseada na seleção

### 🔄 Alterado
- **Simplificação da Execução**: 
  - Execução padrão: `npx playwright test` (roda em chromium)
  - Execução customizada: `$env:PLAYWRIGHT_PROJECT='firefox'; npx playwright test`
  - Elimina necessidade de especificar `--project=chromium` repetidamente

### 📚 Documentação
- Atualização do fluxo de execução com diferentes navegadores
- Exemplos de uso da variável de ambiente `PLAYWRIGHT_PROJECT`

## [2.0.0] - 2025-11-18

### 🎯 Refatoração Completa - Archetype Enterprise-Ready

#### ✨ Adicionado
- **TypeScript Strict Mode**: Configuração completa do `tsconfig.json` com validações rigorosas
  - Strict mode ativado
  - noUnusedLocals e noUnusedParameters
  - noImplicitAny e strictNullChecks
  - Suporte a DOM para operações de window/document
  - Path mapping configurado (@pages, @selectors, @steps, @support)

- **Fixtures Customizadas**: Sistema de injeção de dependências
  - Criado `support/fixtures.ts` com fixtures para todas as classes
  - Eliminação de boilerplate nos testes
  - Auto-instanciação de PageObjects, Steps e Utils

- **Constantes de Timeout Centralizadas**:
  - `TIMEOUTS.DEFAULT` (10s)
  - `TIMEOUTS.FORM_FILL` (15s)
  - `TIMEOUTS.NAVIGATION` (60s)
  - `TIMEOUTS.URL_VALIDATION` (10s)
  - `TIMEOUTS.HEAVY_LOAD` (30s)
  - `TIMEOUTS.SHORT` (5s)

- **Scripts NPM Úteis**:
  - `clean` e `report`,

- **Configurações Playwright Otimizadas**:
  - `fullyParallel: true` - Paralelismo total
  - `screenshot: 'only-on-failure'`
  - `video: 'retain-on-failure'`
  - Reporter JSON para análises

#### 🔄 Alterado
- **Nomenclatura**: `elements_pages/` → `selectors/` (mais clara e padrão de mercado)
- **Padrão de código**: snake_case → camelCase consistente
- **Tipagem**: `any` → tipos fortes (`Page`, `Utils`, etc.)
- **Properties**: Adicionado `readonly` em todas as propriedades de classe
- **Getters**: Métodos `get*()` → getters nativos do JavaScript
- **Waits Inteligentes**:
  - `validarUrlAtualContemString`: sleep fixo → `page.waitForURL()`
  - `validarTituloPagina`: sleep fixo → `page.waitForFunction()`

#### 🐛 Corrigido
- Resolução de bug em `page-conta-corrente.ts`
- Remoção de parâmetros não utilizados detectados pelo TypeScript strict
- Correção de imports inconsistentes

#### 🗑️ Removido
- Sleeps fixos substituídos por waits baseados em condição
- Uso direto de `utils` nos testes (agora via fixture)
- Método pausar de `utils`

#### 📚 Documentação
- README atualizado com nova estrutura de pastas
- Seção sobre Fixtures Customizadas
- Explicação do paralelismo com `fullyParallel`
- `.gitignore` atualizado (adicionado `*.zip` para traces)

## [1.0.0] - 2025-10-07
### Adicionado
- Estrutura inicial do projeto Playwright.
- Configuração de múltiplos browsers (chromium, firefox, edge, webkit, mobile).
- Relatórios HTML e Allure.
- Ignorar testes com `@ignore`.
- Métodos utilitários para interação com elementos, datas, etc.

### Alterado
- Timeout padrão dos testes para 15 segundos.
- Execução paralela com 4 workers.

### Corrigido
- Ajuste no uso do viewport para maximizar janela.
- Correção na configuração do trace para gerar apenas em falha.

## [0.9.0] - 2025-10-06
### Adicionado
- Implementação da arquitetura inicial
- Primeiros testes usando cenários do projeto do IPVA Conta Corrente como base.
- Integração inicial com Allure.
- Escrita do README do projeto.

## [0.8.0] - 2025-09-30
### Adicionado
- Inclusão da biblioteca SEF/MG - Playwright Utils
- Primeiros testes usando cenários do projeto do IPVA Conta Corrente como base.
- Integração inicial com Allure.
- Escrita do README do projeto.