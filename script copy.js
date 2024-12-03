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
                { age: 10, median: 11.4, sd: 1.5 },
                { age: 11, median: 11.7, sd: 1.6 },
                { age: 12, median: 12.0, sd: 1.7 },
                { age: 13, median: 12.2, sd: 1.8 },
                { age: 14, median: 12.4, sd: 1.9 },
                { age: 15, median: 12.6, sd: 2.0 },
                { age: 16, median: 12.8, sd: 2.1 },
                { age: 17, median: 13.0, sd: 2.2 },
                { age: 18, median: 13.1, sd: 2.3 },
                { age: 19, median: 13.3, sd: 2.4 },
                { age: 20, median: 13.4, sd: 2.5 },
                { age: 21, median: 13.5, sd: 2.6 },
                { age: 22, median: 13.6, sd: 2.7 },
                { age: 23, median: 13.7, sd: 2.8 },
                { age: 24, median: 12.2, sd: 2.9 },
                { age: 25, median: 13.9, sd: 3.0 },
                { age: 26, median: 14.0, sd: 3.1 },
                { age: 27, median: 14.1, sd: 3.2 },
                { age: 28, median: 14.2, sd: 3.3 },
                { age: 29, median: 14.3, sd: 3.4 },
                { age: 30, median: 14.4, sd: 3.5 },
                { age: 31, median: 14.5, sd: 3.6 },
                { age: 32, median: 14.6, sd: 3.7 },
                { age: 33, median: 14.7, sd: 3.8 },
                { age: 34, median: 14.8, sd: 3.9 },
                { age: 35, median: 14.9, sd: 4.0 },
                { age: 36, median: 15.0, sd: 4.1 },
                { age: 37, median: 15.1, sd: 4.2 },
                { age: 38, median: 15.2, sd: 4.3 },
                { age: 39, median: 15.3, sd: 4.4 },
                { age: 40, median: 15.4, sd: 4.5 },
                { age: 41, median: 15.5, sd: 4.6 },
                { age: 42, median: 15.6, sd: 4.7 },
                { age: 43, median: 15.7, sd: 4.8 },
                { age: 44, median: 15.8, sd: 4.9 },
                { age: 45, median: 15.9, sd: 5.0 },
                { age: 46, median: 16.0, sd: 5.1 },
                { age: 47, median: 16.1, sd: 5.2 },
                { age: 48, median: 16.2, sd: 5.3 },
                { age: 49, median: 16.3, sd: 5.4 },
                { age: 50, median: 16.4, sd: 5.5 },
                { age: 51, median: 16.5, sd: 5.6 },
                { age: 52, median: 16.6, sd: 5.7 },
                { age: 53, median: 16.7, sd: 5.8 },
                { age: 54, median: 16.8, sd: 5.9 },
                { age: 55, median: 16.9, sd: 6.0 },
                { age: 56, median: 17.0, sd: 6.1 },
                { age: 57, median: 17.1, sd: 6.2 },
                { age: 58, median: 17.2, sd: 6.0 },
                { age: 59, median: 17.3, sd: 6.1 },
                { age: 60, median: 17.4, sd: 6.2 }
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
                { age: 11, median: 98, sd: 4.0 },
                { age: 12, median: 99, sd: 4.1 },
                { age: 13, median: 100, sd: 4.2 },
                { age: 14, median: 101, sd: 4.3 },
                { age: 15, median: 102, sd: 4.4 },
                { age: 16, median: 103, sd: 4.5 },
                { age: 17, median: 104, sd: 4.6 },
                { age: 18, median: 105, sd: 4.7 },
                { age: 19, median: 106, sd: 4.8 },
                { age: 20, median: 107, sd: 4.9 },
                { age: 21, median: 108, sd: 5.0 },
                { age: 22, median: 109, sd: 5.1 },
                { age: 23, median: 110, sd: 5.2 },
                { age: 24, median: 87.8, sd: 5.3 },
                { age: 25, median: 112, sd: 5.4 },
                { age: 26, median: 113, sd: 5.5 },
                { age: 27, median: 114, sd: 5.6 },
                { age: 28, median: 115, sd: 5.7 },
                { age: 29, median: 116, sd: 5.8 },
                { age: 30, median: 117, sd: 5.9 },
                { age: 31, median: 118, sd: 6.0 },
                { age: 32, median: 119, sd: 6.1 },
                { age: 33, median: 120, sd: 6.2 },
                { age: 34, median: 121, sd: 6.3 },
                { age: 35, median: 122, sd: 6.4 },
                { age: 36, median: 123, sd: 6.5 },
                { age: 37, median: 124, sd: 6.6 },
                { age: 38, median: 125, sd: 6.7 },
                { age: 39, median: 126, sd: 6.8 },
                { age: 40, median: 127, sd: 6.9 },
                { age: 41, median: 128, sd: 7.0 },
                { age: 42, median: 129, sd: 7.1 },
                { age: 43, median: 130, sd: 7.2 },
                { age: 44, median: 131, sd: 7.3 },
                { age: 45, median: 132, sd: 7.4 },
                { age: 46, median: 133, sd: 7.5 },
                { age: 47, median: 134, sd: 7.6 },
                { age: 48, median: 135, sd: 7.7 },
                { age: 49, median: 136, sd: 7.8 },
                { age: 50, median: 137, sd: 7.9 },
                { age: 51, median: 138, sd: 8.0 },
                { age: 52, median: 139, sd: 8.1 },
                { age: 53, median: 140, sd: 8.2 },
                { age: 54, median: 141, sd: 8.3 },
                { age: 55, median: 142, sd: 8.4 },
                { age: 56, median: 143, sd: 8.5 },
                { age: 57, median: 144, sd: 8.6 },
                { age: 58, median: 145, sd: 8.7 },
                { age: 59, median: 146, sd: 8.8 },
                { age: 60, median: 147, sd: 8.9 }
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
                { age: 11, median: 15.7, sd: 2.1 },
                { age: 12, median: 16.0, sd: 2.2 },
                { age: 13, median: 16.3, sd: 2.3 },
                { age: 14, median: 16.6, sd: 2.4 },
                { age: 15, median: 16.9, sd: 2.5 },
                { age: 16, median: 17.2, sd: 2.6 },
                { age: 17, median: 17.5, sd: 2.7 },
                { age: 18, median: 17.8, sd: 2.8 },
                { age: 19, median: 18.1, sd: 2.9 },
                { age: 20, median: 18.4, sd: 3.0 },
                { age: 21, median: 18.6, sd: 3.1 },
                { age: 22, median: 18.8, sd: 3.2 },
                { age: 23, median: 19.0, sd: 3.3 },
                { age: 24, median: 19.2, sd: 3.4 },
                { age: 25, median: 19.4, sd: 3.5 },
                { age: 26, median: 19.6, sd: 3.6 },
                { age: 27, median: 19.8, sd: 3.7 },
                { age: 28, median: 20.0, sd: 3.8 },
                { age: 29, median: 20.2, sd: 3.9 },
                { age: 30, median: 20.4, sd: 4.0 },
                { age: 31, median: 20.6, sd: 4.1 },
                { age: 32, median: 20.8, sd: 4.2 },
                { age: 33, median: 21.0, sd: 4.3 },
                { age: 34, median: 21.2, sd: 4.4 },
                { age: 35, median: 21.4, sd: 4.5 },
                { age: 36, median: 21.6, sd: 4.6 },
                { age: 37, median: 21.8, sd: 4.7 },
                { age: 38, median: 22.0, sd: 4.8 },
                { age: 39, median: 22.2, sd: 4.9 },
                { age: 40, median: 22.4, sd: 5.0 },
                { age: 41, median: 22.6, sd: 5.1 },
                { age: 42, median: 22.8, sd: 5.2 },
                { age: 43, median: 23.0, sd: 5.3 },
                { age: 44, median: 23.2, sd: 5.4 },
                { age: 45, median: 23.4, sd: 5.5 },
                { age: 46, median: 23.6, sd: 5.6 },
                { age: 47, median: 23.8, sd: 5.7 },
                { age: 48, median: 24.0, sd: 5.8 },
                { age: 49, median: 24.2, sd: 5.9 },
                { age: 50, median: 24.4, sd: 6.0 },
                { age: 51, median: 24.6, sd: 6.1 },
                { age: 52, median: 24.8, sd: 6.2 },
                { age: 53, median: 25.0, sd: 6.3 },
                { age: 54, median: 25.2, sd: 6.4 },
                { age: 55, median: 25.4, sd: 6.5 },
                { age: 56, median: 25.6, sd: 6.6 },
                { age: 57, median: 25.8, sd: 6.7 },
                { age: 58, median: 26.0, sd: 6.8 },
                { age: 59, median: 26.2, sd: 6.9 },
                { age: 60, median: 26.4, sd: 7.0 }
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
                { age: 11, median: 13.3, sd: 2.1 },
                { age: 12, median: 13.5, sd: 2.2 },
                { age: 13, median: 13.8, sd: 2.3 },
                { age: 14, median: 14.0, sd: 2.4 },
                { age: 15, median: 14.3, sd: 2.5 },
                { age: 16, median: 14.5, sd: 2.6 },
                { age: 17, median: 14.7, sd: 2.7 },
                { age: 18, median: 14.9, sd: 2.8 },
                { age: 19, median: 15.1, sd: 2.9 },
                { age: 20, median: 15.3, sd: 3.0 },
                { age: 21, median: 15.5, sd: 3.1 },
                { age: 22, median: 15.7, sd: 3.2 },
                { age: 23, median: 15.9, sd: 3.3 },
                { age: 24, median: 16.1, sd: 3.4 },
                { age: 25, median: 16.3, sd: 3.5 },
                { age: 26, median: 16.5, sd: 3.6 },
                { age: 27, median: 16.7, sd: 3.7 },
                { age: 28, median: 16.9, sd: 3.8 },
                { age: 29, median: 17.1, sd: 3.9 },
                { age: 30, median: 17.3, sd: 4.0 },
                { age: 31, median: 17.5, sd: 4.1 },
                { age: 32, median: 17.7, sd: 4.2 },
                { age: 33, median: 17.9, sd: 4.3 },
                { age: 34, median: 18.1, sd: 4.4 },
                { age: 35, median: 18.3, sd: 4.5 },
                { age: 36, median: 18.5, sd: 4.6 },
                { age: 37, median: 18.7, sd: 4.7 },
                { age: 38, median: 18.9, sd: 4.8 },
                { age: 39, median: 19.1, sd: 4.9 },
                { age: 40, median: 19.3, sd: 5.0 },
                { age: 41, median: 19.5, sd: 5.1 },
                { age: 42, median: 19.7, sd: 5.2 },
                { age: 43, median: 19.9, sd: 5.3 },
                { age: 44, median: 20.1, sd: 5.4 },
                { age: 45, median: 20.3, sd: 5.5 },
                { age: 46, median: 20.5, sd: 5.6 },
                { age: 47, median: 20.7, sd: 5.7 },
                { age: 48, median: 20.9, sd: 5.8 },
                { age: 49, median: 21.1, sd: 5.9 },
                { age: 50, median: 21.3, sd: 6.0 },
                { age: 51, median: 21.5, sd: 6.1 },
                { age: 52, median: 21.7, sd: 6.2 },
                { age: 53, median: 21.9, sd: 6.3 },
                { age: 54, median: 22.1, sd: 6.4 },
                { age: 55, median: 22.3, sd: 6.5 },
                { age: 56, median: 22.5, sd: 6.6 },
                { age: 57, median: 22.7, sd: 6.7 },
                { age: 58, median: 22.9, sd: 6.8 },
                { age: 59, median: 23.1, sd: 6.9 },
                { age: 60, median: 23.3, sd: 7.0 }
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
                { age: 11, median: 13.3, sd: 2.1 },
                { age: 12, median: 13.5, sd: 2.2 },
                { age: 13, median: 13.8, sd: 2.3 },
                { age: 14, median: 14.0, sd: 2.4 },
                { age: 15, median: 14.3, sd: 2.5 },
                { age: 16, median: 14.5, sd: 2.6 },
                { age: 17, median: 14.7, sd: 2.7 },
                { age: 18, median: 14.9, sd: 2.8 },
                { age: 19, median: 15.1, sd: 2.9 },
                { age: 20, median: 15.3, sd: 3.0 },
                { age: 21, median: 15.5, sd: 3.1 },
                { age: 22, median: 15.7, sd: 3.2 },
                { age: 23, median: 15.9, sd: 3.3 },
                { age: 24, median: 16.1, sd: 3.4 },
                { age: 25, median: 16.3, sd: 3.5 },
                { age: 26, median: 16.5, sd: 3.6 },
                { age: 27, median: 16.7, sd: 3.7 },
                { age: 28, median: 16.9, sd: 3.8 },
                { age: 29, median: 17.1, sd: 3.9 },
                { age: 30, median: 17.3, sd: 4.0 },
                { age: 31, median: 17.5, sd: 4.1 },
                { age: 32, median: 17.7, sd: 4.2 },
                { age: 33, median: 17.9, sd: 4.3 },
                { age: 34, median: 18.1, sd: 4.4 },
                { age: 35, median: 18.3, sd: 4.5 },
                { age: 36, median: 18.5, sd: 4.6 },
                { age: 37, median: 18.7, sd: 4.7 },
                { age: 38, median: 18.9, sd: 4.8 },
                { age: 39, median: 19.1, sd: 4.9 },
                { age: 40, median: 19.3, sd: 5.0 },
                { age: 41, median: 19.5, sd: 5.1 },
                { age: 42, median: 19.7, sd: 5.2 },
                { age: 43, median: 19.9, sd: 5.3 },
                { age: 44, median: 20.1, sd: 5.4 },
                { age: 45, median: 20.3, sd: 5.5 },
                { age: 46, median: 20.5, sd: 5.6 },
                { age: 47, median: 20.7, sd: 5.7 },
                { age: 48, median: 20.9, sd: 5.8 },
                { age: 49, median: 21.1, sd: 5.9 },
                { age: 50, median: 21.3, sd: 6.0 },
                { age: 51, median: 21.5, sd: 6.1 },
                { age: 52, median: 21.7, sd: 6.2 },
                { age: 53, median: 21.9, sd: 6.3 },
                { age: 54, median: 22.1, sd: 6.4 },
                { age: 55, median: 22.3, sd: 6.5 },
                { age: 56, median: 22.5, sd: 6.6 },
                { age: 57, median: 22.7, sd: 6.7 },
                { age: 58, median: 22.9, sd: 6.8 },
                { age: 59, median: 23.1, sd: 6.9 },
                { age: 60, median: 23.3, sd: 7.0 }
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
                { age: 11, median: 11.7, sd: 1.7 },
                { age: 12, median: 12.0, sd: 1.8 },
                { age: 13, median: 12.2, sd: 1.9 },
                { age: 14, median: 12.4, sd: 1.9 },
                { age: 15, median: 12.6, sd: 2.0 },
                { age: 16, median: 12.8, sd: 2.1 },
                { age: 17, median: 13.0, sd: 2.2 },
                { age: 18, median: 13.2, sd: 2.3 },
                { age: 19, median: 13.4, sd: 2.4 },
                { age: 20, median: 13.6, sd: 2.5 },
                { age: 21, median: 13.8, sd: 2.6 },
                { age: 22, median: 14.0, sd: 2.7 },
                { age: 23, median: 14.2, sd: 2.8 },
                { age: 24, median: 14.4, sd: 2.9 },
                { age: 25, median: 14.6, sd: 3.0 },
                { age: 26, median: 14.8, sd: 3.1 },
                { age: 27, median: 15.0, sd: 3.2 },
                { age: 28, median: 15.2, sd: 3.3 },
                { age: 29, median: 15.4, sd: 3.4 },
                { age: 30, median: 15.6, sd: 3.5 },
                { age: 31, median: 15.8, sd: 3.6 },
                { age: 32, median: 16.0, sd: 3.7 },
                { age: 33, median: 16.2, sd: 3.8 },
                { age: 34, median: 16.4, sd: 3.9 },
                { age: 35, median: 16.6, sd: 4.0 },
                { age: 36, median: 16.8, sd: 4.1 },
                { age: 37, median: 17.0, sd: 4.2 },
                { age: 38, median: 17.2, sd: 4.3 },
                { age: 39, median: 17.4, sd: 4.4 },
                { age: 40, median: 17.6, sd: 4.5 },
                { age: 41, median: 17.8, sd: 4.6 },
                { age: 42, median: 18.0, sd: 4.7 },
                { age: 43, median: 18.2, sd: 4.8 },
                { age: 44, median: 18.4, sd: 4.9 },
                { age: 45, median: 18.6, sd: 5.0 },
                { age: 46, median: 18.8, sd: 5.1 },
                { age: 47, median: 19.0, sd: 5.2 },
                { age: 48, median: 19.2, sd: 5.3 },
                { age: 49, median: 19.4, sd: 5.4 },
                { age: 50, median: 19.6, sd: 5.5 },
                { age: 51, median: 19.8, sd: 5.6 },
                { age: 52, median: 20.0, sd: 5.7 },
                { age: 53, median: 20.2, sd: 5.8 },
                { age: 54, median: 20.4, sd: 5.9 },
                { age: 55, median: 20.6, sd: 6.0 },
                { age: 56, median: 20.8, sd: 6.1 },
                { age: 57, median: 21.0, sd: 6.2 },
                { age: 58, median: 21.2, sd: 6.3 },
                { age: 59, median: 21.4, sd: 6.4 },
                { age: 60, median: 21.6, sd: 6.5 }
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