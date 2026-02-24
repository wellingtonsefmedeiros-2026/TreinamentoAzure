import { test } from '@support/fixtures';
import { Severity } from 'allure-js-commons';
import * as Constants from '@support/constants';
import * as allure from 'allure-js-commons';

const user_story = "US - Pesquisar MDF-e pelo CNPJ/IE/CPF e Data de Emissão (RN07)";

test.describe(user_story, () => { 
  test.beforeEach(async () => {
    await allure.feature(user_story);
    await allure.issue(Constants.US_PESQUISAR_MDF_E_PELO_CNPJ_IE_CPF_E_DATA_DE_EMISSAO);
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

    // tela Menu

    test('Cenário: Validar mensagem ao Pesquisar MDF-e pelo CNPJ/IE/CPF e Data de Emissão (RN07) ', async ({ 
        utils,
        pageAuditor, 
        auditorSteps 
      }) => {
        await utils.definirParametrosAllureReport(
          Severity.NORMAL,
          "Verifica que o sistema exibe mensagem Pesquisar MDF-e pelo CNPJ/IE/CPF e Data de Emissão (RN07)"
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