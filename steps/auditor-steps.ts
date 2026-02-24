import { test } from '@playwright/test';
import { PageAuditor } from '@pages/page-auditor';
import * as Constants from '@support/constants';

export class AuditorSteps {

    // ========== STEPS - LOGIN ==========

    // Dado que o usuário está na tela de login do Auditor Eletrônico
    async stepAcessarTelaLogin(pageAuditor: PageAuditor) {
        await test.step('Dado que o usuário está na tela de login do Auditor Eletrônico', async () => {
            await pageAuditor.utils.acessarUrl(Constants.URL_AUDITOR_ELETRONICO);
            await pageAuditor.utils.buscarPorTextoNaPagina(Constants.TEXTO_ACESSO_AUDITOR);
        });
    }

    // Quando o usuário realiza login com credenciais válidas
    async stepRealizarLoginComSucesso(pageAuditor: PageAuditor, cpf: string, senha: string) {
        await test.step('Quando o usuário realiza login com credenciais válidas', async () => {
            await pageAuditor.realizarLogin(cpf, senha);
        });
    }

    // Quando o usuário realiza login com credenciais inválidas
    async stepRealizarLoginComCredenciaisInvalidas(pageAuditor: PageAuditor, cpf: string, senha: string) {
        await test.step('Quando o usuário realiza login com credenciais inválidas', async () => {
            await pageAuditor.realizarLogin(cpf, senha);
        });
    }

    // Então deve visualizar a tela principal do sistema
    async stepValidarTelaPrincipal(pageAuditor: PageAuditor) {
        await test.step('Então deve visualizar a tela principal do sistema', async () => {
            await pageAuditor.validarLoginComSucesso();
        });
    }

    // Então deve visualizar mensagem de acesso negado
    async stepValidarAcessoNegado(pageAuditor: PageAuditor) {
        await test.step('Então deve visualizar mensagem de acesso negado', async () => {
            await pageAuditor.validarAcessoNegado();
        });
    }

    // Dado que o usuário está autenticado no sistema
    async stepUsuarioAutenticado(pageAuditor: PageAuditor, cpf: string, senha: string) {
        await test.step('Dado que o usuário está autenticado no sistema', async () => {
            await pageAuditor.realizarLogin(cpf, senha);
            await pageAuditor.validarLoginComSucesso();
        });
    }

    // ========== STEPS - AUDITORIA ==========

    // Quando acessa o menu Auditorias e clica em Requisitar
    async stepAcessarMenuRequisitarAuditoria(pageAuditor: PageAuditor) {
        await test.step('Quando acessa o menu Auditorias e clica em Requisitar', async () => {
            await pageAuditor.acessarMenuAuditorias();
            await pageAuditor.clicarRequisitar();
        });
    }

    // E clica no botão Pesquisar Contribuinte
    async stepClicarPesquisarContribuinte(pageAuditor: PageAuditor) {
        await test.step('E clica no botão Pesquisar Contribuinte', async () => {
            await pageAuditor.clicarPesquisarContribuinte();
        });
    }

    // ========== STEPS - MDF-e ==========

    // Quando acessa o menu Consultas e clica em MDF-e
    async stepAcessarMenuConsultaMDFe(pageAuditor: PageAuditor) {
        await test.step('Quando acessa o menu Consultas e clica em MDF-e', async () => {
            await pageAuditor.acessarMenuConsultas();
            await pageAuditor.clicarMenuMDFe();
        });
    }

    // E clica no botão Pesquisar sem informar filtros
    async stepClicarPesquisarSemFiltros(pageAuditor: PageAuditor) {
        await test.step('E clica no botão Pesquisar sem informar filtros', async () => {
            await pageAuditor.clicarPesquisarMDFe();
        });
    }

    // Então deve exibir mensagem informando que é necessário informar filtros
    async stepValidarMensagemFiltroObrigatorio(pageAuditor: PageAuditor) {
        await test.step('Então deve exibir mensagem informando que é necessário informar filtros', async () => {
            await pageAuditor.validarMensagemFiltroObrigatorio();
        });
    }
}
