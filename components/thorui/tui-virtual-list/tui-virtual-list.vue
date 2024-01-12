<template>
	<view class="tui-virtual-list" :style="{background:background}">
		<scroll-view :style="getStyle" class="tui-virtual__scroll-view" :scroll-y="!enablePageScroll"
			:upper-threshold="upperThreshold" :lower-threshold="lowerThreshold" :scroll-top="innerScrollOffset"
			:scroll-with-animation="scrollWithAnimation" :enable-back-to-top="enableBackToTop" @scroll="onScroll"
			@scrolltoupper="onScrollToUpper" @scrolltolower="onScrollToLower">
			<view :style="styles">
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapVirtualToProps,
		getVisibleItemBounds
	} from './index.js'
	export default {
		name: "tui-virtual-list",
		emits: ['change', 'scroll', 'scrolltoupper', 'scrolltolower', 'init'],
		provide() {
			return {
				virtuallist: this
			}
		},
		props: {
			height: {
				type: [Number, String],
				default: 600
			},
			//rpx 或 px
			unit: {
				type: String,
				default: 'rpx'
			},
			background: {
				type: String,
				default: 'transparent'
			},
			enablePageScroll: {
				type: Boolean,
				default: false
			},
			itemHeight: {
				type: [Number, String],
				default: 100
			},
			itemBuffer: {
				type: [Number, String],
				default: 0
			},
			currentIndex: {
				type: [Number, String],
				default: 0
			},
			upperThreshold: {
				type: [Number, String],
				default: 50
			},
			lowerThreshold: {
				type: [Number, String],
				default: 50
			},
			scrollWithAnimation: {
				type: Boolean,
				default: false
			},
			enableBackToTop: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getStyle() {
				let style = ''
				if (!this.enablePageScroll) {
					const height = this.unit === 'rpx' ? this.getPx(this.height || 600) : this.height;
					style += `height:${height}px;`
				}
				return style;
			},
			valueChange() {
				return `${this.enablePageScroll?1:0}_${this.height}_${this.itemHeight}_${this.itemBuffer}`
			}
		},
		watch: {
			itemHeight(newVal) {
				this.updated(newVal)
			},
			valueChange(val) {
				this.scrollHeight = this.unit === 'rpx' ? this.getPx(this.height || 600) : this.height;
				if (this.firstRendered) {
					this.onChange(this.scrollOffset, true)
				}
			},
			currentIndex(newVal) {
				if (this.firstRendered) {
					this.scrollToIndex(Number(newVal))
				}
			}
		},
		created() {
			this.items = []
			this.firstRendered = false
			this.children = []
			this.scrollHeight = this.unit === 'rpx' ? this.getPx(this.height || 600) : this.height;
			this.cellHeight = this.getPx(this.itemHeight);
			this.$emit('init', {
				itemHeight: this.cellHeight
			})
		},
		mounted() {
			this.$nextTick(() => {
				this.getBoundingClientRect()
				this.loadData()
			})
		},
		data() {
			return {
				styles: '',
				offsetTop: undefined,
				// 用于记录滚动条实际位置
				scrollOffset: 0,
				// 用于设置滚动条位置
				innerScrollOffset: 0,
				// 第一个元素的索引值
				startIndex: 0,
				// 最后一个元素的索引值
				endIndex: -1,
				//容器总高度 px
				scrollHeight: 300,
				//item项高度 px
				cellHeight: 50
			};
		},
		methods: {
			getPx(rpx) {
				let px = uni.upx2px(Number(rpx))
				return px % 2 === 0 ? px : px + 1
			},
			getCellHeight() {
				return this.getPx(this.itemHeight)
			},
			/**
			 * 设置子元素的高度
			 * @param {Number} itemHeight 子元素高度
			 */
			updated(itemHeight) {
				this.cellHeight = this.getPx(itemHeight || this.itemHeight);
				const elements = this.children || []
				if (elements.length > 0) {
					elements.forEach((element, index) => {
						element.updated(index, this.cellHeight)
					})
				}
				this.$emit('init', {
					itemHeight: this.cellHeight
				})
			},
			/**
			 * 用于计算虚拟列表数据
			 * @param {Function} callback 设置完成后的回调函数
			 */
			loadData(callback) {
				const {
					cellHeight,
					startIndex,
					endIndex,
					scrollOffset
				} = this
				const options = {
					items: this.items,
					itemHeight: cellHeight,
				}
				const indexes = {
					startIndex,
					endIndex
				}
				const virtual = mapVirtualToProps(options, indexes)
				this.styles = virtual.style
				if (typeof callback === 'function') {
					callback.call(this, {
						items: virtual.items,
						...indexes,
						scrollOffset
					})
				}
			},
			/**
			 * 数据变化时的回调函数
			 * @param {Number} scrollOffset 记录滚动条实际位置
			 * @param {Boolean} scrolled 是否设置滚动条位置
			 * @param {Function} callback 设置完成后的回调函数
			 */
			onChange(scrollOffset, scrolled, callback) {
				// 计算起始点是否发生变化
				const {
					cellHeight,
					scrollHeight,
					itemBuffer,
					startIndex,
					endIndex,
					offsetTop,
					enablePageScroll
				} = this

				const itemCount = Math.max(0, this.items.length - 1)
				const listTop = enablePageScroll ? offsetTop : 0
				const viewTop = scrollOffset - listTop
				const state = getVisibleItemBounds(viewTop, scrollHeight, itemCount, cellHeight, Number(itemBuffer))
				const hasChanged = state.startIndex !== startIndex || state.endIndex !== endIndex

				// 计算起始点是否可视
				const direction = scrollOffset > this.scrollOffset ? 'Down' : 'Up'
				const firstItemVisible = direction === 'Up' && viewTop < startIndex * cellHeight
				const lastItemVisible = direction === 'Down' && viewTop > (endIndex * cellHeight - scrollHeight)

				// 判断起始点大小
				if (state === undefined || state.startIndex > state.endIndex) return

				// 判断起始点是否发生变化及是否可视状态   
				if (hasChanged && (firstItemVisible || lastItemVisible) || scrolled) {
					this.startIndex = state.startIndex
					this.endIndex = state.endIndex
					this.loadData((values) => {
						// scroll into view
						if (scrolled) {
							this.innerScrollOffset = scrollOffset
						}
						// trigger change
						this.$emit('change', {
							...values,
							direction,
							scrollOffset
						})
						// trigger callback
						if (typeof callback === 'function') {
							callback.call(this, {
								...values,
								direction,
								scrollOffset
							})
						}
					})
				}

				// 记录滚动条的位置（仅记录不去设置）
				if (this.scrollOffset != scrollOffset) {
					this.scrollOffset = scrollOffset
				}
			},
			/**
			 * 滚动时触发的事件
			 */
			onScroll(e) {
				this.onChange(e.detail.scrollTop)
				this.$emit('scroll', e.detail)
			},
			/**
			 * 滚动到顶部时触发的事件
			 */
			onScrollToUpper(e) {
				this.$emit('scrolltoupper', e.detail)
			},
			/**
			 * 滚动到底部时触发的事件
			 */
			onScrollToLower(e) {
				this.$emit('scrolltolower', e.detail)
			},
			/**
			 * 根据索引值获取偏移量
			 * @param {Number} index 指定的索引值
			 * @param {Number} itemHeight 子元素高度
			 * @param {Number} itemSize 子元素个数
			 */
			getOffsetForIndex(index, itemHeight, itemSize) {
				itemHeight = itemHeight || this.cellHeight
				itemSize = itemSize || this.items.length
				const realIndex = Math.max(0, Math.min(index, itemSize - 1))
				const scrollOffset = realIndex * itemHeight
				return scrollOffset
			},
			/**
			 * 更新组件
			 * @param {Array} items 实际数据列表，当需要动态加载数据时设置
			 * @param {Function} success 设置完成后的回调函数
			 */
			render(items, success) {
				if (Array.isArray(items)) {
					this.items = items
					this.children = []
				}

				// 首次渲染时滚动至 scrollToIndex 指定的位置
				if (!this.firstRendered) {
					this.firstRendered = true
					this.scrollOffset = this.getOffsetForIndex(this.currentIndex)
				}

				this.getBoundingClientRect(() => this.onChange(this.scrollOffset, true, success))

			},
			/**
			 * 滚动到指定的位置
			 * @param {Number} scrollOffset 指定的位置
			 * @param {Function} success 设置完成后的回调函数
			 */
			scrollTo(scrollOffset, success) {
				if (typeof scrollOffset === 'number') {
					const offset = Math.max(0, Math.min(scrollOffset, this.items.length * this.cellHeight))
					this.onChange(offset, true, success)
				}
			},
			/**
			 * 根据索引值滚动到指定的位置
			 * @param {Number} index 指定元素的索引值
			 * @param {Function} success 设置完成后的回调函数
			 */
			scrollToIndex(index, success) {
				if (typeof index === 'number') {
					this.onChange(this.getOffsetForIndex(index), true, success)
				}
			},
			/**
			 * 获取容器的偏移量
			 * @param {Function} callback 设置完成后的回调函数
			 * @param {Boolean} isForce 是否强制更新
			 */
			getBoundingClientRect(callback, isForce) {
				if (this.offsetTop !== undefined && !isForce && typeof callback === 'function') {
					callback.call(this)
					return
				}
				const className = '.tui-virtual-list'
				uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
					// #endif
					.select(className)
					.boundingClientRect((rect) => {
						if (!rect) return
						this.offsetTop = rect.top
						callback && callback()
					})
					.exec()
			}

		}
	}
</script>

<style scoped>
	.tui-virtual-list {
		position: relative;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: block;
		overflow: auto;
		height: auto;
		/* #endif */
	}

	.tui-virtual__scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
</style>