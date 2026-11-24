import { useState, useCallback } from 'react';

export function useCopyToClipboard(resetDelay = 2500) {
  const [isCopied, setIsCopied] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, customMessage?: string) => {
      if (!navigator?.clipboard) {
        setFeedbackMessage('Clipboard access unavailable.');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        // Rule B8: Confirmations are calm and specific. No cute interjections, no exclamation marks.
        setFeedbackMessage(customMessage || `Copied ${text} to clipboard.`);
        
        setTimeout(() => {
          setIsCopied(false);
          setFeedbackMessage(null);
        }, resetDelay);
        return true;
      } catch (err) {
        setFeedbackMessage('Failed to copy to clipboard.');
        return false;
      }
    },
    [resetDelay]
  );

  return { isCopied, feedbackMessage, copy };
}
