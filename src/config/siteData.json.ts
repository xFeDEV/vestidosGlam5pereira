export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean;
	author: {
		name: string;
		email: string;
		twitter: string;
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

const siteData: SiteDataProps = {
	name: "Glam 5.0",

	// Meta Title (aparece en pestañas, Google, etc.)
	title: "Glam 5.0 - Venta y alquiler de vestidos en Pereira | Vestidos para 15 años, eventos y graduaciones",

	// Meta Description (muy importante para SEO)
	description:
		"Descubre Glam 5.0, la boutique de vestidos en Pereira especializada en confección, alquiler y venta de vestidos únicos para quinceañeras, graduaciones, bodas y eventos especiales. ¡Diseñamos el vestido de tus sueños!",

	useViewTransitions: true,

	// Autor y redes (puedes actualizar cuando tengas redes propias)
	author: {
		name: "Glam 5.0",
		email: "contacto@glam5pereira.com",
		twitter: "glam5oficial" // si no tienes Twitter, puedes dejarlo como ""
	},

	// Imagen por defecto para SEO y redes
	defaultImage: {
		src: "/images/glam-cover.jpg", // reemplaza con la imagen que quieras usar como cover general
		alt: "Vestidos elegantes y personalizados en Glam 5.0, Pereira"
	}
};

export default siteData;
