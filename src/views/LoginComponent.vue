<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top : 20px">LOGIN</h1>
        </div>
        <!-- submit은 기본적으로 폼제출시 브라우저가 페이지를 새로고침하므로 해당동작을 막기 위해 prevent사용 -->
        <form @submit.prevent="doLogin">
            <div class="form-group">
                <label for="email" class="form-label">이메일</label>
                <div class="input-group">
                    <input type="text" v-model="email" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="form-label">비밀번호</label>
                <div class="input-group">
                    <input type="password" v-model="password" class="form-control">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">로그인</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

export default {
    data(){
        return{
            email: "",
            password: "",
        }
    },
    methods:{
        async doLogin(){
            // 2가지 예외 가능성
            // 1) 200번대 상태값 이면서 token이 비어있는 경우
            // 2) 200번대 상태값이 아닌 경우
            try{
                const loginData = {email: this.email, password: this.password,};
                const response = await axios.post("http://localhost:8084/doLogin", loginData);
                const token = response.data.result.token;
                
                if(token){
                    const decoded = jwtDecode(token);
                    const role = decoded.role;

                    localStorage.setItem("token", token);
                    localStorage.setItem("role", role);
                // created 함수는 reload될때 1번만 실행되는 hook함수
                // 그런데m router.push를 통한 화면전환은 reload를 실행시키지 않으므로, created함수 호출이 되지않음
                    // this.$router.push("/");
                    window.location.href = "/";
                }else{
                    console.log("200 OK, but not token");
                    alert("login failed");
                }
            }catch(error){
                const error_message = error.response.data.error_message;
                if(error_message){
                    console.log(error_message);
                    alert(error_message);
                }else{
                    console.log(error);
                    alert("login failed");
                }
                
            }
            
        }
    }

}
</script>

<style lang="scss" scoped>

</style>