function blur(target: any) {
    console.log(target.prototype);
    target.prototype.blur = function () {
        const minValue = Math.min(this.redColor, this.greenColor, this.blueColor);
        this.redColor -= minValue;
        this.greenColor -= minValue;
        this.blueColor -= minValue;
    };
}

@blur
class Color {
    public redColor: number;
    public greenColor: number;
    public blueColor: number;

    constructor(red: number, green: number, blue: number) {
        this.redColor = this.validationValue(red);
        this.greenColor = this.validationValue(green);
        this.blueColor = this.validationValue(blue);
    }

    validationValue(value: number): number {
        if (value < 0 || value > 255) {
            throw new Error("Enter correct value from 0 to 255");
        }
        return value;
    }

    get red(): number {
        return this.redColor;
    }
    set red(value: number) {
        this.redColor = this.validationValue(value);
    }

    get green(): number {
        return this.greenColor;
    }
    set green(value: number) {
        this.greenColor = this.validationValue(value);
    }

    get blue(): number {
        return this.blueColor;
    }
    set blue(value: number) {
        this.blueColor = this.validationValue(value);
    }
}

const color = new Color(50, 0, 0);
color.red = 200;
console.log(color.red);

const c: any = new Color(20, 40, 255);
c.blur();
console.log(c.red, c.green, c.blue, 'aaaaaaaaa');
