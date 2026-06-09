# Bitcoin trading app

A Bitcoin price chart with mock trading functionality.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Get a free API key at [CoinGecko API dashboard](https://www.coingecko.com/en/api/pricing) by subscribing to the free demo plan.

Create a `.env` file in the root of the project with the following content:

```
VITE_COINGECKO_API_KEY=your_key_here
```

### 3. Run the app locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Testing

To run Jest tests use

```bash
npm test
```
