class WiProfessorModalComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.styles());
    this.shadowRoot.appendChild(this.build());

    this.dialog = this.shadowRoot.querySelector('dialog');
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.close());
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.close();
    });
    this.dialog.addEventListener('close', () => this._unlockPageScroll());
  }

  build() {
    const dialog = document.createElement('dialog');

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.classList.add('close');
    closeBtn.setAttribute('aria-label', 'Fechar');
    closeBtn.innerHTML = '&times;';

    const article = document.createElement('article');

    const span = document.createElement('span');
    const img = document.createElement('img');
    img.classList.add('photo');
    span.appendChild(img);

    const h2 = document.createElement('h2');
    h2.classList.add('name');

    const p = document.createElement('p');
    p.classList.add('bio');

    article.appendChild(span);
    article.appendChild(h2);
    article.appendChild(p);

    dialog.appendChild(closeBtn);
    dialog.appendChild(article);

    return dialog;
  }

  open(prof) {
    const DEFAULT = 'assets/img/cursos/default.png';
    const img = this.shadowRoot.querySelector('.photo');
    img.src = prof.img ? `assets/img/professores/${prof.img}` : DEFAULT;
    img.alt = prof.name;
    img.onerror = () => img.src = DEFAULT;

    this.shadowRoot.querySelector('.name').textContent = prof.name;
    this.shadowRoot.querySelector('.bio').innerHTML = prof.bio || 'Biografia em breve.';

    this._lockPageScroll();
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  _lockPageScroll() {
    document.documentElement.style.overflow = 'hidden';
  }

  _unlockPageScroll() {
    document.documentElement.style.overflow = '';
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
    dialog {
      border: none;
      border-radius: 30px;
      padding: 0;
      width: min(600px, 90vw);
      max-height: 85vh;
      overflow: hidden;
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.6);
    }
    article {
      box-sizing: border-box;
      max-height: 85vh;
      padding: 50px 30px 30px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      overflow: hidden;
    }
    .close {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
      border: none;
      background: none;
      font-size: 3rem;
      line-height: 1;
      cursor: pointer;
      color: var(--default-color);
    }
    .close:hover {
      color: var(--secondary-color);
    }
    span {
      display: block;
      width: 140px;
      flex-shrink: 0;
      margin-bottom: 1rem;
    }
    .photo {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 100%;
    }
    .name {
      flex-shrink: 0;
      color: var(--secondary-color);
      font-weight: 800;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .bio {
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      margin: 0;
      padding-right: 10px;
      text-align: justify;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      line-height: 1.4rem;
      font-weight: 300;
      font-size: 0.95rem;
      color: var(--default-color);
      scrollbar-width: thin;
      scrollbar-color: var(--secondary-color) transparent;
    }
    .bio::-webkit-scrollbar {
      width: 6px;
    }
    .bio::-webkit-scrollbar-track {
      background: transparent;
    }
    .bio::-webkit-scrollbar-thumb {
      background-color: var(--secondary-color);
      border-radius: 10px;
    }
    @media (max-width: 576px) {
      article {
        padding: 55px 20px 25px 20px;
      }
      span {
        width: 110px;
      }
    }
    `;
    return style;
  }
}

customElements.define('wi-professor-modal', WiProfessorModalComponent);
