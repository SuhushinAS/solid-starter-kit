import {App} from 'app/components/App';
import {render} from 'solid-js/web';
import 'styles/index.less';

const container = document.getElementById('root');

if (container) {
  render(App, container);

  if (module.hot) {
    module.hot.accept('app/components/App', () => {
      render(App, container);
    });
  }
}

const onRegisterError = (error) => {
  console.error('SW registration failed: ', error);
};

const onWindowLoad = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(onRegisterError);
  }
};

window.removeEventListener('load', onWindowLoad);
window.addEventListener('load', onWindowLoad);
