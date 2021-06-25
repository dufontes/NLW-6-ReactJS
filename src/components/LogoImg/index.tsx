import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';

type LogoImgProps = {
  theme: string;
}

export function LogoImg(props: LogoImgProps) {
  return (
    <img src={props.theme == 'light' ? logoImg : logoDarkImg} alt="LetMeAsk" />
  );
}