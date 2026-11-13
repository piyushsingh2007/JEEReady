import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROMIUM_PATH = '/usr/bin/chromium';
const URL = 'http://127.0.0.1:5173/';

async function run() {
  console.log('Launching Chromium from:', CHROMIUM_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Dashboard Preview
  await page.goto(URL + '#dashboard', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.dash-container');
  await page.screenshot({ path: 'dashboard-preview.png' });
  console.log('Saved dashboard-preview.png');

  // 2. Instructions Preview
  await page.goto(URL + '#instructions?test=full-mock-1', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.instructions-panel');
  await page.screenshot({ path: 'instructions-preview.png' });
  console.log('Saved instructions-preview.png');

  // 3. Desktop Exam Preview: 1280x800
  await page.goto(URL + '#exam?test=full-mock-1', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.cbt-exam-wrapper');

  // Question 1: Select Option B (index 1), click Save & Next
  const options = await page.$$('.cbt-option-row');
  if (options.length > 1) {
    await options[1].click();
  }
  await page.click('#btn-save-next');
  await new Promise(r => setTimeout(r, 400));

  // Question 2: Click Mark for Review & Next
  await page.click('#btn-mark-next');
  await new Promise(r => setTimeout(r, 400));

  // Question 3: Select Option A (index 0), then Mark for Review (Answered + Marked)
  const optionsQ3 = await page.$$('.cbt-option-row');
  if (optionsQ3.length > 0) {
    await optionsQ3[0].click();
  }
  await page.click('#btn-mark-next');
  await new Promise(r => setTimeout(r, 400));

  // Save Desktop Preview showing the 5 states in action
  await page.screenshot({ path: 'desktop-cbt-preview.png' });
  console.log('Saved desktop-cbt-preview.png (1280x800)');

  // 4. Switch to Numeric Section (Section B)
  const numericTab = await page.$('.cbt-sec-tab[data-section="B"]');
  if (numericTab) {
    await numericTab.click();
    await new Promise(r => setTimeout(r, 400));
  }
  await page.screenshot({ path: 'desktop-numeric-preview.png' });
  console.log('Saved desktop-numeric-preview.png (Numerical Question)');

  // 5. Tablet Width Preview: 768x1024
  await page.setViewport({ width: 768, height: 1024 });
  const mcqTab = await page.$('.cbt-sec-tab[data-section="A"]');
  if (mcqTab) {
    await mcqTab.click();
    await new Promise(r => setTimeout(r, 400));
  }
  await page.screenshot({ path: 'tablet-cbt-preview.png' });
  console.log('Saved tablet-cbt-preview.png (768x1024)');

  // 6. Test Submit Confirmation Dialog
  await page.setViewport({ width: 1280, height: 800 });
  await page.click('#sidebar-submit-btn');
  await page.waitForSelector('.cbt-modal-backdrop');
  await page.screenshot({ path: 'submit-modal-preview.png' });
  console.log('Saved submit-modal-preview.png');

  // 7. Confirm Submit to view Result Screen
  await page.click('#submit-modal-confirm-btn');
  await new Promise(r => setTimeout(r, 600));
  await page.waitForSelector('.results-panel');
  await page.screenshot({ path: 'results-preview.png' });
  console.log('Saved results-preview.png');

  await browser.close();
  console.log('All automated browser tests and previews completed successfully!');
}

run().catch(err => {
  console.error('Error running test script:', err);
  process.exit(1);
});
