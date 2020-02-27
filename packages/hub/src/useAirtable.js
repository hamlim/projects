import { useCache } from '@matthamlin/simple-cache'
let cache = new Map()

export function getCache() {
  return cache
}

export default function useAirtable({ base, table }) {
  return useCache(
    cache,
    base + table,
    () =>
      fetch(`https://api.airtable.com/v0/${base}/${table}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }).then(res => res.json()),
    {
      shouldEvictCache() {
        return false
      },
    },
  )
}
