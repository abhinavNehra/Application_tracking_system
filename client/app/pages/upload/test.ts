import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { parseResumeFromPdf } from "../../lib/parse-resume-from-pdf/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pdfPath = path.join(__dirname, 'resume.pdf');

async function loadResume() {
    const resume = await parseResumeFromPdf(pdfPath);
    console.log(resume);
}

loadResume();