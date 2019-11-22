// MS Linear congruential generator

class Lcg{
  constructor(_seed) {
    this.state = _seed
  }

  getNext() {
    this.state = (214013 * this.state + 2531011) % 0x80000000
    return this.state >> 16
  }
}