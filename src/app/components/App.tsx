import {Route, Router} from '@solidjs/router';
import {Home} from 'app/components/Home';
import {appPath} from 'app/constants';
import {Example} from 'modules/example/components/Example';
import {Layout} from 'modules/layout/Layout';

export const App = () => {
  return (
    <Layout>
      <Router>
        <Route component={Example} path={appPath.example} />
        <Route component={Home} path={appPath.home} />
      </Router>
    </Layout>
  );
};
