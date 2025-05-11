export interface navLinkItem {
  text: string;
  link: string;
  newTab?: boolean;
  ariaLabel?: string;
  itemprop?: string;
}

export interface navDropdownItem {
  text: string;
  dropdown: navLinkItem[];
  ariaLabel?: string;
  itemprop?: string;
}

export type navItem = navLinkItem | navDropdownItem;

const navConfig: navItem[] = [
  {
    text: "Inicio",
    link: "/",
    ariaLabel: "Página principal de Glam 5.0",
    itemprop: "url"
  },
  {
    text: "Vestidos",
    ariaLabel: "Nuestros vestidos",
    link: "/vestidos",
    itemprop: "url",
    
    dropdown: [
      {
        text: "Vestidos de Novia",
        link: "/vestidos/novia",
        ariaLabel: "Colección de vestidos de novia en Pereira",
        itemprop: "item"
      },
      {
        text: "15 Años",
        link: "/vestidos/quinceanera",
        ariaLabel: "Vestidos para quinceañeras en Risaralda",
        itemprop: "item"
      },
      {
        text: "Graduación",
        link: "/vestidos/graduacion",
        ariaLabel: "Vestidos elegantes para graduación",
        itemprop: "item"
      }
    ]
  },
  {
    text: "Servicios",
    ariaLabel: "Nuestros servicios",
    itemprop: "itemListElement",
    dropdown: [
      {
        text: "Confección Personalizada",
        link: "/confeccion-vestidos",
        ariaLabel: "Diseños de vestidos a medida en Pereira",
        itemprop: "item"
      },
      {
        text: "Alquiler",
        link: "/alquiler-vestidos",
        ariaLabel: "Alquiler de vestidos para ocasiones especiales",
        itemprop: "item"
      }
    ]
  },
  {
    text: "Galería",
    link: "/vestidos",
    ariaLabel: "Galería de vestidos Glam 5.0",
    itemprop: "url"
  },
  {
    text: "Contacto",
    link: "/contacto",
    ariaLabel: "Contacta a Glam 5.0 en Pereira",
    itemprop: "url"
  }
];

export default navConfig;