import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import About from './About';

export default async function AboutPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-slate-950">
			<Header />
			<About />
			<Footer />
		</main>
	);
}
