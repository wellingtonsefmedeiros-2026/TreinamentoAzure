# 🤖 Guia Rápido: Agente de Testes Playwright

## Como usar o agente

1. **Chamar o agente no chat**: `@agents.tests`
2. **Descrever o que você precisa**: Ex: "Crie um teste para validar o cadastro de usuário"

## 📋 O que o agente pode fazer por você

### ✅ Criação de Testes
```typescript
"Crie um teste para validar login com credenciais inválidas"
"Preciso de um teste que valide o fluxo completo de compra"
"Crie 5 cenários de teste para a tela de cadastro"
```

### 🔍 Análise e Debug
```typescript
"Por que o teste us-login-auditor está falhando?"
"Analise os screenshots de falha e sugira correções"
"Identifique testes duplicados no projeto"
```

### 🔧 Manutenção
```typescript
"Refatore o teste X para usar Page Objects"
"Atualize todos os seletores da página de login"
"Remova código duplicado dos testes de auditoria"
```

### ▶️ Execução
```typescript
"Execute apenas os testes críticos"
"Rode o teste de navegação e mostre o resultado"
"Gere o relatório Allure dos últimos testes"
```

### 📦 Page Objects e Steps
```typescript
"Crie um Page Object para a tela de relatórios"
"Adicione um step para validar mensagem de sucesso"
"Crie métodos helper para seleção de datas"
```

## 🎯 Exemplo de Uso Completo

**Você**: @agents.tests Preciso de um teste que valide o filtro de pesquisa na tela de NFe

**Agente**: 
1. ✅ Analisa a estrutura existente (pages, steps)
2. ✅ Identifica padrões do projeto  
3. ✅ Cria o arquivo us-filtro-pesquisa-nfe.spec.ts
4. ✅ Implementa cenários positivos e negativos
5. ✅ Valida erros de compilação
6. ✅ Executa o teste (se solicitado)
7. ✅ Fornece feedback dos resultados

## 📊 Demonstração Realizada

### Teste Criado: [us-navegacao-menu-auditor.spec.ts](tests/us-navegacao-menu-auditor.spec.ts)

**Cenários implementados:**
- ✅ Acessar menu Auditorias com sucesso
- ✅ Acessar menu Consultas > MDF-e
- ✅ Validar estrutura da página principal

**Características do código gerado:**
- ✅ Usa fixtures customizadas (pageAuditor, auditorSteps, utils)
- ✅ Integração com Allure Reports
- ✅ Padrão AAA (Arrange-Act-Assert)
- ✅ Severidade apropriada (CRITICAL, NORMAL, TRIVIAL)
- ✅ Comentários em português
- ✅ Nomenclatura consistente (us-*.spec.ts)
- ✅ Sem erros de compilação

## 🔑 Padrões que o Agente Segue

### Estrutura de Teste
```typescript
import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as allure from 'allure-js-commons';

test.describe('Nome da Funcionalidade', () => {
  test.beforeEach(async () => {
    await allure.feature('Nome da Feature');
  });

  test('Cenário: Descrição', async ({ utils, pageX, xSteps }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Descrição detalhada"
    );
    
    // Arrange (Dado)
    // Act (Quando)
    // Assert (Então)
  });
});
```

### Nomenclatura
- Testes: `us-nome-funcionalidade.spec.ts`
- Pages: `page-nome.ts`
- Steps: `nome-steps.ts`

### Seletores Preferenciais
1. `text=` para textos visíveis
2. `data-testid=` para elementos com ID de teste
3. XPath apenas quando necessário
4. CSS selector como alternativa

## 🚀 Comandos que o Agente Conhece

```bash
npm run test              # Executa todos os testes
npm run test:ui          # Interface UI do Playwright
npm run report           # Abre relatório Allure
npm run test:clean       # Limpa resultados anteriores
npx playwright test <arquivo>  # Executa teste específico
```

## 💡 Dicas para Melhores Resultados

1. **Seja específico**: "Crie teste de login" vs "Crie teste que valida login com CPF e senha, verificando redirecionamento"
2. **Mencione contexto**: "Seguindo o padrão do us-login-auditor.spec.ts"
3. **Peça revisão**: "Revise o teste e sugira melhorias"
4. **Solicite execução**: "Execute o teste e mostre os resultados"

## 📈 Status da Demonstração

| Atividade | Status |
|-----------|--------|
| Criação do agente | ✅ Concluído |
| Definição de ferramentas | ✅ Concluído |
| Criação de teste exemplo | ✅ Concluído |
| Detecção de erros | ✅ Concluído |
| Correção automática | ✅ Concluído |
| Validação sem erros | ✅ Concluído |
| Execução do teste | 🔄 Em andamento |

---

**Pronto para usar!** 🎉

Digite `@agents.tests` seguido da sua solicitação para começar.
