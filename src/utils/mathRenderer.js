import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Render LaTeX math expressions within text.
 * Supports $$...$$ for display math and $...$ for inline math.
 */
export function renderMathInText(text) {
  if (!text || typeof text !== 'string') return '';

  // First handle display math: $$...$$
  let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX display error:', e);
      return match;
    }
  });

  // Then handle inline math: $...$
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX inline error:', e);
      return match;
    }
  });

  return processed;
}

/**
 * Helper to render math into an existing DOM element
 */
export function renderMathElement(element) {
  if (!element) return;
  element.innerHTML = renderMathInText(element.innerHTML);
}
