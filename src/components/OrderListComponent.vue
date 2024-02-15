<template>
    <div class="container">
      <div class="page-header">
        <h1 class="display-4" style="margin-top: 20px">주문 목록</h1>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>회원 이메일</th>
            <th>주문 상태</th>
            <th v-if="isAdmin === true">주문 취소</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orderList" :key="order.id">
            <tr @click="toggleOrder(order.id)" style="cursor: pointer">
              <td>{{ order.id }}</td>
              <td>{{ order.memberEmail }}</td>
              <td>{{ order.orderStatus }}</td>
              <td v-if="isAdmin === true">
                <button class="btn btn-secondary" v-if="order.orderStatus === 'ORDERED'" @click.stop="cancelOrder(order.id)">CANCEL</button>
              </td>
            </tr>
            <tr v-if="visibleOrder.has(order.id)">
              <td colspan="4">
                <div class="order-details">
                  <div v-for="orderItem in order.orderItems" :key="orderItem.id" class="order-item">
                    <span>{{ orderItem.itemName }} {{ orderItem.count }}개</span>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['isAdmin','apiUrl'],
    data() {
      return {
        orderList: [],
        visibleOrder: new Set(),
      };
    },
    async created() {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}${this.apiUrl}`, {headers});
        this.orderList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      toggleOrder(orderId) {
        if (this.visibleOrder.has(orderId)) {
          this.visibleOrder.delete(orderId);
        } else {
          this.visibleOrder.add(orderId);
        }
      },
      async cancelOrder(orderId) {
        if(confirm("정말 삭제 하시겠습니까?")){
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/cancel`,{headers});
                const order = this.orderList.find(order => order.id === orderId);
                order.orderStatus = "CANCELED";
            } catch (error) {
                console.error(error);
            }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .order-details {
    margin-top: 10px;
  }
  
  .order-item {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  