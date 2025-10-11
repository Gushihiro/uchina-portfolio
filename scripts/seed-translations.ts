import dotenv from 'dotenv'
import { createClient, createPool } from '@vercel/postgres'

// Explicitly load local env when running seeds
dotenv.config({ path: '.env.development.local' })

// Prefer NON-POOLING/UNPOOLED for direct client connections
const connectionString =
	process.env.POSTGRES_URL_NON_POOLING ||
	process.env.DB_POSTGRES_URL_NON_POOLING ||
	process.env.DB_DATABASE_URL_UNPOOLED ||
	process.env.POSTGRES_PRISMA_URL ||
	process.env.DB_POSTGRES_PRISMA_URL ||
	process.env.POSTGRES_URL ||
	process.env.DB_POSTGRES_URL ||
	process.env.DB_DATABASE_URL

if (!connectionString) {
	throw new Error(
		'Missing POSTGRES_URL. Ensure .env.development.local contains Vercel Postgres vars.'
	)
}

// If a pooled connection string sneaks in, switch to a pool.
const isPooled = /pooler|connection_limit|pgbouncer/i.test(connectionString)
const client = isPooled
	? (createPool({ connectionString }) as unknown as ReturnType<typeof createClient>)
	: createClient({ connectionString })

async function ensureSchema() {
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
}

