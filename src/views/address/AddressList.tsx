import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { AddressList, NavBar, Toast } from "vant";
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

export default {
  setup() {
    const router = useRouter()
    const chosenAddressId = ref('1')
    const localAddress = getLocalStorage('addressList')

    const list = reactive(localAddress || [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ])

    if (!localAddress) setLocalStorage('addressList', list)

    const onAdd = () => {
      router.push('/address/edit')
    }
    const onEdit = (item: any, index: string) => {
      Toast('编辑地址:' + index);
    }

    const onClickLeft = () => {
      router.back()
    }

    const onClickRight = () => {
      router.push('/todoList')
    }

    return () => {
      return (
        <div style="background:#f7f8fa">
          <NavBar
            title="地址管理"
            left-text="返回"
            right-text="Todo"
            left-arrow
            onClick-left={onClickLeft}
            onClick-right={onClickRight}
          />
          <AddressList
            v-model={chosenAddressId.value}
            list={list}
            defaultTagText="默认"
            onAdd={onAdd}
            onEdit={onEdit}
          />
        </div >
      );
    };
  }
};