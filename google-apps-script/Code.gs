const FOLDER_ID = '1Nkn66Dzndgs6oddmM-fsGd7zEsfL50Kf';
const MAX_BYTES = 35 * 1024 * 1024;

function doGet() {
  return respond({ ok: true, message: 'Upload-tjenesten kører.' });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const type = String(payload.type || '');
    if (!type.startsWith('image/') && !type.startsWith('video/')) {
      return respond({ ok: false, error: 'Kun billeder og videoer kan uploades.' });
    }
    const bytes = Utilities.base64Decode(payload.data);
    if (bytes.length > MAX_BYTES) {
      return respond({ ok: false, error: 'Filen er for stor.' });
    }
    const blob = Utilities.newBlob(bytes, type, buildName(payload.name, type));
    DriveApp.getFolderById(FOLDER_ID).createFile(blob);
    return respond({ ok: true });
  } catch (err) {
    console.error(err);
    return respond({ ok: false, error: 'Upload fejlede.' });
  }
}

function buildName(original, type) {
  const stamp = Utilities.formatDate(new Date(), 'Europe/Copenhagen', 'yyyy-MM-dd_HH-mm-ss');
  const fallback = (type.startsWith('video/') ? 'video.' : 'billede.') + (type.split('/')[1] || 'jpg');
  const clean = String(original || '').replace(/[^\w.\-æøåÆØÅ]/g, '_').slice(-80) || fallback;
  return stamp + '_' + Utilities.getUuid().slice(0, 8) + '_' + clean;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
