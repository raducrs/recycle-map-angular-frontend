import { debounceTime, skip, switchMap, takeUntil } from 'rxjs/operators';

// https://blog.strongbrew.io/building-a-safe-autocomplete-operator-with-rxjs/
export const autocomplete = (time, selector) => source$ =>
  source$.pipe(
    debounceTime(time),
    switchMap((...args: any[]) =>
      selector(...args).pipe(takeUntil(source$.pipe(skip(1))))
    )
  );
