# 🎯 Migração dos Testes - Auditor Eletrônico

## ✅ O que foi adaptado

Seus testes do **Auditor Eletrônico** foram completamente adaptados ao padrão do projeto seguindo a arquitetura já existente.

---

## 📁 Arquivos Criados

### 1. **Page Objects**
- `pages/page-auditor.ts` - Classe com todos os seletores e ações do Auditor Eletrônico

### 2. **Steps (Gherkin)**
- `steps/auditor-steps.ts` - Steps reutilizáveis para Login, Auditoria e MDF-e

### 3. **Testes Adaptados**
- `tests/us-login-auditor.spec.ts` - Cenários de login (sucesso e falha)
- `tests/us-solicitar-auditoria.spec.ts` - Cenário de solicitação de auditoria
- `tests/us-consulta-mdfe.spec.ts` - Cenário de consulta MDF-e sem filtros

### 4. **Configuração**
- `.env.example` - Template para variáveis de ambiente
- `support/constants.ts` - **Atualizado** com URLs e credenciais do Auditor
- `support/fixtures.ts` - **Atualizado** com PageAuditor e AuditorSteps
- `playwright.config.ts` - **Atualizado** para carregar variáveis do .env
- `package.json` - **Atualizado** com dependência `dotenv`
- `README.md` - **Atualizado** com instruções de configuração

---

## 🚀 Como executar os novos testes

### 1️⃣ Instalar a nova dependência
```bash
npm install
```

### 2️⃣ Configurar variáveis de ambiente
```bash
# Crie o arquivo .env baseado no exemplo
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais reais:
```env
URL_AUDITOR=https://sua-url-real.com.br
USERNAME=12345678901
PASSWORD=sua_senha
USERNAME2=98765432100
PASSWORD2=senha_invalida
```

### 3️⃣ Executar todos os testes
```bash
npx playwright test
```

### 4️⃣ Executar apenas testes do Auditor
```bash
# Login
npx playwright test us-login-auditor

# Solicitar Auditoria
npx playwright test us-solicitar-auditoria

# Consulta MDF-e
npx playwright test us-consulta-mdfe
```

### 5️⃣ Ver relatório Allure
```bash
npx allure serve allure-results
```

---

## 🔄 Principais Mudanças Aplicadas

### ❌ Antes (Código Original)
```typescript
// Código duplicado e não reutilizável
import * as dotenv from "dotenv";
import { preencherCPF, preencherSenha } from "../../utils/helpers";

test("Login", async ({ page }) => {
    await page.goto("");
    await preencherCPF(page, USERNAME);
    await preencherSenha(page, PASSWORD);
    await page.locator('a:has-text("Acessar")').click();
});
```

### ✅ Depois (Código Adaptado)
```typescript
// Reutilizável, limpo e seguindo padrão do projeto
import { test } from '@support/fixtures';
import * as Constants from '@support/constants';

test('Login com sucesso', async ({ pageAuditor, auditorSteps }) => {
    // Dado
    await auditorSteps.stepAcessarTelaLogin(pageAuditor);
    // Quando
    await auditorSteps.stepRealizarLoginComSucesso(
        pageAuditor, 
        Constants.AUDITOR_CPF_VALIDO, 
        Constants.AUDITOR_SENHA_VALIDA
    );
    // Então
    await auditorSteps.stepValidarTelaPrincipal(pageAuditor);
});
```

---

## 🎨 Benefícios da Adaptação

✅ **Reutilização de código** - Steps podem ser usados em múltiplos testes  
✅ **Manutenibilidade** - Seletores centralizados no Page Object  
✅ **Legibilidade** - Sintaxe Gherkin (Dado/Quando/Então)  
✅ **Fixtures automáticas** - Sem necessidade de instanciar classes manualmente  
✅ **Segurança** - Credenciais em variáveis de ambiente (.env)  
✅ **Consistência** - Mesmo padrão dos outros testes do projeto  
✅ **Allure Report** - Relatórios detalhados automáticos  

---

## 📋 Estrutura Completa

```
qa-playwright-front/
├── pages/
│   ├── page-common.ts
│   ├── page-conta-corrente.ts
│   └── page-auditor.ts          ← NOVO
├── steps/
│   ├── common-steps.ts
│   ├── conta-corrente-steps.ts
│   └── auditor-steps.ts         ← NOVO
├── tests/
│   ├── us-acessa-modulo-conta-corrente.spec.ts
│   ├── us-apresentar-dados-veiculo.spec.ts
│   ├── us-pesquisar-nfe-aeweb.spec.ts
│   ├── us-login-auditor.spec.ts           ← NOVO
│   ├── us-solicitar-auditoria.spec.ts     ← NOVO
│   └── us-consulta-mdfe.spec.ts           ← NOVO
├── support/
│   ├── constants.ts             ← ATUALIZADO
│   ├── fixtures.ts              ← ATUALIZADO
│   └── utils.ts
├── .env.example                 ← NOVO
├── playwright.config.ts         ← ATUALIZADO
├── package.json                 ← ATUALIZADO
└── README.md                    ← ATUALIZADO
```

---

## 🔍 Próximos Passos Sugeridos

1. **Validar seletores** - Alguns XPaths podem precisar de ajustes conforme a aplicação real
2. **Adicionar mais cenários** - Os testes atuais cobrem o básico, você pode expandir
3. **Completar validações** - No teste de "Solicitar Auditoria", adicionar validação final
4. **Adicionar mais campos** - No MDF-e, adicionar preenchimento de filtros (CNPJ, datas, etc.)

---

## 🆘 Problemas Comuns

### ❌ Erro: "PASSWORD não está definida"
**Solução:** Certifique-se de criar o arquivo `.env` com as credenciais corretas.

### ❌ Erro: "Cannot find module 'dotenv'"
**Solução:** Execute `npm install` para instalar as dependências.

### ❌ Seletores não encontrados
**Solução:** Verifique os seletores em `page-auditor.ts` e ajuste conforme sua aplicação real.

---

## 📞 Dúvidas?

Todos os testes seguem o mesmo padrão dos testes existentes no projeto. Use os arquivos de exemplo como referência! 🚀
