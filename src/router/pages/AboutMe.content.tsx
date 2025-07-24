import { Em } from "components";

export type AboutMeContent = {
	title: React.ReactNode;
	subTitle: React.ReactNode;
	content: React.ReactNode[];
};
export type LangGroup = {
	fr: AboutMeContent;
	en: AboutMeContent;
};

export const contents: LangGroup[] = [
	{
		fr: {
			title: (
				<>
					Je suis <Em>développeur web front-end</Em>, spécialisé en <Em>React</Em>
				</>
			),
			subTitle: <>Du sens, du soin, du détail.</>,
			content: [
				<>
					Je conçois et développe des applications web en React, avec une attention particulière à
					l’accessibilité, à la lisibilité du code et aux détails d’interface.
				</>,
				<>
					Issu du design, j’ai commencé à coder pour résoudre des problèmes concrets. Avec le temps, c’est
					devenu une question de rigueur et de qualité: Je voulais <Em>construire les choses proprement</Em>{" "}
					et les comprendre, pas seulement les faire fonctionner.
				</>,
				<>
					Aujourd’hui, je cherche à rejoindre une équipe avec laquelle progresser et développer des
					applications maintenables, cohérentes, pensées à la fois pour l’utilisateur et pour le développeur.
				</>,
			],
		},
		en: {
			title: (
				<>
					I'm a <Em>front-end web developer</Em>, specialized in <Em>React</Em>
				</>
			),
			subTitle: <>Meaning, care, details.</>,
			content: [
				<>
					I design and build web applications using React, with a strong focus on accessibility, code
					readability, and UI details.
				</>,
				<>
					Coming from a design background, I started coding to solve real-world problems. Over time, it became
					a matter of discipline and quality: I wanted to <Em>build things properly</Em> and understand how
					they work, not just make something function.
				</>,
				<>
					Today, I'm looking to join a team where I can keep growing and building maintainable and consistent
					applications, thoughtfully designed for both users and developers.
				</>,
			],
		},
	},
	{
		fr: {
			title: (
				<>
					Ce que le <Em>design</Em> m’a appris pour le <Em>code</Em>
				</>
			),
			subTitle: <>Du design au développement : une transition qui a du sens.</>,
			content: [
				<>
					Le design est souvent vu comme une affaire de goût et de créativité. Pourtant sa base est la
					fonction.
				</>,
				<>
					Un logo par exemple, ne doit pas illustrer ce que produit la marque. Il est là pour représenter la
					marque elle-même, ses valeurs, souligner une intention. Il fait passer un message, doit rassurer et
					crédibiliser, et permettre de se démarquer et d'être reconnu.
				</>,
				<>
					Chaque création implique donc recherche, contraintes et organisation avant tout.{" "}
					<Em>On structure, on hiérarchise, on clarifie, on donne du sens</Em> pour valider ces fonctions, et
					construire autour solidement et durablement.
				</>,
				<>
					C’est une <Em>démarche rigoureuse</Em>, centrée sur la fonction, le sens, la structure. Finalement,
					n'est-elle pas si différente de celle du développement ?
				</>,
			],
		},
		en: {
			title: (
				<>
					What <Em>design</Em> taught me about <Em>code</Em>
				</>
			),
			subTitle: <>From design to development: a shift that makes sense.</>,
			content: [
				<> Design is often seen as a matter of taste or creativity. But at its core, it's about function.</>,
				<>
					A logo, for example, shouldn’t illustrate what the brand makes. It stands for what the brand is, its
					values, its intent. It conveys a message, builds trust and credibility, and helps the brand stand
					out and be recognized.
				</>,
				<>
					Each project therefore involves research, constraints and structure above all.{" "}
					<Em>You organize, prioritize, clarify, and bring meaning</Em>, to fulfill a function and create
					something strong and lasting.
				</>,
				<>
					It’s a <Em>rigorous process</Em>, centered on function, meaning, and structure. In the end, isn’t it
					remarkably close to development?
				</>,
			],
		},
	},
	{
		fr: {
			title: (
				<>
					Ce qu’on ne <Em>voit pas</Em>
				</>
			),
			subTitle: <>Souvent ce qui compte le plus.</>,
			content: [
				<>
					Développer une application, ce n’est pas juste enchaîner des fonctionnalités. C’est penser à ce qui
					va casser, à ce qui va évoluer, à ce qui doit rester clair même après plusieurs mois.
				</>,

				<>
					Il faut anticiper les erreurs, les états sans données, les lenteurs, les imprévus et les confusions
					possibles côté utilisateur.
					<br />
					On construis en gardant à l’esprit que ça doit être{" "}
					<Em>robuste, accessible, cohérent et agréable à maintenir</Em>. L’architecture doit rester lisible,
					le code prévisible.
				</>,
				<>
					Il faut poser des questions, documenter, tester. Et si on ne sait pas,{" "}
					<Em>on cherche, on apprend</Em>.
				</>,
			],
		},
		en: {
			title: (
				<>
					What you <Em>don’t see</Em>
				</>
			),
			subTitle: <>Often matters the most.</>,
			content: [
				<>
					Developing an application isn’t just about adding features. It’s about thinking ahead, what might
					break, what will evolve, what needs to stay clear even months later.
				</>,
				<>
					You have to anticipate errors, empty states, slowness, edge cases, and what might cause confusion
					for the user.
					<br />
					You build with <Em>robustness, accessibility, consistency, and maintainability in mind</Em>. The
					architecture should stay readable, the code predictable.
				</>,
				<>
					You ask questions, document, test. And when you don’t know, <Em>you search, you learn</Em>.
				</>,
			],
		},
	},
	{
		fr: {
			title: (
				<>
					Ce que j’aime dans le <Em>front-end</Em>
				</>
			),
			subTitle: <>C'est exigeant et fun à fois, donc très gratifiant.</>,
			content: [
				<>
					Comme certain peuvent passer des jours à construire une maquette ou un Légo, à tout planifier pour
					équilibrer fonctionnalité et style, et à penser chaque pièces, détailler avec patience pour obtenir
					un produit parfait, je trouve un grand plaisir à contruire une app.
				</>,
				<>
					Réfléchir, résoudre les problèmes, construire une structure élégante et fonctionnelle...{" "}
					<Em>C'est fun !</Em>
				</>,
				<>
					Et souvent en front-end, on code, on actualise pour voir immédiatement le résultat dans le
					navigateur, c’est toujours satisfaisant.
				</>,
				<>
					C’est aussi <Em>l’endroit où tout converge</Em> : design, UX, back-end, produit, utilisateur... Un
					poste très intéressant en contact avec tous les aspects du projet.
				</>,
			],
		},
		en: {
			title: (
				<>
					What I love about <Em>front-end</Em>
				</>
			),
			subTitle: <>It's both challenging and fun, which makes it deeply rewarding.</>,

			content: [
				<>
					Just like some people can spend days building a model or a Lego set, planning every step to balance
					functionality and style, thinking through each piece, and carefully refining the details to create
					something perfect... I find the same kind of joy in building an app.
				</>,
				<>
					Thinking, solving problems, designing an elegant and functional structure...{" "}
					<Em>it's genuinely fun!</Em>
				</>,
				<>
					And in front-end, you often get instant feedback: you code, refresh, and immediately see the result
					in the browser, it's always satisfying.
				</>,
				<>
					Is's also <Em>where everything comes together</Em>: design, UX, backend, product, users... A truly
					exciting role at the intersection of all parts of the project.
				</>,
			],
		},
	},
	{
		fr: {
			title: (
				<>
					Ce que je cherche <Em>aujourd’hui</Em>
				</>
			),
			subTitle: <>M’investir, apprendre, et contribuer concrètement.</>,
			content: [
				<>
					Ce que je cherche aujourd’hui, c’est un cadre stimulant où je peux faire ma part, apprendre et
					progresser <Em>au contact d’autres développeurs</Em> et métiers.
				</>,
				<>
					J’aime comprendre les besoins, proposer des solutions concrètes, et construire des solutions claires
					qui servent vraiment l’utilisateur.
				</>,
				<>
					Je n’ai pas peur des <Em>défis techniques</Em> ou de la complexité, au contraire: Je vois chaque cas
					comme une occasion de grandir.
				</>,
				<>
					Si vous appréciez <Em>le souci du détail et l’envie de bien faire</Em>, nous avons déjà un point
					commun.
				</>,
			],
		},
		en: {
			title: (
				<>
					What I’m looking for <Em>today</Em>
				</>
			),
			subTitle: <>Getting involved, learning, and making a real contribution.</>,
			content: [
				<>
					Today, I’m looking for a stimulating environment where I can do my part, keep learning, and grow{" "}
					<Em>alongside other developers</Em> and professionals from other fields.
				</>,
				<>
					I enjoy understanding needs, suggesting practical solutions, and building clear interfaces that
					truly serve the user.
				</>,
				<>
					I’m not afraid of <Em>technical challenges</Em> or complexity, on the contrary: I see every
					situation as an opportunity to grow.
				</>,
				<>
					If you value <Em>attention to detail and a drive to do things right</Em>, then we already have
					something in common.
				</>,
			],
		},
	},
];
