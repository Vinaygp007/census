
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // TODO: Save to database
    // For now, return mock response
    const responseId = `response-${Date.now()}`
    
    return NextResponse.json({ 
      success: true, 
      responseId,
      message: 'Response submitted successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit response' },
      { status: 500 }
    )
  }
}