class PedagogicalAdvantageComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(this.build());
    shadow.appendChild(this.style());
  }

  build() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', this.getAttribute('src'));
    img.setAttribute('alt', this.getAttribute('alt'));
    
    const p = document.createElement('p');
    p.innerHTML = this.getAttribute('description');

    article.appendChild(img);
    article.appendChild(p);

    return article;
  }

  style() {
    const style = document.createElement('style');
    style.textContent = `
    article {
      display: flex;
      align-items: center;
      justify-content: start;
    }
    article img {
      width: 98.59px;
      height: 86.99px;
      padding-right: 30px;
    }
    article p {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.2rem;
      margin: 0;
      padding-right: 30px;
    }`;
    return style;
  }
}

customElements.define('wi-pedagogical-advantage', PedagogicalAdvantageComponent);