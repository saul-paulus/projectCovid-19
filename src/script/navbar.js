class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = ` <div class="container container-navbar">
        <span class="menu navbar-brand">sP</span>
        <div class="nav-navigasi">
            <ul class="list-nav-navigasi">
                <li><a href="./index.html">Beranda</a></li>
                <li><a href="./about.html">Tentang</a></li>
                <li><a href="./contact.html">Kontak</a></li>
            </ul>
        </div>
    </div>`;
  }
}
customElements.get("navbar-navigasi") ||
  customElements.define("navbar-navigasi", Navbar);
