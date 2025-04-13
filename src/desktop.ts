const op1 = document.getElementById("opt1");
const op2 = document.getElementById("opt2");
const op3 = document.getElementById("opt3");

const ops = [op1, op2, op3];

function changeOpt (opt: HTMLElement | null) {
    if (opt) {
        opt.style.color = "white";
    }
}

ops.forEach((x)=>{
    x?.addEventListener("click", ()=>{changeOpt(x)})
    console.log(x)
});

changeOpt(op1);

export default function() {
    console.log('You are in desktop mode!');
}

function balls () {
    console.log("test");
}
balls();