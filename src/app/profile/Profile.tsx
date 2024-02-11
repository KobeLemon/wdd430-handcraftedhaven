'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import AccountCreation from "../ui/artisans/accountCreation";
import { useState, useEffect } from 'react';

export default function Profile() {
	const [ userExists, setUserExists ] = useState();
	const [ isDataFetched, setisDataFetched ] = useState({isSet: false});

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await fetch('/api/getUser', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(session?.user?.email)});
				const response = await user.json();
				setisDataFetched({isSet: true});
				setUserExists(response);
				console.log(response)
				if (response) {
					router.push(`/user/${response.id}`)
				}
			} catch (error) {
				console.error("Failed to fetch data", error);
			}
		}

		fetchData();
	}, []);

	const { data: session } = useSession();

	let userName: string;
	let userEmail: string;
	let userImage = {small: "", medium: "", big: ""};
	let userDescription = "";
	let userID = "";

  if (
		session && session.user
		&& typeof session.user.name === 'string'
		&& typeof session.user.email === 'string'
		&& typeof session.user.image === 'string'
		&& typeof userDescription === 'string'
		&& typeof userID === 'string'
		)
		{
    userName = session.user.name;
		userEmail = session.user.email;
		userImage.big = session.user.image;


		console.log(session);


		return (

			isDataFetched.isSet ?
				userExists ?
					<h1 className='text-center pt-10'>User Exists</h1>
					:
				<AccountCreation
					id={userID}
					name={userName}
					description={userDescription}
					collection=""
					pictures={userImage}
					email={userEmail}
				/>
				:
				<h1 className='text-center pt-10'>Loading...</h1>
			)

	} else {
		return (
			window.location.href = "/"
		)
	}
}