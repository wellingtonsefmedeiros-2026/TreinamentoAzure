import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = 'US - Apresentar os dados do veículo';

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_APRESENTAR_DADOS_VEICULO);
  });

  test('@ignore Cenário: Consultar Conta Corrente - Renavam não localizado', async ({ 
    utils,
    pageCommon,
    pageContaCorrente,
    commonSteps,
    contaCorrenteSteps
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Verifica comportamento ao realizar consulta por renavam não localizado"
    );

    // Dado
    await commonSteps.stepAcessarContaCorrenteUsuarioAutorizado(pageCommon);
    // Quando
    await contaCorrenteSteps.stepConsultarRenavam(pageContaCorrente, Constants.RENAVAM_NAO_LOCALIZADO);
    // Então
    await commonSteps.stepValidarExibicaoMensagem(pageCommon, Constants.MSG_RENAVAM_NAO_LOCALIZADO);
    // E
    await contaCorrenteSteps.stepEncerrarSessao(pageContaCorrente);
  });
});