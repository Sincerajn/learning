Vue.component("like", {
    template: "#like-template",
    data: function () {
        return {
            likeCount: 5,
            liked: false
        }
    },
    methods: {
        addLick: function () {
            if (!this.liked)
                this.likeCount++
            else
                this.likeCount--

            this.liked = !this.liked
        }
    }
})
// === *** === //
app1 = new Vue({
    el: "#app1",
    data: {
        name: null,
        age: null,
        sex: null
    }
})
// === *** === //
app2 = new Vue({
    el: "#app2",
    data: {
        foodList: [
            {
                name: "葱",
                price: 10,
                discount: .8
            },
            {
                name: "姜",
                price: 8,
                discount: .5
            },
            {
                name: "蒜",
                price: 10,
            }
        ]
    }
})
// === *** === //
app3 = new Vue({
    el: "#app3",
    data: {
        blog_url: "https://Sincerajn.github.io",
        style: ["lit", "core"],
        addClass: true
    }
})
// === *** === //
app4 = new Vue({
    el: "#app4",
    data: {
        message: "事件检测"
    },
    methods: {
        onEnter: function () {
            this.message = "输入了回车"
        },
        onClick: function () {
            this.message = "点击了按钮"
        },
        onMouseEnter: function () {
            this.message = "移入了鼠标"
        },
        onMouseLeave: function () {
            this.message = "移出了鼠标"
        },
        onSubmit: function () {
            this.message = "提交了表单"
        },
        onFocus: function () {
            this.message = "获得了焦点"
        },
        onBlur: function () {
            this.message = "失去了焦点"
        }
    }
})
// === *** === //
app5 = new Vue({
    el: "#app5",
    data: {
        message: null,
        lazy: null,
        trim: null,
        number: null
    }
})
// === *** === //
app6 = new Vue({
    el: "#app6",
    data: {
        sex: "男",
        like: [],
        form: 1,
        dest: []
    }
})
// === *** === //
app7 = new Vue({
    el: "#app7",
    data: {
        role: "user"
    }
})
// === *** === //
app8 = new Vue({
    el: "#app8",
    data: {
        chinese: 95,
        math: 88,
        english: 80,
    },
    computed: {
        sum: function () {
            return parseFloat(this.chinese) + parseFloat(this.math) + parseFloat(this.english)
        },
        average: function () {
            return Math.round(this.sum / 3)
        }
    }
})
// === *** === //
app9 = new Vue({
    el: "#app9",
    components: {
        alert: {
            template: "<button @click='onClick'>Alert</button>",
            methods: {
                onClick: function () {
                    alert("yo.")
                }
            }
        },
    }
})
// === *** === //
app10 = new Vue({
    el: "#app10"
})
// === *** === //
app11 = new Vue({
    el: "#app11",
    data: {
        message: "yo."
    },
    components: {
        'alert-msg': {
            template: "<button @click='alert'>Alert: {{message}}</button>",
            props: ["message"],
            methods: {
                alert: function () {
                    alert(this.message)
                }
            }
        }
    }
})
// === *** === //
Vue.component("outter", {
    template: ` <div :class='{red: red}'>父组件：{{message}}
                    <div class='item white'>
                        <inner @callback='bindMessage'></inner>
                    </div>
                </div>`,
    data: () => {
        return {
            red: false,
            message: "下方子组件向本父组件通讯绑定数据，回车执行。",
        }
    },
    methods: {
        bindMessage: function (data) {
            this.red = true
            this.message = data
        }
    }
})

Vue.component("inner", {
    template: "<label>子组件：<input v-model='message' @keyup.enter='onEnter' type='text'></input></label>",
    data: () => {
        return {
            message: ""
        }
    },
    methods: {
        onEnter: function () {
            this.$emit("callback", this.message)
        }
    }
})

app12 = new Vue({
    el: "#app12"
})
// === *** === //
let Event = new Vue()

Vue.component("trans", {
    template: '<div>{{ message }}</div>',
    data() {
        return {
            message: '监听数据'
        }
    },
    mounted() {
        Event.$on("pushMessage", data => {
            this.message = data
        })
    },
})

app13 = new Vue({
    el: "#app13",
    data: {
        message: "Hello"
    },
    methods: {
        onChange: function () {
            Event.$emit("pushMessage", this.message)
        }
    }
})
// === *** === //
Vue.filter('unit', (val, unit = '￥') => {
    return unit + val
})

app14 = new Vue({
    el: '#app14',
    data: {
        price: 10,
        demo: '{{ value | filter() }}'
    }
})
// === *** === //
Vue.directive('pin', (el, binding) => {
    let value = binding.value
    let position = binding.modifiers
    if (value) {
        el.className += ' pin'
        if (position.right) {
            el.style.left = 'calc(100vw - 10rem)'
        }
        else {
            el.style.left = '0'
        }
    }
    else {
        el.className = 'card'
    }
})

app15 = new Vue({
    el: '#app15',
    data: {
        btnContent: "悬挂",
        pined: false
    }
})
// === *** === //
app16 = new Vue({
    el: '#app16',
    data: {
        pined: false
    }
})
// === *** === //
let toggle = {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        hide() {
            this.visible = false
        },
        show() {
            this.visible = true
        },
        toggle() {
            this.visible = !this.visible
        }
    }
}

Vue.component('popup', {
    template: `
            <div>
                <span @mouseenter='show' @mouseleave='hide'>Hover</span>
                <span v-if='visible'>Hello, world!</span>
            </div>`,
    mixins: [toggle]
})

Vue.component('tooltip', {
    template: `
    <div>
        <button @click='toggle'>Toggle</button>
        <span v-if='visible'>Hello, world!</span>
    </div>
    `,
    mixins: [toggle]
})

app17 = new Vue ({
    el: '#app17'
})
// === *** === //
Vue.component('info-card', {
    template: '#info-card-tpl'
})

app18 = new Vue({
    el: '#app18',
})