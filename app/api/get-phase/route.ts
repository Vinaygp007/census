import { NextResponse } from 'next/server'

interface PhaseData {
  phase: string
  emoji: string
  description: string
  color: string
  keywords: string[]
}

// Mock phase determination logic
// In production, this would use AI/ML or rule-based system
const determinePhase = (_responses: Record<string, unknown>): PhaseData => {
  const phases: PhaseData[] = [
    {
      phase: "Chalta hai",
      emoji: "🤷‍♂️",
      description: "Going with the flow, accepting life as it comes",
      color: "#6366f1",
      keywords: ['casual', 'relaxed', 'accepting']
    },
    {
      phase: "Bas kar bhai",
      emoji: "😤",
      description: "Overwhelmed and seeking a break from the chaos",
      color: "#f43f5e",
      keywords: ['overwhelmed', 'tired', 'frustrated']
    },
    {
      phase: "Jugaad mode on",
      emoji: "🔧",
      description: "Finding creative solutions to everyday problems",
      color: "#8b5cf6",
      keywords: ['creative', 'resourceful', 'innovative']
    },
    {
      phase: "Kuch bhi ho sakta hai",
      emoji: "🎲",
      description: "Embracing uncertainty with optimism",
      color: "#06b6d4",
      keywords: ['optimistic', 'uncertain', 'hopeful']
    },
    {
      phase: "Sab moh maya hai",
      emoji: "🧘",
      description: "Seeking deeper meaning beyond material pursuits",
      color: "#10b981",
      keywords: ['philosophical', 'detached', 'spiritual']
    },
    {
      phase: "Time for ghar wapsi",
      emoji: "🏠",
      description: "Longing for the comfort and familiarity of home",
      color: "#f59e0b",
      keywords: ['nostalgic', 'homesick', 'comfort']
    },
  ]

  // Simple random selection for demo
  // In production, analyze responses to determine best match
  return phases[Math.floor(Math.random() * phases.length)]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const responseId = searchParams.get('id')

    if (!responseId) {
      return NextResponse.json(
        { error: 'Response ID is required' },
        { status: 400 }
      )
    }

    // TODO: Fetch from database
    // For now, return mock data
    const mockResponses = {}
    const phaseResult = determinePhase(mockResponses)

    const phaseData = {
      ...phaseResult,
      userName: 'Sample User',
      city: 'Mumbai',
      age: 25,
      dominantEmotions: ['Hopeful', 'Excited', 'Curious'],
    }

    return NextResponse.json(phaseData)
  } catch (err) {
    console.error('Error fetching phase data:', err)
    return NextResponse.json(
      { error: 'Failed to fetch phase data' },
      { status: 500 }
    )
  }
}