import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';

export default function Home() {
	return (
		<main>
			<Header user={undefined} />
			<Hero />
			<Features />
			<Footer />
		</main>
	);
}
