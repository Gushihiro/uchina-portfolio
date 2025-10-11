"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "@/i18n/use-translations";
import { LangFlip } from "@/components/lang-flip";

export default function CsvToJsonCaseStudy() {
  const t = useTranslations();
  const [json, setJson] = React.useState<string>("");
  const [types, setTypes] = React.useState<string>("");
  const [rows, setRows] = React.useState<Array<Record<string, string>>>([]);
  const [error, setError] = React.useState<string>("");

  // Recompute types after rows are available
  React.useEffect(() => {
    if (!rows || rows.length === 0) return;
    setTypes(inferTypesFallback(rows, "CsvRow"));
  }, [rows]);

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(
      () => toast.success(`${label} copied!`),
      () => toast.error("Copy failed")
    );
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setJson("");
    setTypes("");
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Dynamic import to avoid SSR issues with WASM
      const Csv = await import("@uchina-systems/csv-to-json");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const out = Csv.parse(bytes, { headers: true, caseStyle: "pascal" as any });
      setJson(JSON.stringify(JSON.parse(out), null, 2));

      // Demonstrate types generation from parsed rows
      const parsed = Csv.parseToArray(bytes, { headers: true, caseStyle: "pascal" as any });
      setRows(parsed);
    } catch (err) {
      setError(String(err));
    }
  }
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">@uchina-systems/csv-to-json</h1>
      <p className="text-muted-foreground mt-2">
        <LangFlip>{t.csvToJson.subtitle}</LangFlip>
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm">
          <Image src="/logos/rust.svg" alt="Rust" width={20} height={20} className="dark:invert" />
          <LangFlip>{t.csvToJson.rust}</LangFlip>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm">
          <Image src="/logos/webassembly.svg" alt="WebAssembly" width={20} height={20} />
          <LangFlip>{t.csvToJson.webassembly}</LangFlip>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm">
          <Image src="/logos/typescript.svg" alt="TypeScript" width={20} height={20} />
          <LangFlip>{t.csvToJson.typescript}</LangFlip>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm">
          <Image src="/logos/nodejs.svg" alt="Node.js" width={20} height={20} />
          <LangFlip>{t.csvToJson.nodeNapi}</LangFlip>
        </div>
      </div>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold"><LangFlip>{t.csvToJson.install}</LangFlip></h2>
        <pre className="rounded-md border bg-card p-4 text-sm overflow-x-auto"><code>npm install @uchina-systems/csv-to-json</code></pre>
      </section>

      <Accordion type="single" collapsible className="mt-8">
        <AccordionItem value="node-usage">
          <AccordionTrigger><LangFlip>{t.csvToJson.nodeUsage}</LangFlip></AccordionTrigger>
          <AccordionContent>
            <pre className="rounded-md border bg-card p-4 text-sm overflow-x-auto"><code>{`import { parse, parseToArray } from '@uchina-systems/csv-to-json'
import fs from 'node:fs'

const csv = fs.readFileSync('data.csv')
const json = parse(csv, { headers: true, caseStyle: 'pascal' })
console.log(json)

const rows = parseToArray(csv, { headers: true, caseStyle: 'pascal' })
console.log(rows)
`}</code></pre>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="browser-usage">
          <AccordionTrigger><LangFlip>{t.csvToJson.browserUsage}</LangFlip></AccordionTrigger>
          <AccordionContent>
            <pre className="rounded-md border bg-card p-4 text-sm overflow-x-auto"><code>{`import { parse, parseToArray } from '@uchina-systems/csv-to-json'

const bytes = new TextEncoder().encode('YouTube link,IMPORT\\nhttps://yt.com,YES\\n')
const json = parse(bytes, { headers: true, caseStyle: 'pascal' })
// => [{"YouTubeLink":"https://yt.com","Import":"YES"}]

const rows = parseToArray(bytes, { headers: true, caseStyle: 'pascal' })
// => [{ YouTubeLink: 'https://yt.com', Import: 'YES' }]
`}</code></pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold"><LangFlip>{t.csvToJson.tryIt}</LangFlip></h2>
        <p className="text-sm text-muted-foreground"><LangFlip>{t.csvToJson.tryItDesc}</LangFlip></p>
        <input type="file" accept=".csv,text/csv" onChange={onFileChange} className="block cursor-pointer" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {json && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => copyToClipboard(json, "JSON")}
              aria-label="Copy JSON"
            >
              <Copy className="size-4" />
            </Button>
            <pre className="rounded-md border bg-card p-4 text-sm overflow-auto max-h-80">
              <code className="language-json">{json}</code>
            </pre>
          </div>
        )}
      </section>

      {types && (
        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold"><LangFlip>{t.csvToJson.generatedTypes}</LangFlip></h2>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => copyToClipboard(types, "TypeScript types")}
              aria-label="Copy TypeScript types"
            >
              <Copy className="size-4" />
            </Button>
            <pre className="rounded-md border bg-card p-4 text-sm overflow-auto max-h-80">
              <code className="language-ts">{types}</code>
            </pre>
          </div>
        </section>
      )}
      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold"><LangFlip>{t.csvToJson.whyItMatters}</LangFlip></h2>
        <p>
          <LangFlip>{t.csvToJson.whyDesc}</LangFlip>
        </p>
      </section>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="https://www.npmjs.com/package/@uchina-systems/csv-to-json" target="_blank" rel="noopener noreferrer">
            <LangFlip>{t.csvToJson.viewOnNpm}</LangFlip>
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://github.com/uchina-systems/csv-to-json" target="_blank" rel="noopener noreferrer">
            <LangFlip>{t.csvToJson.githubRepo}</LangFlip>
          </Link>
        </Button>
      </div>
    </div>
  );
}
function inferTypesFallback(rows: Array<Record<string, string>>, rootName: string) {
  if (!rows || rows.length === 0) return "";
  const keys = new Set<string>();
  for (const r of rows) for (const k of Object.keys(r)) keys.add(k);
  const fields = Array.from(keys)
    .sort()
    .map((k) => `  ${k}: string;`)
    .join("\n");
  return `interface ${rootName} {\n${fields}\n}\n\ntype ${rootName}Array = ${rootName}[];`;
}


