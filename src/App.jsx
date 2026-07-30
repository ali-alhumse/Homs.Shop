import { AppRouter } from '@router/index';
import { AppProvider } from '@providers/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
