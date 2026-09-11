/**
 * Calculate estimated reading time for content
 * @param content - The text content to calculate reading time for
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Object with minutes and formatted string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): { minutes: number; text: string } {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    minutes,
    text: `${minutes} min read`,
  };
}

/**
 * Calculate reading time for blog post
 * @param paragraphs - Array of paragraphs
 * @returns Formatted reading time string
 */
export function getBlogReadingTime(paragraphs: string[]): string {
  const content = paragraphs.join(' ');
  return calculateReadingTime(content).text;
}
