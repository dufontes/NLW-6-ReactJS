import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { MyRooms } from './pages/MyRooms';

function App() {


  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
            <Route path="/admin/rooms" component={MyRooms} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
      <Toaster toastOptions={{ className:"notification" }} />
    </BrowserRouter>
  );
}

export default App;