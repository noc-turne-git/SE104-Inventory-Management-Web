const fs = require('node:fs')
const path = require('node:path')

const viteChunkPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'vite',
  'dist',
  'node',
  'chunks',
  'node.js',
)

function patchViteNetUse(fileContent) {
  if (fileContent.includes('try {\n\texec("net use"')) {
    return { patched: false, content: fileContent }
  }

  const original = `\texec("net use", (error, stdout) => {\n\t\tif (error) return;\n\t\tconst lines = stdout.split("\\n");\n\t\tfor (const line of lines) {\n\t\t\tconst m = parseNetUseRE.exec(line);\n\t\t\tif (m) windowsNetworkMap.set(m[2], m[1]);\n\t\t}\n\t\tif (windowsNetworkMap.size === 0) safeRealpathSync = fs.realpathSync.native;\n\t\telse safeRealpathSync = windowsMappedRealpathSync;\n\t});`

  const replacement = `\ttry {\n\t\texec("net use", (error, stdout) => {\n\t\t\tif (error) return;\n\t\t\tconst lines = stdout.split("\\n");\n\t\t\tfor (const line of lines) {\n\t\t\t\tconst m = parseNetUseRE.exec(line);\n\t\t\t\tif (m) windowsNetworkMap.set(m[2], m[1]);\n\t\t\t}\n\t\t\tif (windowsNetworkMap.size === 0) safeRealpathSync = fs.realpathSync.native;\n\t\t\telse safeRealpathSync = windowsMappedRealpathSync;\n\t\t});\n\t} catch (e) {\n\t\tsafeRealpathSync = fs.realpathSync.native;\n\t}`

  if (!fileContent.includes(original)) {
    return { patched: false, content: fileContent, missing: true }
  }

  return {
    patched: true,
    content: fileContent.replace(original, replacement),
  }
}

try {
  if (!fs.existsSync(viteChunkPath)) {
    console.log(`[patch-vite-net-use] skip: not found ${viteChunkPath}`)
    process.exit(0)
  }

  const content = fs.readFileSync(viteChunkPath, 'utf8')
  const result = patchViteNetUse(content)

  if (result.missing) {
    console.log('[patch-vite-net-use] skip: pattern not found (vite changed?)')
    process.exit(0)
  }

  if (!result.patched) {
    console.log('[patch-vite-net-use] ok: already patched / no change')
    process.exit(0)
  }

  fs.writeFileSync(viteChunkPath, result.content, 'utf8')
  console.log('[patch-vite-net-use] patched vite net use spawn')
} catch (e) {
  console.log(`[patch-vite-net-use] failed: ${e instanceof Error ? e.message : String(e)}`)
  process.exit(0)
}
