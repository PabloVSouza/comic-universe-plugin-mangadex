import { NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  })
}

export async function GET() {
  return NextResponse.json(
    {
      name: 'MangaDex',
      tag: 'mangadex',
      version: '2.0.0',
      contentTypes: ['manga', 'comic'],
      languageCodes: ['en'],
      sources: [
        {
          id: 'mangadex',
          name: 'MangaDex',
          languageCodes: ['en'],
          isDefault: true
        }
      ]
    },
    {
      headers: CORS_HEADERS
    }
  )
}
