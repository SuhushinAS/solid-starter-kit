import {api} from 'modules/common/lib/api';
import {getId, getNormalize} from 'modules/common/lib/normalize';
import {exampleIdKey} from 'modules/example/model/constants';
import {TExample} from 'modules/example/model/types';
import {createResource} from 'solid-js';

const getExampleId = getId<TExample>(exampleIdKey);

const normalizeExample = getNormalize<TExample>(getExampleId);

export const exampleResource = createResource(() => {
  return api.requestLocal<TExample[]>('/api/v1/example.json').then(normalizeExample);
});
