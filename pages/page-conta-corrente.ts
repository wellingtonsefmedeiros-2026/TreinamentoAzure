import * as Constants from '@support/constants';
import Utils from '@support/utils';
import { Page } from '@playwright/test';
import { PageCommon } from '@pages/page-common';

export class PageContaCorrente {
    
  readonly page: Page;
  readonly utils: Utils;
  pageCommon: PageCommon;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
    this.pageCommon = new PageCommon(page);
  }

  //Selectors
  get btnConsultar() { return '.bg-sef-secondary-pure'; }
  get inputRenavam() { return '#material-input'; }
  get btnMenuUsuario() { return 'button.flex:nth-child(1)'; }

  async consultarRenavam(renavam: string): Promise<void> {
    await this.utils.preencherTexto(this.inputRenavam, renavam, 'Input do Renavam');
    await this.utils.clicarElemento(this.btnConsultar, 'Botão "Consultar"');

    this.utils.renavam = renavam;

    await this.utils.validarUrlAtualContemString(renavam);
  }

  async validarExibicaoTelaInicialContaCorrente(): Promise<void> {
    await this.utils.buscarPorTextoNaPagina(Constants.TEXTO_CONSULTA_CONTA_CORRENTE);
    await this.utils.elementoEstaPresente(this.inputRenavam, 'Input do Renavam');
    await this.utils.elementoEstaPresente(this.btnConsultar, 'Botão "Consultar"');
 }

 async encerrarSessao(): Promise<void> {
    await this.utils.clicarElemento(this.btnMenuUsuario, "Botão do Menu do Usuário");
    console.log('Encerrou a sessão com sucesso!');
  }
}