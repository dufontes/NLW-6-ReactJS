import { Link } from 'react-router-dom';
import answerImg from '../../assets/images/answer.svg';

import './styles.scss';

type RoomProps = {
  code: string;
  title: string;
  questionsCount: number;
}

export function Room({title, code, questionsCount}: RoomProps){
  return (
    <Link className={'room'} to={`/admin/rooms/${code}`}>
        <p>{title}</p>
        {questionsCount > 0 && (
          <div className="questions-info">
            <span>
              {questionsCount}
            </span>
            <img src={answerImg} alt="" />
          </div>
        )}
    </Link>
  );
}