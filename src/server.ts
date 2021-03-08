import app from './app';
import 'reflect-metadata';
import './database'; // para evitar erro ao tentar conectar

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('🏃 Running Server');
});
