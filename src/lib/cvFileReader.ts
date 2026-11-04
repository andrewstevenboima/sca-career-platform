/* =============================================================
   Reads a CV file entirely in the browser — nothing is uploaded,
   nothing is sent to any server. Supports PDF, DOCX, and plain text.
   ============================================================= */

export async function readCvFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith('.txt')) {
    return await file.text();
  }

  if (name.endsWith('.pdf')) {
    const [{ getDocument, GlobalWorkerOptions }, workerUrl] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url').then((m) => m.default),
    ]);
    GlobalWorkerOptions.workerSrc = workerUrl;

    const buf = await file.arrayBuffer();
    const pdf = await getDocument({ data: buf }).promise;
    let out = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      out += content.items.map((item) => ('str' in item ? item.str : '')).join(' ') + '\n';
    }
    return out;
  }

  if (name.endsWith('.docx')) {
    const mammoth = await import('mammoth');
    const buf = await file.arrayBuffer();
    const res = await mammoth.extractRawText({ arrayBuffer: buf });
    return res.value;
  }

  throw new Error('Unsupported file. Use PDF, DOCX or TXT — or paste your CV text.');
}
