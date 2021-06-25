import iconLight from '../../assets/images/icon-light.svg';
import iconDark from '../../assets/images/icon-dark.svg';

import './styles.scss';

type Theme = 'light' | 'dark';

type ThemeSwitchProps = {
  theme: Theme;
  toggleTheme: () => void;
}

export function ThemeSwitch(props: ThemeSwitchProps) {
  return (
    <div id="theme-switch" className={props.theme}>
      <input type="checkbox" id="switch" onChange={props.toggleTheme} />
      <label htmlFor="switch">
        <div className="toggle"></div>
        <div className="names">
          <p className="light"><img src={iconLight} alt="" /></p>
          <p className="dark"><img src={iconDark} alt="" /></p>
        </div>
      </label>
    </div>
  )
}