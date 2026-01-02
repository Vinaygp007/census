export const phasePrompts = [
  {
    id: 1,
    question: "How are you feeling right now?",
    type: "emotion",
    suggestions: []
  },
  {
    id: 2,
    question: "What's your current state of mind?",
    type: "text",
    suggestions: [
      "Contemplative",
      "Energized",
      "Peaceful",
      "Restless",
      "Focused"
    ]
  },
  {
    id: 3,
    question: "What motivates you today?",
    type: "text",
    suggestions: [
      "Growth",
      "Connection",
      "Achievement",
      "Peace",
      "Adventure"
    ]
  }
];

export const popularPhases = [
  "Yeh bhi theek hai",
  "Jugaad ho jayega",
  "Chalta hai",
  "Koi nahi",
  "Sab moh maya hai",
  "Bas ho gaya",
  "Dekha jayega"
];

export interface Phase {
  id: string;
  name: string;
  description: string;
  color: string;
  insights: string[];
}

export function matchPhaseFromResponses(responses: Record<string, any>): Phase {
  // This is a placeholder - implement actual matching logic
  return {
    id: "phase-1",
    name: "Yeh bhi theek hai",
    description: "You're in a phase of acceptance and going with the flow",
    color: "#6366f1",
    insights: [
      "Embracing flexibility",
      "Finding peace in acceptance",
      "Living in the moment"
    ]
  };
}