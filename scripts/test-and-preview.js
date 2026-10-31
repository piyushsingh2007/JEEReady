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

  // 1. Desktop Preview: 1280x800
  await page.setViewport({ width: 1280, height: 800 });
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

  // Question 3: Select Option A (index 0), then we need Save & Mark. But let's check:
  // In the minimal UI, the bottom bar has: [ Mark for Review & Next ] [ Clear Response ] ... [ Save & Next ]
  // When an option is selected and user clicks "Mark for Review & Next", our code marks it as 'answered_marked' (purple circle with green dot)!
  const optionsQ3 = await page.$$('.cbt-option-row');
  if (optionsQ3.length > 0) {
    await optionsQ3[0].click();
  }
  await page.click('#btn-mark-next'); // Answered + Mark for Review
  await new Promise(r => setTimeout(r, 400));

  // Save Desktop Preview showing the 5 states in action
  await page.screenshot({ path: 'desktop-cbt-preview.png' });
  console.log('Saved desktop-cbt-preview.png (1280x800)');

  // 2. Switch to Numeric Section (Section B)
  const numericTab = await page.$('.cbt-sec-tab[data-section="B"]');
  if (numericTab) {
    await numericTab.click();
    await new Promise(r => setTimeout(r, 400));
  }
  await page.screenshot({ path: 'desktop-numeric-preview.png' });
  console.log('Saved desktop-numeric-preview.png (Numerical Question)');

  // 3. Tablet Width Preview: 768x1024
  await page.setViewport({ width: 768, height: 1024 });
  // Switch back to MCQ Single
  const mcqTab = await page.$('.cbt-sec-tab[data-section="A"]');
  if (mcqTab) {
    await mcqTab.click();
    await new Promise(r => setTimeout(r, 400));
  }
  await page.screenshot({ path: 'tablet-cbt-preview.png' });
  console.log('Saved tablet-cbt-preview.png (768x1024)');

  // 4. Smaller tablet width (650x900) to ensure palette remains visible beside question
  await page.setViewport({ width: 650, height: 900 });
  await page.screenshot({ path: 'tablet-650px-preview.png' });
  console.log('Saved tablet-650px-preview.png (650x900)');

  // 5. Test Submit Confirmation Dialog
  await page.setViewport({ width: 1280, height: 800 });
  await page.click('#sidebar-submit-btn');
  await page.waitForSelector('.cbt-modal-backdrop');
  await page.screenshot({ path: 'submit-modal-preview.png' });
  console.log('Saved submit-modal-preview.png');

  // Confirm Submit to view Result Screen
  await page.click('#submit-modal-confirm-btn');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'results-preview.png' });
  console.log('Saved results-preview.png');

  await browser.close();
  console.log('All automated browser tests and previews completed successfully!');
}

run().catch(err => {
  console.error('Error running test script:', err);
  process.exit(1);
});
