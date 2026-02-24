// URLs
export const URL_IPVA_CONTA_CORRENTE = 'https://mf-ipva-conta-corrente-stg.faenna.fazenda.mg.gov.br';
export const URL_PORTAL_SERVICOS = 'https://mf-portal-servicos-stg.faenna.fazenda.mg.gov.br/';
export const URL_AUDITOR_ELETRONICO = process.env.URL_AUDITOR || '';

// Credenciais - IPVA Conta Corrente
export const USUARIO_AUTORIZADO = "01208163698";
export const USUARIO_NAO_AUTORIZADO = "04455462635";
export const SENHA_LOGIN_UNICO = "12345678";

// Credenciais - Auditor Eletrônico
export const AUDITOR_CPF_VALIDO = process.env.USERNAME || '';
export const AUDITOR_SENHA_VALIDA = process.env.PASSWORD || '';
export const AUDITOR_CPF_INVALIDO = process.env.USERNAME2 || '';
export const AUDITOR_SENHA_INVALIDA = process.env.PASSWORD2 || '';




// Textos
export const TEXTO_CONSULTA_CONTA_CORRENTE = "Consulta - Conta Corrente";
export const TEXTO_SAIR = "Sair";
export const RENAVAM_NAO_LOCALIZADO = "00304599867";
export const MSG_RENAVAM_NAO_LOCALIZADO = "Renavam não localizado";

// Textos - Auditor Eletrônico
export const TEXTO_ACESSO_AUDITOR = "Acesso ao Auditor Eletrônico";
export const TEXTO_CARGA_BASE_DADOS = "Informações sobre Carga na Base de Dados";
export const TEXTO_ACESSO_NEGADO = "Acesso Negado.";
export const MSG_FILTRO_OBRIGATORIO_MDFE = "Informe pelo menos um filtro antes de efetuar a pesquisa.";

// User Stories
export const US_ACESSA_MODULO_CONTA_CORRENTE = "https://dev.azure.com/SEF-MG/arrecadacao/_sprints/taskboard/Conta%20Corrente%20IPVA/arrecadacao/conta%20corrente%20IPVA/Sprint%200?workitem=10139";
export const US_APRESENTAR_DADOS_VEICULO = "https://dev.azure.com/SEF-MG/arrecadacao/_sprints/taskboard/Conta%20Corrente%20IPVA/arrecadacao/conta%20corrente%20IPVA/Sprint%201?workitem=13823";
export const US_PESQUISAR_MDF_E_PELO_CNPJ_IE_CPF_E_DATA_DE_EMISSAO = "https://dev.azure.com/SEF-MG/DSF/_boards/board/t/AEWEB%20Produto/Backlog%20items?workitem=64985";
export const US_LOGIN_AUDITOR_ELETRONICO = "https://dev.azure.com/SEF-MG/auditor-eletronico/_workitems";
export const US_SOLICITAR_AUDITORIA = "https://dev.azure.com/SEF-MG/auditor-eletronico/_workitems";
export const US_CONSULTA_MDFE = "https://dev.azure.com/SEF-MG/auditor-eletronico/_workitems";
// Timeouts (em milissegundos)
export const TIMEOUTS = {
  /** Timeout padrão para operações gerais (10 segundos) */
  DEFAULT: 10000,
  /** Timeout para preenchimento de formulários (15 segundos) */
  FORM_FILL: 15000,
  /** Timeout para navegação de páginas (60 segundos) */
  NAVIGATION: 60000,
  /** Timeout para validações de URL (10 segundos) */
  URL_VALIDATION: 10000,
  /** Timeout para carregamento de elementos pesados (30 segundos) */
  HEAVY_LOAD: 30000,
  /** Timeout curto para verificações rápidas (5 segundos) */
  SHORT: 5000,
} as const;