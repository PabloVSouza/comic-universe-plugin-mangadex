import { NextResponse } from 'next/server'
import { searchMangaDexManga } from '../../lib/mangadex'

export async function POST() {
  try {
    // Default listing for plugin picker screens.
    return NextResponse.json(await searchMangaDexManga('a', 40))
  } catch (error) {
    console.error('Error in getList:', error)
    return NextResponse.json([])
  }
}
