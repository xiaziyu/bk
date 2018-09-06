<template>
  <div>
    <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="pending-deliver" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        待发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="我的积分" is-link />
      <van-cell icon="gold-coin" title="我的优惠券" is-link />
      <van-cell icon="gift" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  import { validateEmail } from '@/utils/validate'
  import { getUserInfo } from '@/api/join'
  import headerImg from '@/assets/join/banner.png'

  export default {
    name: 'join',
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      const email = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
      const iphone = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        headerImg : headerImg+'?v=1',
        userForm: {
          user_name: '',
          iphone: '',
          emial: ''
        },
        userRules: {
          user_name: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
          emial: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur'},
            //{ min: 4, max: 4, message: '验证码为4位数'},
            { required: true, trigger: 'blur', validator: email }
          ],
          iphone: [
            { required: true, message: '请输入验证码', trigger: 'blur'},
            { required: true, trigger: 'blur', validator: iphone }
          ]
        },
        loading: false
      }
    },
    created() {
      this.getDate()
    },
    methods: {
      getDate() {
        const data ={name: '', emial: ''}
        getUserInfo(data).then(response => {
          this.userForm = {
            user_name: response.data.name||'',
            iphone: response.data.name||'',
            emial: response.data.emial||''
          }
          console.log(response)
        }).catch(() => {

        })
      }
    }
  };
</script>

<style lang="less">
  .user {
    &-poster {
      width: 7.5rem;
      height: 4rem;
      display: block;
    }

    &-group {
      margin-bottom: .3rem;
    }

    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
</style>
