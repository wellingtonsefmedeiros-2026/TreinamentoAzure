import Utils from "@support/utils";
import * as Constants from '@support/constants';
import { Page } from "@playwright/test";

export class PageAuditor {
  
  readonly page: Page;
  readonly utils: Utils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
  }

  // ========== SELECTORS - LOGIN ==========
  //get inputCPF() { return '[name="cpf"]'; }
  get inputCPF() { return '//*[@id="form:username"]'; }
  //get inputSenha() { return '[name="senha"]'; }
  get inputSenha() { return '//*[@id="form:password"]'; }
  get btnAcessar() { return 'a:has-text("Acessar")'; }
  get textoTelaLogin() { return 'text=Acesso ao Auditor Eletrônico'; }
  get textoTelaPrincipal() { return 'text=Informações sobre Carga na Base de Dados'; }
  get textoAcessoNegado() { return 'text=Acesso Negado.'; }

  // ========== SELECTORS - MENU ==========
  get menuAuditorias() { return 'xpath=//*[@id="form"]/div[1]/div/div[2]/ul/li[4]/a'; }
  get menuRequisitar() { return 'a:has-text("Requisitar")'; }
  get menuConsultas() { return '//a[normalize-space()="Consultas"]'; }
  get menuMDFe() { return '//a[normalize-space()="MDF-e"]'; }

  // ========== SELECTORS - AUDITORIA ==========
  get btnPesquisarContribuinte() { return 'xpath=//*[@id="btPesquisarContribuinte"]'; }

  // ========== SELECTORS - MDF-e ==========
  get btnPesquisarMDFe() { return '//*[@id="form:pesquisarMdfe"]'; }
  get msgFiltroObrigatorio() { return 'text=Informe pelo menos um filtro antes de efetuar a pesquisa.'; }

  // ========== ACTIONS - LOGIN ==========
  async realizarLogin(cpf: string, senha: string): Promise<void> {
    await this.utils.acessarUrl(Constants.URL_AUDITOR_ELETRONICO);
    await this.utils.elementoEstaPresente(this.textoTelaLogin, 'Tela de Login', 15000);
    await this.utils.preencherTexto(this.inputCPF, cpf, 'CPF', 15000);
    await this.utils.preencherTexto(this.inputSenha, senha, 'Senha');
    await this.utils.clicarElemento(this.btnAcessar, 'Botão "Acessar"');
  }

  async validarLoginComSucesso(): Promise<void> {
    await this.utils.buscarPorTextoNaPagina(Constants.TEXTO_CARGA_BASE_DADOS, 20000);
  }

  async validarAcessoNegado(): Promise<void> {
    await this.utils.buscarPorTextoNaPagina(Constants.TEXTO_ACESSO_NEGADO, 10000);
  }

  // ========== ACTIONS - MENU ==========
  async acessarMenuAuditorias(): Promise<void> {
    await this.page.locator(this.menuAuditorias).hover();
  }

  async clicarRequisitar(): Promise<void> {
    await this.utils.clicarElemento(this.menuRequisitar, 'Menu "Requisitar"');
  }

  async acessarMenuConsultas(): Promise<void> {
    await this.page.locator(this.menuConsultas).hover();
  }

  async clicarMenuMDFe(): Promise<void> {
    await this.utils.clicarElemento(this.menuMDFe, 'Menu "MDF-e"');
  }

  // ========== ACTIONS - AUDITORIA ==========
  async clicarPesquisarContribuinte(): Promise<void> {
    await this.utils.clicarElemento(this.btnPesquisarContribuinte, 'Botão "Pesquisar Contribuinte"');
  }

  // ========== ACTIONS - MDF-e ==========
  async clicarPesquisarMDFe(): Promise<void> {
    await this.utils.clicarElemento(this.btnPesquisarMDFe, 'Botão "Pesquisar MDF-e"');
  }

  async validarMensagemFiltroObrigatorio(): Promise<void> {
    await this.utils.buscarPorTextoNaPagina(Constants.MSG_FILTRO_OBRIGATORIO_MDFE, 10000);
  }
}
