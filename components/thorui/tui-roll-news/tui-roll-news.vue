<template>
	<view class="tui-roll-news"
		:style="{background:background,width:!width?'100%':width+'rpx',padding:padding,borderRadius:radius+'rpx'}">
		<view class="tui-notice__shrink" @tap.stop="leftClick">
			<slot></slot>
		</view>
		<swiper :vertical="vertical" :autoplay="true" :circular="true" :interval="interval"
			class="tui-roll__news-swiper" :style="{height:height+'rpx'}">
			<swiper-item v-for="(item,index) in list" :key="index" class="tui-roll__news-item">
				<text class="tui-rollnews__text"
					:style="{color:color,fontSize:size+'rpx',fontWeight:bold?'bold':'',lines:lines,'-webkit-line-clamp':lines}"
					@tap="onClick(index)">{{item[prop] || ''}}</text>
			</swiper-item>
		</swiper>
		<view class="tui-notice__shrink" @tap.stop="rightClick">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tui-roll-news",
		emits: ['click', 'leftClick', 'rightClick'],
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			//list 显示key
			prop: {
				type: String,
				default: 'title'
			},
			width: {
				type: [Number, String],
				default: 0
			},
			//滚动消息高度
			height: {
				type: [Number, String],
				default: 80
			},
			//字体大小 rpx
			size: {
				type: [Number, String],
				default: 28
			},
			color: {
				type: String,
				default: '#333'
			},
			bold: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: [Number, String],
				default: 0
			},
			padding: {
				type: String,
				default: '0 30rpx'
			},
			//内容显示行数，超出隐藏
			lines: {
				type: Number,
				default: 1
			},
			//自动切换时间间隔（毫秒）
			interval: {
				type: Number,
				default: 3000
			},
			//是否纵向滚动切换内容
			vertical: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick(index) {
				const item = this.list[index]
				this.$emit('click', {
					index: index,
					item: item
				})
			},
			leftClick() {
				this.$emit('leftClick', {})
			},
			rightClick() {
				this.$emit('rightClick', {})
			}
		}
	}
</script>

<style scoped>
	.tui-roll-news {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.tui-notice__shrink {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.tui-roll__news-swiper {
		flex: 1;
	}

	.tui-roll__news-item {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		align-items: center;
	}

	.tui-rollnews__text {
		/* #ifndef APP-NVUE */
		display: -webkit-box;
		overflow: hidden;
		word-break: break-all;
		white-space: normal;
		-webkit-box-orient: vertical;
		/* #endif */
		overflow: hidden;
	}
</style>