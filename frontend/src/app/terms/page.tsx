import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Terms from './Terms';

export default async function TermsPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-slate-950">
			<Header />
			<Terms />
			<Footer />
		</main>
	);
}
