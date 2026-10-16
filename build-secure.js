const fs = require('fs-extra');
const path = require('path');
const bytenode = require('bytenode');
const JavaScriptObfuscator = require('javascript-obfuscator');

async function buildSecure() {
  console.log('⚡ Starting iOS 27 Security Compilation & Obfuscation...');

  const filesToProcess = [
    { src: 'src/renderer-src.js', destJs: 'src/renderer.js', destJsc: 'src/renderer.jsc' }
  ];

  for (const file of filesToProcess) {
    if (!fs.existsSync(file.src)) {
      console.log(`⚠️  Source ${file.src} not found. Skipping...`);
      continue;
    }

    console.log(`🔒 Obfuscating ${file.src}...`);
    const rawCode = fs.readFileSync(file.src, 'utf8');
    
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(rawCode, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false,
      disableConsoleOutput: false,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.8,
      target: 'node'
    });

    const obfuscatedCode = obfuscatedResult.getObfuscatedCode();
    fs.writeFileSync(file.destJs, obfuscatedCode);
    console.log(`✅ Obfuscated code written to ${file.destJs}`);

    console.log(`📦 Compiling ${file.destJs} to V8 Bytecode (.jsc)...`);
    bytenode.compileFile({
      filename: path.resolve(file.destJs),
      output: path.resolve(file.destJsc)
    });
    console.log(`🚀 Bytecode generated: ${file.destJsc}`);
  }

  console.log('🎉 Secure compilation completed successfully!');
}

buildSecure().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
