<template>
	<view class="tui-virtual-item" :style="getStyle" @tap="onTap">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "tui-virtual-item",
		emits: ['click'],
		inject: {
			virtuallist: {
				value: "virtuallist",
				default: null
			}
		},
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true
		},
		// #endif
		computed: {
			getStyle() {
				return this.itemHeight ? `height:${this.itemHeight}px;` : ''
			}
		},
		data() {
			return {
				index: 0,
				itemHeight: 0
			};
		},
		created() {
			if (this.virtuallist) {
				this.virtuallist.children.push(this)
				this.itemHeight = this.virtuallist.cellHeight || this.virtuallist.getCellHeight()
			}
		},
		methods: {
			updated(index, height) {
				this.index = index
				this.itemHeight = height
			},
			onTap() {
				this.$emit('click', {})
			}
		}
	}
</script>

<style scoped>
	.tui-virtual-item {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
	}
</style>