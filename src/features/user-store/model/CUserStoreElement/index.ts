import { hls } from "@diaskappassov/hungry-local-storage";

type TExpiration = Parameters<typeof hls.set>["2"];

export class CUserStoreElement<T> {
  name: string;
  expiration?: TExpiration;

  constructor({
    name,
    expiration,
  }: {
    name: string;
    expiration?: TExpiration;
  }) {
    this.name = name;
    this.expiration = expiration;
  }

  set(v: T) {
    hls.set(this.name, v, this.expiration);
  }

  get(): T | null {
    return hls.get(this.name);
  }

  remove() {
    hls.remove(this.name);
  }
}
