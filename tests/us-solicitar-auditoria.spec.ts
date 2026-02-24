import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Solicitar Auditoria";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_SOLICITAR_AUDITORIA);
  });

  test('Cenário: Usuário solicita auditoria com sucesso', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Verifica o comportamento ao solicitar uma auditoria através do menu Auditorias > Requisitar"
    );
    
    // Dado
    await auditorSteps.stepUsuarioAutenticado(
      pageAuditor, 
      Constants.AUDITOR_CPF_VALIDO, 
      Constants.AUDITOR_SENHA_VALIDA
    );
    // Quando
    await auditorSteps.stepAcessarMenuRequisitarAuditoria(pageAuditor);
    // E
    await auditorSteps.stepClicarPesquisarContribuinte(pageAuditor);
    // Então
    // Aqui você pode adicionar validações específicas após clicar em Pesquisar Contribuinte
    // Por exemplo: validar que uma modal foi aberta, ou que uma nova tela foi carregada
  });
});
