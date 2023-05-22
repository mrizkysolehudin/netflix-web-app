import React, { useRef, useState } from "react";
import Image from "next/image";
import { BASE_URL_IMAGE } from "../utils/requests";
import { useRecoilState } from "recoil";
import { modalAtomState, movieAtomsState } from "../recoil/modalAtoms";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Row = ({ title, movies }) => {
	const [openModal, setOpenModal] = useRecoilState(modalAtomState);
	const [openCurrentMovie, setOpenCurrentMovie] =
		useRecoilState(movieAtomsState);

	const rowRef = useRef(null);
	const [isMoved, setIsMoved] = useState(false);

	const handleClick = (direction) => {
		setIsMoved(true);

		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	return (
		<div className="py-5">
			<h3 className=" text-2xl font-semibold text-white">{title}</h3>

			<div
				ref={rowRef}
				className="group mt-4 flex space-x-5 overflow-x-scroll scrollbar-hide ">
				<div className="absolute left-20 z-10 mt-10 opacity-0 group-hover:opacity-100">
					<ChevronLeftIcon
						onClick={() => handleClick("left")}
						className={`${
							isMoved ? "opacity-100" : "opacity-0"
						} w-16 hover:scale-x-105 hover:scale-y-125`}
					/>
				</div>

				{movies?.map((movie, index) => (
					<article
						key={index}
						onClick={() => {
							setOpenModal(!openModal);
							setOpenCurrentMovie(movie);
						}}
						className="relative flex h-36 min-w-[240px] cursor-pointer transition duration-300 ease-out hover:scale-x-110 hover:scale-y-105">
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

				<div className="absolute right-8 mt-10 opacity-0 group-hover:opacity-100">
					<ChevronRightIcon
						onClick={() => handleClick("right")}
						className="w-16 hover:scale-x-105 hover:scale-y-125 "
					/>
				</div>
			</div>
		</div>
	);
};

export default Row;
