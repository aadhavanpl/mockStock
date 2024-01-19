import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { userAccessToken, fetchUser } from '../lib/utils/fetchUserDetails'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../firebase-config'


const GlobalContext = createContext()

export function GlobalContextWrapper({ children }) {
	const [user, setUser] = useState(null)
	const [userInfo, setUserInfo] = useState({})
	const [accessToken, setAccessToken] = useState('')
	const router = useRouter()

	const firebaseAuth = getAuth(FirebaseApp)
	const provider = new GoogleAuthProvider()

	useEffect(() => {
		const tempUser = fetchUser()
		setUser(tempUser)
		const tempAccessToken = userAccessToken()
		setAccessToken(tempAccessToken)
	}, [])

	/*=============================================
	=              sign-in function               =
	=============================================*/
	async function signIn() {
		const { user } = await signInWithPopup(firebaseAuth, provider)
		const { refreshToken, providerData } = user
		localStorage.setItem('user', JSON.stringify(providerData))
		localStorage.setItem('accessToken', JSON.stringify(refreshToken))

		const tempUser = fetchUser()
		console.log(tempUser)
		setUser(tempUser)
		const tempAccessToken = userAccessToken()
		setAccessToken(tempAccessToken)

		/*=============================================
		=        sending user info to backend         =
		=============================================*/
		const data = { user_email: user.email, user_name: user.displayName }
		const apiUrlEndpoint = 'https://mockstock.aadhii.in/api/user-lib'
		const response = await fetch(apiUrlEndpoint, {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const res = await response.json()
	}

	/*=============================================
	=              sign-out function              =
	=============================================*/
	function signOut() {
		localStorage.clear()
		sessionStorage.clear()
		window.location.replace('https://mockstock.aadhii.in');
	}

	/*=============================================
	=         get user info from backend          =
	=============================================*/
	async function getUserInfo(data) {
		const apiUrlEndpointUser = 'https://mockstock.aadhii.in/api/get-user-lib'
		const response = await fetch(apiUrlEndpointUser, {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const res = await response.json()
		localStorage.setItem('customer', JSON.stringify(res))
		setUserInfo(res[0])
	}

	return (
		<GlobalContext.Provider
			value={{
				user,
				accessToken,
				userInfo,
				signIn,
				signOut,
				getUserInfo,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	return useContext(GlobalContext)
}
