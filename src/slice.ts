export class Slice<T> {
  constructor(public content: T[], public hasNext: boolean) {
  }
}
