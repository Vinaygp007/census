declare global {
  interface Window {
    clarity: any;
  }
}

export function initClarity(projectId: string) {
  if (typeof window === 'undefined') return;
  
  (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
    c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
}

export function trackEvent(eventName: string, customData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity("event", eventName, customData);
  }
}