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

    const results = (data?.getHqsByName || []).map((item: Record<string, unknown>) => {
      const chapters = Array.isArray(item.capitulos) ? item.capitulos : []
      return {
        siteId: item.siteId,
        name: item.name,
        synopsis: item.synopsis,
        status: item.status,
        publisher: item.publisherName ?? '',
        cover: item.hqCover ?? '',
        chapterCount: chapters.length
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error in getList:', error)
    return NextResponse.json([])
  }
}