async function seed() {
	const seedEntries = [
		{ locale: 'en', namespace: 'nav', key: 'brand', value: 'uchina' },
		{ locale: 'en', namespace: 'nav', key: 'home', value: 'Home' },
		{ locale: 'en', namespace: 'nav', key: 'projects', value: 'Projects' },
		{ locale: 'en', namespace: 'nav', key: 'contact', value: 'Contact' },
		{ locale: 'en', namespace: 'home', key: 'getStarted', value: 'Get started by editing' },
		{ locale: 'en', namespace: 'home', key: 'saveAndSeeChanges', value: 'Save and see your changes instantly.' },
		{ locale: 'en', namespace: 'home', key: 'deployNow', value: 'Deploy now' },
		{ locale: 'en', namespace: 'home', key: 'readDocs', value: 'Read our docs' },
		{ locale: 'en', namespace: 'home', key: 'learn', value: 'Learn' },
		{ locale: 'en', namespace: 'home', key: 'examples', value: 'Examples' },
		{ locale: 'en', namespace: 'home', key: 'goToNext', value: 'Go to nextjs.org →' },
		{ locale: 'en', namespace: 'profile', key: 'nameEn', value: 'Hiroto Robinson' },
		{ locale: 'en', namespace: 'profile', key: 'nameJaKanji', value: '具志堅寛人' },
		{ locale: 'en', namespace: 'profile', key: 'nameJaKana', value: '(グシケンヒロト)' },
		{ locale: 'en', namespace: 'profile', key: 'title', value: 'Software Engineer' },
		{ locale: 'en', namespace: 'profile', key: 'blurb', value: 'Full‑stack engineer focusing on performant, accessible web apps with TypeScript, Next.js, and cloud‑native architectures.' },
		{ locale: 'en', namespace: 'profile', key: 'resumeCta', value: 'View Resume' },
		{ locale: 'ja', namespace: 'nav', key: 'brand', value: 'うちな' },
		{ locale: 'ja', namespace: 'nav', key: 'home', value: 'ホーム' },
		{ locale: 'ja', namespace: 'nav', key: 'projects', value: 'プロジェクト' },
		{ locale: 'ja', namespace: 'nav', key: 'contact', value: 'お問い合わせ' },
		{ locale: 'ja', namespace: 'home', key: 'getStarted', value: '編集してはじめましょう' },
		{ locale: 'ja', namespace: 'home', key: 'saveAndSeeChanges', value: '保存するとすぐに反映されます。' },
		{ locale: 'ja', namespace: 'home', key: 'deployNow', value: '今すぐデプロイ' },
		{ locale: 'ja', namespace: 'home', key: 'readDocs', value: 'ドキュメントを読む' },
		{ locale: 'ja', namespace: 'home', key: 'learn', value: '学ぶ' },
		{ locale: 'ja', namespace: 'home', key: 'examples', value: 'サンプル' },
		{ locale: 'ja', namespace: 'home', key: 'goToNext', value: 'nextjs.org へ →' },
		{ locale: 'ja', namespace: 'profile', key: 'nameEn', value: 'Hiroto Robinson' },
		{ locale: 'ja', namespace: 'profile', key: 'nameJaKanji', value: '具志堅寛人' },
		{ locale: 'ja', namespace: 'profile', key: 'nameJaKana', value: 'グシケンヒロト' },
		{ locale: 'ja', namespace: 'profile', key: 'title', value: 'ソフトウェアエンジニア' },
		{ locale: 'ja', namespace: 'profile', key: 'blurb', value: 'TypeScript・Next.js・クラウドネイティブ基盤で、性能とアクセシビリティに優れた Web アプリを開発。' },
		{ locale: 'ja', namespace: 'profile', key: 'resumeCta', value: '履歴書を見る' },
		{ locale: 'en', namespace: 'csvToJson', key: 'subtitle', value: 'CSV → JSON converter with hybrid runtime: WebAssembly for Edge/Browser and a native N-API add-on for Node.' },
		{ locale: 'en', namespace: 'csvToJson', key: 'install', value: 'Install' },
		{ locale: 'en', namespace: 'csvToJson', key: 'nodeUsage', value: 'Node.js usage (native add-on)' },
		{ locale: 'en', namespace: 'csvToJson', key: 'browserUsage', value: 'Edge/Browser usage (WebAssembly)' },
		{ locale: 'en', namespace: 'csvToJson', key: 'tryIt', value: 'Try it' },
		{ locale: 'en', namespace: 'csvToJson', key: 'tryItDesc', value: 'Select a CSV file to parse it into JSON in your browser.' },
		{ locale: 'en', namespace: 'csvToJson', key: 'generatedTypes', value: 'Generated TypeScript types' },
		{ locale: 'en', namespace: 'csvToJson', key: 'whyItMatters', value: 'Why it matters' },
		{ locale: 'en', namespace: 'csvToJson', key: 'whyDesc', value: 'One package that "just works" across runtimes reduces integration friction. On Node, the native add-on provides high throughput for server-side processing. On the Edge/Browser, WASM offers great performance for client-side parsing and validation with a consistent API.' },
		{ locale: 'en', namespace: 'csvToJson', key: 'viewOnNpm', value: 'View on npm' },
		{ locale: 'en', namespace: 'csvToJson', key: 'githubRepo', value: 'GitHub Repo' },
		{ locale: 'en', namespace: 'csvToJson', key: 'rust', value: 'Rust' },
		{ locale: 'en', namespace: 'csvToJson', key: 'webassembly', value: 'WebAssembly' },
		{ locale: 'en', namespace: 'csvToJson', key: 'typescript', value: 'TypeScript' },
		{ locale: 'en', namespace: 'csvToJson', key: 'nodeNapi', value: 'Node.js N-API' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'subtitle', value: 'CSV → JSON 変換ツール：Edge/ブラウザ向け WebAssembly と Node.js 向けネイティブアドオンのハイブリッドランタイム。' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'install', value: 'インストール' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'nodeUsage', value: 'Node.js の使い方（ネイティブアドオン）' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'browserUsage', value: 'Edge/ブラウザの使い方（WebAssembly）' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'tryIt', value: '試してみる' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'tryItDesc', value: 'CSV ファイルを選択してブラウザ内で JSON に変換します。' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'generatedTypes', value: '生成された TypeScript 型' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'whyItMatters', value: 'なぜ重要か' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'whyDesc', value: 'すべてのランタイムで「そのまま動作する」単一のパッケージは、統合の摩擦を減らします。Node ではネイティブアドオンがサーバー側処理に高スループットを提供し、Edge/ブラウザでは WASM がクライアント側のパースとバリデーションに優れたパフォーマンスを提供します。' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'viewOnNpm', value: 'npm で見る' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'githubRepo', value: 'GitHub リポジトリ' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'rust', value: 'Rust' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'webassembly', value: 'WebAssembly' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'typescript', value: 'TypeScript' },
		{ locale: 'ja', namespace: 'csvToJson', key: 'nodeNapi', value: 'Node.js N-API' },
	] as const

	for (const entry of seedEntries) {
		await client.sql`
			insert into translations (locale, namespace, key, value)
			values (${entry.locale}, ${entry.namespace}, ${entry.key}, ${entry.value})
			on conflict (locale, namespace, key) do update set value = excluded.value;
		`
	}
}

async function main() {
	try {
		console.log('Ensuring schema...')
		await ensureSchema()
		console.log('Seeding translations...')
		await seed()
		console.log('Done.')
		await client.end()
		process.exit(0)
	} catch (err) {
		console.error(err)
		try { await client.end() } catch {}
		process.exit(1)
	}
}

void main()
