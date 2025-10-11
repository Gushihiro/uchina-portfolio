import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

type Row = {
  id: number
  locale: "en" | "ja"
  namespace: string
  key: string
  value: string
}

async function ensureSchema() {
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
}

async function seedIfEmpty() {
  const { rows: countRows } = await sql<Row>`select count(1)::int as id, '' as locale, '' as namespace, '' as key, '' as value from translations` // id used for count only
  const count = (countRows?.[0]?.id as unknown as number) || 0
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

  for (const entry of seedEntries) {
    await sql`
      insert into translations (locale, namespace, key, value)
      values (${entry.locale}, ${entry.namespace}, ${entry.key}, ${entry.value})
      on conflict (locale, namespace, key) do update set value = excluded.value;
    `
  }
}

export async function GET() {
  try {
    await ensureSchema()
    await seedIfEmpty()
    const { rows } = await sql<Row>`select id, locale, namespace, key, value from translations`
    const byLocale = rows.reduce<Record<string, Record<string, Record<string, string>>>>(
      (acc, row) => {
        acc[row.locale] ||= {}
        acc[row.locale][row.namespace] ||= {}
        acc[row.locale][row.namespace][row.key] = row.value
        return acc
      },
      {}
    )
    return NextResponse.json(byLocale, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}


