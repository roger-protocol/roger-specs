import { openapi } from '@/lib/openapi';
import { generateFiles } from 'fumadocs-openapi';
import { rimraf } from 'rimraf';

const OUTPUT_DIR = "../../docs/api/(generated)"

async function generateOpenAPIDocs() {
  await rimraf(OUTPUT_DIR)

  await generateFiles({
    input: openapi,
    output: OUTPUT_DIR,
    includeDescription: true,
    groupBy: "tag",
    meta: true,
  })
}

generateOpenAPIDocs().catch(console.error)
