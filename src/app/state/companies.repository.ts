import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  selectEntityByPredicate,
  selectManyByPredicate,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { switchMap } from 'rxjs/operators';

interface Empresa {
  id: number;
  title: string;
  completed: boolean;
}

export interface EmpresaProps {
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
}

const store = createStore(
  { name: 'empresas' },
  withEntities<Empresa>(),
  withProps<EmpresaProps>({ filter: 'ALL' })
);

@Injectable({ providedIn: 'root' })
export class TodosRepository {
  todos$ = store.pipe(selectAllEntities());
  filter$ = store.pipe(select((state) => state.filter));

  visibleTodos$ = this.filter$.pipe(
    switchMap((filter) => {
      return store.pipe(
        selectAllEntitiesApply({
          filterEntity({ completed }) {
            if (filter === 'ALL') return true;
            return filter === 'COMPLETED' ? completed : !completed;
          },
        })
      );
    })
  );

  selectByCompletedState(completed: Empresa['completed']) {
    return store.pipe(
      selectManyByPredicate((entity) => entity.completed === completed)
    );
  }

  selectFirstCompletedTitle() {
    return store.pipe(
      selectEntityByPredicate((entity) => entity.completed, { pluck: 'title' })
    );
  }

  addTodo(title: Empresa['title']) {
    store.update(addEntities({ id: 1, title, completed: false }));
    store.update(
      addEntities([
        { id: 1, title, completed: false },
        { id: 2, title, completed: false },
      ])
    );
  }

  updateCompleted(id: Empresa['id']) {
    store.update(
      updateEntities(id, (entity) => ({
        ...entity,
        completed: !entity.completed,
      }))
    );
  }
}
