import { NextResponse } from 'next/server'

const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Comic Universe Plugin - HQ Now API',
    version: '2.0.0',
    description: 'HTTP API exposed by the HQ Now plugin for Comic Universe.'
  },
  servers: [{ url: '/' }],
  paths: {
    '/api/getList': {
      post: {
        tags: ['Comics'],
        summary: 'Get default comics list',
        responses: {
          '200': {
            description: 'List of comics',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Comic' }
                }
              }
            }
          }
        }
      }
    },
    '/api/search': {
      post: {
        tags: ['Comics'],
        summary: 'Search comics by name',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['search'],
                properties: {
                  search: { type: 'string', example: 'batman' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'List of comics',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Comic' }
                }
              }
            }
          }
        }
      }
    },
    '/api/getDetails': {
      post: {
        tags: ['Comics'],
        summary: 'Get comic details by site id',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['siteId'],
                properties: {
                  siteId: { type: 'string', example: '123' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Comic details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ComicDetails' }
              }
            }
          }
        }
      }
    },
    '/api/getChapters': {
      post: {
        tags: ['Chapters'],
        summary: 'Get comic chapters',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['siteId'],
                properties: {
                  siteId: { type: 'string', example: '123' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'List of chapters',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Chapter' }
                }
              }
            }
          }
        }
      }
    },
    '/api/getPages': {
      post: {
        tags: ['Chapters'],
        summary: 'Get pages for a chapter',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  chapter: {
                    type: 'object',
                    properties: {
                      pages: {
                        description: 'JSON string or array of pages',
                        oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'object' } }]
                      }
                    }
                  },
                  siteLink: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'List of pages',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Page' }
                }
              }
            }
          }
        }
      }
    },
    '/api/downloadChapter': {
      post: {
        tags: ['Chapters'],
        summary: 'Download chapter (stub)',
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: { type: 'object', additionalProperties: true }
            }
          }
        },
        responses: {
          '200': {
            description: 'Operation result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { success: { type: 'boolean' } }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Comic: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
          name: { type: 'string' },
          synopsis: { type: 'string' },
          status: { type: 'string' }
        }
      },
      ComicDetails: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
          type: { type: 'string', example: 'hq' },
          cover: { type: 'string' },
          publisher: { type: 'string' }
        }
      },
      Chapter: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
          name: { type: 'string' },
          number: { type: 'number' },
          offline: { type: 'boolean' },
          pages: { type: 'string' }
        }
      },
      Page: {
        type: 'object',
        properties: {
          filename: { type: 'string' },
          path: { type: 'string' }
        }
      }
    }
  }
}

export async function GET() {
  return NextResponse.json(openApiDocument)
}
