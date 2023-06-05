function blur(target: any) {
    target.prototype.blur = function () {
      const minValue = Math.min(this.red, this.green, this.blue);
      this.red -= minValue;
      this.green -= minValue;
      this.blue -= minValue;
    };
    return target
  }


@blur()
class Color {
    #red: number
    #green: number
    #blue: number

    constructor(red: number, green: number, blue: number) {
        this.#red = this.#validationValue(red)
        this.#green = this.#validationValue(green)
        this.#blue = this.#validationValue(blue)
    }

    #validationValue(value: number): number {
        if (value < 0 || value > 255) {
            throw new Error("Enter corect value from 0 to 255")
        }
        return value
    }

    get red(): number {
        return this.#red
    }
    set red(value: number) {
        this.#red = this.#validationValue(value)
    }

    get green(): number {
        return this.#green
    }
    set green(value: number) {
        this.#green = this.#validationValue(value)
    }

    get blue(): number {
        return this.#blue
    }
    set blue(value: number) {
        this.#blue = this.#validationValue(value)
    }


}

const color = new Color(50, 0, 0);
color.red = 200;
console.log(color.red);

const c = new Color(20, 40, 255);
c.blur();
console.log(c.red, c.green, c.blue);