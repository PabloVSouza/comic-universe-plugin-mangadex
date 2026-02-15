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
      name: 'HQ Now',
      tag: 'hqnow',
      version: '2.0.0',
      contentTypes: ['comic'],
      languageCodes: ['pt-BR'],
      sources: [
        {
          id: 'hqnow',
          name: 'HQ Now',
          languageCodes: ['pt-BR'],
          isDefault: true
        }
      ]
    },
    {
      headers: CORS_HEADERS
    }
  )
}
