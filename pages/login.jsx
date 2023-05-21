import React from "react";
import Head from "next/head";

const login = () => {
	return (
		<div className="relative flex h-[110vh] items-center justify-center bg-black/50">
			<Head>
				<title>Login | Netflix</title>
			</Head>

			<img
				src="https://rb.gy/p2hphi"
				alt="bg-login-page"
				fill
				className="absolute -z-10 object-cover opacity-60 sm:!inline"
			/>

			<img
				src="https://rb.gy/ulxxee"
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
				width={150}
				height={150}
			/>

			<form className="flex min-h-[400px] flex-col rounded-md bg-black px-16 pt-10 ">
				<h2 className="text-4xl font-semibold ">Sign In</h2>

				<div className="pt-9">
					<input
						type="text"
						placeholder="Enter email"
						className="w-[20rem] rounded bg-[#333333] px-5 py-3 placeholder-[gray] outline-none focus:bg-[#454545]"
					/>
				</div>

				<div className="pt-4">
					<input
						type="text"
						placeholder="Enter password"
						className="w-[20rem] rounded bg-[#333333] px-5 py-3 placeholder-[gray] outline-none focus:bg-[#454545]"
					/>
				</div>

				<button className="mt-6 rounded bg-red-600 py-3 hover:bg-red-600/90">
					Sign In
				</button>

				<p className="mt-8 text-gray-600">
					New to Netflix?{" "}
					<button className="pl-1 text-white hover:underline">
						Sign up now
					</button>
				</p>
			</form>
		</div>
	);
};

export default login;
