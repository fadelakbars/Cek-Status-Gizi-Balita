document.getElementById('giziForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let usia = parseFloat(document.getElementById('usia').value);
    let berat = parseFloat(document.getElementById('berat').value);
    let tinggi = parseFloat(document.getElementById('tinggi').value);
    let kelamin = document.querySelector('input[name="kelamin"]:checked').value;

    // Perhitungan Z-Score (misalnya)
    let zbbu = -1.6; // Ini adalah contoh, Anda dapat menambahkan logika perhitungan Z-Score yang sesuai
    let zpbu = 0.7;
    let zbbpb = -3.0;

    // Menampilkan modal dengan hasil
    document.getElementById('hasil-zbbu').innerText = `Z Score (Berat Badan Menurut Umur): ${zbbu} Berat badan normal`;
    document.getElementById('hasil-zpbu').innerText = `Z Score (Panjang Badan Menurut Umur): ${zpbu} Normal`;
    document.getElementById('hasil-zbbpb').innerText = `Z Score (Berat Badan Menurut Panjang Badan): ${zbbpb} Gizi buruk (severely wasted)`;

    let myModal = new bootstrap.Modal(document.getElementById('resultModal'));
    myModal.show();
});
