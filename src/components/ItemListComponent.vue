<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top: 20px">{{pageTitle}}</h1>
        </div>
        <div class="d-flex justify-content-between" style="margin-top: 10px; margin-bottom: 5px;">
            <form @submit.prevent="searchItems" class="form-inline">
                <div class="form-group">
                    <select v-model="searchType" class="form-control">
                        <option value="option">선택</option>
                        <option value="name">상품명</option>
                        <option value="category">카테고리</option>
                    </select>
                </div>
                <div class="form-group" style="margin-left: 5px;">
                    <input v-model="searchValue" type="text" class="form-control" placeholder="검색어를 입력하세요">
                </div>
                <button type="submit" class="btn btn-primary" style="margin-left: 5px;">검색</button>
            </form>
            <div v-if="!isAdmin" class="d-flex">
                <button @click="addCart" class="btn btn-secondary">장바구니</button>
                <button @click="placeOrder" class="btn btn-success" style="margin-left: 10px;">주문하기</button>
            </div>
            <div v-if="isAdmin">
                <a href="/items/create">
                    <button class="btn btn-success">상품 등록</button>
                </a>
            </div>
        </div>
        
        <table class="table">
            <thead>
                <tr>
                    <th v-if="!isAdmin"></th>
                    <th>제품 사진</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>재고 수량</th>
                    <th v-if="!isAdmin">주문 수량</th>
                    <th v-if="isAdmin">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemList" :key="item.id">
                    <td v-if="!isAdmin" ><input type="checkbox" v-model="selectedItems[item.id]"/></td>
                    <td><img :src="getImage(item.id)" style height="150px" width="auto"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.stockQuantity}}</td>
                    <td v-if="!isAdmin"><input type="number" min="0" v-model="item.quantity" style="width: 75px;" value="0"></td>
                    <td v-if="isAdmin"><button @click="deleteItem(item.id)" class="btn btn-secondary">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    props: ['isAdmin','pageTitle'],
    data(){
        return{
            itemList: [],
            pageSize: 10,
            currentPage: 0,
            searchType: 'name',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            selectedItems: {},
        }
    },
    created(){
        this.loadItems();
    },
    // mounted : window dom 객체가 생성된 이후에 실행되는 hook 함수
    mounted(){
        // scroll 동작이 발생할떄마다 scorollPagination 함수가 호출된다는 의미
        window.addEventListener("scroll", this.scrollPagination)
    },
    
    methods: {
        addCart(){
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key]===true)
                                .map(key => {
                                    const item = this.itemList.find(item => item.id == key);
                                    return {itemId:item.id, name: item.name, count:item.quantity};
                                });
            orderItems.forEach(item => this.$store.commit('addToCart', item));
            
        },
        async deleteItem(itemId){
            if(confirm("정말 삭제 하시겠습니까?")){
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/delete`,{headers});
                alert("삭제 되었습니다.");
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert("삭제 실패");
            }
        }
        },
        async placeOrder(){
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key]===true)
                                .map(key => {
                                    const item = this.itemList.find(item => item.id == key);
                                    return {itemId:item.id, count:item.quantity};
                                });
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});               
                console.log(orderItems);
                alert("주문 완료 되었습니다.");
                window.location.reload();
            }catch(error){
                console.log(error);
                alert("주문이 실패 돠었습니다.");  
            }
        },
        searchItems(){
          this.itemList=[];
          this.currentPage=0;
          this.isLastPage=false;
          this.loadItems();
        },
        scrollPagination(){
            // innerHeight : 브라우저 창의 내부 높이를 픽셀 단위로 변환
            // scrollY : 스크롤을 통해 Y축을 이동한 거리
            // offsetHeight : 전체 브라우저 창의 높이
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if(nearBottom && !this.isLastPage && !this.isLoading){
                this.currentPage++;
                this.loadItems();
            }
        },
        getImage(id){
            return `${process.env.VUE_APP_API_BASE_URL}/item/${id}/image`;
        },
        async loadItems(){
            this. isLoading = true;
            try{
                const params = {
                    page: this.currentPage,
                    size: this.pageSize,
                    // [this.searchType]: this.searchValue, 
                }
                if(this.searchType === "name"){
                    params.name = this.searchValue;
                }else if(this.searchType === "category"){
                    params.category = this.searchValue;
                }
                console.log(params);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/items`,{params});
                const addItemList = response.data.map(item=>({...item, quantity:0}))

                if(addItemList.length < this.pageSize){
                    this.isLastPage = true;
                }

                this.itemList = [...this.itemList, ...addItemList];
                }catch(error){
                    console.log(error)
                }
                this.isLoading = false;

        }
    }
}
</script>

<style lang="scss" scoped>

</style>