// WHO Growth Standards untuk menghitung Z-Score
// Anda bisa mengganti data berikut dengan nilai-nilai standar WHO sesuai usia, jenis kelamin, dan parameter lainnya

const WHO_STANDARD = {
    "WFA": {
        // Umur dalam bulan -> data standar WHO untuk WFA
        0: { mean: 3.25, sd: 0.5 },  // Misalnya: pada usia 0 bulan, berat badan rata-rata 3.25 kg, deviasi standar 0.5
        1: { mean: 4.30, sd: 0.6 },
        2: { mean: 5.20, sd: 0.7 },
        // Tambahkan data sesuai kebutuhan
    },
    "HFA": {
        0: { mean: 50, sd: 2.5 },    // Panjang badan rata-rata pada usia 0 bulan adalah 50 cm, dsb
        1: { mean: 55, sd: 2.8 },
        2: { mean: 58, sd: 3.0 },
        // Tambahkan data sesuai kebutuhan
    },
    "WFH": {
        // Data WHO untuk WFH (Panjang badan / Berat badan)
        0: { mean: 0.5, sd: 0.1 },
        1: { mean: 0.5, sd: 0.1 },
        2: { mean: 0.5, sd: 0.1 },
        // Tambahkan data sesuai kebutuhan
    }
};

// Fungsi untuk menghitung Z-Score
function calculateZScore(value, age, category) {
    const data = WHO_STANDARD[category][age];
    if (!data) {
        return null;  // Data untuk umur tersebut tidak ditemukan
    }
    const mean = data.mean;
    const sd = data.sd;
    
    return ((value - mean) / sd).toFixed(2);  // Menghitung Z-Score dan membatasi 2 desimal
}

// Fungsi untuk menampilkan hasil analisis
function displayResult(zScore, category) {
    const badge = document.getElementById(category);
    let status = '';

    // Menentukan status berdasarkan Z-Score
    if (zScore < -2) {
        status = 'status-danger';  // Kekurangan gizi
    } else if (zScore >= -2 && zScore <= 2) {
        status = 'status-normal';  // Normal
    } else if (zScore > 2) {
        status = 'status-warning';  // Gizi lebih
    }

    badge.className = `status-badge ${status}`;
    badge.textContent = `Z-Score: ${zScore}`;
}

// Event listener untuk form
document.getElementById('nutritionForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Mencegah form submit biasa

    const umur = parseInt(document.querySelector('input[type="number"]').value);
    const beratBadan = parseFloat(document.querySelector('input[type="number"]:nth-child(2)').value);
    const panjangBadan = parseFloat(document.querySelector('input[type="number"]:nth-child(3)').value);

    const ageCategory = umur;  // Misalnya menggunakan umur dalam bulan untuk kategori

    // Menghitung Z-Score untuk berat badan, panjang badan, dan berat badan menurut panjang badan
    const zScoreWFA = calculateZScore(beratBadan, ageCategory, "WFA");
    const zScoreHFA = calculateZScore(panjangBadan, ageCategory, "HFA");
    const zScoreWFH = calculateZScore(beratBadan / panjangBadan, ageCategory, "WFH");

    // Menampilkan hasil
    displayResult(zScoreWFA, "weightForAge");
    displayResult(zScoreHFA, "heightForAge");
    displayResult(zScoreWFH, "weightForHeight");

    // Menampilkan modal hasil
    const modal = new bootstrap.Modal(document.getElementById('resultsModal'));
    modal.show();
});
