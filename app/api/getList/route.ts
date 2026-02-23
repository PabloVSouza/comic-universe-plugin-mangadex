import { NextRequest, NextResponse } from 'next/server'
import { searchMangaDexManga } from '../../lib/mangadex'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { languageCodes?: string[] }
    return NextResponse.json(await searchMangaDexManga('a', 40, body.languageCodes))
  } catch (error) {
    console.error('Error in getList:', error)
    return NextResponse.json([])
  }
}
