import { NextResponse } from 'next/server'
import { GRAPHQL_URL } from '../../lib/constants'

const GET_HQS_BY_NAME_QUERY = `
  query getHqsByName($search: String!) {
    getHqsByName(name: $search) {
      siteId: id
      name
      synopsis
      status
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
    return NextResponse.json(data?.getHqsByName || [])
  } catch (error) {
    console.error('Error in getList:', error)
    return NextResponse.json([])
  }
}
