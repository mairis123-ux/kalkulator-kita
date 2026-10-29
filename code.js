function doPost(e) {
  try {
    // Memeriksa apakah ada data POST yang masuk
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Data POST kosong" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var formula = data.formula;
    var result = data.result;
    
    // Pastikan Google Sheet aktif dan ambil sheet pertama
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Menyimpan data ke baris baru: [Waktu, Formula/Perhitungan, Hasil]
    sheet.appendRow([new Date(), formula, result]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi tambahan untuk tes GET (opsional)
function doGet(e) {
  return ContentService.createTextOutput("Web App Aktif dan Berjalan Normal!");
}
