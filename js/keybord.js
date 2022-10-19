var keybox_btn = document.querySelectorAll(".keybox_btn");
var key_input = document.querySelector("#key_input");
var key_submit = document.querySelector("#key_submit");
var input_box = document.querySelector("#input_box");
var alert = document.querySelector("#alert");
var key_clear = document.querySelector("#key_clear");

var inputData = [];
for (let i = 0; i < keybox_btn.length; i++) {
    const element = keybox_btn[i];
    element.onclick = function () {
        var item = element.getAttribute("data-keynum");
        if (item == "del") {
            inputData.pop();
        } else if (item == "submit") {
            key_submitHandler();
        } else if (item == "clear") {
            key_clearHandler();
        } else {
            inputData.push(item);
        }
        insertInput();
    };
}
function insertInput() {
    var inputStr = "";
    for (let i = 0; i < inputData.length; i++) {
        inputStr = inputStr + inputData[i];
    }
    key_input.value = inputStr;
}
function key_submitHandler() {
    console.log("送出");
    // 如果證號在 class="input_box" 加上_error
    if (inputData.length < 9) {
        input_box.classList.add("_error");
    } else {
        // 輸入正確往下一步
        if (key_input.value == "A123456789") {
            alert.classList.add("on");
        } else {
            from_face();
        }
    }
}
function key_clearHandler() {
    alert.classList.remove("on");
    inputData = [];
    insertInput();
}
key_submit.addEventListener("click", key_submitHandler);
key_clear.addEventListener("click", key_clearHandler);
