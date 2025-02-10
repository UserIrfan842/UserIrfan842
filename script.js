// Fungsi untuk menyimpan surat masuk ke localStorage
function saveSuratMasuk(event) {
    event.preventDefault();  // Mencegah form untuk melakukan reload halaman

    const tanggal = document.getElementById('tanggal').value;
    const noSurat = document.getElementById('noSurat').value;
    const perihal = document.getElementById('perihal').value;
    const keterangan = document.getElementById('keterangan').value;
    const konseptor = document.getElementById('konseptor').value;

    // Membuat objek surat
    const suratMasuk = {
        tanggal,
        noSurat,
        perihal,
        keterangan,
        konseptor
    };

    // Menyimpan data surat masuk ke localStorage
    let suratMasukList = JSON.parse(localStorage.getItem('suratMasuk')) || [];
    suratMasukList.push(suratMasuk);

    // Simpan kembali ke localStorage
    localStorage.setItem('suratMasuk', JSON.stringify(suratMasukList));

    // Setelah disimpan, kembali ke halaman utama
    window.location.href = 'index.html';
}

// Fungsi untuk menampilkan surat masuk yang telah disimpan
function displaySuratMasuk() {
    const suratMasukList = JSON.parse(localStorage.getItem('suratMasuk')) || [];
    const tabelSuratMasuk = document.getElementById('tabelSuratMasuk');

    // Kosongkan tabel sebelum menambahkan data baru
    tabelSuratMasuk.innerHTML = '';

    suratMasukList.forEach((surat, index) => {
        const row = tabelSuratMasuk.insertRow();

        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = surat.tanggal;
        row.insertCell(2).innerText = surat.noSurat;
        row.insertCell(3).innerText = surat.perihal;
        row.insertCell(4).innerText = surat.keterangan;
        row.insertCell(5).innerText = surat.konseptor;

        const deleteCell = row.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.onclick = function () {
            deleteSuratMasuk(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Fungsi untuk menghapus surat dari riwayat surat masuk
function deleteSuratMasuk(index) {
    let suratMasukList = JSON.parse(localStorage.getItem('suratMasuk')) || [];
    suratMasukList.splice(index, 1); // Menghapus surat berdasarkan index

    // Simpan kembali setelah penghapusan
    localStorage.setItem('suratMasuk', JSON.stringify(suratMasukList));

    // Update tampilan setelah penghapusan
    displaySuratMasuk();
}

// Menampilkan surat masuk ketika halaman dimuat
window.onload = function() {
    displaySuratMasuk();
};
