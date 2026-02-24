import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Define projeto padrão via variável de ambiente ou fallback para chromium
const defaultProject = process.env.PLAYWRIGHT_PROJECT || 'chromium';
 
export default defineConfig({
  testDir: './tests', // Onde os testes estão localizados
  testMatch: '**/*.spec.ts', // Executar apenas arquivos .spec.ts
  grepInvert: /@ignore/, // Ignorar testes marcados com @ignore
  retries: process.env.TF_BUILD ? 2 : 0, // Retries: em pipeline, tenta novamente para lidar com flakiness
  fullyParallel: true, // Executar todos os testes em paralelo (sem ordem fixa)
  workers: process.env.TF_BUILD ? 4 : 2, // Número de workers para execução paralela
  forbidOnly: !!process.env.TF_BUILD, //CRÍTICO: Falha o build se tiver test.only() esquecido
  maxFailures: process.env.TF_BUILD ? 10 : undefined, //Número máximo de falhas antes de parar a execução

  // Diretório para screenshots, videos, traces
  outputDir: './test-results',

  use: {
    baseURL: 'https://mf-ipva-conta-corrente-stg.faenna.fazenda.mg.gov.br',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: process.env.TF_BUILD ? 'on-first-retry' : 'off',
    viewport: { width: 1920, height: 1080 },
    headless: false,
    launchOptions: {
      args: ["--start-maximized"],
    },
  },

   reporter: process.env.TF_BUILD 
   ? [
      ['list'],
      ['html', { outputFolder: './test-results', open: 'never' }],
      ['allure-playwright', { outputFolder: './allure-results' }],
      ['json', { outputFile: './test-results/results.json' }],
      ['junit', { outputFile: './test-results/junit.xml' }]
    ]
  : [
      ['allure-playwright', { outputFolder: './allure-results' }],
      ['html', { outputFolder: './test-results', open: 'on-failure' }],
    ],

  timeout: 15000, // 15 segundos para cada teste
 
  // Configuração dos projetos - filtra pelo projeto padrão
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        deviceScaleFactor: undefined,
      },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'],
        deviceScaleFactor: undefined,
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 
    /* Testes para mobile (redimensionado) */
    {
      name: 'mobile_chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile_safari',
      use: { ...devices['iPhone 12'] },
    },
  ].filter(p => p.name === defaultProject),
});