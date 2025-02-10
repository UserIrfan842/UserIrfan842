// Fungsi untuk menyimpan surat Keluar ke localStorage
function saveSuratKeluar(event) {
    event.preventDefault();  // Mencegah form untuk melakukan reload halaman

    const tanggal = document.getElementById('tanggal').value;
    const noSurat = document.getElementById('noSurat').value;
    const perihal = document.getElementById('perihal').value;
    const keterangan = document.getElementById('keterangan').value;
    const konseptor = document.getElementById('konseptor').value;

    // Membuat objek surat
    const suratKeluar = {
        tanggal,
        noSurat,
        perihal,
        keterangan,
        konseptor
    };

    // Menyimpan data surat keluar ke localStorage
    let suratKeluarList = JSON.parse(localStorage.getItem('suratKeluar')) || [];
    suratKeluarList.push(suratKeluar);

    // Simpan kembali ke localStorage
    localStorage.setItem('suratKeluar', JSON.stringify(suratKeluarList));

    // Setelah disimpan, kembali ke halaman utama
    window.location.href = 'index.html';
}

// Fungsi untuk menampilkan surat Keluar yang telah disimpan
function displaySuratKeluar() {
    const suratKeluarList = JSON.parse(localStorage.getItem('suratKeluar')) || [];
    const tabelSuratKeluar = document.getElementById('tabelSuratKeluar');

    // Kosongkan tabel sebelum menambahkan data baru
    tabelSuratKeluar.innerHTML = '';

    suratKeluarList.forEach((surat, index) => {
        const row = tabelSuratKeluar.insertRow();

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
            deleteSuratKeluar(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Fungsi untuk menghapus surat dari riwayat surat keluar
function deleteSuratKeluar(index) {
    let suratKeluarList = JSON.parse(localStorage.getItem('suratKeluar')) || [];
    suratKeluarList.splice(index, 1); // Menghapus surat berdasarkan index

    // Simpan kembali setelah penghapusan
    localStorage.setItem('suratKeluar', JSON.stringify(suratKeluarList));

    // Update tampilan setelah penghapusan
    displaySuratKeluar();
}

// Menampilkan surat Keluar ketika halaman dimuat
window.onload = function() {
    displaySuratKeluar();
};
