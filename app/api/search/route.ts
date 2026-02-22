import { NextRequest, NextResponse } from 'next/server'
import { searchMangaDexManga } from '../../lib/mangadex'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { search } = body

    if (!search) {
      return NextResponse.json([])
    }

    return NextResponse.json(await searchMangaDexManga(String(search), 25))
  } catch (error) {
    console.error('Error in search:', error)
    return NextResponse.json([])
  }
}
