/* GENERATED FILE */
<script lang="ts">
export default {
  name: 'ScalarIconPersonSimpleTaiChi',
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
        d="M128,84A36,36,0,1,0,92,48,36,36,0,0,0,128,84Zm0-48a12,12,0,1,1-12,12A12,12,0,0,1,128,36Zm100,72a12,12,0,0,1-12,12H140v16.09L188.73,157A12,12,0,0,1,196,168v48a12,12,0,0,1-24,0V175.91l-41.67-17.86L56,224.92A12,12,0,0,1,40,207.08l76-68.42V120H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,108Z" />
    </g>
    <g v-else-if="weight === 'duotone'">
      <path
        d="M152,48a24,24,0,1,1-24-24A24,24,0,0,1,152,48Z"
        opacity="0.2" />
      <path
        d="M128,80A32,32,0,1,0,96,48,32,32,0,0,0,128,80Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,128,32Zm96,72a8,8,0,0,1-8,8H136v26.72l51.15,21.93A8,8,0,0,1,192,168v48a8,8,0,0,1-16,0V173.28l-46.45-19.91L53.35,222a8,8,0,1,1-10.7-11.9L120,140.44V112H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,104Z" />
    </g>
    <g v-else-if="weight === 'fill'">
      <path
        d="M96,48a32,32,0,1,1,32,32A32,32,0,0,1,96,48ZM216,96H40a8,8,0,0,0,0,16h80v28.44L42.65,210.05A8,8,0,0,0,53.35,222l76.2-68.58L176,173.28V216a8,8,0,0,0,16,0V168a8,8,0,0,0-4.85-7.35L136,138.72V112h80a8,8,0,0,0,0-16Z" />
    </g>
    <g v-else-if="weight === 'light'">
      <path
        d="M128,78A30,30,0,1,0,98,48,30,30,0,0,0,128,78Zm0-48a18,18,0,1,1-18,18A18,18,0,0,1,128,30Zm94,74a6,6,0,0,1-6,6H134v30l52.36,22.45A6,6,0,0,1,190,168v48a6,6,0,0,1-12,0V172L129.16,151,52,220.46a6,6,0,0,1-8-8.92l78-70.21V110H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,104Z" />
    </g>
    <g v-else-if="weight === 'regular'">
      <path
        d="M128,80A32,32,0,1,0,96,48,32,32,0,0,0,128,80Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,128,32Zm96,72a8,8,0,0,1-8,8H136v26.72l51.15,21.93A8,8,0,0,1,192,168v48a8,8,0,0,1-16,0V173.28l-46.45-19.91L53.35,222a8,8,0,1,1-10.7-11.9L120,140.44V112H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,104Z" />
    </g>
    <g v-else-if="weight === 'thin'">
      <path
        d="M128,76a28,28,0,1,0-28-28A28,28,0,0,0,128,76Zm0-48a20,20,0,1,1-20,20A20,20,0,0,1,128,28Zm92,76a4,4,0,0,1-4,4H132v33.36l53.58,23A4,4,0,0,1,188,168v48a4,4,0,0,1-8,0V170.64l-51.22-22L50.68,219A4,4,0,1,1,45.32,213L124,142.22V108H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,104Z" />
    </g>
  </svg>
</template>
