# Comic Universe Plugin - MangaDex

Plugin HTTP API for Comic Universe backed by MangaDex.

## Capabilities

- `metadata`
- `content`

## Endpoints

- `POST /api/getList` - default list
- `POST /api/search` - body `{ search }`
- `POST /api/getDetails` - body `{ siteId }`
- `POST /api/getChapters` - body `{ siteId }`
- `POST /api/getPages` - body `{ chapterSiteId }`
- `POST /api/downloadChapter` - stub
- `GET /api/metadata`

## Dev

```bash
npm install
npm run dev
```

## Install in Comic Universe

Use deep link:

```text
comic-universe-tauri://plugin/install?url=<PLUGIN_BASE_URL>/api&metadataUrl=<PLUGIN_BASE_URL>/api/metadata&name=MangaDex&tag=mangadex
```
