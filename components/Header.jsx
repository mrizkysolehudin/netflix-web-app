import React from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
	const { logOut } = useAuth();

	const [isScrolled, setIsScrolled] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`${
				isScrolled ? "bg-black" : "bg-transparent"
			} z-50 pb-1 text-white transition duration-300`}>
			<div className="flex w-full  justify-between  px-10 py-5">
				<div className="flex items-center gap-x-10">
					<img
						src="https://rb.gy/ulxxee"
						width={100}
						height={100}
						className="cursor-pointer object-contain"
					/>

					<ul className="flex gap-x-4 ">
						<li className="navItem font-semibold hover:opacity-100">
							Home
						</li>
						<li className="navItem">TV Shows</li>
						<li className="navItem">Movies</li>
						<li className="navItem">News & Popular</li>
						<li className="navItem">My Lists</li>
					</ul>
				</div>

				<div className="flex items-center gap-x-4">
					<SearchIcon className="h-6 w-6 cursor-pointer" />
					<p className="cursor-pointer  text-sm">Teens</p>
					<BellIcon className="h-6 w-6 cursor-pointer" />
					<button onClick={() => logOut()}>
						<img
							src="https://rb.gy/g1pwyx"
							alt="account"
							className="cursor-pointer rounded"
						/>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Header;
