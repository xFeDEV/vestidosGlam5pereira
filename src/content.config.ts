import { glob } from "astro/loaders";
// Define los tipos de vestidos permitidos. Deben coincidir con los nombres
// de las subcarpetas dentro de src/data/vestidos/
// src/content.config.ts
import { defineCollection, z } from "astro:content";

// src/content.config.ts

// --- Colección 'vestidos' (ya definida en el paso anterior) ---
const TIPOS_VESTIDOS = ["novia", "quinceanera", "graduacion"] as const;

const vestidosCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({ // <--- ¡ASEGÚRATE DE TENER ({ image }) AQUÍ!
	  nombre: z.string().min(1, "El nombre es obligatorio"),
	  tipo: z.enum(TIPOS_VESTIDOS),
	  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
	  imagenPrincipal: image(),
	  galeria: z.array(image())
				 .min(2, "Se requieren al menos 2 imágenes en la galería")
				 .max(10, "Máximo 10 imágenes en la galería"),
	  tallas: z.array(z.string()).optional(),
	  colores: z.array(z.string()).optional(),
	  precio: z.number().positive("El precio debe ser un número positivo").optional(),
	  disponibleParaAlquiler: z.boolean().default(true).optional(),
	  disponibleParaVenta: z.boolean().default(false).optional(),
	  destacado: z.boolean().default(false).optional(),
	  // CORRECCIÓN para fechaLanzamiento:
	  fechaLanzamiento: z.coerce.date().optional(), // z.coerce.date() intentará convertir la cadena a fecha
	})
  });


// --- NUEVA Colección 'categoriasVestidos' ---
const categoriasVestidosCollection = defineCollection({
  type: 'content', // Usaremos .md
  schema: ({ image }) => z.object({
    title: z.string(), // Título de la categoría (Ej: "Vestidos de Novia Inolvidables")
    description: z.string(), // Descripción del enfoque de Glam 5.0 para esta categoría
    heroImage: image(), // Imagen representativa de la categoría
    // 'images' como en tu ejemplo (array de arrays de imágenes) - útil para un collage o layout específico
    images: z.array(
        z.array(image()).refine((arr) => [1, 2, 3].includes(arr.length), {
            message: "Cada sub-array de imágenes debe contener 1, 2 o 3 imágenes.",
        }),
    ).optional(), // Hacemos 'images' opcional si no siempre lo necesitas
    // Otros campos que podrías querer (opcional)
    // location: z.string().default("Pereira, Risaralda").optional(), // Podría ser útil
    // order: z.number().optional(), // Para ordenar las categorías si es necesario
  })
});


const portfolios = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/portfolios",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image(),
			clients: z.array(z.string()),
			location: z.string(),
			images: z.array(
				z.array(image()).refine((arr) => [1, 2, 3].includes(arr.length), {
					message: "Each sub-array must contain 1, 2, or 3 items",
				}),
			),
			// Transform string to Date object
			date: z.coerce.date(),
			order: z.number(),
			// will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// testimonials
const testimonials = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/testimonials",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			testimonial: z.string(),
			image: image(),
			order: z.number(),
			// will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// other pages
const otherPages = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/otherPages",
	}),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			draft: z.boolean().optional(),
		}),
});

export const collections = {
	'vestidos': vestidosCollection,
    'categoriasVestidos': categoriasVestidosCollection,
	testimonials,
 	portfolios,
	otherPages,
};
