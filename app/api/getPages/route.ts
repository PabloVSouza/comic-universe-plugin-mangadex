import { NextRequest, NextResponse } from 'next/server'
import { GRAPHQL_URL } from '../../lib/constants'

const GET_CHAPTER_PAGES_QUERY = `
  query getChapterById($id: Int!) {
    getChapterById(id: $id) {
      pictures {
        filename: image
        path: pictureUrl
      }
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const chapterSiteId = Number(body?.chapterSiteId)
    if (!Number.isFinite(chapterSiteId) || chapterSiteId <= 0) {
      return NextResponse.json([])
    }

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_CHAPTER_PAGES_QUERY,
        variables: { id: chapterSiteId }
      })
    })

    const { data } = await response.json()
    const pages = data?.getChapterById?.pictures

    return NextResponse.json(Array.isArray(pages) ? pages : [])
  } catch (error) {
    console.error('Error in getPages:', error)
    return NextResponse.json([])
  }
}
