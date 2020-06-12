// Membuat Tombol klik untuk menu navbar
const navNavigasi = document.querySelector(".nav-navigasi");
const menuKlik = document.querySelector(".menu");

//Jalankan event klik
menuKlik.addEventListener("click", () => {
  navNavigasi.classList.toggle("showNav");
});
