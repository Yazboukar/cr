import type { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';
import { requireAuth } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  const workbook = XLSX.utils.book_new();

  const participantsRows = [
    ['Nom', 'Email'],
    ...Array.from({ length: 50 }, () => ['', '']),
  ];
  const participantsSheet = XLSX.utils.aoa_to_sheet(participantsRows);
  participantsSheet['!cols'] = [{ wch: 28 }, { wch: 36 }];

  const instructionsSheet = XLSX.utils.aoa_to_sheet([
    ['Instruction', 'Valeur attendue'],
    ['Nom', 'Nom complet du participant'],
    ['Email', 'Adresse email unique du participant'],
    ['Important', 'Renseigner les participants dans l onglet Participants'],
    ['Important', 'Ne pas modifier les en-têtes Nom et Email'],
  ]);
  instructionsSheet['!cols'] = [{ wch: 18 }, { wch: 60 }];

  const exampleSheet = XLSX.utils.aoa_to_sheet([
    ['Nom', 'Email'],
    ['Awa Mensah', 'awa.mensah@example.com'],
    ['Komlan Kossi', 'komlan.kossi@example.com'],
  ]);
  exampleSheet['!cols'] = [{ wch: 28 }, { wch: 36 }];

  XLSX.utils.book_append_sheet(workbook, participantsSheet, 'Participants');
  XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Instructions');
  XLSX.utils.book_append_sheet(workbook, exampleSheet, 'Exemple');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="participants-import-template.xlsx"'
  );

  return res.status(200).send(buffer);
}
