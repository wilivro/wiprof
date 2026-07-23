class WiCursoDetalheComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    
    const bootstrap = document.createElement("link");
    bootstrap.setAttribute("rel", "stylesheet");
    bootstrap.setAttribute("href", "../assets/vendor/bootstrap/css/bootstrap.min.css");
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "../assets/css/main.css");
    
    shadow.appendChild(bootstrap);
    shadow.appendChild(link);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.styles());
    this.shadowRoot.appendChild(this.build());
  }

  build() {
    const DEFAULT = '../assets/img/cursos/default.png';
    const id = this.getAttribute('id')
    const article = document.createElement('article');
    article.setAttribute('id', id);

    const section = document.createElement('section');
    section.classList.add('section');
    section.classList.add('background-secondary');
    
    const container = document.createElement('div');
    container.classList.add('container');
    
    const row = document.createElement('div');
    row.classList.add('row');
    
    const col = document.createElement('span');
    col.classList.add('col-12');
    
    const h2 = document.createElement('h2');
    h2.classList.add('text-left');
    h2.innerHTML = this.getAttribute('titulo');
    
    const container2 = document.createElement('div');
    container2.classList.add('container');
    
    const row2 = document.createElement('div');
    row2.classList.add('row');
    row2.classList.add('py-3');
    
    const row3 = document.createElement('div');
    row3.classList.add('row');
    row3.classList.add('py-3');

    const professores = JSON.parse(this.getAttribute('professor'));
    row3.innerHTML = `<h2 class="col-12 mb-3">Professor${!!professores[1] ? 'es' : '(a)'}</h2>`;
    
    professores.forEach(prof => {
      const col = document.createElement('a');
      col.setAttribute('href', `#`);
      col.classList.add('prof');
      col.classList.add('col-12');
      col.classList.add('col-md-6');
      col.classList.add('col-lg-3');
      row3.appendChild(col);

      const imgProf = document.createElement('img');
      imgProf.setAttribute('src', `../assets/img/professores/${prof.img}`);
      imgProf.setAttribute('alt', prof.name);
      imgProf.onerror = () => imgProf.src = DEFAULT;
      col.appendChild(imgProf);

      const profElem = document.createElement('p');
      profElem.classList.add('m-0');
      profElem.classList.add('fw-bold');
      profElem.textContent = prof.name.trim();
      col.appendChild(profElem);
    })
    
    const left = document.createElement('div');
    left.classList.add('col-3');
    left.classList.add('left');
    
    const right = document.createElement('div');
    right.classList.add('col-9');
    right.classList.add('right');
    
    const desc = document.createElement('p');
    desc.classList.add('py-3');
    desc.classList.add('m-0');
    desc.innerHTML = this.getAttribute('descricao');

    const carga = document.createElement('div');
    carga.classList.add('row');
    carga.classList.add('py-3');

    const detalhes = JSON.parse(this.getAttribute('detalhe') || '[]');
    carga.innerHTML = `<h5 class="col-12 mb-3">${this.getAttribute('carga')}</h5>`;

    const detalheList = document.createElement('ul');
    detalheList.classList.add('col-12');
    detalheList.classList.add('detalhe');
    detalhes.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      detalheList.appendChild(li);
    });
    carga.appendChild(detalheList);

    const img = document.createElement('img');
    img.setAttribute('src', `../assets/img/cursos/${id}.png`);
    img.setAttribute('alt', this.getAttribute('alt'));

    img.onerror = () => img.src = DEFAULT;

    article.appendChild(section);
    section.appendChild(container);
    container.appendChild(row);
    article.appendChild(container2);
    container2.appendChild(row2);
    container2.appendChild(carga);
    container2.appendChild(row3);

    row.appendChild(col);
    col.appendChild(h2);
    row2.appendChild(left);
    left.appendChild(img);

    row2.appendChild(right);
    right.appendChild(desc);
    right.appendChild(carga);

    return article;
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
    article {
      margin-bottom: 10rem;
    }
    article h2 {
      margin: 0;
    }
    article > .container > .row > h2 {
      font-size: 1.3rem;
    }
    article .left {
      display: flex;
      justify-content: center;
      align-items: start;
    }
    article .right {
      font-size: 1rem;
      text-align: justify;
    }
    article img {
      width: 100%;
      border-radius: 32px;
    }
    article .prof {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      cursor: pointer;
    }
    article .prof:hover p {
      color: #007bff;
    }
    article .prof img {
      border-radius: 100%;
      width: 100px;
    }
    article .prof p {
      font-size: 0.9rem;
      width: 60%;
      text-align: center;
    }
    @media (max-width: 1000px) {
      article .container > .row:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      article .container .left {
        width: 50%;
      }
    }  
    `;
    
    return style;
  }
}

customElements.define('wi-curso-detalhe', WiCursoDetalheComponent);