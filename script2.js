// Fungsi untuk menyimpan surat SPRIN ke localStorage
function saveSPRIN(event) {
    event.preventDefault();  // Mencegah form untuk melakukan reload halaman

    const tanggal = document.getElementById('tanggal').value;
    const noSurat = document.getElementById('noSurat').value;
    const perihal = document.getElementById('perihal').value;
    const keterangan = document.getElementById('keterangan').value;
    const konseptor = document.getElementById('konseptor').value;

    // Membuat objek surat
    const SPRIN = {
        tanggal,
        noSurat,
        perihal,
        keterangan,
        konseptor
    };

    // Menyimpan data SPRIN ke localStorage
    let SPRINList = JSON.parse(localStorage.getItem('SPRIN')) || [];
    SPRINList.push(SPRIN);

    // Simpan kembali ke localStorage
    localStorage.setItem('SPRIN', JSON.stringify(SPRINList));

    // Setelah disimpan, kembali ke halaman utama
    window.location.href = 'index.html';
}

// Fungsi untuk menampilkan SPRIN yang telah disimpan
function displaySPRIN() {
    const SPRINList = JSON.parse(localStorage.getItem('SPRIN')) || [];
    const tabelSPRIN = document.getElementById('tabelSPRIN');

    // Kosongkan tabel sebelum menambahkan data baru
    tabelSPRIN.innerHTML = '';

    SPRINList.forEach((surat, index) => {
        const row = tabelSPRIN.insertRow();

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
            deleteSPRIN(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Fungsi untuk menghapus surat dari riwayat SPRIN
function deleteSPRIN(index) {
    let SPRINList = JSON.parse(localStorage.getItem('SPRIN')) || [];
    SPRINList.splice(index, 1); // Menghapus surat berdasarkan index

    // Simpan kembali setelah penghapusan
    localStorage.setItem('SPRIN', JSON.stringify(SPRINList));

    // Update tampilan setelah penghapusan
    displaySPRIN();
}

// Menampilkan SPRIN ketika halaman dimuat
window.onload = function() {
    displaySPRIN();
};
