import React from "react";
import Image from "next/image";
import { BASE_URL_IMAGE } from "../utils/requests";

const Row = ({ title, movies }) => {
	return (
		<div className="pb-16">
			<h3 className="text-2xl font-semibold text-white">{title}</h3>

			<div className="mt-4 flex space-x-5 overflow-x-scroll scrollbar-hide ">
				{movies?.map((movie, index) => (
					<article
						key={index}
						className="relative flex h-36 min-w-[240px] cursor-pointer transition duration-300 ease-out hover:scale-105">
						<Image
							src={`${BASE_URL_IMAGE}${
								movie.backdrop_path || movie.poster_path
							}`}
							alt={`${movie?.name}`}
							fill
							className="rounded object-cover"
						/>
					</article>
				))}
			</div>
		</div>
	);
};

export default Row;
