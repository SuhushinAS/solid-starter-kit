import {Scroll} from 'modules/common/components/Scroll';
import {Footer} from 'modules/layout/Footer';
import {Header} from 'modules/layout/Header';
import {JSX} from 'solid-js';
import './Layout.less';

type Props = {
  children: JSX.Element;
};

export const Layout = ({children}: Props) => {
  return (
    <div class="Layout">
      <header class="Layout__Header">
        <Header />
      </header>
      <div class="Layout__Scroll">
        <Scroll dirList={['h', 'v']}>
          <div class="Layout__Inner">
            <main class="Layout__Body">{children}</main>
          </div>
        </Scroll>
      </div>
      <footer class="Layout__Footer">
        <Footer />
      </footer>
    </div>
  );
};
