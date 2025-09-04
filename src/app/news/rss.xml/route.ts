import { NextResponse } from 'next/server'
import { NEWS } from '@/content/news'

export async function GET() {
  const site = 'https://www.example.com'
  const items = NEWS.map(n => `
    <item>
      <title><![CDATA[${n.title}]]></title>
      <link>${site}/news/${n.slug}</link>
      <guid>${site}/news/${n.slug}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description><![CDATA[${n.excerpt}]]></description>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>MMEG News</title>
      <link>${site}</link>
      <description>Label & representation updates</description>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}