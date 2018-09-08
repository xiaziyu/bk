<template>
  <div id="user-auth">
    <load-more tip="处理中..."></load-more>
  </div>
</template>

<script>
  import {LoadMore} from 'vux'
  import {getStore,setLoginInfo} from  '../../util/util'
  import {mapMutations, mapGetters} from 'vuex'
  import {fetchUserVerify, API_STATUS, fetchUserInfo} from '../../store/api'
  import store from '../../store/index'

  export default {
    destroyed(){
      this.header({isShowheader: true});
    },
    components: {
      LoadMore
    },
    mounted(){
      this.$nextTick(function () {
        //判断是否 有last
        //判断是不是success 如果是的话 需要 跟新 localstorage 并且
        if(this.$route.params.type=='success')
        {
          fetchUserVerify({type:1,state:1}).then((data)=>{
            if (data.status == API_STATUS.SUCCESS) {
                fetchUserInfo()
                .then((data) => {
                  if (data.status == API_STATUS.SUCCESS) {
                    setLoginInfo(data.data);
                  }
                });
            }else{
                this.$vux.toast.show({
                  text: data.message,
                  type:'text'
                });

            }
          })

        }

        this.$router.push({name: 'usercenter'});

//        let lastlogin = getStore('lastlogin');
//        if (lastlogin) {
//          this.$router.push(lastlogin);
//        }else{
//        }
      });
    },
    created(){



      this.header({isShowheader: false});
    },
    computed: {
      ...mapGetters({
        getUserInfo: 'GET_LOGININFO'
      })
    },
    methods: {
      ...mapMutations({
        header: 'updateHeaderStatus'
      })

    }
  }
</script>
