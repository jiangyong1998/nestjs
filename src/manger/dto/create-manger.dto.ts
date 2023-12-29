export class CreateMangerDto {
  name: string;
  money: number;
}

export class TransferMoneyDto {
  fromId: number; //发起人
  toId: number; //接收人
  money: number; //转账的钱
}
