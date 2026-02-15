import { NextRequest, NextResponse } from 'next/server'
import { GRAPHQL_URL } from '../../lib/constants'

const GET_HQS_BY_NAME_QUERY = `
  query getHqsByName($search: String!) {
    getHqsByName(name: $search) {
      siteId: id
      name
      synopsis
      status
      hqCover
      publisherName
      capitulos {
        id
      }
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { search } = body

    if (!search) {
      return NextResponse.json([])
    }

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_HQS_BY_NAME_QUERY,
        variables: { search }
      })
    })

    const { data } = await response.json()
    const baseItems = (data?.getHqsByName || []) as Array<Record<string, unknown>>
    const ids = baseItems
      .map((item) => Number(item.siteId))
      .filter((id) => Number.isFinite(id) && id > 0)

    let detailsById: Record<string, { cover: string; publisher: string }> = {}
    if (ids.length > 0) {
      const detailsQuery = `
        query getHqsDetailsBatch {
          ${ids
            .map(
              (id) => `
            hq_${id}: getHqsById(id: ${id}) {
              id
              hqCover
              publisherName
            }`
            )
            .join('\n')}
        }
      `

      const detailsResponse = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: detailsQuery
        })
      })

      const detailsJson = (await detailsResponse.json()) as Record<string, unknown>
      const detailData = (detailsJson.data ?? {}) as Record<string, unknown>
      detailsById = ids.reduce<Record<string, { cover: string; publisher: string }>>((acc, id) => {
        const row = (detailData[`hq_${id}`] as Array<Record<string, unknown>> | undefined)?.[0]
        acc[String(id)] = {
          cover: typeof row?.hqCover === 'string' ? row.hqCover : '',
          publisher: typeof row?.publisherName === 'string' ? row.publisherName : ''
        }
        return acc
      }, {})
    }

    const results = baseItems.map((item: Record<string, unknown>) => {
      const chapters = Array.isArray(item.capitulos) ? item.capitulos : []
      const detail = detailsById[String(item.siteId)] || { cover: '', publisher: '' }
      return {
        siteId: item.siteId,
        name: item.name,
        synopsis: item.synopsis,
        status: item.status,
        publisher: detail.publisher || (typeof item.publisherName === 'string' ? item.publisherName : ''),
        cover: detail.cover || (typeof item.hqCover === 'string' ? item.hqCover : ''),
        chapterCount: chapters.length
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error in search:', error)
    return NextResponse.json([])
  }
}
