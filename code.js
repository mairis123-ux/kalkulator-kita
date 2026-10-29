/**
 * Kalkulator Kita - Google Apps Script Backend
 */

// Menampilkan halaman web HTML saat URL web app dibuka
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Kalkulator Kita')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Menyimpan riwayat kalkulasi ke Google Sheet yang terhubung secara asynchronous.
 * @param {string} formula - Formula/ekspresi matematika yang dihitung.
 * @param {string|number} result - Hasil akhir kalkulasi.
 * @return {object} Status keberhasilan operasi.
 */
function saveHistory(formula, result) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Buat header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Formula", "Hasil Akhir"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }
    
    var timestamp = new Date();
    sheet.appendRow([timestamp, formula, result]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
