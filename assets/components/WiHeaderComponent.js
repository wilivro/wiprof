const PAGE_ACTIVE_MAP = {
  'course.html': '/#course',
};

class WiHeaderComponent extends HTMLElement {
  connectedCallback() {
    this.id = 'header';
    this.classList.add('header', 'd-flex', 'align-items-center', 'sticky-top');
    this.innerHTML = `
      <div class="container position-relative d-flex align-items-center justify-content-end justify-content-lg-center">
        <nav id="navmenu" class="navmenu">
          <ul>
            <li>
              <img class="logo" src="assets/img/logo.svg" alt="logo do wiquadro" />
            </li>
            <li><a href="/#hero" class="active">Sobre</a></li>
            <li><a href="/#course">Cursos</a></li>
            <li><a href="/#webinart">Webinarts</a></li>
            <li>
              <a href="/#advantages">Vantagens<br />pedagógicas</a>
            </li>
            <li><a class="header-button login" href="/#login">LOGIN</a></li>
            <li>
              <a class="header-button signup" href="/#login">CADASTRAR</a>
            </li>
          </ul>
          <i class="mobile-nav-toggle d-lg-none bi bi-list"></i>
        </nav>
      </div>
    `;
    this._setActiveLink();
  }

  _setActiveLink() {
    const path = window.location.pathname;
    const matchedPage = Object.keys(PAGE_ACTIVE_MAP).find(page => path.endsWith(page));
    if (!matchedPage) return;

    this.querySelectorAll('#navmenu a').forEach(a => a.classList.remove('active'));
    const target = this.querySelector(`#navmenu a[href="${PAGE_ACTIVE_MAP[matchedPage]}"]`);
    if (target) target.classList.add('active');
  }
}

customElements.define('wi-header', WiHeaderComponent);
