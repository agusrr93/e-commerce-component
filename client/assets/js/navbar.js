Vue.component('navbar-top', {
    props: ['carts','total'],
    data(){
        return{
           token:'',
           error: '',
           token: token,
           cart: []
        }
    },
    template: ` 
    <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container flex-grow-1">
              <a class="navbar-brand" href="http://localhost:8080">E-commerce</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="modal" data-target="#cartModal" v-if="token"><i class="fas fa-shopping-cart">0</i></a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="modal" data-target="#loginModal" v-if="!token">Login</a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="modal" data-target="#registerModal" v-if="!token">Register</a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" id="logout" v-if="token" v-on:click="logout">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <!-- Modal Login -->
          <div class="modal fade" id="loginModal">
            <div class="modal-dialog">
              <div class="modal-content">
    
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title"><i class="fas fa-user"></i> Login</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
    
                <!-- Modal body -->
                <div class="modal-body">
                  
                  <div class="container">  
                    <div class="alert alert-warning" v-if="error">
                      <strong>Warning!</strong> {{ error }}
                    </div>
                    
                    <form>
                      <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" class="form-control" ref="emailLogin" required>
                      </div>
                      <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" ref="pwdLogin" @keyup.enter="login" required>
                      </div>
                    </form>
                    
                  </div>
                
                </div>
    
                <!-- Modal footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="login">Login</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
    
              </div>
            </div>
          </div>
         
          <div class="modal fade" id="cartModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><i class="fas fa-shopping-cart"></i> Keranjang</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              
              <div class="container">         
                <table class="table table-hover">
                  <tbody>
                    
                    <tr v-for="cart in carts">
                      <td>
                        <img class="card-img-top" v-bind:src=cart.imgurl alt="" style="width:48px;height:48px">
                      </td>
                      <td>{{ cart.name }}</td>
                      <td>{{ cart.qty }}</td>
                      <td>Rp. {{ cart.price }}</td>
                      <td>Rp. {{ cart.totalPrice }}</td>
                      <td><button type="button" class="close">&times;</button></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <h5>Sub Total: Rp. {{ total}}</h5>
            </div>
            
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="checkout">Checkout</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>


  </div>
         
`,methods: {
  register: function() {
    let self = this

    axios({
      method: 'POST',
      url: `${base_url}/api/users/register`,
      data: {
        name: this.$refs.nameRegist.value,
        email: this.$refs.emailRegist.value,
        password: this.$refs.pwdRegist.value
      }
    })
      .then(() => {
        alert('Register berhasil!')
        this.login()
      })
      .catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(error.response.data.error)
            self.error = ''
            self.error = error.response.data.error
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttspRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      })
  },
  login: function() {
    let self = this
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/users/login`,
      data: {
        email: this.$refs.emailLogin.value || this.$refs.emailRegist.value,
        password: this.$refs.pwdLogin.value || this.$refs.pwdRegist.value
      }
    })
      .then(response => {
        let obj = {
          token: response.data.token,
          userId: response.data.userId,
          cart: [],
          totalPrice: 0
        }
        
        data.push(obj)
        localStorage.setItem('data', JSON.stringify(data))
        this.$emit('set-token',obj.token)
        location.reload()
      })
      .catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert('Login gagal!')
            self.error = ''
            self.error = 'Login gagal!'
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      })
  },
  logout: function() {
    localStorage.removeItem('data')
    location.reload()
  },
  addToCart: function(item) {
    let itemId = item.target.id
    let imgId=item.target.img
    
    let itemIndex
    
    this.Item.forEach((item, id) => {
      if (item._id === itemId) {
        itemIndex = id
      }
    })

    let cartObj = {
      _id: this.Item[itemIndex]._id,
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
}
// ,computed: {
//   cartSize: function () {
//      let qty=0
//      for(let i=0;i<carts.length;i++){
//         qty=qty+carts.qty
//      }  
//      return qty
//   }
// }
})