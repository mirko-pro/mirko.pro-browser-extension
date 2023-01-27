import injectTheme from './app/wykop/injectTheme';
import observer from './app/wykop/observer/observer';
// import wykop from './app/wykop/api/wykop';

(async () => {
  console.log('✅ Welcome to wykop from mirko.pro');
  injectTheme();
  observer();
})();

export {};
