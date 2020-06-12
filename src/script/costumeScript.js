import Chart from "chart.js";
import "..";

// Membuat Tombol klik untuk menu navbar
const navNavigasi = document.querySelector(".nav-navigasi");
const menuKlik = document.querySelector(".menu");

//Jalankan event klik
menuKlik.addEventListener("click", () => {
  navNavigasi.classList.toggle("showNav");
});

let val;
const toDay = new Date();
val = toDay;

const waktu = document.querySelector(".waktu");
waktu.innerHTML = val;

// ====================================================

// Memmbuat fungsi untuk mendapatkan data covid Indonesia
// Ditulis dengan gaya async / await
async function asyncGetDataCovidIndo() {
  try {
    const getDataCovidIndonesia = await getDataCovidInd();
    displayDataCovidInd(getDataCovidIndonesia); //display data angka
    displayGrafikDataCovifInd(getDataCovidIndonesia); //display data grafik
  } catch (error) {
    alert(error);
  }
}
asyncGetDataCovidIndo();

function getDataCovidInd() {
  return fetch("https://indonesia-covid-19.mathdro.id/api")
    .then((response) => response.json())
    .then((response) => response);
}

// Membuat untuk display data per provinsi di indonesia, ditulis dengan gaya promise
fetch("https://indonesia-covid-19.mathdro.id/api/provinsi")
  .then((response) => response.json())
  .then((response) => {
    const dataProvIndo = response.data;
    let containerDataCovidProvInd = "";
    dataProvIndo.forEach((m) => {
      if (m.provinsi == "Maluku") {
        displayDataCovidMaluku(m);
      } else if (m.provinsi) {
        const { provinsi, kasusPosi, kasusSemb, kasusMeni } = m;
        containerDataCovidProvInd += `<tr>
                <td>${provinsi}</td>
                <td>${kasusPosi}</td>
                <td>${kasusSemb}</td>
                <td>${kasusMeni}</td>
              </tr>`;
      }
    });
    const containerDataSeluruhInd = document.querySelector(
      ".containerDataSeluruhProvinsi"
    );
    containerDataSeluruhInd.innerHTML = containerDataCovidProvInd;
  })
  .catch((error) => {
    alert(error);
  });

// Membuat display presentasi covid-19 perHari
fetch("https://indonesia-covid-19.mathdro.id/api/harian")
  .then((response) => response.json())
  .then((response) => {
    const dataPerHari = response.data;
    let containerdataPerHari = "";
    let containerDataKasusPerHari = "";
    dataPerHari.forEach((m) => {
      const {
        harike,
        jumlahKasusBaruperHari,
        jumlahKasusSembuhperHari,
        jumlahKasusMeninggalperHari,
        jumlahKasusDirawatperHari,
        jumlahKasusKumulatif,
        jumlahPasienSembuh,
        jumlahPasienMeninggal,
      } = m;
      containerdataPerHari += `  <tr>
               <td>${harike}</td>
               <td>${jumlahKasusBaruperHari}</td>        
               <td>${jumlahKasusSembuhperHari}</td>
               <td>${jumlahKasusMeninggalperHari}</td>
               <td>${jumlahKasusDirawatperHari}</td> 
                </tr>`;

      containerDataKasusPerHari += `   <tr>
                                      <td>${harike}</td>
                                      <td>${jumlahKasusKumulatif}</td>
                                      <td>${jumlahPasienSembuh}</td>
                                      <td>${jumlahPasienMeninggal}</td>
                                    </tr>`;
    });
    const dataCovidPerHari = document.querySelector(".containerDataPerHari");
    dataCovidPerHari.innerHTML = containerdataPerHari;

    const dataKasusPerHari = document.querySelector(
      ".containerDataKasusPerHari"
    );
    dataKasusPerHari.innerHTML = containerDataKasusPerHari;
  })
  .catch((error) => {
    alert(error);
  });

// Fungsi untuk menampilkan data===========================
//Display data grafik
const displayGrafikDataCovifInd = (getDataCovidIndonesia) => {
  const { jumlahKasus, sembuh, meninggal, perawatan } = getDataCovidIndonesia;
  const ctx = document.getElementById("grafikBatang").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jumlah Kasus", "Sembuh", "Meninggal", "Perawatan"],
      datasets: [
        {
          label: "Setuasi Covid-19 Di Indonesia",
          data: [jumlahKasus, sembuh, meninggal, perawatan],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 206, 86, 1)",
            "rgba(255,99,132,1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

// Fungsi untuk mendisplay data covid Indonesia====================
const displayDataCovidInd = (getDataCovidIndonesia) => {
  const { jumlahKasus, sembuh, meninggal, perawatan } = getDataCovidIndonesia;
  let containerDataCovidInd = "";
  containerDataCovidInd += ` <div class="card">
                                <h4>Jml Kasus</h4>
                                <p style="color:yellow" ); ">${jumlahKasus} <span>orang</span></p>
                            </div>
                            <div class="card ">
                                <h4>Sembuh</h4>
                                <p style="color: rgb(6, 128, 6); ">${sembuh} <span>orang</span></p>
                            </div>
                            <div class="card ">
                                <h4>Meninggal</h4>
                                <p style="color: rgb(241, 11, 11); ">${meninggal} <span>orang</span></p>

                            </div>
                            <div class="card ">
                                <h4 >Perawatan</h4>
                                <p style="color: orange; ">${perawatan} <span>orang</span></p>
                            </div>`;

  const dataAng = document.querySelector(".dataAngka");
  dataAng.innerHTML = containerDataCovidInd;
};

// Fungsi untuk mendisplay covid data Maluku========================
const displayDataCovidMaluku = (m) => {
  const { kasusPosi, kasusSemb, kasusMeni } = m;
  let containerdataCovidMaluku = "";
  containerdataCovidMaluku += `<div class="card">
                                <h4>Kasus Positif</h4>
                                <p style="color:yellow;">${kasusPosi}<span>orang</span></p>
                               </div>
                            <div class="card ">
                                    <h4>Kasus Sembuh</h4>
                                    <p style="color:green;">${kasusSemb}<span>orang</span></p>        
                            </div>
                            <div class="card">
                                <h4>Kasus Meninggal</h4>
                                <p style="color:red;">${kasusMeni}<span>orang</span></p>
                            </div>`;

  const dataMalu = document.querySelector(".dataMaluku");
  dataMalu.innerHTML = containerdataCovidMaluku;
};
