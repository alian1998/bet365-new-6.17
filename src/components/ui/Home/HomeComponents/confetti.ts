/**
 * Utility for triggering confetti animations
 */
export function triggerConfetti() {
  // Use the cdn imported confetti
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Add global type for the confetti function
declare global {
  interface Window {
    confetti: (options: any) => void;
  }
}
