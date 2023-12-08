import { Observable, filter, interval, map, take } from 'rxjs';
new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
}).subscribe({
  next(value) {
    console.log(value);
  },
});

interval(1000)
  .pipe(
    map((value) => ({ value })),
    filter((item) => item.value % 2 === 0),
    take(5),
  )
  .subscribe({
    next(value) {
      console.log(value);
    },
  });
