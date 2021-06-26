import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { LogoImg } from "../../components/LogoImg";
import { Room } from "../../components/Room";
import { ThemeSwitch } from "../../components/ThemeSwitch";
import { useAuth } from "../../hooks/useAuth";
import { useMyRooms } from "../../hooks/useMyRooms";
import { useTheme } from "../../hooks/useTheme";

import './styles.scss';


export function MyRooms(){
  const { user } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const history = useHistory();  

  const { rooms } = useMyRooms();

  if(!user){
    toast.error('Você deve estar logado para visualizar suas salas!');
    history.push('/');
  }


  return (
    <div id="page-my-rooms" className={theme}>
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg theme={theme}></LogoImg>
          </Link>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme}></ThemeSwitch>
        </div>
      </header>

      <main>
        <div className="list-title">
          <h1>Minhas Salas</h1>
          { rooms.length > 0 && <span>{ rooms.length } salas(s)</span> }
        </div>
        <div className="user-info">
          <img src={user?.avatar} alt={user?.name} />
          <span>{user?.name}</span>
        </div>
        
        {rooms.map(room => {
          return (
            <Room key={room.code} code={room.code} title={room.title} questionsCount={room.questionsCount} />
          );
        })}
      </main>
    </div>
  );
}