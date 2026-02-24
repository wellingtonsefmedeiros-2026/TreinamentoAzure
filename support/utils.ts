import { expect, Locator, Page } from '@playwright/test';
import * as allure from "allure-js-commons";
import { Severity } from 'allure-js-commons';
import { TIMEOUTS } from '@support/constants';

export default class Utils {
  
  renavam?: string;
  
  constructor(private page: Page) {}
 
  async acessarUrl(url: string): Promise<void> {
    try {
      await this.page.goto(url, { timeout: TIMEOUTS.NAVIGATION, waitUntil: 'load' });
      console.log(`Navegou para a URL: ${url}`);
    } 
    catch (error) {
      console.error(`Erro ao navegar para a URL: ${url}`, error);
      throw error;
    }
}

  async alterarJanelaPorURL(url: string): Promise<void> {
  try {
    const pages = this.page.context().pages();
    for (const p of pages) {
      if (p.url() === url) {
        await p.bringToFront();
        console.log(`Alterou o foco para janela que possui a url ${url}`);
        return;
      }
    }
    throw new Error(`Nenhuma janela encontrada com a URL: ${url}`);
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar mudar o foco para janela que possui a url ${url}`, error);
    throw error;
  }
}

  async buscarPorTextoNaPagina(texto: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  try {
    await expect(this.page.getByText(texto, { exact: false }).first()).toBeVisible({ timeout });
    console.log(`Texto "${texto}" encontrado na página.`);
  } catch (error) {
    throw new Error(`Texto "${texto}" NÃO encontrado na página dentro do timeout de ${timeout}ms.`);
  }
}

  async clicarElemento(selector: string, nome_elemento: string): Promise<void> {
    try {
      let element: Locator;
      
      // Verifica se é um getByRole
      if (selector.startsWith("getByRole('")) {
        const roleMatch = selector.match(/getByRole\('(\w+)',\s*\{\s*name:\s*'([^']+)'\s*\}\)/);
        if (roleMatch) {
          const [, role, name] = roleMatch;
          element = this.page.getByRole(role as any, { name });
        } else {
          throw new Error(`Formato de getByRole inválido: ${selector}`);
        }
      } else {
        // Selector tradicional
        await this.page.waitForSelector(selector, { state: 'visible', timeout: TIMEOUTS.DEFAULT });
        element = this.page.locator(selector).first();
      }
      
      await element.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      await expect(element).toBeVisible({ timeout: TIMEOUTS.DEFAULT });
      await element.click({ timeout: TIMEOUTS.DEFAULT });
      
      console.log(`Clicou no elemento: ${selector} | ${nome_elemento}`);
    }
    catch (error) {
      console.error(`Erro ao clicar no elemento: ${selector} | ${nome_elemento}`, error);
      throw error;
    }
}

  async contemTextoPresentePorElemento(selector: string, texto: string, timeout: number = TIMEOUTS.DEFAULT): Promise<boolean> {
  const msg = `O texto "${texto}" não está presente na propriedade text do elemento "${selector}"`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const elemento = await this.page.locator(selector).first();
    const elementoTexto = await elemento.textContent();
    if (elementoTexto && elementoTexto.includes(texto)) {
      console.log(`O texto "${texto}" está presente na propriedade text do elemento "${selector}"`);
      return true;
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return false;
  }
}

  async definirParametrosAllureReport(severity: Severity, description : string): Promise<void> {
    await allure.severity(severity);
    await allure.description(description);
}

  async elementoEstaDesabilitado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<boolean> {
  const msg = `O elemento "${nomeElemento}" (${selector}) não está desabilitado`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const isEnabled = await this.page.locator(selector).first().isEnabled();
    if (!isEnabled) {
      console.log(`Garante que o elemento "${nomeElemento}" está desabilitado | ${selector}`);
      return true;
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return false;
  }
}

  async elementoEstaHabilitado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O componente "${nomeElemento}" (${selector}) não está habilitado`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const isEnabled = await this.page.locator(selector).first().isEnabled();
    if (isEnabled) {
      console.log(`Garante que o elemento "${nomeElemento}" está habilitado | ${selector}`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoEstaPresente(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      console.log(`Elemento "${nomeElemento}" está presente e visível.`);
  } catch (error) {
      throw new Error(`Elemento "${nomeElemento}" NÃO está presente ou visível dentro do timeout de ${timeout}ms.`);
  }
}

  async elementoNaoEstaPresente(selector: string, nomeElemento: string): Promise<void> {
  try {
    const count = await this.page.locator(selector).count();
    if (count === 0) {
      console.log(`Garante que o elemento "${nomeElemento}" não está presente na tela | ${selector}`);
    } else {
      throw new Error(`Elemento "${nomeElemento}" está presente na tela, porém não deveria | ${selector}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoEstaSelecionado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O elemento "${nomeElemento}" (${selector}) não está selecionado, mas deveria`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const isChecked = await this.page.locator(selector).first().isChecked();
    if (isChecked) {
      console.log(`Garante que o elemento "${nomeElemento}" está selecionado | ${selector}`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoNaoEstaSelecionado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O elemento "${nomeElemento}" (${selector}) está selecionado, mas não deveria`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const isChecked = await this.page.locator(selector).first().isChecked();
    if (!isChecked) {
      console.log(`Garante que o elemento "${nomeElemento}" não está selecionado | ${selector}`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoPossuiTextoDiferenteDeVazio(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O elemento "${nomeElemento}" (${selector}) não possui texto em sua propriedade text`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const texto = await this.page.locator(selector).first().textContent();
    if (texto && texto.trim() !== '') {
      console.log(`Garante que o elemento "${nomeElemento}" possui texto diferente de vazio | ${selector}`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoEstaTachado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O elemento "${nomeElemento}" (${selector}) não está tachado, mas deveria`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const textDecoration = await this.page.locator(selector).first().evaluate(
      el => window.getComputedStyle(el).textDecorationLine
    );
    if (textDecoration === 'line-through') {
      console.log(`O elemento "${nomeElemento}" está tachado.`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(`${msg} |`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  async elementoNaoEstaTachado(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O elemento "${nomeElemento}" (${selector}) está tachado, mas não deveria`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const textDecoration = await this.page.locator(selector).first().evaluate(
      el => window.getComputedStyle(el).textDecorationLine
    );
    if (!textDecoration.includes('line-through')) {
      console.log(`O elemento "${nomeElemento}" não está tachado.`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(`${msg} |`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  static gerarDataHoraAtual(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes())
  );
}

  static gerarDataAtual(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
}

  static retornarAnoAtual(): string {
  return new Date().getFullYear().toString();
}

  async preencherTexto(selector: string, texto: string, nome_elemento: string, timeout: number = TIMEOUTS.FORM_FILL): Promise<void> {
  try {
    const elemento = await this.page.waitForSelector(selector, { state: 'visible', timeout });
    if (elemento) {
      await this.page.locator(selector).first().fill(texto);
      console.log(`Preencheu o campo: ${selector} com o texto: ${texto} | ${nome_elemento}`);
    } else {
      throw new Error(`Elemento "${nome_elemento}" (${selector}) não está disponível ou visível para preenchimento.`);
    }
  }
  catch (error) {
    console.error('Erro ao preencher o campo:', error);
    throw error;
  }
}

  async preencherTextoComandoJavaScript(selector: string, script: string, texto: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  try {
    // exemplo de script: document.getElementById('form').style=''
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    // Executa o script JavaScript na página
    await this.page.evaluate(script);
    // Limpa o campo e preenche o texto
    const elemento = this.page.locator(selector).first();
    await elemento.fill(''); // Limpa o campo
    await elemento.fill(texto); // Preenche o texto
    console.log(`Preenche o texto "${texto}" no elemento "${nomeElemento}" com o comando JavaScript "${script}" | ${selector}`);
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar preencher o texto "${texto}" no elemento "${nomeElemento}" (${selector}) utilizando o script "${script}":`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  async mouseOverNoElemento(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    await this.page.locator(selector).first().hover();
    console.log(`Realiza ação de mouseOver no elemento | ${nomeElemento} | ${selector}`);
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar realizar ação de mouse over no elemento ${nomeElemento} (${selector}) |`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  async mouseScrollBuscaElemento(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
    try {
      const elemento = await this.page.waitForSelector(selector, { state: 'visible', timeout });
      await elemento.scrollIntoViewIfNeeded();
      console.log(`Fez scroll até o elemento "${nomeElemento}" (${selector})`);
  } catch (error) {
      throw new Error(`Não foi possível fazer scroll até o elemento "${nomeElemento}" (${selector}) dentro do timeout de ${timeout}ms.`);
  }
}

  async mouseScrollDown(): Promise<void> {
  try {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    console.log("Realiza ação de scroll para baixo");
  } catch (error) {
    console.error("Ocorreu um erro ao tentar realizar scroll para baixo", error instanceof Error ? error.message : error);
    throw error;
  }
}

  async mouseScrollUp(): Promise<void> {
  try {
    await this.page.evaluate(() => window.scrollBy(0, -250));
    console.log("Realiza ação de scroll para cima");
  } catch (error) {
    console.error("Ocorreu um erro ao tentar realizar scroll para cima", error instanceof Error ? error.message : error);
    throw error;
  }
}

  async naoContemTextoPresentePorElemento(selector: string, texto: string, timeout: number = TIMEOUTS.DEFAULT): Promise<boolean> {
  const msg = `O texto "${texto}" não deveria estar presente na propriedade text do elemento "${selector}"`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const elemento = await this.page.locator(selector).first();
    const elementoTexto = await elemento.textContent();
    if (!elementoTexto || !elementoTexto.includes(texto)) {
      console.log(`O texto "${texto}" corretamente não está presente na propriedade text do elemento "${selector}"`);
      return true;
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return false;
  }
}

  async pressionarTecla(tecla: string): Promise<void> {
  try {
    await this.page.keyboard.press(tecla);
    console.log("Tecla pressionada com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro ao tentar pressionar uma tecla |", error instanceof Error ? error.message : error);
    throw error;
  }
}

  async refreshPagina(): Promise<void> {
  try {
    await this.page.reload();
    console.log(`Realiza refresh na página atual: ${this.page.url()}`);
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar realizar refresh na página atual: ${this.page.url()} |`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  retornarQuantidadeGuiasAbertas(): number {
  try {
    const qtdJanelas = this.page.context().pages().length;
    console.log(`A quantidade de guias abertas é: ${qtdJanelas}`);
    return qtdJanelas;
  } catch (error) {
    console.error("Ocorreu um erro ao tentar obter a quantidade de guias abertas |", error instanceof Error ? error.message : error);
    return 0;
  }
}

  static retornarStringRandomica(qtdCaracteres: number): string {
    const alphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
    let result = "";
    for (let i = 0; i < qtdCaracteres; i++) {
      const index = Math.floor(Math.random() * alphaNumericString.length);
      result += alphaNumericString.charAt(index);
    }
    return result;
}

  async retornarTextoDeUmElemento(selector: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<string | null> {
  let textoElemento: string | null = null;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    textoElemento = await this.page.locator(selector).first().textContent();
    console.log(`Retorna o texto do elemento ${nomeElemento} | ${selector}`);
    return textoElemento;
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar obter o texto do componente ${nomeElemento} (${selector}) |`, error instanceof Error ? error.message : error);
    return textoElemento;
  }
}

  async retornarUrlAtual(): Promise<string | null> {
  try {
    const urlAtual = this.page.url();
    console.log(`Retorna a url atual: ${urlAtual}`);
    return urlAtual;
  } catch (error) {
    console.error("Ocorreu um erro ao tentar obter a url atual", error instanceof Error ? error.message : error);
    return null;
  }
}

  async textoNaoPresenteNaPagina(texto: string): Promise<void> {
  const msg = `O texto "${texto}" está presente na página atual e não deveria estar`;
  try {
    // Aguarda até que o texto não esteja presente (timeout curto para evitar espera longa)
    const isPresente = await this.page.locator(`text=${texto}`).count();
    if (isPresente > 0) {
      throw new Error(msg);
    }
    console.log(`Garante que o texto "${texto}" não está presente na página atual`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async textoPresentePorElemento(selector: string, textoEsperado: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  const msg = `O texto esperado: "${textoEsperado}" não foi encontrado no elemento "${nomeElemento}" | ${selector}`;
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    const textoElemento = await this.page.locator(selector).first().textContent();
    if (textoElemento?.trim() === textoEsperado) {
      console.log(`Garante que o texto "${textoEsperado}" está presente no elemento "${nomeElemento}" | ${selector}`);
    } else {
      throw new Error(msg);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}

  async uploadArquivo(selector: string, filePath: string, nomeElemento: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
  try {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    await this.page.setInputFiles(selector, filePath);
    console.log(`Anexou o arquivo ${filePath} no elemento ${nomeElemento} | ${selector}`);
  } catch (error) {
    console.error(`Ocorreu um erro ao tentar anexar o arquivo ${filePath} no elemento ${nomeElemento} | ${selector} |`, error instanceof Error ? error.message : error);
    throw error;
  }
}

  async validarTituloPagina(tituloEsperado: string, timeout: number = TIMEOUTS.DEFAULT): Promise<void> {
    const msg = `A página atual não possui o título esperado "${tituloEsperado}"`;
    try {
      // Aguarda até que o título da página seja o esperado
      await this.page.waitForFunction(
        (expectedTitle) => document.title === expectedTitle,
        tituloEsperado,
        { timeout }
      );
      console.log(`Garante que a página possui o título: ${tituloEsperado}`);
    } 
    catch (error) {
      const tituloAtual = await this.page.title();
      const errorMsg = `${msg}. Título atual: "${tituloAtual}"`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  async validarUrlAtualContemString(trechoUrl: string, timeout: number = TIMEOUTS.URL_VALIDATION): Promise<void> {
    try {
      // Aguarda até que a URL contenha o texto esperado
      await this.page.waitForURL(`**/*${trechoUrl}*`, { timeout });
      const urlAtual = this.page.url();
      console.log(`Garante que a URL atual contém o texto "${trechoUrl}". URL atual: ${urlAtual}`);
    } 
    catch (error) {
      const urlAtual = this.page.url();
      const msg = `A URL atual não contém o texto "${trechoUrl}" após ${timeout}ms. URL atual: ${urlAtual}`;
      console.error(msg);
      throw new Error(msg);
    }
  }
}