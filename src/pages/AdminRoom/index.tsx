import { Link, useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { LogoImg } from '../../components/LogoImg';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { ThemeSwitch } from '../../components/ThemeSwitch';
import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import deleteImg from '../../assets/images/delete.svg';

import '../Room/styles.scss';
import toast from 'react-hot-toast';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    toast.success('Sala encerrada!');

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("Tem certeza que deseja excluir esta pergunta?")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <Link to="/">
            <LogoImg theme={theme}></LogoImg>
          </Link>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme}></ThemeSwitch>
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span> }
        </div>
        
        {questions.map(question => {
          return (
            <Question 
              key={question.id}
              content={question.content} 
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighLightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  )
}