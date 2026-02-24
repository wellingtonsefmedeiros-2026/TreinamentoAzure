import Utils from "@support/utils";
import * as Constants from '@support/constants';
import { Page } from "@playwright/test";

export class PageCommon {
  
  readonly page: Page;
  readonly utils: Utils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
  }

  //Selectors
  get usuarioLoginUnico() { return '[name="username"]';}
  get senhaLoginUnico() { return '[name="password"]'; }
  get btnEntrarLoginUnico() { return '[name="login"]'; }
    
  async realizarLoginUnico(autorizado: boolean): Promise<void> {
    await this.utils.acessarUrl(Constants.URL_IPVA_CONTA_CORRENTE);

    const usuario = autorizado ? Constants.USUARIO_AUTORIZADO : Constants.USUARIO_NAO_AUTORIZADO;

    await this.utils.preencherTexto(this.usuarioLoginUnico, usuario, 'Input no Login Único', 15000);
    await this.utils.preencherTexto(this.senhaLoginUnico, Constants.SENHA_LOGIN_UNICO, 'Senha no Login Único');
    await this.utils.clicarElemento(this.btnEntrarLoginUnico, 'Botão "Entrar" no Login Único');
  }

  async validarSeMensagemFoiExibida(msg: string) {
      await this.utils.buscarPorTextoNaPagina(msg);
  }
}