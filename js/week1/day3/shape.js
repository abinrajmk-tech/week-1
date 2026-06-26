class Shape {
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
    }
    describe() {
        return `Name : ${this.name}, Colour : ${this.colour}`;
    }
    static compare(a, b) {
        console.log("a");
    }
}

class Circle extends Shape {
    constructor(radius, ...parentArgs) {
        super(...parentArgs);
        this.radius = radius;
        this.areavalue = this.area() + "sq.cm";
        this.perimetervalue = this.perimeter() + "sq.cm";
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
    describe() {
        return `Name : ${this.name}, Colour : ${this.colour}, Radius : ${this.radius} Area : ${this.area()}sq.cm ,Perimeter : ${this.perimeter()}`;
    }
}
class Triangle extends Shape {
    constructor(base, height, ...parentArgs) {
        super(...parentArgs);
        this.base = base;
        this.height = height;
        this.areavalue = this.area() + "sq.cm";
    }
    area() {
        return 0.5 * this.base * this.height;
    }

    describe() {
        return `Name : ${this.name}, Colour : ${this.colour}, base : ${this.base}, height : ${this.height} Area : ${this.area()}sq.cm`;
    }
}
class Rectangle extends Shape {
    constructor(width, height, ...parentArgs) {
        super(...parentArgs);
        this.width = width;
        this.height = height;
        this.areavalue = this.area() + "sq.cm";
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
    describe() {
        return `Name : ${this.name}, Colour : ${this.colour}, width : ${this.width}, height : ${this.height} Area : ${this.area()}sq.cm`;
    }
}
class shapeCollection {
    constructor(...collections) {
        this.collections = [...collections];
    }
    add(shape) {
        this.collections.push(shape);
    }
    removeByid(id) {
        this.collections.pop(id);
    }
    getByType(type) {
        return this.collections.filter((item) => {
            typeof item === type;
        });
    }
    sortByArea() {
        return this.collections.sort((a, b) => a.area() - b.area());
    }
    getTotalArea() {
        let total = 0;
        this.collections.map((item) => (total += item.area()));
        return total;
    }
}
const circle = new Circle(5, "Circle", "Green");
const triangle = new Triangle(6, 10, "triangle", "Blue");
const rectangle = new Rectangle(6, 10, "rectangle", "Red");
console.log(circle.describe());
console.log(triangle.describe());
console.log(rectangle.describe());

const shapes = new shapeCollection(circle, triangle);
shapes.add(rectangle);
console.log(shapes.getTotalArea());
console.log(shapes.sortByArea());
console.log(Object.getPrototypeOf(rectangle));
console.log(circle instanceof Circle);
console.log(circle.name);
