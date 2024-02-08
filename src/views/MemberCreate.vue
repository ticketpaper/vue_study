<template>
    <div class="container">
        <h1 class="display-4" style="margin-top : 20px">회원 가입</h1>
        <form @submit.prevent="memberCreate">
            <div class="mb-3">
                <label for="name" class="form-label">이름</label>
                <div class="input-group">
                    <input type="text" v-model="name" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">이메일</label>
                <div class="input-group">
                    <input type="email" v-model="email" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">패스워드</label>
                <div class="input-group">
                    <input type="password" v-model="password" class="form-control" >
                </div>
            </div>
            <div class="mb-3">
                <label for="city" class="form-label">도시</label>
                <div class="input-group">
                    <input type="text"  v-model="city" class="form-control">
                </div>
            </div>
            <div class="mb-3">
                <label for="street" class="form-label">상세주소</label>
                <div class="input-group">
                    <input type="text"  v-model="street" class="form-control">
                </div>
            </div>
            <div class="mb-3">
                <label for="zipcode" class="form-label">우편번호</label>
                <div class="input-group">
                    <input type="text" v-model="zipcode" class="form-control">
                </div>
            </div>
            <input type="submit" class="btn btn-primary" value="제출">
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: "",
        }
    },
    methods:{
        async memberCreate(){
            try{
                const registerData = {
                    name: this.name, 
                    email: this.email, 
                    password: this.password,
                    city : this.city,
                    street : this.street,
                    zipcode : this.zipcode,
                };
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
                // window.location.href = "/login";
                this.$router.push({name : 'Login'})
            }catch(error){
                const error_message = error.response.data.error_message;
                if(error_message){
                    console.log(error_message);
                    alert(error_message);
                }else{
                    console.log(error);
                    alert("입력값 확인 필요");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>