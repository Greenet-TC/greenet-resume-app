<template>
	<view class="tui-text__wrap"
		:class="[block?'tui-text__block':'tui-text__inline','tui-text__'+align,highlight && !disable?'tui-text__active':'']"
		:style="{textAlign:align,padding:padding}" @tap="handleClick">
		<slot></slot>
		<text class="tui-text__content"
			:style="{color:getColor,fontSize:size+unit,lineHeight:lineHeight?size+unit:'auto',textAlign:align,textDecoration:decoration,fontWeight:fontWeight}"
			:selectable="selectable" :userSelect="userSelect"
			:decode="decode">{{getText(text, textType, format)}}</text>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		name: "tui-text",
		emits: ['click'],
		props: {
			//样式：primary，success， warning，danger，gray，black，white
			type: {
				type: String,
				default: 'black'
			},
			text: {
				type: [Number, String],
				default: ''
			},
			size: {
				type: [Number, String],
				default: 32
			},
			unit: {
				type: String,
				default: 'rpx'
			},
			color: {
				type: String,
				default: ''
			},
			fontWeight: {
				type: [Number, String],
				default: 400
			},
			//left、center、right
			align: {
				type: String,
				default: 'left'
			},
			//none、 underline、line-through 
			decoration: {
				type: String,
				default: 'none'
			},
			lineHeight: {
				type: Boolean,
				default: false
			},
			padding: {
				type: String,
				default: '0'
			},
			block: {
				type: Boolean,
				default: false
			},
			textType: {
				type: String,
				default: 'text'
			},
			format: {
				type: Boolean,
				default: false
			},
			call: {
				type: Boolean,
				default: false
			},
			selectable: {
				type: Boolean,
				default: false
			},
			userSelect: {
				type: Boolean,
				default: false
			},
			decode: {
				type: Boolean,
				default: false
			},
			highlight: {
				type: Boolean,
				default: false
			},
			disable: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getColor() {
				let color = this.color || ''
				if (!color && this.type) {
					color = {
						primary: '#5677fc',
						success: '#07c160',
						warning: '#ff7900',
						danger: '#EB0909',
						gray: '#999',
						black: '#333',
						white:'#fff'
					} [this.type]
				}
				return color
			}
		},
		methods: {
			getText(text, textType, format) {
				let _text = text
				if (format) {
					if (textType === 'mobile') {
						_text = this.getFormatPhoneNo(text)
					} else if (textType === 'amount') {
						_text = this.getFormatMoney(text)
					}
				}
				return _text
			},
			getFormatPhoneNo(num) {
				return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
			},
			getFormatMoney(money) {
				return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,')
					.replace(
						/\,$/, '').split('').reverse().join('');
			},
			handleClick() {
				if (this.disable) return;
				this.$emit('click', {
					text: this.text
				})
				if (this.call) {
					uni.makePhoneCall({
						phoneNumber: this.text
					})
				}
			}
		}
	}
</script>

<style scoped>
	.tui-text__wrap {
		align-items: center;
		flex-direction: row;
	}

	/* #ifdef H5 */
	.tui-text__active {
		cursor: pointer;
	}

	/* #endif */

	.tui-text__active:active {
		opacity: .5;
	}

	/* #ifndef APP-NVUE */
	.tui-text__inline {
		display: inline-flex;
	}

	.tui-text__block {
		display: flex;
	}

	/* #endif */

	.tui-text__center {
		justify-content: center;
	}

	.tui-text__right {
		justify-content: flex-end;
	}
</style>
