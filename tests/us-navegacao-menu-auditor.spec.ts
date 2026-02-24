import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Navegação pelo Menu do Auditor Eletrônico";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
  });

  test('Cenário: Acessar menu Auditorias com sucesso', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Verifica se o usuário consegue acessar o menu Auditorias após login"
    );
    
    // Arrange (Dado)
    await auditorSteps.stepAcessarTelaLogin(pageAuditor);
    await auditorSteps.stepRealizarLoginComSucesso(
      pageAuditor, 
      Constants.AUDITOR_CPF_VALIDO, 
      Constants.AUDITOR_SENHA_VALIDA
    );
    
    // Act (Quando)
    await pageAuditor.acessarMenuAuditorias();
    
    // Assert (Então)
    await pageAuditor.utils.elementoEstaPresente(
      pageAuditor.menuRequisitar,
      'Submenu "Requisitar"',
      5000
    );
  });

  test('Cenário: Acessar menu Consultas > MDF-e', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Verifica se o usuário consegue navegar até a tela de consulta MDF-e"
    );
    
    // Arrange (Dado)
    await auditorSteps.stepAcessarTelaLogin(pageAuditor);
    await auditorSteps.stepRealizarLoginComSucesso(
      pageAuditor, 
      Constants.AUDITOR_CPF_VALIDO, 
      Constants.AUDITOR_SENHA_VALIDA
    );
    
    // Act (Quando)
    await pageAuditor.acessarMenuConsultas();
    await pageAuditor.clicarMenuMDFe();
    
    // Assert (Então)
    await pageAuditor.utils.elementoEstaPresente(
      pageAuditor.btnPesquisarMDFe,
      'Botão Pesquisar MDF-e'
    );
  });

  test('Cenário: Validar estrutura da página principal', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.TRIVIAL,
      "Verifica se todos os elementos principais estão presentes na tela inicial"
    );
    
    // Arrange (Dado)
    await auditorSteps.stepAcessarTelaLogin(pageAuditor);
    await auditorSteps.stepRealizarLoginComSucesso(
      pageAuditor, 
      Constants.AUDITOR_CPF_VALIDO, 
      Constants.AUDITOR_SENHA_VALIDA
    );
    
    // Act & Assert (Quando e Então)
    await pageAuditor.utils.elementoEstaPresente(
      pageAuditor.textoTelaPrincipal,
      'Texto da tela principal'
    );
    await pageAuditor.utils.elementoEstaPresente(
      pageAuditor.menuAuditorias,
      'Menu Auditorias'
    );
    await pageAuditor.utils.elementoEstaPresente(
      pageAuditor.menuConsultas,
      'Menu Consultas'
    );
  });
});
