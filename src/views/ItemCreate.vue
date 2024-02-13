<template>
    <div class="container">
        <h1 class="display-4" style="margin-top : 20px">상품 등록</h1>
        <form @submit.prevent="memberCreate">
            <div class="mb-3">
                <label for="name" class="form-label">상품명</label>
                <div class="input-group">
                    <input type="text" v-model="name" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">카테고리</label>
                <div class="input-group">
                    <input type="text" v-model="category" class="form-control" >
                </div>
            </div><div class="mb-3">
                <label for="price" class="form-label">가격</label>
                <div class="input-group">
                    <input type="number" v-model="price" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="stockQuantity" class="form-label">재고수량</label>
                <div class="input-group">
                    <input type="number" v-model="stockQuantity" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="itemImage" class="form-label">상품 이미지</label>
                <!-- @change와 @click 비교: 
                    @click은 요소가 클릭될때 마다 함수 실행
                    @change는 핻강 태그의 값이 변할때 함수 실행 -->
                <div class="input-group">
                    <input type="file" class="form-control" accept="image/*" @change="fileUpload">
                </div>
            </div>
            <input @click="itemCreate" type="submit" class="btn btn-primary" value="등록">
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: "",
            category: "",
            price: null,
            stockQuantity: null,
            itemImage: null,
        }
    },
    methods:{
        fileUpload(event){
            // event.target : 이벤트가 발생한 DOM요소를 가리키는 객체
            this.itemImage = event.target.files[0];
        },
        async itemCreate(){
            // multi-part formdata 형식의 경우 new FormData를 통해 객체 생성
            const registerData = new FormData();
            registerData.append("name", this.name);
            registerData.append("category", this.category);
            registerData.append("price", this.price);
            registerData.append("stockQuantity", this.stockQuantity);
            registerData.append("itemImage", this.itemImage);
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`, registerData, {headers});

            this.$router.push("/items/manage")
        }
    },
}
</script>
