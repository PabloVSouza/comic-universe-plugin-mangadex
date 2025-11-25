import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.chapter) {
      if (body.chapter.pages) {
        const pages = typeof body.chapter.pages === 'string' 
          ? JSON.parse(body.chapter.pages) 
          : body.chapter.pages
        return NextResponse.json(pages || [])
      }
    }

    if (body.siteLink) {
      return NextResponse.json([])
    }

    return NextResponse.json([])
  } catch (error) {
    console.error('Error in getPages:', error)
    return NextResponse.json([])
  }
}
