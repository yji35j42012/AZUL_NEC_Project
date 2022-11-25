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
        } else if (item == "submit_company") {
            // 111.11.17新增
            key_submitCompanyHandler();
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
    // 111.11.17新增
    if (key_submit.getAttribute("data-submit")) {
        key_submitCompanyHandler()
        return;
    }
    // 111.11.17新增


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



// 111.11.17新增
function key_submitCompanyHandler() {
    console.log("廠商送出");
    if (key_submit.getAttribute("data-submit") == "company_submit") {
        var checkString = new RegExp("[A-Za-z]+");
        var strcount = 0;
        for (let i = 0; i < inputData.length; i++) {
            if (checkString.test(inputData[i])) {
                strcount++;
            }
        }
        // 第一個字母不是英文字
        if (!checkString.test(inputData[0])) {
            input_box.classList.add("_error");
            console.log('第一個字母不是英文字');
            return;
        }
        // 總數超過8字或低於8字
        else if (inputData.length !== 8) {
            input_box.classList.add("_error");
            console.log('總數超過8字或低於8字');
            return;
        }
        // 輸入項目並非1英文字母+7數字
        else if (strcount > 1) {
            input_box.classList.add("_error");
            console.log('輸入項目並非1英文字母+7數字');
            return;
        }
        // 以上皆正確，導向下一頁
        else{
            if (key_input.value == "A1234567") {
                alert.classList.add("on");
            }else {
                from_face();
            }
        }
    }
}
