<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top : 20px">장바구니</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>제품 id</th>
                    <th>제품명</th>
                    <th>주문 수량</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getCartItems" :key="item.id">
                    <td>{{item.itemId}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-end">
            <button @click="clearCart" class="btn btn-secondary">장바구니 비우기</button>
            <button @click="placeOrder" class="btn btn-success" style="margin-left :5px">주문하기</button>
        </div>
    </div>
    
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios';

export default {
    computed:{
        ...mapGetters(['getCartItems', 'getTotalQuantity'])
    },
    methods:{
        ...mapActions(['clearCart']),
        async placeOrder(){
            const orderItems = this.getCartItems.map(item=>{
                return {itemId: item.itemId, count: item.count};}
            )
            if(this.getTotalQuantity < 1){
                alert("장바구니에 물건이 없습니다.");
                return;
            }
            if(!confirm(`${this.getTotalQuantity}개의 상품을 주문하시겠습니까?`)){
                console.log("주문이 취소 되었습니다.")
                return;
            }
            
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});               
                console.log(orderItems);
                alert("주문 완료 되었습니다.");
                this.$store.dispatch('clearCart');
            }catch(error){
                console.log(error);
                alert("주문이 실패 돠었습니다.");  
            }
        },
        clearCart(){
            this.$store.dispatch('clearCart');
        }
    }
}
</script>
