import {A} from '@solidjs/router';
import {routes} from 'app/model/constants';
import {Loader} from 'modules/common/components/Loader';
import {exampleIdKey} from 'modules/example/model/constants';
import {exampleResource} from 'modules/example/model/store';
import {TExample} from 'modules/example/model/types';
import {For, Show} from 'solid-js';

const fields: Array<keyof TExample> = ['name', 'email', 'age', 'balance'];

export const ExampleList = () => {
  const [example] = exampleResource;

  return (
    <div>
      <Show when={example.loading}>
        <Loader />
      </Show>
      <Show when={example()}>
        {(example) => (
          <table class="ExampleList">
            <thead>
              <tr>
                {fields.map((field) => {
                  return <th class="ExampleList__Cell">{field}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <For each={example().list}>
                {(id) => {
                  const item = example().data[id];
                  return (
                    <tr>
                      {fields.map((field) => {
                        return (
                          <td class="ExampleList__Cell">
                            <A
                              href={`${routes.exampleList}/${item[exampleIdKey]}`}
                            >{`${item[field]}`}</A>
                          </td>
                        );
                      })}
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
        )}
      </Show>
    </div>
  );
};
