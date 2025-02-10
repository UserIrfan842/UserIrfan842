// Fungsi untuk menyimpan surat Kep ke localStorage
function saveKep(event) {
    event.preventDefault();  // Mencegah form untuk melakukan reload halaman

    const tanggal = document.getElementById('tanggal').value;
    const noSurat = document.getElementById('noSurat').value;
    const perihal = document.getElementById('perihal').value;
    const keterangan = document.getElementById('keterangan').value;
    const konseptor = document.getElementById('konseptor').value;

    // Membuat objek surat
    const Kep = {
        tanggal,
        noSurat,
        perihal,
        keterangan,
        konseptor
    };

    // Menyimpan data Kep ke localStorage
    let KepList = JSON.parse(localStorage.getItem('Kep')) || [];
    KepList.push(Kep);

    // Simpan kembali ke localStorage
    localStorage.setItem('Kep', JSON.stringify(KepList));

    // Setelah disimpan, kembali ke halaman utama
    window.location.href = 'index.html';
}

// Fungsi untuk menampilkan Kep yang telah disimpan
function displayKep() {
    const KepList = JSON.parse(localStorage.getItem('Kep')) || [];
    const tabelKep = document.getElementById('tabelKep');

    // Kosongkan tabel sebelum menambahkan data baru
    tabelKep.innerHTML = '';

    KepList.forEach((surat, index) => {
        const row = tabelKep.insertRow();

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
            deleteKep(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Fungsi untuk menghapus surat dari riwayat Kep
function deleteKep(index) {
    let KepList = JSON.parse(localStorage.getItem('Kep')) || [];
    KepList.splice(index, 1); // Menghapus surat berdasarkan index

    // Simpan kembali setelah penghapusan
    localStorage.setItem('Kep', JSON.stringify(KepList));

    // Update tampilan setelah penghapusan
    displayKep();
}

// Menampilkan Kep ketika halaman dimuat
window.onload = function() {
    displayKep();
};
