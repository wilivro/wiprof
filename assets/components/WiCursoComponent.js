class WiCursoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.build());
    this.shadowRoot.appendChild(this.styles());
  }

  build() {
    const article = document.createElement('article');
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.setAttribute('src', this.getAttribute('src'));
    img.setAttribute('alt', this.getAttribute('alt'));
    img.onerror = () => img.src = 'assets/img/cursos/default.png';

    const b = document.createElement('b');
    b.innerHTML = this.getAttribute('title');

    const p = document.createElement('p');
    p.innerHTML = this.getAttribute('description');

    const a = document.createElement('a');
    a.setAttribute('href', this.getAttribute('href'));
    a.innerHTML = this.getAttribute('button-text');
    a.classList.add('btn-tertiary');

    article.appendChild(span);
    span.appendChild(img);
    article.appendChild(b);
    article.appendChild(p);
    article.appendChild(a);

    return article;
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
    article {
      padding: 0 30px 30px 30px;
      border-radius: 30px;
      border: 5px solid var(--contrast-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 550px;
    }
    article span {
      position: relative;
      margin-top: -20px;
      margin-left: -0px;
      width: calc(100% + 20px);
    }
    article span img {
      width: 100%;
      z-index: 1;
      position: relative;
      border-radius: 32px;
    }
    article span:before {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      top: -10px;
      right: -10px;
      background-color: var(--secondary-color);
      z-index: 0;
    }
    article b {
      margin: 10px 0;
      letter-spacing: 1px;
      line-height: 1.5rem;
      text-align: center;
      font-weight: 800;
      color: var(--secondary-color);
    }
    article p {
      text-align: justify;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      line-height: 1.1rem;
      font-weight: 200;
      font-size: 1rem;
      color: var(--default-color);
    }
    article a {
      align-self: end;
      text-decoration: none;
      background-color: var(--tertiary-color);
      color: var(--primary-color) !important;
      padding: 5px 20px;
      font-family: 'Ultima Bold', sans-serif;
    }`;
    
    return style;
  }
}

customElements.define('wi-curso', WiCursoComponent);