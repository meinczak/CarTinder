const op1 = document.getElementById("opt1");
const op2 = document.getElementById("opt2");
const op3 = document.getElementById("opt3");

function changeOpt (opt: HTMLElement | null) {
    if (opt) {
        opt.style.color = "white";
    }
}

changeOpt(op1);