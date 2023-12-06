import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  commonMethod() {
    return 'common';
  }
}
