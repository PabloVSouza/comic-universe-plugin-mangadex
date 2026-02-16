import { NextResponse } from 'next/server'
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

export async function POST() {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_HQS_BY_NAME_QUERY,
        variables: { search: 'A' }
      })
    })

    const { data } = await response.json()
    const baseItems = ((data?.getHqsByName || []) as Array<Record<string, unknown>>).slice(0, 120)
    const ids = baseItems
      .map((item) => Number(item.siteId))
      .filter((id) => Number.isFinite(id) && id > 0)

    let detailsById: Record<string, { cover: string; publisher: string }> = {}
    if (ids.length > 0) {
      const idsForDetails = ids.slice(0, 30)
      try {
        const detailsQuery = `
          query getHqsDetailsBatch {
            ${idsForDetails
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
        detailsById = idsForDetails.reduce<Record<string, { cover: string; publisher: string }>>(
          (acc, id) => {
            const row = (detailData[`hq_${id}`] as Array<Record<string, unknown>> | undefined)?.[0]
            acc[String(id)] = {
              cover: typeof row?.hqCover === 'string' ? row.hqCover : '',
              publisher: typeof row?.publisherName === 'string' ? row.publisherName : ''
            }
            return acc
          },
          {}
        )
      } catch {
        detailsById = {}
      }
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
    console.error('Error in getList:', error)
    return NextResponse.json([])
  }
}
