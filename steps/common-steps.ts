import { test } from '@playwright/test';
import { PageCommon } from '@pages/page-common';

export class CommonSteps {

    // Dado que acesse o módulo de IPVA Conta Corrente com usuário autorizado
    async stepAcessarContaCorrenteUsuarioAutorizado(pageCommon: PageCommon) {
        await test.step('Dado que acesse o módulo de IPVA Conta Corrente com usuário autorizado', async () => {
            await pageCommon.realizarLoginUnico(true);
        });
    }

    // Então deverá exibir a mensagem "${msg}"
    async stepValidarExibicaoMensagem(pageCommon: PageCommon, msg: string) {
        await test.step(`Então deverá exibir a mensagem "${msg}"`, async () => {
            await pageCommon.validarSeMensagemFoiExibida(msg);
        });
    }
}