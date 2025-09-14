import {TGetEntry, TGetId, TItem, TNormalize} from 'modules/common/model/types';

type GetId = <T = TItem>(key: keyof T) => TGetId<T>;

export const getId: GetId = (key) => {
  return (item) => {
    return `${item[key]}`;
  };
};

type GetEntries = <T = TItem>(getId: TGetId<T>) => TGetEntry<T>;

export const getEntries: GetEntries = (getId) => {
  return (item) => {
    return [getId(item), item];
  };
};

type GetNormalize = <T = TItem>(_getId: TGetId<T>) => TNormalize<T>;

export const getNormalize: GetNormalize = (getId) => {
  return (list) => {
    return {
      data: Object.fromEntries(list.map(getEntries(getId))),
      list: list.map(getId),
    };
  };
};
