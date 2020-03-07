class Input {
    /**
     * Creates an instance of Input.
     * @param {*} element
     * @memberof Input
     */
    constructor(element) {
        if (element instanceof HTMLElement)
            this.el = element
        else
            this.el = document.querySelector(element)

        if (!this.el.dataset.rules)
            return

        this.rules = Input.parse(this.el.dataset.rules)

        /**
         * 当字段不合法时执行回调
         *  
         * @param {CallableFunction} callback
         */
        this.isInvalide = function (callback) {
            let that = this
            this.el.addEventListener("blur", function () {
                if (!that.isValide()) {
                    callback()
                }
            })
        }

        /**
         * 执行符合合法性验证时的回调
         *
         * @param {CallableFunction} { valideCallback, invalideCallback }
         */
        this.verification = function ({ valideCallback, invalideCallback }) {
            let that = this
            this.el.addEventListener("blur", function () {
                that.isValide() ? valideCallback() : invalideCallback()
            })
        }

        /**
         * 检验字段输入是否合法
         *
         * @returns {boolean}
         */
        this.isValide = function () {
            let val = this.el.value

            let tem = new Validator(val, this.rules)
            return tem.isValide()
        }
    }

    static parse(rules) {
        let r = {}

        let reluList = rules.split("|")
        reluList.forEach(relu => {
            let tem = relu.split(":")
            r[tem[0]] = tem[1]
        })

        return r
    }
}