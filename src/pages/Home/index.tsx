import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { ThemeSwitch } from '../../components/ThemeSwitch';

import { useAuth } from '../../hooks/useAuth';

import '../../styles/auth.scss'
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';
import { LogoImg } from '../../components/LogoImg';
import toast from 'react-hot-toast';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const { toggleTheme, theme } = useTheme();
	const [roomCode, setRoomCode] = useState('');

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');

	}

	async function handleListMyRooms() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/admin/rooms');

	}

	async function handleJoinRoom(event: FormEvent){
		event.preventDefault();

		if(roomCode.trim() === ''){
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if(!roomRef.exists()){
			toast.error('Este código de sala não existe!');
			return;
		}

		if(roomRef.val().closedAt){
			toast.error('Esta sala já está fechada!');
			return;
		}

		history.push(`/rooms/${roomCode}`);

	}

	return (
		<div id="page-auth" className={theme}>
			<aside>
				<img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className="main-content">
					<ThemeSwitch theme={theme} toggleTheme={toggleTheme}></ThemeSwitch>
					<div className="spacer"></div>
					<LogoImg theme={theme}></LogoImg>
					
					<button onClick={handleCreateRoom} className="create-room">
						<img src={googleIconImg} alt="Logo do Google" />
						Crie sua sala com o google
					</button>
					{user ? (
						<Button isOutlined onClick={handleListMyRooms} >Ver minhas salas</Button>
					) : ''}
					<div className="separator">ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							onChange={event => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}