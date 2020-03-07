const form = document.querySelector("form")

let inputValidators = initForm(form)
inputValidators.forEach(input => {
    let warning = input.el.nextElementSibling
    input.verification({
        invalideCallback: () => warning.hidden = false,
        valideCallback: () => warning.hidden = true
    })
})
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let formValide = inputValidators.every((input) => {
        return input.isValide()
    })

    formValide ? alert("提交成功！") : alert("格式有误！")
})


/**
 * 初始化表单
 *
 * @param {*} formEl
 * @returns {Array} 包含实例化后的 Input 对象
 */
function initForm(formEl) {
    if (!(formEl instanceof HTMLElement))
        formEl = document.querySelector(formEl)

    let inputs = formEl.querySelectorAll("input[data-rules]")

    inputs = [...inputs]

    return inputs.map(input => new Input(input))
}