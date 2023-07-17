export class Util {
  static isEmpty(list) {
    if (!list) {
      return true;
    }

    if (Array.isArray(list)) {
      return list.length === 0;
    }

    return Object.keys(list).length === 0;
  }
}
