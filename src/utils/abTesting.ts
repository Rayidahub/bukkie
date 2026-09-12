/**
 * A/B Testing Framework
 * Simple yet powerful A/B testing utility
 */

export interface ABTest {
  id: string;
  name: string;
  variants: ABVariant[];
  startDate: number;
  endDate?: number;
  isActive: boolean;
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // Percentage weight (0-100)
  component?: React.ComponentType;
  data?: any;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  timestamp: number;
  metadata?: any;
}

const AB_STORAGE_KEY = 'portfolio_ab_tests';
const AB_RESULTS_KEY = 'portfolio_ab_results';

/**
 * Get or assign user to a variant
 */
export function getVariant(test: ABTest): ABVariant {
  const stored = localStorage.getItem(`${AB_STORAGE_KEY}_${test.id}`);
  
  if (stored) {
    const variantId = stored;
    const variant = test.variants.find(v => v.id === variantId);
    if (variant) return variant;
  }

  // Assign variant based on weights
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      localStorage.setItem(`${AB_STORAGE_KEY}_${test.id}`, variant.id);
      return variant;
    }
  }

  // Fallback to first variant
  return test.variants[0];
}

/**
 * Record conversion/event for A/B test
 */
export function recordConversion(testId: string, variantId: string, metadata?: any): void {
  const results: ABTestResult[] = JSON.parse(localStorage.getItem(AB_RESULTS_KEY) || '[]');
  
  results.push({
    testId,
    variantId,
    timestamp: Date.now(),
    metadata,
  });

  localStorage.setItem(AB_RESULTS_KEY, JSON.stringify(results));

  // Log in development
  if (import.meta.env.DEV) {
    console.log('A/B Test Conversion:', { testId, variantId, metadata });
  }
}

/**
 * Get test results
 */
export function getTestResults(testId: string): ABTestResult[] {
  const results: ABTestResult[] = JSON.parse(localStorage.getItem(AB_RESULTS_KEY) || '[]');
  return results.filter(r => r.testId === testId);
}

/**
 * Calculate conversion rate for a variant
 */
export function getConversionRate(testId: string, variantId: string): number {
  const results = getTestResults(testId);
  const variantResults = results.filter(r => r.variantId === variantId);
  
  if (results.length === 0) return 0;
  
  return (variantResults.length / results.length) * 100;
}

/**
 * Reset test assignment
 */
export function resetTest(testId: string): void {
  localStorage.removeItem(`${AB_STORAGE_KEY}_${testId}`);
}

/**
 * Reset all test results
 */
export function resetAllResults(): void {
  localStorage.removeItem(AB_RESULTS_KEY);
}

/**
 * Hook to use A/B test
 */
export function useABTest(test: ABTest): ABVariant {
  if (!test.isActive) {
    return test.variants[0]; // Return control variant
  }

  return getVariant(test);
}

/**
 * Example A/B tests
 */
export const EXAMPLE_TESTS: ABTest[] = [
  {
    id: 'cta_button_color',
    name: 'CTA Button Color Test',
    variants: [
      { id: 'control', name: 'Gold Button', weight: 50 },
      { id: 'variant_a', name: 'Pine Button', weight: 50 },
    ],
    startDate: Date.now(),
    isActive: true,
  },
  {
    id: 'hero_headline',
    name: 'Hero Headline Test',
    variants: [
      { id: 'control', name: 'Original Headline', weight: 50 },
      { id: 'variant_a', name: 'Alternative Headline', weight: 50 },
    ],
    startDate: Date.now(),
    isActive: false, // Disabled by default
  },
];
