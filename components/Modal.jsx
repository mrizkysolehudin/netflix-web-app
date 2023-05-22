import React from "react";
import { modalAtomState, movieAtomsState } from "../recoil/modalAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import MuiModal from "@mui/material/Modal";
import { FaPlay } from "react-icons/fa";
import {
	XIcon,
	PlusIcon,
	ThumbUpIcon,
	VolumeOffIcon,
	VolumeUpIcon,
} from "@heroicons/react/solid";
import ReactPlayer from "react-player/youtube";
import { BASE_URL } from "../utils/requests";
import { useEffect, useState } from "react";

const Modal = () => {
	const [openModal, setOpenModal] = useRecoilState(modalAtomState);
	const currentMovieData = useRecoilValue(movieAtomsState);

	const [trailer, setTrailer] = useState("");
	const [genres, setGenres] = useState([]);
	const [muted, setMuted] = useState(false);

	useEffect(() => {
		if (!currentMovieData) return;

		async function fetchMovie() {
			const data = await fetch(
				`${BASE_URL}/${
					currentMovieData?.media_type === "tv" ? "tv" : "movie"
				}/${currentMovieData?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			)
				.then((res) => res.json())
				.catch((error) => console.log(error.message));

			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(item) => item.type === "Trailer"
				);

				setTrailer(data.videos?.results[index]?.key);
			}

			if (data?.genres) {
				setGenres(data?.genres);
			}
		}

		fetchMovie();
	}, [currentMovieData]);

	return (
		<MuiModal
			open={openModal}
			onClose={() => setOpenModal(false)}
			className="fixed left-0 top-0 z-50 w-screen overflow-hidden overflow-y-scroll bg-black/60 scrollbar-hide">
			<>
				<button
					onClick={() => setOpenModal(false)}
					className="absolute right-[7.7rem] top-5 z-10 rounded-full bg-gray-900 p-1 text-white hover:opacity-80">
					<XIcon className="h-8 w-8 p-1" />
				</button>

				<div className="mx-auto mt-10 max-w-5xl">
					<div className="relative pt-[55%]">
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${trailer}`}
							width="100%"
							height="100%"
							style={{
								position: "absolute",
								top: "0",
								left: "0",
							}}
							playing
							muted={muted}
						/>

						<div className="absolute bottom-10 mx-10 flex w-11/12 justify-between text-white">
							<div className="flex gap-x-3">
								<button className="flex h-11 w-36 items-center justify-center gap-x-2 rounded bg-white text-xl font-bold text-black">
									<FaPlay className="h-7 w-7" /> Play
								</button>
								<button className="h-11 w-11 rounded-full border-2 border-gray-500 p-1 hover:border-gray-300">
									<PlusIcon />
								</button>
								<button className="h-11 w-11 rounded-full border-2 border-gray-500 p-2 hover:border-gray-300">
									<ThumbUpIcon />
								</button>
							</div>

							<button
								onClick={() => setMuted(!muted)}
								className="h-11 w-11 rounded-full border-2 border-gray-500 p-2 hover:border-gray-300">
								{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
							</button>
						</div>
					</div>

					<div className="flex justify-between gap-x-20 bg-[#181818] p-10">
						<section className="w-10/12">
							<div className="flex items-center gap-x-2 text-sm">
								<p className="text-green-400">
									{(
										currentMovieData?.vote_average * 10
									).toFixed(2)}
									% Match{" "}
								</p>
								<p className="font-light">
									{currentMovieData?.release_date}
								</p>
								<p className="mt-1 flex h-4 items-center rounded-sm border border-white/50 px-1 text-xs font-light">
									HD
								</p>
							</div>

							<p className="mt-6 text-[18px] font-light">
								{currentMovieData?.overview}
							</p>
						</section>

						<section className="mt-12 flex w-[18%] flex-col gap-y-3 pr-3 text-sm font-light">
							<p>
								<span className="text-gray-500">Genres:</span>
								{genres?.map((genre, index) => (
									<span key={index}> {genre?.name},</span>
								))}
							</p>
							<p>
								<span className="text-gray-500">
									Original language:
								</span>

								<span>
									{" "}
									{currentMovieData?.original_language}
								</span>
							</p>
							<p>
								<span className="text-gray-500">
									Total votes:
								</span>
								<span> {currentMovieData?.vote_count}</span>
							</p>
						</section>
					</div>
				</div>
			</>
		</MuiModal>
	);
};

export default Modal;
