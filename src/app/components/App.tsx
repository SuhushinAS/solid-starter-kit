import {Route, Router} from '@solidjs/router';
import {Home} from 'app/components/Home';
import {routes} from 'app/model/constants';
import {ExampleItem} from 'modules/example/components/ExampleItem';
import {ExampleList} from 'modules/example/components/ExampleList';
import {Layout} from 'modules/layout/Layout';

export const App = () => {
  return (
    <Layout>
      <Router>
        <Route component={ExampleItem} path={routes.exampleItem} />
        <Route component={ExampleList} path={routes.exampleList} />
        <Route component={Home} path={routes.home} />
      </Router>
    </Layout>
  );
};
