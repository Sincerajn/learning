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

let app1 = new Vue({
    el: "#app1",
    data: {
        name: null,
        age: null,
        sex: null
    }
})

let app2 = new Vue({
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

let app3 = new Vue({
    el: "#app3",
    data: {
        blog_url: "https://Sincerajn.github.io",
        style: ["lit", "core"],
        addClass: true
    }
})

let app4 = new Vue({
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

let app5 = new Vue({
    el: "#app5",
    data: {
        message: null,
        lazy: null,
        trim: null,
        number: null
    }
})

let app6 = new Vue({
    el: "#app6",
    data: {
        sex: "男",
        like: [],
        form: 1,
        dest: []
    }
})

let app7 = new Vue({
    el: "#app7",
    data: {
        role: "user"
    }
})

let app8 = new Vue({
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

let app9 = new Vue({
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

let app10 = new Vue({
    el: "#app10"
})

let app11 = new Vue({
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

Vue.component("outter", {
    template: ` <div :class='{red: red}'>父组件：{{message}}
                    <div class='item'>
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

let app12 = new Vue({
    el: "#app12"
})