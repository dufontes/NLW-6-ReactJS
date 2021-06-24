import '../styles/theme-switch.scss';

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
          <p className="light">Light</p>
          <p className="dark">Dark</p>
        </div>
      </label>
    </div>
  )
}