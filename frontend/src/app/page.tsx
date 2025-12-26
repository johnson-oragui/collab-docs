import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';
import Security from '@/components/landing/Security';

export default function Home() {
	return (
		<main>
			<Header user={undefined} />
			<Hero />
			<Features />
			<Security />
			<Footer />
		</main>
	);
}
