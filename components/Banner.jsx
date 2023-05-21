import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL_IMAGE } from "../utils/requests";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";

const Banner = ({ netflixOriginals }) => {
	const [movieBanner, setMovieBanner] = useState(null);

	useEffect(() => {
		setMovieBanner(
			netflixOriginals[
				Math.floor(Math.random() * netflixOriginals.length)
			]
		);
	}, [netflixOriginals]);

	return (
		<div className="h-[65vh] space-y-4 py-16">
			<div className="absolute left-0 top-0 z-[-1] w-screen">
				<img
					src={`${BASE_URL_IMAGE}/${
						movieBanner?.backdrop_path || movieBanner?.poster_path
					}`}
					alt="image-banner"
				/>
			</div>

			<div className="relative z-10 mx-auto max-w-6xl text-white">
				<div className="max-w-2xl ">
					<h1 className="text-7xl font-bold">{movieBanner?.title}</h1>

					<p className="mt-4 text-2xl">{movieBanner?.overview}</p>

					<div className="mt-8 flex items-center gap-x-4">
						<button className="flex h-[3.3rem] w-32 items-center justify-center gap-x-2 rounded bg-white text-xl font-semibold text-black hover:opacity-80">
							<FaPlay className="text-2xl" /> Play
						</button>
						<button className="flex h-[3.3rem] w-48 items-center justify-center gap-x-2 rounded bg-white/30 text-xl font-semibold hover:bg-white/20 ">
							<InformationCircleIcon className="w-8" /> More info
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
