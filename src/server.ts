import dotenv from 'dotenv';
import app from './app';
import 'reflect-metadata';
import './database'; // para evitar erro ao tentar conectar

dotenv.config();

// Esse condicional de porta é pegar da porta do heroku se for remoto, por isso não trata no .env
app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('🏃 Running Server');
});
