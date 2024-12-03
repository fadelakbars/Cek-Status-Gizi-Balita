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
                { age: 0, minSD: 2.1, median: 3.3, maxSD: 5.0 },
                { age: 1, minSD: 2.9, median: 4.5, maxSD: 6.6 },
                { age: 2, minSD: 3.8, median: 5.6, maxSD: 8.0 },
                { age: 3, minSD: 4.4, median: 6.4, maxSD: 9.0 },
                { age: 4, minSD: 4.9, median: 7.0, maxSD: 9.7 },
                { age: 5, minSD: 5.3, median: 7.5, maxSD: 10.4 },
                { age: 6, minSD: 5.7, median: 7.9, maxSD: 10.9 },
                { age: 7, minSD: 5.9, median: 8.3, maxSD: 11.4 },
                { age: 8, minSD: 6.2, median: 8.6, maxSD: 11.9 },
                { age: 9, minSD: 6.4, median: 8.9, maxSD: 12.3 },
                { age: 10, minSD: 6.6, median: 9.2, maxSD: 12.7 },
                { age: 11, minSD: 6.8, median: 9.4, maxSD: 13.0 },
                { age: 12, minSD: 6.9, median: 9.6, maxSD: 13.3 },
                { age: 13, minSD: 7.1, median: 9.9, maxSD: 13.7 },
                { age: 14, minSD: 7.2, median: 10.1, maxSD: 14.0 },
                { age: 15, minSD: 7.4, median: 10.3, maxSD: 14.3 },
                { age: 16, minSD: 7.5, median: 10.5, maxSD: 14.6 },
                { age: 17, minSD: 7.7, median: 10.7, maxSD: 14.9 },
                { age: 18, minSD: 7.8, median: 10.9, maxSD: 15.3 },
                { age: 19, minSD: 8.0, median: 11.1, maxSD: 15.6 },
                { age: 20, minSD: 8.1, median: 11.3, maxSD: 15.9 },
                { age: 21, minSD: 8.2, median: 11.5, maxSD: 16.2 },
                { age: 22, minSD: 8.4, median: 11.8, maxSD: 16.5 },
                { age: 23, minSD: 8.5, median: 12.0, maxSD: 16.8 },
                { age: 24, minSD: 8.6, median: 12.2, maxSD: 17.1 },
                { age: 25, minSD: 8.8, median: 12.4, maxSD: 17.5 },
                { age: 26, minSD: 8.9, median: 12.5, maxSD: 17.8 },
                { age: 27, minSD: 9.0, median: 12.7, maxSD: 18.1 },
                { age: 28, minSD: 9.1, median: 12.9, maxSD: 18.4 },
                { age: 29, minSD: 9.2, median: 13.1, maxSD: 18.7 },
                { age: 30, minSD: 9.4, median: 13.3, maxSD: 19.0 },
                { age: 31, minSD: 9.5, median: 13.5, maxSD: 19.3 },
                { age: 32, minSD: 9.6, median: 13.7, maxSD: 19.6 },
                { age: 33, minSD: 9.7, median: 13.8, maxSD: 19.9 },
                { age: 34, minSD: 9.8, median: 14.0, maxSD: 20.2 },
                { age: 35, minSD: 9.9, median: 14.2, maxSD: 20.4 },
                { age: 36, minSD: 10.0, median: 14.3, maxSD: 20.7 },
                { age: 37, minSD: 10.1, median: 14.5, maxSD: 21.0 },
                { age: 38, minSD: 10.2, median: 14.7, maxSD: 21.3 },
                { age: 39, minSD: 10.3, median: 14.8, maxSD: 21.6 },
                { age: 40, minSD: 10.4, median: 15.0, maxSD: 21.9 },
                { age: 41, minSD: 10.5, median: 15.2, maxSD: 22.1 },
                { age: 42, minSD: 10.6, median: 15.3, maxSD: 22.4 },
                { age: 43, minSD: 10.7, median: 15.5, maxSD: 22.7 },
                { age: 44, minSD: 10.8, median: 15.7, maxSD: 23.0 },
                { age: 45, minSD: 10.9, median: 15.8, maxSD: 23.3 },
                { age: 46, minSD: 11.0, median: 16.0, maxSD: 23.6 },
                { age: 47, minSD: 11.1, median: 16.2, maxSD: 23.9 },
                { age: 48, minSD: 11.2, median: 16.3, maxSD: 24.2 },
                { age: 49, minSD: 11.3, median: 16.5, maxSD: 24.5 },
                { age: 50, minSD: 11.4, median: 16.7, maxSD: 24.8 },
                { age: 51, minSD: 11.5, median: 16.8, maxSD: 25.1 },
                { age: 52, minSD: 11.6, median: 17.0, maxSD: 25.4 },
                { age: 53, minSD: 11.7, median: 17.2, maxSD: 25.7 },
                { age: 54, minSD: 11.8, median: 17.3, maxSD: 26.0 },
                { age: 55, minSD: 11.9, median: 17.5, maxSD: 26.3 },
                { age: 56, minSD: 12.0, median: 17.7, maxSD: 26.6 },
                { age: 57, minSD: 12.1, median: 17.8, maxSD: 26.9 },
                { age: 58, minSD: 12.2, median: 18.0, maxSD: 27.2 },
                { age: 59, minSD: 15.5, median: 18.0, maxSD: 20.6 },
                { age: 60, minSD: 15.6, median: 18.1, maxSD: 20.8 }
            ],
            "heightForAge": [
                { age: 0, minSD: 44.2, median: 49.9, maxSD: 51.8 },
                { age: 1, minSD: 48.9, median: 54.7, maxSD: 56.7 },
                { age: 2, minSD: 52.4, median: 58.4, maxSD: 60.4 },
                { age: 3, minSD: 55.3, median: 61.4, maxSD: 63.5 },
                { age: 4, minSD: 57.6, median: 63.9, maxSD: 66.0 },
                { age: 5, minSD: 59.6, median: 65.9, maxSD: 68.0 },
                { age: 6, minSD: 61.2, median: 67.6, maxSD: 69.8 },
                { age: 7, minSD: 62.7, median: 69.2, maxSD: 71.3 },
                { age: 8, minSD: 64.0, median: 70.6, maxSD: 72.8 },
                { age: 9, minSD: 65.2, median: 72.0, maxSD: 74.2 },
                { age: 10, minSD: 66.4, median: 73.3, maxSD: 75.6 },
                { age: 11, minSD: 69.9, median: 72.2, maxSD: 74.5 },
                { age: 12, minSD: 71.0, median: 73.4, maxSD: 75.7 },
                { age: 13, minSD: 72.1, median: 74.5, maxSD: 76.9 },
                { age: 14, minSD: 73.1, median: 75.6, maxSD: 78.0 },
                { age: 15, minSD: 74.1, median: 76.6, maxSD: 79.1 },
                { age: 16, minSD: 75.0, median: 77.6, maxSD: 80.2 },
                { age: 17, minSD: 76.0, median: 78.6, maxSD: 81.2 },
                { age: 18, minSD: 76.9, median: 79.6, maxSD: 82.3 },
                { age: 19, minSD: 77.7, median: 80.5, maxSD: 83.2 },
                { age: 20, minSD: 78.6, median: 81.4, maxSD: 84.2 },
                { age: 21, minSD: 79.4, median: 82.3, maxSD: 85.1 },
                { age: 22, minSD: 80.2, median: 83.1, maxSD: 86.0 },
                { age: 23, minSD: 81.0, median: 83.9, maxSD: 86.9 },
                { age: 24, minSD: 81.7, median: 84.8, maxSD: 87.8 },
                { age: 25, minSD: 82.1, median: 85.1, maxSD: 88.1 },
                { age: 26, minSD: 82.6, median: 85.4, maxSD: 88.4 },
                { age: 27, minSD: 83.1, median: 85.7, maxSD: 88.7 },
                { age: 28, minSD: 83.5, median: 86, maxSD: 89 },
                { age: 29, minSD: 84, median: 86.3, maxSD: 89.3 },
                { age: 30, minSD: 84.5, median: 86.6, maxSD: 89.6 },
                { age: 31, minSD: 85, median: 87, maxSD: 90 },
                { age: 32, minSD: 85.5, median: 87.3, maxSD: 90.3 },
                { age: 33, minSD: 85.9, median: 87.6, maxSD: 90.6 },
                { age: 34, minSD: 86.3, median: 87.9, maxSD: 90.9 },
                { age: 35, minSD: 86.8, median: 88.2, maxSD: 91.2 },
                { age: 36, minSD: 87.3, median: 88.5, maxSD: 91.5 },
                { age: 37, minSD: 87.7, median: 88.8, maxSD: 91.8 },
                { age: 38, minSD: 88.1, median: 89.2, maxSD: 92.2 },
                { age: 39, minSD: 88.5, median: 89.5, maxSD: 92.5 },
                { age: 40, minSD: 88.9, median: 89.8, maxSD: 92.8 },
                { age: 41, minSD: 89.3, median: 90.1, maxSD: 93.1 },
                { age: 42, minSD: 89.7, median: 90.4, maxSD: 93.4 },
                { age: 43, minSD: 90.1, median: 90.7, maxSD: 93.7 },
                { age: 44, minSD: 90.4, median: 91.0, maxSD: 94 },
                { age: 45, minSD: 90.8, median: 91.3, maxSD: 94.3 },
                { age: 46, minSD: 91.2, median: 91.7, maxSD: 94.7 },
                { age: 47, minSD: 91.5, median: 92, maxSD: 95 },
                { age: 48, minSD: 91.9, median: 92.3, maxSD: 95.3 },
                { age: 49, minSD: 92.3, median: 92.7, maxSD: 95.7 },
                { age: 50, minSD: 92.7, median: 93, maxSD: 96 },
                { age: 51, minSD: 93.0, median: 93.3, maxSD: 96.3 },
                { age: 52, minSD: 93.4, median: 93.7, maxSD: 96.7 },
                { age: 53, minSD: 93.8, median: 94, maxSD: 97 },
                { age: 54, minSD: 94.2, median: 94.3, maxSD: 97.3 },
                { age: 55, minSD: 94.6, median: 94.7, maxSD: 97.7 },
                { age: 56, minSD: 95.0, median: 95.1, maxSD: 98.1 },
                { age: 57, minSD: 95.3, median: 95.4, maxSD: 98.4 },
                { age: 58, minSD: 95.7, median: 95.8, maxSD: 98.8 },
                { age: 59, minSD: 96.0, median: 96.2, maxSD: 99.2 },
                { age: 60, minSD: 96.4, median: 96.6, maxSD: 99.6 }
            ],
            "weightForHeight": [
                    { length: 54.5, minSD: 5.1, median: 6.0, maxSD: 6.8 },
                    { length: 55, minSD: 5.2, median: 6.1, maxSD: 6.9 },
                    { length: 55.5, minSD: 5.3, median: 6.2, maxSD: 7.0 },
                    { length: 56, minSD: 5.4, median: 6.3, maxSD: 7.1 },
                    { length: 56.5, minSD: 5.5, median: 6.4, maxSD: 7.2 },
                    { length: 57, minSD: 5.6, median: 6.5, maxSD: 7.3 },
                    { length: 57.5, minSD: 5.7, median: 6.6, maxSD: 7.4 },
                    { length: 58, minSD: 5.8, median: 6.7, maxSD: 7.5 },
                    { length: 58.5, minSD: 5.9, median: 6.8, maxSD: 7.6 },
                    { length: 59, minSD: 6.0, median: 6.9, maxSD: 7.7 },
                    { length: 59.5, minSD: 6.1, median: 7.0, maxSD: 7.8 },
                    { length: 60, minSD: 6.2, median: 7.1, maxSD: 7.9 },
                    { length: 60.5, minSD: 6.3, median: 7.2, maxSD: 8.0 },
                    { length: 61, minSD: 6.4, median: 7.3, maxSD: 8.1 },
                    { length: 61.5, minSD: 6.5, median: 7.4, maxSD: 8.2 },
                    { length: 62, minSD: 6.6, median: 7.5, maxSD: 8.3 },
                    { length: 62.5, minSD: 6.7, median: 7.6, maxSD: 8.4 },
                    { length: 63, minSD: 6.8, median: 7.7, maxSD: 8.5 },
                    { length: 63.5, minSD: 6.9, median: 7.8, maxSD: 8.6 },
                    { length: 64, minSD: 7.0, median: 7.9, maxSD: 8.7 },
                    { length: 64.5, minSD: 7.1, median: 8.0, maxSD: 8.8 },
                    { length: 65, minSD: 7.2, median: 8.1, maxSD: 8.9 },
                    { length: 65.5, minSD: 7.3, median: 8.2, maxSD: 9.0 },
                    { length: 66, minSD: 7.4, median: 8.3, maxSD: 9.1 },
                    { length: 66.5, minSD: 7.5, median: 8.4, maxSD: 9.2 },
                    { length: 67, minSD: 7.6, median: 8.5, maxSD: 9.3 },
                    { length: 67.5, minSD: 7.7, median: 8.6, maxSD: 9.4 },
                    { length: 68, minSD: 7.8, median: 8.7, maxSD: 9.5 },
                    { length: 68.5, minSD: 7.9, median: 8.8, maxSD: 9.6 },
                    { length: 69, minSD: 8.0, median: 8.9, maxSD: 9.7 },
                    { length: 69.5, minSD: 8.1, median: 9.0, maxSD: 9.8 },
                    { length: 70, minSD: 8.2, median: 9.1, maxSD: 9.9 },
                    { length: 70.5, minSD: 8.3, median: 9.2, maxSD: 10.0 },
                    { length: 71, minSD: 8.4, median: 9.3, maxSD: 10.1 },
                    { length: 71.5, minSD: 8.5, median: 9.4, maxSD: 10.2 },
                    { length: 72, minSD: 8.6, median: 9.5, maxSD: 10.3 },
                    { length: 72.5, minSD: 8.7, median: 9.6, maxSD: 10.4 },
                    { length: 73, minSD: 8.8, median: 9.7, maxSD: 10.5 },
                    { length: 73.5, minSD: 8.9, median: 9.8, maxSD: 10.6 },
                    { length: 74, minSD: 9.0, median: 9.9, maxSD: 10.7 },
                    { length: 74.5, minSD: 9.1, median: 10.0, maxSD: 10.8 },
                    { length: 75, minSD: 9.2, median: 10.1, maxSD: 10.9 },
                    { length: 75.5, minSD: 9.3, median: 10.2, maxSD: 11.0 },
                    { length: 76, minSD: 9.4, median: 10.3, maxSD: 11.1 },
                    { length: 76.5, minSD: 9.5, median: 10.4, maxSD: 11.2 },
                    { length: 77, minSD: 9.6, median: 10.5, maxSD: 11.3 },
                    { length: 77.5, minSD: 9.7, median: 10.6, maxSD: 11.4 },
                    { length: 78, minSD: 9.8, median: 10.7, maxSD: 11.5 },
                    { length: 78.5, minSD: 9.9, median: 10.8, maxSD: 11.6 },
                    { length: 79, minSD: 10.0, median: 10.9, maxSD: 11.7 },
                    { length: 79.5, minSD: 10.1, median: 11.0, maxSD: 11.8 },
                    { length: 80, minSD: 10.2, median: 11.1, maxSD: 11.9 },
                    { length: 80.5, minSD: 10.3, median: 11.2, maxSD: 12.0 },
                    { length: 81, minSD: 10.4, median: 11.3, maxSD: 12.1 },
                    { length: 81.5, minSD: 10.5, median: 11.4, maxSD: 12.2 },
                    { length: 82, minSD: 10.6, median: 11.5, maxSD: 12.3 },
                    { length: 82.5, minSD: 10.7, median: 11.6, maxSD: 12.4 },
                    { length: 83, minSD: 10.8, median: 11.7, maxSD: 12.5 },
                    { length: 83.5, minSD: 10.9, median: 11.8, maxSD: 12.6 },
                    { length: 84, minSD: 11.0, median: 11.9, maxSD: 12.7 },
                    { length: 84.5, minSD: 11.1, median: 12.0, maxSD: 12.8 },
                    { length: 85, minSD: 11.2, median: 12.1, maxSD: 12.9 },
                    { length: 85.5, minSD: 11.3, median: 12.2, maxSD: 13.0 },
                    { length: 86, minSD: 11.4, median: 12.3, maxSD: 13.1 },
                    { length: 86.5, minSD: 11.5, median: 12.4, maxSD: 13.2 },
                    { length: 87, minSD: 11.6, median: 12.5, maxSD: 13.3 },
                    { length: 87.5, minSD: 11.7, median: 12.6, maxSD: 13.4 },
                    { length: 88, minSD: 11.8, median: 12.7, maxSD: 13.5 },
                    { length: 88.5, minSD: 11.9, median: 12.8, maxSD: 13.6 },
                    { length: 89, minSD: 12.0, median: 12.9, maxSD: 13.7 },
                    { length: 89.5, minSD: 12.1, median: 13.0, maxSD: 13.9 },
                    { length: 90, minSD: 12.2, median: 13.1, maxSD: 14.0 },
                    { length: 90.5, minSD: 12.3, median: 13.2, maxSD: 14.1 },
                    { length: 91, minSD: 12.4, median: 13.3, maxSD: 14.2 },
                    { length: 91.5, minSD: 12.5, median: 13.4, maxSD: 14.3 },
                    { length: 92, minSD: 12.6, median: 13.5, maxSD: 14.4 },
                    { length: 92.5, minSD: 12.7, median: 13.6, maxSD: 14.5 },
                    { length: 93, minSD: 12.8, median: 13.7, maxSD: 14.6 },
                    { length: 93.5, minSD: 12.9, median: 13.8, maxSD: 14.7 },
                    { length: 94, minSD: 13.0, median: 13.9, maxSD: 14.8 },
                    { length: 94.5, minSD: 13.1, median: 14.0, maxSD: 14.9 },
                    { length: 95, minSD: 13.2, median: 14.1, maxSD: 15.0 },
                    { length: 95.5, minSD: 13.3, median: 14.2, maxSD: 15.1 },
                    { length: 96, minSD: 13.4, median: 14.3, maxSD: 15.2 },
                    { length: 96.5, minSD: 13.5, median: 14.4, maxSD: 15.3 },
                    { length: 97, minSD: 13.6, median: 14.5, maxSD: 15.4 },
                    { length: 97.5, minSD: 13.7, median: 14.6, maxSD: 15.5 },
                    { length: 98, minSD: 13.8, median: 14.7, maxSD: 15.6 },
                    { length: 98.5, minSD: 13.9, median: 14.8, maxSD: 15.7 },
                    { length: 99, minSD: 14.0, median: 14.9, maxSD: 15.8 },
                    { length: 99.5, minSD: 14.1, median: 15.0, maxSD: 15.9 },
                    { length: 100, minSD: 14.2, median: 15.1, maxSD: 16.0 },
                    { length: 100.5, minSD: 14.3, median: 15.2, maxSD: 16.1 },
                    { length: 101, minSD: 14.4, median: 15.3, maxSD: 16.2 },
                    { length: 101.5, minSD: 14.5, median: 15.4, maxSD: 16.3 },
                    { length: 102, minSD: 14.6, median: 15.5, maxSD: 16.4 },
                    { length: 102.5, minSD: 14.7, median: 15.6, maxSD: 16.5 },
                    { length: 103, minSD: 14.8, median: 15.7, maxSD: 16.6 },
                    { length: 103.5, minSD: 14.9, median: 15.8, maxSD: 16.7 },
                    { length: 104, minSD: 15.0, median: 15.9, maxSD: 16.8 },
                    { length: 104.5, minSD: 15.1, median: 16.0, maxSD: 16.9 },
                    { length: 105, minSD: 15.2, median: 16.1, maxSD: 17.0 },
                    { length: 105.5, minSD: 15.3, median: 16.2, maxSD: 17.1 },
                    { length: 106, minSD: 15.4, median: 16.3, maxSD: 17.2 },
                    { length: 106.5, minSD: 15.5, median: 16.4, maxSD: 17.3 },
                    { length: 107, minSD: 15.6, median: 16.5, maxSD: 17.4 },
                    { length: 107.5, minSD: 15.7, median: 16.6, maxSD: 17.5 },
                    { length: 108, minSD: 15.8, median: 16.7, maxSD: 17.6 },
                    { length: 108.5, minSD: 15.9, median: 16.8, maxSD: 17.7 },
                    { length: 109, minSD: 16.0, median: 16.9, maxSD: 17.8 },
                    { length: 109.5, minSD: 16.1, median: 17.0, maxSD: 17.9 },
                    { length: 110, minSD: 16.2, median: 17.1, maxSD: 18.0 }
            ]
            
        },
        "female": {
            "weightForAge": [
                { age: 0, minSD: 2.8, median: 3.2, maxSD: 3.6 },
                { age: 1, minSD: 3.9, median: 4.3, maxSD: 4.7 },
                { age: 2, minSD: 4.9, median: 5.3, maxSD: 5.7 },
                { age: 3, minSD: 5.5, median: 5.9, maxSD: 6.3 },
                { age: 4, minSD: 6.0, median: 6.4, maxSD: 6.8 },
                { age: 5, minSD: 6.4, median: 6.8, maxSD: 7.2 },
                { age: 6, minSD: 6.8, median: 7.2, maxSD: 7.6 },
                { age: 7, minSD: 7.1, median: 7.5, maxSD: 7.9 },
                { age: 8, minSD: 7.4, median: 7.8, maxSD: 8.2 },
                { age: 9, minSD: 7.6, median: 8.0, maxSD: 8.4 },
                { age: 10, minSD: 7.8, median: 8.2, maxSD: 8.6 },
            ],
            "heightForAge": [
                { age: 0, minSD: 48.0, median: 50, maxSD: 52.0 },
                { age: 1, minSD: 58.0, median: 60, maxSD: 62.0 },
                { age: 2, minSD: 68.0, median: 70, maxSD: 72.0 },
                { age: 3, minSD: 78.0, median: 80, maxSD: 82.0 },
                { age: 4, minSD: 83.0, median: 85, maxSD: 87.0 },
                { age: 5, minSD: 88.0, median: 90, maxSD: 92.0 },
                { age: 6, minSD: 90.0, median: 92, maxSD: 94.0 },
                { age: 7, minSD: 92.0, median: 94, maxSD: 96.0 },
                { age: 8, minSD: 93.0, median: 95, maxSD: 97.0 },
                { age: 9, minSD: 94.0, median: 96, maxSD: 98.0 },
                { age: 10, minSD: 95.0, median: 97, maxSD: 99.0 },
            ],
            "weightForHeight": [
                { age: 0, minSD: 2.7, median: 3.2, maxSD: 3.7 },
                { age: 1, minSD: 7.5, median: 7.6, maxSD: 8.5 },
                { age: 2, minSD: 8.5, median: 8.6, maxSD: 9.6 },
                { age: 3, minSD: 9.1, median: 9.7, maxSD: 10.7 },
                { age: 4, minSD: 9.5, median: 9.9, maxSD: 10.9 },
                { age: 5, minSD: 9.9, median: 10.1, maxSD: 11.1 },
                { age: 6, minSD: 10.2, median: 10.4, maxSD: 11.4 },
                { age: 7, minSD: 10.5, median: 10.7, maxSD: 11.7 },
                { age: 8, minSD: 10.8, median: 11.0, maxSD: 12.0 },
                { age: 9, minSD: 11.0, median: 11.2, maxSD: 12.2 },
                { age: 10, minSD: 11.3, median: 11.5, maxSD: 12.5 },
            ]
        }
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

        const minSD = closestAge.minSD;
        const median = closestAge.median;
        const maxSD = closestAge.maxSD;

        // Menentukan rumus yang akan digunakan berdasarkan apakah BB lebih kecil atau lebih besar dari median
        if (value < median) {
            return (value - median) / (median - minSD); // BB < median
        } else {
            return (value - median) / (maxSD - median); // BB > median
        }
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
