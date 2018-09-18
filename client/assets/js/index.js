const base_url = 'http://localhost:3000'
const data = []
const dataLocal = JSON.parse(localStorage.getItem('data'))

const cart = dataLocal ? dataLocal[0].cart : []
const token = dataLocal ? dataLocal[0].token : ''
const userId = dataLocal ? dataLocal[0].userId : ''
const totalPrice = dataLocal ? dataLocal[0].totalPrice : 0

var app = new Vue({
  el: '#app',
  data: {
    Item: [],
    Category: [],
    Cart: cart,
    totalPrice: totalPrice,
    token:token,
  },
  methods: {
    settoken:function(value){
        token=value
    },
    showCategory: function(category) {
      let self = this
      let catName = category.target.text
      
      axios({
        method: 'GET',
        url: `${base_url}/api/itemCat/${catName}`
      })
        .then(response => {
          let items = response.data.items
          
          self.Item = ''
          self.Item = items
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToCart: function(item) {
      let itemId = item._id
      let imgId=item.imgurl
      
      let itemIndex
      
      this.Item.forEach((item, id) => {
        if (item._id === itemId) {
          itemIndex = id
        }
      })
      let cartObj = {
        _id: this.Item[itemIndex]._id,
        imgurl:imgId,
        name: this.Item[itemIndex].name,
        qty: 1,
        price: this.Item[itemIndex].price,
        totalPrice: this.Item[itemIndex].price * 1
      }
    
      this.totalPrice += this.Item[itemIndex].price
      
      let exist = false 
      
      this.Cart.forEach(cart => {
        if (cart._id === cartObj._id) {
          exist = true
          cart.qty += 1
          cart.totalPrice  += cartObj.totalPrice
        }
      })

      if(!exist) {
        this.Cart.push(cartObj)
      } else {
        this.Cart = this.Cart.slice(0)
      }
    },
    checkout: function() {   
      let itemId = [] 
      let purchase = []
      let self = this

      if (this.Cart.length === 0) {
        alert('Cart anda kosong!')
      } else {
        this.Cart.forEach(cart => {
          let obj = {
            userId: userId,
            itemId: cart._id,
            qty: cart.qty,
            totalPrice: cart.totalPrice
          }
          
          itemId.push(cart._id)
          purchase.push(obj)
        })      

        axios({
          method: 'PATCH',
          url: `${base_url}/api/users/checkout/${userId}`,
          data: {
            purchase,
            itemId
          },
          headers: {
            token: token
          }
        })
          .then(() => {
            self.totalPrice = 0
            self.Cart = []
            location.reload()
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
  created() {
    let self = this
    
    axios.get(`http://localhost:3000/api/items`)
      .then(response => {
        self.Item = response.data
        
        axios.get(`http://localhost:3000/api/itemCat`)
          .then(response => {
            self.Category = response.data
          })
      }) 
      .catch(err => {
        console.log(err.responseText);
      })
  },
  watch: {
    Cart: function() {
      let newLocalDataObj = {
        token: token,
        userId: userId,
        cart: this.Cart,
        totalPrice: this.totalPrice,
      }

      let newLocalData = []
      newLocalData.push(newLocalDataObj)
      
      localStorage.setItem('data', JSON.stringify(newLocalData))
      location.reload()
    }
  }
})