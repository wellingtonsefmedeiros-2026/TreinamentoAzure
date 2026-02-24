import { test as base } from '@playwright/test';
import { PageCommon } from '@pages/page-common';
import { PageContaCorrente } from '@pages/page-conta-corrente';
import { PageAuditor } from '@pages/page-auditor';
import { CommonSteps } from '@steps/common-steps';
import { ContaCorrenteSteps } from '@steps/conta-corrente-steps';
import { AuditorSteps } from '@steps/auditor-steps';
import Utils from '@support/utils';

// Define os tipos das fixtures
type CustomFixtures = {
  pageCommon: PageCommon;
  pageContaCorrente: PageContaCorrente;
  pageAuditor: PageAuditor;
  commonSteps: CommonSteps;
  contaCorrenteSteps: ContaCorrenteSteps;
  auditorSteps: AuditorSteps;
  utils: Utils;
};

// Estende o test do Playwright com as fixtures customizadas
export const test = base.extend<CustomFixtures>({
  // Fixture para PageCommon
  pageCommon: async ({ page }, use) => {
    const pageCommon = new PageCommon(page);
    await use(pageCommon);
  },

  // Fixture para PageContaCorrente
  pageContaCorrente: async ({ page }, use) => {
    const pageContaCorrente = new PageContaCorrente(page);
    await use(pageContaCorrente);
  },

  // Fixture para CommonSteps
  commonSteps: async ({}, use) => {
    const commonSteps = new CommonSteps();
    await use(commonSteps);
  },

  // Fixture para ContaCorrenteSteps
  contaCorrenteSteps: async ({}, use) => {
    const contaCorrenteSteps = new ContaCorrenteSteps();
    await use(contaCorrenteSteps);
  },

  // Fixture para PageAuditor
  pageAuditor: async ({ page }, use) => {
    const pageAuditor = new PageAuditor(page);
    await use(pageAuditor);
  },

  // Fixture para AuditorSteps
  auditorSteps: async ({}, use) => {
    const auditorSteps = new AuditorSteps();
    await use(auditorSteps);
  },

  // Fixture para Utils
  utils: async ({ page }, use) => {
    const utils = new Utils(page);
    await use(utils);
  },
});

export { expect } from '@playwright/test';
