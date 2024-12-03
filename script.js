document.getElementById('nutritionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil data dari form
    const namaBalita = document.getElementById('namaBalita').value;
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
    const umur = parseInt(document.getElementById('umur').value);
    const beratBadan = parseFloat(document.getElementById('beratBadan').value);
    const panjangBadan = parseFloat(document.getElementById('panjangBadan').value);

    // Pastikan umur valid
    if (umur < 0 || umur > 60) {
        alert('Umur harus antara 0 hingga 60 bulan');
        return;
    }

    // Data WHO untuk Z-Score (dengan -1SD, median, dan +1SD)
        const whoData = {
        "male": {
            "weightForAge": [
                { age: 0, minSD: 2.9, median: 3.3, maxSD: 3.9 },
                { age: 1, minSD: 3.9, median: 4.5, maxSD: 5.1 },
                { age: 2, minSD: 4.9, median: 5.6, maxSD: 6.3 },
                { age: 3, minSD: 5.7, median: 6.4, maxSD: 7.2 },
                { age: 4, minSD: 6.2, median: 7, maxSD: 7.8 },
                { age: 5, minSD: 6.7, median: 7.5, maxSD: 8.4 },
                { age: 6, minSD: 7.1, median: 7.9, maxSD: 8.8 },
            ],
            "heightForAge": [
                { age: 0, minSD: 48, median: 49.9, maxSD: 51.8 },
                { age: 1, minSD: 52.8, median: 54.7, maxSD: 56.7 },
                { age: 2, minSD: 56.4, median: 58.4, maxSD: 60.4 },
                { age: 3, minSD: 59.4, median: 61.4, maxSD: 63.5 },
                { age: 4, minSD: 61.8, median: 63.9, maxSD: 66 },
                { age: 5, minSD: 63.8, median: 65.9, maxSD: 68 },
                { age: 6, minSD: 65.5, median: 67.6, maxSD: 69.8 },
            ],
            "weightForHeight": [
                { length: 45, minSD: 2.2, median: 2.4, maxSD: 2.7 },
                { length: 45.5, minSD: 2.3, median: 2.5, maxSD: 2.8 },
                { length: 46, minSD: 2.4, median: 2.6, maxSD: 2.9 },
                { length: 46.5, minSD: 2.5, median: 2.7, maxSD: 3 },
                { length: 47, minSD: 2.5, median: 2.8, maxSD: 3 },
                { length: 47.5, minSD: 2.6, median: 2.9, maxSD: 3.1 },
                { length: 48, minSD: 2.7, median: 2.9, maxSD: 3.2 },
                { length: 48.5, minSD: 2.8, median: 3, maxSD: 3.3 },
                { length: 49, minSD: 2.9, median: 3.1, maxSD: 3.4 },
                { length: 49.5, minSD: 3, median: 3.2, maxSD: 3.5 },
                { length: 50, minSD: 3, median: 3.3, maxSD: 3.6 },
                { length: 50.5, minSD: 3.1, median: 3.4, maxSD: 3.8 },
                { length: 51, minSD: 3.2, median: 3.5, maxSD: 3.9 },
                { length: 51.5, minSD: 3.3, median: 3.6, maxSD: 4 },
                { length: 52, minSD: 3.5, median: 3.8, maxSD: 4.1 },
                { length: 52.5, minSD: 3.6, median: 3.9, maxSD: 4.2 },
                { length: 53, minSD: 3.7, median: 4, maxSD: 4.4 },
                { length: 53.5, minSD: 3.8, median: 4.1, maxSD: 4.5 },
                { length: 54, minSD: 3.9, median: 4.3, maxSD: 4.7 },
                { length: 54.5, minSD: 4, median: 4.4, maxSD: 4.8 },
                { length: 55, minSD: 4.2, median: 4.5, maxSD: 5 },
                { length: 55.5, minSD: 4.3, median: 4.7, maxSD: 5.1 },
                { length: 56, minSD: 4.4, median: 4.8, maxSD: 5.3 },
                { length: 56.5, minSD: 4.6, median: 5, maxSD: 5.4 },
                { length: 57, minSD: 4.7, median: 5.1, maxSD: 5.6 },
                { length: 57.5, minSD: 4.9, median: 5.3, maxSD: 5.7 },
                { length: 58, minSD: 5, median: 5.4, maxSD: 5.9 },
                { length: 58.5, minSD: 5.1, median: 5.6, maxSD: 6.1 },
                { length: 59, minSD: 5.3, median: 5.7, maxSD: 6.2 },
                { length: 59.5, minSD: 5.4, median: 5.9, maxSD: 6.4 },
                { length: 60, minSD: 5.5, median: 6, maxSD: 6.5 },
                { length: 60.5, minSD: 5.6, median: 6.1, maxSD: 6.7 },
                { length: 61, minSD: 5.8, median: 6.3, maxSD: 6.8 },
                { length: 61.5, minSD: 5.9, median: 6.4, maxSD: 7 },
                { length: 62, minSD: 6, median: 6.5, maxSD: 7.1 },
                { length: 62.5, minSD: 6.1, median: 6.7, maxSD: 7.2 },
                { length: 63, minSD: 6.2, median: 6.8, maxSD: 7.4 },
                { length: 63.5, minSD: 6.4, median: 6.9, maxSD: 7.5 },
                { length: 64, minSD: 6.5, median: 7, maxSD: 7.6 },
                { length: 64.5, minSD: 6.6, median: 7.1, maxSD: 7.8 },
                { length: 65, minSD: 6.7, median: 7.3, maxSD: 7.9 },
                { length: 65.5, minSD: 6.8, median: 7.4, maxSD: 8 },
                { length: 66, minSD: 6.9, median: 7.5, maxSD: 8.2 },
                { length: 66.5, minSD: 7, median: 7.6, maxSD: 8.3 },
                { length: 67, minSD: 7.1, median: 7.7, maxSD: 8.4 },
                { length: 67.5, minSD: 7.2, median: 7.9, maxSD: 8.5 },
                { length: 68, minSD: 7.3, median: 8, maxSD: 8.7 },
                { length: 68.5, minSD: 7.5, median: 8.1, maxSD: 8.8 },
                { length: 69, minSD: 7.6, median: 8.2, maxSD: 8.9 },
                { length: 69.5, minSD: 7.7, median: 8.3, maxSD: 9 },
                { length: 70, minSD: 7.8, median: 8.4, maxSD: 9.2 },
                { length: 70.5, minSD: 7.9, median: 8.5, maxSD: 9.3 },
                { length: 71, minSD: 8, median: 8.6, maxSD: 9.4 },
            ]
        },
        "female": {
            "weightForAge": [
                { age: 0, minSD: 2.8, median: 3.2, maxSD: 3.7 },
                { age: 1, minSD: 3.9, median: 4.3, maxSD: 4.8 },
                { age: 2, minSD: 4.9, median: 5.3, maxSD: 5.8 },
                { age: 3, minSD: 5.5, median: 5.9, maxSD: 6.3 },
                { age: 4, minSD: 6.0, median: 6.4, maxSD: 6.8 },
                { age: 5, minSD: 6.4, median: 6.8, maxSD: 7.2 },
                { age: 6, minSD: 6.8, median: 7.2, maxSD: 7.6 },
            ],
        "heightForAge": [
            { age: 0, minSD: 47.3, median: 49.1, maxSD: 51 },
            { age: 1, minSD: 51.7, median: 53.7, maxSD: 55.6 },
            { age: 2, minSD: 55, median: 57.1, maxSD: 59.1 },
            { age: 3, minSD: 57.7, median: 59.8, maxSD: 61.9 },
            { age: 4, minSD: 59.9, median: 62.1, maxSD: 64.3 },
            { age: 5, minSD: 61.8, median: 64, maxSD: 66.2 },
            { age: 6, minSD: 63.5, median: 65.7, maxSD: 68 },
            ],
        "weightForHeight": [
            { length: 45, minSD: 2.3, median: 2.5, maxSD: 2.7 },
            { length: 45.5, minSD: 2.3, median: 2.5, maxSD: 2.8 },
            { length: 46, minSD: 2.4, median: 2.6, maxSD: 2.9 },
            { length: 46.5, minSD: 2.5, median: 2.7, maxSD: 3 },
            { length: 47, minSD: 2.6, median: 2.8, maxSD: 3.1 },
            { length: 47.5, minSD: 2.6, median: 2.9, maxSD: 3.2 },
            { length: 48, minSD: 2.7, median: 3, maxSD: 3.3 },
            { length: 48.5, minSD: 2.8, median: 3.1, maxSD: 3.4 },
            { length: 49, minSD: 2.9, median: 3.2, maxSD: 3.5 },
            { length: 49.5, minSD: 3, median: 3.3, maxSD: 3.6 },
            { length: 50, minSD: 3.1, median: 3.4, maxSD: 3.7 },
            { length: 50.5, minSD: 3.2, median: 3.5, maxSD: 3.8 },
            { length: 51, minSD: 3.3, median: 3.6, maxSD: 3.9 },
            { length: 51.5, minSD: 3.4, median: 3.7, maxSD: 4 },
            { length: 52, minSD: 3.5, median: 3.8, maxSD: 4.2 },
            { length: 52.5, minSD: 3.6, median: 3.9, maxSD: 4.3 },
            { length: 53, minSD: 3.7, median: 4, maxSD: 4.4 },
            { length: 53.5, minSD: 3.8, median: 4.2, maxSD: 4.6 },
            { length: 54, minSD: 3.9, median: 4.3, maxSD: 4.7 },
            { length: 54.5, minSD: 4, median: 4.4, maxSD: 4.8 },
            { length: 55, minSD: 4.2, median: 4.5, maxSD: 5 },
            { length: 55.5, minSD: 4.3, median: 4.7, maxSD: 5.1 },
            { length: 56, minSD: 4.4, median: 4.8, maxSD: 5.3 },
            { length: 56.5, minSD: 4.5, median: 5, maxSD: 5.4 },
            { length: 57, minSD: 4.6, median: 5.1, maxSD: 5.6 },
            { length: 57.5, minSD: 4.8, median: 5.2, maxSD: 5.7 },
            { length: 58, minSD: 4.9, median: 5.4, maxSD: 5.9 },
            { length: 58.5, minSD: 5, median: 5.5, maxSD: 6 },
            { length: 59, minSD: 5.1, median: 5.6, maxSD: 6.2 },
            { length: 59.5, minSD: 5.3, median: 5.7, maxSD: 6.3 },
            { length: 59.5, minSD: 5.3, median: 5.7, maxSD: 6.3 },
            { length: 60, minSD: 5.4, median: 5.9, maxSD: 6.4 },
            { length: 60.5, minSD: 5.5, median: 6, maxSD: 6.6 },
            { length: 61, minSD: 5.6, median: 6.1, maxSD: 6.7 },
            { length: 61.5, minSD: 5.7, median: 6.3, maxSD: 6.9 },
            { length: 62, minSD: 5.8, median: 6.4, maxSD: 7 },
            { length: 62.5, minSD: 5.9, median: 6.5, maxSD: 7.1 },
            { length: 63, minSD: 6, median: 6.6, maxSD: 7.3 },
            { length: 63.5, minSD: 6.1, median: 6.7, maxSD: 7.4 },
            { length: 64, minSD: 6.2, median: 6.9, maxSD: 7.5 },
            { length: 64.5, minSD: 6.3, median: 7, maxSD: 7.6 },
            { length: 65, minSD: 6.4, median: 7.1, maxSD: 7.8 },
            { length: 65.5, minSD: 6.5, median: 7.2, maxSD: 7.9 },
            { length: 66, minSD: 6.6, median: 7.3, maxSD: 8 },
            { length: 66.5, minSD: 6.7, median: 7.4, maxSD: 8.1 },
            { length: 67, minSD: 6.8, median: 7.5, maxSD: 8.3 },
            { length: 67.5, minSD: 6.9, median: 7.6, maxSD: 8.4 },
            { length: 68, minSD: 7, median: 7.7, maxSD: 8.5 },
            { length: 68.5, minSD: 7.1, median: 7.9, maxSD: 8.6 },
            { length: 69, minSD: 7.2, median: 8, maxSD: 8.7 },
            { length: 69.5, minSD: 7.3, median: 8.1, maxSD: 8.8 },
            { length: 70, minSD: 7.4, median: 8.2, maxSD: 9 },
            ]
        }
    };

    function calculateZScore(value, category, sex, ageOrLength) {
        if (!whoData[sex]) {
            console.error(`Jenis kelamin ${sex} tidak ditemukan dalam data WHO.`);
            return NaN;
        }
        if (!whoData[sex][category]) {
            console.error(`Kategori ${category} tidak ditemukan untuk ${sex} dalam data WHO.`);
            return NaN;
        }
    
        const data = whoData[sex][category];
    
        let closest = null;
    
        // Untuk kategori weightForHeight, kita mencari berdasarkan panjang badan (length)
        if (category === "weightForHeight") {
            closest = data.reduce((prev, curr) => {
                return (Math.abs(curr.length - ageOrLength) < Math.abs(prev.length - ageOrLength)) ? curr : prev;
            });
        } 
        // Untuk kategori lainnya (weightForAge, heightForAge), kita mencari berdasarkan umur (age)
        else {
            closest = data.reduce((prev, curr) => {
                return (Math.abs(curr.age - ageOrLength) < Math.abs(prev.age - ageOrLength)) ? curr : prev;
            });
        }
    
        const minSD = closest.minSD;
        const median = closest.median;
        const maxSD = closest.maxSD;
    
        // Menghitung Z-Score untuk weightForHeight
        if (category === "weightForHeight") {
            // Jika panjang badan lebih kecil dari median
            if (value < median) {
                return (value - median) / (median - minSD);
            } 
            // Jika panjang badan lebih besar dari median
            else {
                return (value - median) / (maxSD - median);
            }
        }
        // Menghitung Z-Score untuk weightForAge dan heightForAge
        else {
            if (value < median) {
                return (value - median) / (median - minSD); // BB atau TB < median
            } else {
                return (value - median) / (maxSD - median); // BB atau TB > median
            }
        }
    }
    
    

    // Menghitung Z-Score untuk setiap kategori
    const zScoreWeightForAge = calculateZScore(beratBadan, "weightForAge", jenisKelamin, umur);
    const zScoreHeightForAge = calculateZScore(panjangBadan, "heightForAge", jenisKelamin, umur);
    const zScoreWeightForHeight = calculateZScore(beratBadan, "weightForHeight", jenisKelamin, panjangBadan);

    // Menentukan status berdasarkan Z-Score
    const weightStatus = getStatus(zScoreWeightForAge);
    const heightStatus = getStatus(zScoreHeightForAge);
    const weightForHeightStatus = getStatus(zScoreWeightForHeight);

    // Menampilkan hasil di modal
    document.getElementById('weightForAge').textContent = `${zScoreWeightForAge.toFixed(2)} (${weightStatus})`;
    document.getElementById('heightForAge').textContent = `${zScoreHeightForAge.toFixed(2)} (${heightStatus})`;
    document.getElementById('weightForHeight').textContent = `${zScoreWeightForHeight.toFixed(2)} (${weightForHeightStatus})`;

    // Menambahkan kelas berdasarkan status
    updateBadgeStatus('weightForAge', weightStatus);
    updateBadgeStatus('heightForAge', heightStatus);
    updateBadgeStatus('weightForHeight', weightForHeightStatus);

    const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));
    resultsModal.show();
});

// Fungsi untuk menentukan status berdasarkan Z-Score
function getStatus(zScore) {
    if (zScore < -2) return 'Underweight';
    if (zScore >= -2 && zScore <= 2) return 'Normal';
    return 'Overweight';
}

// Fungsi untuk mengupdate kelas status badge
function updateBadgeStatus(elementId, status) {
    const badgeElement = document.getElementById(elementId);
    
    // Reset all classes first
    badgeElement.classList.remove('status-normal', 'status-warning', 'status-danger');
    
    // Menambahkan kelas berdasarkan status
    if (status === 'Normal') {
        badgeElement.classList.add('status-normal');
    } else if (status === 'Underweight') {
        badgeElement.classList.add('status-danger');
    } else if (status === 'Overweight') {
        badgeElement.classList.add('status-warning');
    }
}
