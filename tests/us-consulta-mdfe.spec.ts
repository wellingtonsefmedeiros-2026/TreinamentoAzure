import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Consulta MDF-e (Manifesto de Documentos Fiscais)";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_CONSULTA_MDFE);
  });

  test('Cenário: Validar mensagem de filtro obrigatório ao pesquisar MDF-e sem filtros', async ({ 
    utils,
    pageAuditor, 
    auditorSteps 
  }) => {
    await utils.definirParametrosAllureReport(
      Severity.NORMAL,
      "Verifica que o sistema exibe mensagem informando que é necessário preencher pelo menos um filtro antes de pesquisar MDF-e"
    );
    
    // Dado
    await auditorSteps.stepUsuarioAutenticado(
      pageAuditor, 
      Constants.AUDITOR_CPF_VALIDO, 
      Constants.AUDITOR_SENHA_VALIDA
    );
    // Quando
    await auditorSteps.stepAcessarMenuConsultaMDFe(pageAuditor);
    // E
    await auditorSteps.stepClicarPesquisarSemFiltros(pageAuditor);
    // Então
    await auditorSteps.stepValidarMensagemFiltroObrigatorio(pageAuditor);
  });
});
