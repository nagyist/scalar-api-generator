/* GENERATED FILE */
<script lang="ts">
export default {
  name: 'ScalarIconArrowCircleDownRight',
}
</script>
<script lang="ts" setup>
import { useScalarIcon } from '@/hooks'
import type { ScalarIconProps } from '@/types'

const props = defineProps<ScalarIconProps>()

const { bind, weight } = useScalarIcon(props)
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    v-bind="bind">
    <slot />
    <g v-if="weight === 'bold'">
      <path
        d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm44-100v48a12,12,0,0,1-12,12H112a12,12,0,0,1,0-24h19L87.51,104.49a12,12,0,0,1,17-17L148,131V112a12,12,0,0,1,24,0Z" />
    </g>
    <g v-else-if="weight === 'duotone'">
      <path
        d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
        opacity="0.2" />
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-104v48a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h28.69L90.34,101.66a8,8,0,0,1,11.32-11.32L152,140.69V112a8,8,0,0,1,16,0Z" />
    </g>
    <g v-else-if="weight === 'fill'">
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,136a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h28.69L90.34,101.66a8,8,0,0,1,11.32-11.32L152,140.69V112a8,8,0,0,1,16,0Z" />
    </g>
    <g v-else-if="weight === 'light'">
      <path
        d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm38-106v48a6,6,0,0,1-6,6H112a6,6,0,0,1,0-12h33.51L91.76,100.24a6,6,0,0,1,8.48-8.48L154,145.51V112a6,6,0,0,1,12,0Z" />
    </g>
    <g v-else-if="weight === 'regular'">
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-104v48a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h28.69L90.34,101.66a8,8,0,0,1,11.32-11.32L152,140.69V112a8,8,0,0,1,16,0Z" />
    </g>
    <g v-else-if="weight === 'thin'">
      <path
        d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm36-108v48a4,4,0,0,1-4,4H112a4,4,0,0,1,0-8h38.34L93.17,98.83a4,4,0,0,1,5.66-5.66L156,150.34V112a4,4,0,0,1,8,0Z" />
    </g>
  </svg>
</template>
