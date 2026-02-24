import { test } from '@playwright/test';
import { PageContaCorrente } from '@pages/page-conta-corrente'; 

export class ContaCorrenteSteps {
    
    // Então deverá exibir a tela inicial do Conta Corrente
    async stepValidarExibicaoTelaInicialContaCorrente(pageContaCorrente: PageContaCorrente) {
        await test.step('Então deverá exibir a tela inicial do Conta Corrente', async () => {
            await pageContaCorrente.validarExibicaoTelaInicialContaCorrente();
        });
    }

    // E deverá ser possível deslogar do sistema
    async stepEncerrarSessao(pageContaCorrente: PageContaCorrente) {
        await test.step('E deverá ser possível deslogar do sistema', async () => {
            await pageContaCorrente.encerrarSessao();
        });
    }

    // Quando realizar a consulta pelo renavam "${renavam}"
    async stepConsultarRenavam(pageContaCorrente: PageContaCorrente, renavam: string) {
        await test.step(`Quando realizar a consulta pelo renavam "${renavam}"`, async () => {
            await pageContaCorrente.consultarRenavam(renavam);
        });
    }
}