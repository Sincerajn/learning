let Event = new Vue()

let alertSound = document.querySelector('#alert-sound')

new Vue({
    el: '#todo-app',
    data: {
        list: [],
        current: {},
        count: 0
    },

    mounted() {
        this.count = Lit.read("count") || this.count
        this.list = Lit.read("todo-list") || this.list

        setInterval(this.checkAlert, 2000)

        Event.$on('remove', id => this.remove(id))
        Event.$on('toggleCompleted', id => this.toggleCompleted(id))
        Event.$on('setCurrent', item => this.setCurrent(item))
        Event.$on('toggleMore', id => this.toggleMore(id))
    },

    methods: {
        checkAlert() {
            this.list.forEach(item => {
                if (!item.date || item.alerted) return

                let date = new Date(item.date).getTime()
                let now = new Date().getTime()

                if (date <= now) {
                    alertSound.play()
                    let confirmed = confirm(`该完成${item.title}了`)
                    item.alerted = confirmed
                }
            })
        },

        merge() {
            if (!this.current.title) return

            let id = this.current.id
            if (id) { // 修改一个任务
                let i = this.getIndex(id)
                Vue.set(this.list, i, (Object.assign({}, this.current)))
            }
            else { //新加一个任务
                let item = Object.assign({}, this.current)
                item.completed = false
                item.alerted = false
                item.id = ++this.count
                this.list.push(item)
            }
            this.current = {}
        },


        remove(id) {
            let index = this.getIndex(id)
            this.list.splice(index, 1)
        },

        toggleCompleted(id) {
            let i = this.getIndex(id)
            let completed = this.list[i].completed
            this.list[i].completed = !completed
        },

        setCurrent(item) {
            let that = Object.assign({}, item)
            this.current = that
        },

        toggleMore(id) {
            let item = this.list[this.getIndex(id)]
            let showMore = item.showMore
            Vue.set(item, 'showMore', !showMore)
        },

        getIndex(id) {
            let index = this.list.findIndex(item => item.id === id)
            return index
        }
    },

    components: {
        'todo-task': {
            template: '#todo-task-tpl',
            props: ['item'],
            methods: {
                actions(name, params) { // 子组件向父组件提交事件
                    Event.$emit(name, params)
                }
            }
        },
    },

    watch: {
        list: {
            deep: true,
            handler(newValue) {
                Lit.store("todo-list", newValue)
            }
        },

        count: {
            handler(newValue) {
                Lit.store("count", newValue)
            }
        }
    },
})