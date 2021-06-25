import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { useTheme } from '../hooks/useTheme';
import { LogoImg } from '../components/LogoImg';

export function NewRoom() {
	const { user } = useAuth();
	const { toggleTheme, theme } = useTheme();
	const history = useHistory();
	const [newRoom, setNewRoom] = useState('');

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if(newRoom.trim() == ''){
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`)

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
					<LogoImg theme={theme}></LogoImg>
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={event => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}