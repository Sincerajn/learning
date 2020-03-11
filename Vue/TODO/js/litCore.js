class Lit {
    constructor(selector) {
        this.element = document.querySelector(selector)
    }

    // ===  *** Event *** === //
    click(callback) {
        this.element.addEventListener("click", callback)
    }

    // ===  *** Class *** === //
    hasClass(inputClass) {
        return Lit.hasClass(this.element, inputClass)
    }
    addClass(inputClass) {
        Lit.addClass(this.element, inputClass)
        return this
    }
    removeClass(inputClass) {
        Lit.removeClass(this.element, inputClass)
        return this
    }

    // ===  *** Style *** === //
    hide() {
        Lit.hide(this.element)
        return this
    }
    show() {
        Lit.show(this.element)
        return this
    }
    toggle() {
        Lit.toggle(this.element)
        return this
    }

    // === *** Static methods *** === //

    // ===  *** Event *** === //
    static loaded = callback => {
        document.addEventListener("DOMContentLoaded", callback)
    }

    static store = (key, value) => {
        if (key && value) {
            value = JSON.stringify(value)
            localStorage.setItem(key, value)
        }
        else
            throw 'Not has key: ${key} or value: ${value}'
    }

    static read = key => {
        if (key) {
            let value = JSON.parse(localStorage.getItem(key))
            return value
        }
        else
            throw 'Not has key:${key}'
    }

    /**
     * 数组去重
     *
     * @static
     * @param {Array} arr
     * @memberof Lit
     */
    static unique = arr => {
        return [...new Set(arr)]
    }

    /**
     * 判断是否为可遍历对象
     *
     * @param {*} data
     * @returns
     */
    static isIterator = data => {
        const iterators = [Array, NodeList]
        let iterator = false

        iterators.forEach(i => {
            if (data instanceof i) {
                iterator = true
            }
        })

        return iterator
    }

    /**
     * 遍历每一项执行回调
     *
     * @param {*} data
     * @param {CallableFunction} fun
     */
    static each = (data, fun) => {
        if (!lit.isIterator(data))
            fun(data)
        else
            data.forEach((e) => fun(e))
    }

    /**
     *
     *
     * @param {string} selector
     * @returns {HTMLElement}
     */
    static getElement = selector => {
        return document.querySelector(selector)
    }

    /**
     *
     *
     * @param {string} selector
     * @returns {NodeList}
     */
    static getElements = selector => {
        return document.querySelectorAll(selector)
    }

    static hasClass = (element, inputClass) => {
        if (!element instanceof HTMLElement)
            return

        let included = element.className.includes(inputClass) ? true : false
        return included
    }

    static addClass = (elements, inputClasses) => {
        if (!elements instanceof HTMLElement && !elements instanceof NodeList)
            return

        lit.each(elements, el => {
            if (lit.hasClass(el, inputClasses))
                return

            lit.each(inputClasses, classItem => {
                el.className += " " + classItem
            })
        })
    }

    static removeClass = (elements, inputClasses) => {
        if (!elements instanceof HTMLElement && !elements instanceof NodeList)
            return

        lit.each(elements, el => {
            if (!lit.hasClass(el, inputClasses))
                return

            lit.each(inputClasses, classItem => {
                let r = el.className.replace(classItem, "")
                el.className = r.trim()
            })
        })
    }

    static hide = elements => {
        lit.each(elements, el => el.hidden = true)
    }
    static show = elements => {
        lit.each(elements, el => el.hidden = false)
    }
    static toggle = elements => {
        lit.each(elements, el => {
            el.hidden ? lit.show(el) : lit.hide(el)
        })
    }
}