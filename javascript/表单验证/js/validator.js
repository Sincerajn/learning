/**
 * 数据合法性验证器
 *
 * @class Validator
 */
class Validator {
    /**
     * Creates an instance of Validator.
     * @param {*} value
     * @param {Object} rules
     * @memberof Validator
     */
    constructor(value, rules) {
        this.value = value
        this.rules = rules

        this.isValide = function () {
            for (let key in this.rules) {
                let methodName = key + "_verification"

                if (!(Validator[methodName](this.value, this.rules)))
                    return false
            }
            return true
        }
    }

    static isdigit(value) {
        return /^[0-9]*$/.test(value)
    }

    static regexp_verification(value, rules) {
        let rule = new RegExp(rules.regexp)

        return rule.test(value)
    }

    static max_verification(value, rules) {
        if (!this.isdigit(value))
            return false
        else
            value = parseFloat(value)

        let relu = parseFloat(rules.max)
        return value <= relu
    }

    static min_verification(value, rules) {
        if (!this.isdigit(value))
            return false
        else
            value = parseFloat(value)

        let relu = parseFloat(rules.min)
        return value >= relu
    }

    static maxlength_verification(value, rules) {
        let relu = parseFloat(rules.maxlength)
        return value.length <= relu
    }

    static minlength_verification(value, rules) {
        let relu = parseFloat(rules.minlength)
        return value.length >= relu
    }
}