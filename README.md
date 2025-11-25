<div align="center">
  <img src="https://raw.githubusercontent.com/PabloVSouza/comic-universe-plugin-hqnow/master/icon.svg" width="200">
  <h1>Comic Universe Plugin - HQ Now</h1>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  <a href="https://github.com/prisma/prisma/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://discord.gg/gPsQkDGDfc"><img alt="Discord" src="https://img.shields.io/discord/1270554232260526120?label=Discord"></a>
  <br />
  <br />
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/pablovsouza/comic-universe/">Main Project</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.instagram.com/opablosouza/">Instagram</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/gPsQkDGDfc">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://x.com/opablosouza">X (Twitter)</a>
  <br />
  <hr />
</div>

## What is this for?

This is a plugin for [**Comic Universe**](https://github.com/pablovsouza/comic-universe) that provides access to comics from [HQ Now](https://www.hq-now.com/).

This plugin uses **Next.js** to create a web application that exposes API endpoints that Comic Universe can consume. It connects to HQ Now's GraphQL API to fetch comic data.

## ✨ Latest Updates (v2.0.0)

- **API-based architecture** - Migrated from NPM package to remote HTTP API
- **Next.js implementation** - Built with Next.js 16 for easy deployment
- **GraphQL integration** - Connects to HQ Now's GraphQL API
- **Deep link installation** - Users can install the plugin directly from a web page
- **Beautiful UI** - Styled home page matching Comic Universe's design

## Project Structure

```
comic-universe-plugin-hqnow/
├── app/
│   ├── api/                    # API endpoints for Comic Universe
│   │   ├── getList/            # Get list of comics (searches for 'A')
│   │   ├── search/             # Search for comics by name
│   │   ├── getDetails/         # Get comic details (cover, publisher)
│   │   ├── getChapters/        # Get chapters for a comic
│   │   ├── getPages/           # Get pages for a chapter
│   │   └── downloadChapter/   # Download a chapter (stub)
│   ├── components/             # React components
│   │   └── StarrySky.tsx       # Animated background component
│   ├── page.tsx                # Home page with install button
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── public/                     # Static assets
│   └── icon.svg                # Plugin icon
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## API Endpoints

All endpoints connect to HQ Now's GraphQL API at `https://admin.hq-now.com/graphql`:

### `POST /api/getList`

Returns a list of comics by searching for 'A'.

**Response:** `IComic[]`

### `POST /api/search`

Search for comics by name.

**Request Body:** `{ search: string }`  
**Response:** `IComic[]`

### `POST /api/getDetails`

Get detailed information about a specific comic (cover, publisher).

**Request Body:** `{ siteId: string }`  
**Response:** `IComic`

### `POST /api/getChapters`

Get all chapters for a comic.

**Request Body:** `{ siteId: string }`  
**Response:** `IChapter[]`

### `POST /api/getPages`

Get all pages for a chapter (extracts from chapter data).

**Request Body:** `{ chapter: IChapter }`  
**Response:** `IPage[]`

### `POST /api/downloadChapter`

Download a chapter (currently a stub).

**Request Body:** `{ comic: IComic, chapter: IChapter }`  
**Response:** `{ success: boolean }`

## Getting Started

1. **Clone this repository:**

   ```bash
   git clone https://github.com/pablovsouza/comic-universe-plugin-hqnow.git
   cd comic-universe-plugin-hqnow
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Deploy your plugin** to a hosting service (Vercel, Netlify, etc.)

## Plugin Installation

Users can install this plugin using a deep link. The home page includes an install button that generates a deep link in the format:

```
comic-universe://plugin/install?url=<YOUR_API_URL>&name=HQ Now&tag=hqnow
```

When users click the install button:

1. Comic Universe app opens (if installed)
2. A confirmation dialog appears
3. Upon confirmation, the plugin is added to the user's database
4. The plugin becomes immediately available

## Development

### Running Locally

```bash
npm run dev
```

The plugin will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Deployment

You can deploy this plugin to any hosting service that supports Next.js:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Easy deployment with continuous integration
- **Railway** - Simple deployment with database support
- **Any Node.js hosting** - Works with any platform that supports Next.js

Make sure to set your API URL in the install button's deep link.

## Testing Your Plugin

1. **Deploy your plugin** to a public URL
2. **Open the home page** in a browser
3. **Click the install button** - This will trigger the deep link
4. **Check Comic Universe** - The plugin should appear in the plugins list
5. **Test the endpoints** - Use the app to browse comics and verify all endpoints work

## What if I'm stuck?

Feel free to reach me on the social networks provided above, as well as in our Discord server.

## License

MIT
