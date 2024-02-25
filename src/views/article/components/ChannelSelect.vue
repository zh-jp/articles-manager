<script setup lang="ts">
import { getChannelListService } from '@/api/articleChannel'
import type { Ref } from 'vue'
import { ref } from 'vue'

const channelList: Ref<Record<string, any>[]> = ref([])
const getChannelList = async () => {
  const { data } = await getChannelListService()
  channelList.value = data.data
}
getChannelList()

defineProps({
  cid: {
    type: [String, Number]
  },
  width: {
    type: String,
    default: '160px'
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <!-- 父组件传来的 modelValue 不能使用v-model绑定 -->
  <!-- 通过 emit 向父组件传递事件 $event -->
  <el-select
    :model-value="cid"
    @update:model-value="emit('update:modelValue', $event)"
    placeholder="请选择文章分类"
    :style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>
