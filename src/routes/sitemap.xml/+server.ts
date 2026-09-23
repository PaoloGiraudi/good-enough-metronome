import { siteUrl } from '$lib/seo';

export const prerender = true;

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${siteUrl}/</loc>
	</url>
</urlset>`;

	return new Response(body.trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
