import { sql, createClient } from "@vercel/postgres"
import { NextResponse } from "next/server"

type Row = {
  id: number
  locale: "en" | "ja"
  namespace: string
  key: string
  value: string
}

// Prefer pooled when available for the pooled `sql` helper; otherwise use direct client
function getConnStrings() {
  const pooled =
    process.env.DB_POSTGRES_URL ||
    process.env.DB_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  const direct =
    process.env.DB_POSTGRES_URL_NON_POOLING ||
    process.env.DB_DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING
  return { pooled, direct }
}

function ensurePooledEnv() {
  const { pooled } = getConnStrings()
  if (pooled) process.env.POSTGRES_URL = pooled
}

// Simple in-memory cache (per server instance)
let cachedTranslations: Record<string, Record<string, Record<string, string>>> | null = null
let cachedAt = 0
const CACHE_TTL_MS = 5 * 60 * 1000

async function ensureSchema() {
  const { pooled, direct } = getConnStrings()
  if (pooled) {
    ensurePooledEnv()
    await sql`
      create table if not exists translations (
        id serial primary key,
        locale text not null,
        namespace text not null,
        key text not null,
        value text not null,
        unique(locale, namespace, key)
      );
    `
    return
  }
  if (direct) {
    const client = createClient({ connectionString: direct })
    await client.connect()
    await client.sql`
      create table if not exists translations (
        id serial primary key,
        locale text not null,
        namespace text not null,
        key text not null,
        value text not null,
        unique(locale, namespace, key)
      );
    `
    await client.end()
  }
}

async function seedIfEmpty() {
  const { pooled, direct } = getConnStrings()
  let count = 0
  if (pooled) {
    ensurePooledEnv()
    const res = (await sql`select count(1)::int as id, '' as locale, '' as namespace, '' as key, '' as value from translations`) as { rows: Row[] }
    count = (res.rows?.[0]?.id as unknown as number) || 0
  } else if (direct) {
    const client = createClient({ connectionString: direct })
    await client.connect()
    const res = (await client.sql`select count(1)::int as id, '' as locale, '' as namespace, '' as key, '' as value from translations`) as { rows: Row[] }
    count = (res.rows?.[0]?.id as unknown as number) || 0
    await client.end()
  }
  if (count > 0) return

  const seedEntries: Array<Pick<Row, "locale" | "namespace" | "key" | "value">> = [
    { locale: "en", namespace: "nav", key: "brand", value: "uchina" },
    { locale: "en", namespace: "nav", key: "home", value: "Home" },
    { locale: "en", namespace: "nav", key: "projects", value: "Projects" },
    { locale: "en", namespace: "nav", key: "contact", value: "Contact" },
    { locale: "ja", namespace: "nav", key: "brand", value: "うちな" },
    { locale: "ja", namespace: "nav", key: "home", value: "ホーム" },
    { locale: "ja", namespace: "nav", key: "projects", value: "プロジェクト" },
    { locale: "ja", namespace: "nav", key: "contact", value: "お問い合わせ" },
  ]

  if (pooled) {
    for (const entry of seedEntries) {
      await sql`
        insert into translations (locale, namespace, key, value)
        values (${entry.locale}, ${entry.namespace}, ${entry.key}, ${entry.value})
        on conflict (locale, namespace, key) do update set value = excluded.value;
      `
    }
  } else if (direct) {
    const client = createClient({ connectionString: direct })
    await client.connect()
    for (const entry of seedEntries) {
      await client.sql`
        insert into translations (locale, namespace, key, value)
        values (${entry.locale}, ${entry.namespace}, ${entry.key}, ${entry.value})
        on conflict (locale, namespace, key) do update set value = excluded.value;
      `
    }
    await client.end()
  }
}

export async function GET() {
  try {
    // Serve cached if fresh
    const now = Date.now()
    if (cachedTranslations && now - cachedAt < CACHE_TTL_MS) {
      return NextResponse.json(cachedTranslations, { status: 200 })
    }
    await ensureSchema()
    await seedIfEmpty()
    const { pooled, direct } = getConnStrings()
    let rows: Row[] = []
    if (pooled) {
      ensurePooledEnv()
      const res = (await sql`select id, locale, namespace, key, value from translations`) as { rows: Row[] }
      rows = res.rows
    } else if (direct) {
      const client = createClient({ connectionString: direct })
      await client.connect()
      const res = (await client.sql`select id, locale, namespace, key, value from translations`) as { rows: Row[] }
      rows = res.rows
      await client.end()
    }
    const byLocale = rows.reduce<Record<string, Record<string, Record<string, string>>>>(
      (acc, row) => {
        acc[row.locale] ||= {}
        acc[row.locale][row.namespace] ||= {}
        acc[row.locale][row.namespace][row.key] = row.value
        return acc
      },
      {}
    )
    cachedTranslations = byLocale
    cachedAt = now
    return NextResponse.json(byLocale, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}


