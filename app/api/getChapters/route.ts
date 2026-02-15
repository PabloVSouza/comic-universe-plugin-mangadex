import { NextRequest, NextResponse } from 'next/server'
import { GRAPHQL_URL } from '../../lib/constants'

const GET_CHAPTERS_BY_HQ_ID_QUERY = `
  query getChaptersByHqId($id: Int!) {
    getChaptersByHqId(hqId: $id) {
      name
      number
      siteId: id
      pages: pictures {
        filename: image
        path: pictureUrl
      }
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId } = body

    if (!siteId) {
      return NextResponse.json([])
    }

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_CHAPTERS_BY_HQ_ID_QUERY,
        variables: { id: Number(siteId) }
      })
    })

    const { data } = await response.json()

    const chapters = (data?.getChaptersByHqId || []).map((chapter: Record<string, unknown>) => ({
      ...chapter,
      siteId: String(siteId),
      offline: false,
      pages: Array.isArray(chapter.pages) ? chapter.pages : []
    }))

    return NextResponse.json(chapters)
  } catch (error) {
    console.error('Error in getChapters:', error)
    return NextResponse.json([])
  }
}
