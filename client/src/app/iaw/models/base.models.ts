import { EntityState } from '@ngrx/entity';

export interface IBaseEntityState<T> extends EntityState<T> {
  selectedId?: string | null;
  loading: boolean;
  error?: any;
}
