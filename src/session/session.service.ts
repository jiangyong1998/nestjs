import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  fetchData() {
    return new Promise((reslove) => {
      setTimeout(() => {
        reslove('fetch data');
      }, 4000);
    });
  }
}
