import { dayjs } from 'element-plus'

export default function formatTime(time: string) {
  return dayjs(time).format('YYYY-MM-DD')
}
