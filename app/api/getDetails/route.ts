import { NextRequest, NextResponse } from 'next/server'
import { GRAPHQL_URL } from '../../lib/constants'

const GET_HQS_BY_ID_QUERY = `
  query getHqsById($id: Int!) {
    getHqsById(id: $id) {
      name
      synopsis
      status
      cover: hqCover
      publisher: publisherName
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId } = body

    if (!siteId) {
      return NextResponse.json({}, { status: 400 })
    }

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_HQS_BY_ID_QUERY,
        variables: { id: Number(siteId) }
      })
    })

    const { data } = await response.json()

    const result = {
      ...data?.getHqsById[0],
      siteId: String(siteId),
      type: 'hq'
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in getDetails:', error)
    return NextResponse.json({}, { status: 500 })
  }
}
