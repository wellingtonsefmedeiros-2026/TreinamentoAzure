import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Acessa o módulo Conta Corrente";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_ACESSA_MODULO_CONTA_CORRENTE);
  });

  test('@ignore Cenário: Acessar Conta Corrente - Usuário autorizado', async ({ 
    utils,
    pageCommon, 
    pageContaCorrente, 
    commonSteps, 
    contaCorrenteSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.CRITICAL,
      "Verifica o comportamento ao acessar o módulo Conta Corrente com usuário autorizado"
    );
    
    // Dado
    await commonSteps.stepAcessarContaCorrenteUsuarioAutorizado(pageCommon);
    // Então
    await contaCorrenteSteps.stepValidarExibicaoTelaInicialContaCorrente(pageContaCorrente);
    // E
    await contaCorrenteSteps.stepEncerrarSessao(pageContaCorrente);
  });
});