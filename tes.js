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

    // Data WHO untuk Z-Score
    const whoData = {
        "male": {
            "weightForAge": [
                { age: 0, median: 3.3, sd: 0.4 },
                { age: 1, median: 4.4, sd: 0.6 },
                { age: 2, median: 5.7, sd: 0.7 },
                { age: 3, median: 7.0, sd: 0.8 },
                { age: 4, median: 8.0, sd: 0.9 },
                { age: 5, median: 9.0, sd: 1.0 },
                { age: 6, median: 9.5, sd: 1.1 },
                { age: 7, median: 10.0, sd: 1.2 },
                { age: 8, median: 10.5, sd: 1.3 },
                { age: 9, median: 10.9, sd: 1.4 },
            ],
            "heightForAge": [
                { age: 0, median: 50, sd: 2 },
                { age: 1, median: 60, sd: 2.5 },
                { age: 2, median: 70, sd: 3 },
                { age: 3, median: 80, sd: 3.5 },
                { age: 4, median: 85, sd: 3.5 },
                { age: 5, median: 90, sd: 3.5 },
                { age: 6, median: 92, sd: 3.6 },
                { age: 7, median: 94, sd: 3.6 },
                { age: 8, median: 95, sd: 3.7 },
                { age: 9, median: 96, sd: 3.8 },
                { age: 10, median: 97, sd: 3.9 },
            ],
            "weightForHeight": [
                // disini harusnya tinggi, tidak perlu umur. contohnya tinggi: 87, media: 12
                { age: 0, median: 3.3, sd: 0.6 },
                { age: 1, median: 8.5, sd: 1.0 },
                { age: 2, median: 10.0, sd: 1.2 },
                { age: 3, median: 11.5, sd: 1.3 },
                { age: 4, median: 12.3, sd: 1.4 },
                { age: 5, median: 13.0, sd: 1.5 },
                { age: 6, median: 13.5, sd: 1.6 },
                { age: 7, median: 14.0, sd: 1.7 },
                { age: 8, median: 14.5, sd: 1.8 },
                { age: 9, median: 15.0, sd: 1.9 },
                { age: 10, median: 15.4, sd: 2.0 },
            ]
        },
        "female": {
            "weightForAge": [
                { age: 0, median: 3.2, sd: 0.6 },
                { age: 1, median: 7.8, sd: 1.0 },
                { age: 2, median: 9.0, sd: 1.1 },
                { age: 3, median: 10.2, sd: 1.3 },
                { age: 4, median: 10.8, sd: 1.4 },
                { age: 5, median: 11.4, sd: 1.5 },
                { age: 6, median: 11.8, sd: 1.6 },
                { age: 7, median: 12.2, sd: 1.7 },
                { age: 8, median: 12.5, sd: 1.8 },
                { age: 9, median: 12.8, sd: 1.9 },
                { age: 10, median: 13.1, sd: 2.0 },
            ],
            "heightForAge": [
                { age: 0, median: 3.2, sd: 0.6 },
                { age: 1, median: 7.8, sd: 1.0 },
                { age: 2, median: 9.0, sd: 1.1 },
                { age: 3, median: 10.2, sd: 1.3 },
                { age: 4, median: 10.8, sd: 1.4 },
                { age: 5, median: 11.4, sd: 1.5 },
                { age: 6, median: 11.8, sd: 1.6 },
                { age: 7, median: 12.2, sd: 1.7 },
                { age: 8, median: 12.5, sd: 1.8 },
                { age: 9, median: 12.8, sd: 1.9 },
                { age: 10, median: 13.1, sd: 2.0 },
            ],
            "weightForHeight": [
                { age: 0, median: 3.2, sd: 0.5 },
                { age: 1, median: 7.6, sd: 0.7 },
                { age: 2, median: 8.6, sd: 0.9 },
                { age: 3, median: 9.2, sd: 1.0 },
                { age: 4, median: 9.7, sd: 1.1 },
                { age: 5, median: 10.1, sd: 1.1 },
                { age: 6, median: 10.4, sd: 1.2 },
                { age: 7, median: 10.7, sd: 1.3 },
                { age: 8, median: 11.0, sd: 1.4 },
                { age: 9, median: 11.2, sd: 1.5 },
                { age: 10, median: 11.5, sd: 1.6 },
            ]
        }
        // data for 'female' can follow the same pattern
    };

    function calculateZScore(value, category, sex, age) {
        if (!whoData[sex]) {
            console.error(`Jenis kelamin ${sex} tidak ditemukan dalam data WHO.`);
            return NaN;
        }
        if (!whoData[sex][category]) {
            console.error(`Kategori ${category} tidak ditemukan untuk ${sex} dalam data WHO.`);
            return NaN;
        }

        const data = whoData[sex][category];

        // Mencari data yang paling mendekati umur
        let closestAge = data.reduce((prev, curr) => {
            return (Math.abs(curr.age - age) < Math.abs(prev.age - age)) ? curr : prev;
        });

        const median = closestAge.median;
        const sd = closestAge.sd;

        // Menghitung Z-Score
        return (value - median) / sd;
    }   

    // Menghitung Z-Score untuk setiap kategori
    const zScoreWeightForAge = calculateZScore(beratBadan, "weightForAge", jenisKelamin, umur);
    const zScoreHeightForAge = calculateZScore(panjangBadan, "heightForAge", jenisKelamin, umur);
    const zScoreWeightForHeight = calculateZScore(beratBadan, "weightForHeight", jenisKelamin, umur);

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