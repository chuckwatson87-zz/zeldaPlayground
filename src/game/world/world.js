export class world {
    constructor() {
      console.log('world loaded');

      this.init();
    }

    init() {
      console.log(this.mainWorld);
    }

    attached() {
      console.log(this.mainWorld)
    }
}
