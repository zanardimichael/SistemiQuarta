import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import starlightThemeSix from '@six-tech/starlight-theme-six';
import ciscoLang from './src/grammars/ios.tmLanguage.json' with { type: 'json' };

export default defineConfig({
	site: 'https://sistemiquarta.zanardimichael.it',
	base: '/',

	markdown: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeKatex],
	},

	integrations: [
		starlight({
			title: 'Sistemi e Reti - Quarta',
			expressiveCode: {
				defaultProps: {
					overridesByLang: {
						'cisco,ios': { frame: 'terminal' },
					},
				},
				shiki: {
					langs: [
						{
							...ciscoLang,
							name: 'cisco',
							aliases: ['ios'],
						},
					],
				},
			},
			logo: {
				src: '/public/favicon.svg',
			},
			favicon: '/favicon.svg',
			customCss: [
				'./src/katex.min.css',
				'./src/custom.css',
			],
			description: 'Dispensa',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/zanardimichael' }
			],

			plugins: [
				starlightThemeSix({
					footerText: 'A cura del Prof. Michael Zanardi'
				}),
			],

			head: [
				{
					tag: 'script',
					content: `
                        function initProgressBar() {
                            let bar = document.getElementById('scroll-progress');
                            if (!bar) {
                                bar = document.createElement('div');
                                bar.id = 'scroll-progress';
                                bar.style.position = 'fixed';
                                bar.style.top = '0';
                                bar.style.left = '0';
                                bar.style.height = '4px';
                                bar.style.backgroundColor = 'var(--sl-color-accent)'; 
                                bar.style.zIndex = '9999';
                                bar.style.width = '0%';
                                bar.style.transition = 'width 0.1s ease-out';
                                document.body.appendChild(bar);
                            }
                            
                            window.addEventListener('scroll', () => {
                                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                                if (height > 0) {
                                    const scrolled = (winScroll / height) * 100;
                                    bar.style.width = scrolled + '%';
                                } else {
                                    bar.style.width = '0%';
                                }
                            });
                        }
                        
                        document.addEventListener('DOMContentLoaded', initProgressBar);
                    `
				}
			],

			sidebar: [
				{
					label: 'Corso di Sistemi e Reti',
					items: [
						{ label: 'Introduzione al Corso', link: '/lezioni/' },
						{ label: 'Teoria', autogenerate: { directory: 'lezioni/teoria' }, collapsed: false },
						{ label: 'Laboratorio I - Switch', autogenerate: { directory: 'lezioni/switch' }, collapsed: true },
						{ label: 'Laboratorio II - Router', autogenerate: { directory: 'lezioni/router' }, collapsed: true },
					]
				},
			],
		}),
	],
});