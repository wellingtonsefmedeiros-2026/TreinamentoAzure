import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Login no Auditor Eletrônico";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_LOGIN_AUDITOR_ELETRONICO);
  });

  test('Cenário: Login com sucesso - Usuário autorizado', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.CRITICAL,
      "Verifica o comportamento ao realizar login com credenciais válidas no Auditor Eletrônico"
    );
    
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

  test('Cenário: Login sem sucesso - Acesso negado', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.CRITICAL,
      "Verifica o comportamento ao tentar realizar login com credenciais inválidas"
    );
    
    // Dado
    await auditorSteps.stepAcessarTelaLogin(pageAuditor);
    // Quando
    await auditorSteps.stepRealizarLoginComCredenciaisInvalidas(
      pageAuditor, 
      Constants.AUDITOR_CPF_INVALIDO, 
      Constants.AUDITOR_SENHA_INVALIDA
    );
    // Então
    await auditorSteps.stepValidarAcessoNegado(pageAuditor);
  });
});
