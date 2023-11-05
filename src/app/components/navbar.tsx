import React from "react";
import Image from "next/image";
import Link from "next/link";

const navBarLinkStyle =
	"font-saira hover:cursor-pointer text-4xl text-lg relative transition-all duration-350 before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1.5 before:rounded-full before:opacity-0 before:transition-all before:duration-350 before:bg-gradient-to-r before:from-dg-dark before:via-dg-dark before:to-dg-dark hover:before:w-full hover:before:opacity-100";
function about() {
	return (
		<div className="w-full h-full flex flex-wrap items-center justify-between">
			<div className="flex flex-wrap items-center pl-10">
				<div className="h-12 w-12 relative mr-4 rounded-md overflow-hidden">
					<Image src="/logo.png" alt="Riptide LOGO" layout="fill" />
				</div>
				<Link href="/">
					<p className="font-saira text-4xl text-white cursor-pointer">
						Riptide Oracle
					</p>
				</Link>
			</div>
			<div className="flex items-center space-x-10 pr-10">
				<Link href="/about">
					<p className={navBarLinkStyle}>About Us</p>
				</Link>
			</div>
		</div>
	);
}

export default about;
