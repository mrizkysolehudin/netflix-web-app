import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "../utils/requests";
import Row from "../components/Row";
import Head from "next/head";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modalAtomState } from "../recoil/modalAtoms";

export default function Home({
	netflixOriginals,
	trendingNow,
	topRated,
	actionMovies,
	comedyMovies,
	horrorMovies,
	documentaryMovies,
}) {
	const showModal = useRecoilValue(modalAtomState);

	return (
		<div className="relative h-[140vh] bg-gradient-to-b ">
			<Head>
				<title>Home | Netflix</title>
			</Head>

			<Header />

			{/* MODAL */}
			{showModal && <Modal />}

			<main className="relative space-y-24 pb-24">
				<Banner netflixOriginals={netflixOriginals} />

				<section className="pl-14 ">
					<Row title="Trending Now" movies={trendingNow} />
					<Row title="Top Rated" movies={topRated} />
					<Row title="Action Movies" movies={actionMovies} />
					<Row title="Comedy Movies" movies={comedyMovies} />
					<Row title="Horror Movies" movies={horrorMovies} />
					<Row
						title="Documentary Movies"
						movies={documentaryMovies}
					/>
				</section>
			</main>
		</div>
	);
}

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		documentaryMovies,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrendingMovies).then((res) => res.json()),
		fetch(requests.fetchTopRatedMovies).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaryMovies).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			documentaryMovies: documentaryMovies.results,
		},
	};
};
