  <template>
      <div class="container">
          <div class="page-header">
              <h1 class="display-4" style="margin-top : 20px">회원 정보</h1>
          </div>
          <table class="table">
              <thead>
                  <tr>
                      <th>id</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>주문 수량</th>
                  </tr>
              </thead>
              <tbody>
                  
              </tbody>
          </table>
      </div>

    <OrderListComponent
    :isAdmin="false"
    :apiUrl="`http://localhost:8084/member/${id}/orders`"
    />
  </template>
  
  <script>
  import OrderListComponent from '@/components/OrderListComponent.vue';
  
  export default {
    props:['id'],
    components:{
        OrderListComponent
    }
  }
  </script>

