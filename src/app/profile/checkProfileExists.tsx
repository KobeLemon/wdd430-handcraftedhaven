'use client';

import { getUserByEmail } from "@/app/lib/data";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from 'next/navigation';
import AccountCreation from "../ui/artisans/accountCreation";

export default function CheckProfileExists() {
	const { data: session } = useSession();

	let userName: string;
	let userEmail: string;
	let userImage = {small: "", medium: "", big: ""};

  if (
		session && session.user
		&& typeof session.user.name === 'string'
		&& typeof session.user.email === 'string'
		&& typeof session.user.image === 'string'
		)
		{
    userName = session.user.name;
		userEmail = session.user.email;
		userImage.big = session.user.image;

		console.log(session);
		// const userExists = getUserByEmail();

		return (
			<>
				<h1 className='text-center p-10'>{session?.user?.email}</h1>
				<AccountCreation
					id=""
					name={userName}
					description=""
					collection=""
					pictures={userImage}
				/>
			</>
		)
	} else {
		return (
			<>
				<h1 className='text-center p-10'>Create Your Account!</h1>
			</>
		)
	}
}