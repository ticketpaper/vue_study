  <template>
      <div class="container">
          <div class="page-header">
              <h1 class="display-4" style="margin-top : 20px">회원 정보</h1>
          </div>
          <table class="table">
              <thead>
                  <tr>
                    <td>이름</td><td>{{memberInfo.name}}</td>
                  </tr>
                  <tr>
                    <td>이메일</td><td>{{memberInfo.email}}</td>
                  </tr>
                  <tr>
                    <td>도시</td><td>{{memberInfo.city}}</td>
                  </tr>
                  <tr>
                    <td>상세주소</td><td>{{memberInfo.street}}</td>
                  </tr>
                  <tr>
                    <td>우편번호</td><td>{{memberInfo.zipcode}}</td>
                  </tr>
              </thead>
              <tbody>
                  
              </tbody>
          </table>
      </div>

    <OrderListComponent
    :isAdmin="false"
    :apiUrl="`/member/myOrders`"
    />
  </template>
  
  <script>
  import axios from 'axios';
  import OrderListComponent from '@/components/OrderListComponent.vue';
  
  export default {
    components:{
        OrderListComponent
    },
    data(){
        return{
            memberInfo: {},
        }
    },
    created(){
        this.fetchMember();
    },
    methods:{
        async fetchMember(){
            try{
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myInfo`,{headers});
            this.memberInfo = response.data;
            }catch(error){
                console.log(error)
            }
        },
    },
  }
  </script>

