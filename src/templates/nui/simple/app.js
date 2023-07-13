const { createApp } = Vue

  createApp({
    data() {
      return {
        message: '',
        visible: false
      }
    },
    mounted() {
        window.addEventListener('message', this.onMessage);
    },
    destroyed() {
        window.removeEventListener('message')
    },
    methods: {
        onMessage(event) {
            if (event.data.type === 'open') {
              this.visible = true
              this.message = event.data.message  
            
              let that = this
              setTimeout(() => {
                  that.visible = false
                  fetch(`https://${GetParentResourceName()}/close`, {
                    method: 'POST'
                  })
              }, 4000);
            } 
        },
    }
  }).mount('#app')