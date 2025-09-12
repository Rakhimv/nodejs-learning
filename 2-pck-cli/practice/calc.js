let op = process.argv[2]
let x = Number(process.argv[3])
let y = Number(process.argv[4])

if(op && x && y) {
    switch (op) {
        case "add":
            console.log(x + y);
            break;
        case "sub":
            console.log(x - y);
            break;
        case "mul":
            console.log(x * y);
            break;
        case "div":
            console.log(x / y);
            break;
    
        default:
            break;
    }
}

