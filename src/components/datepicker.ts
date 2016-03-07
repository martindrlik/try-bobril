import * as b from 'bobril';

interface IDatePickerData {
	date: Date;
	show: boolean;
}

interface IDatePickerCtx extends b.IBobrilCtx {
	data: IDatePickerData;
}

export let createDatePicker = b.createComponent<IDatePickerData>({
	render(ctx: IDatePickerCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		if (!ctx.data.date)
			ctx.data.date = new Date();
		me.children = [
			createDisplay({
				date: ctx.data.date,
				onClick: () => {
					ctx.data.show = true;
					b.invalidate(ctx);
				}
			}),
			{
				tag: 'div',
				style: {
					background: '#fff',
					display: ctx.data.show ? 'block' : 'none',
					height: window.innerHeight,
					left: 0,
					opacity: 0.8,
					position: 'fixed',
					top: 0,
					width: '100%'
				}
			},
			createPopup(ctx.data)
		];
	}
});

let createPopup = b.createComponent<IDatePickerData>({
	render(ctx: IDatePickerCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			background: '#fff',
			border: '1px solid #abc',
			display: ctx.data.show ? 'block' : 'none',
			height: 150,
			left: '50%',
			margin: '0 0 0 -125px',
			position: 'fixed',
			top: 25,
			width: 250
		};
		me.children = [
			createYear({ num: ctx.data.date.getFullYear() }),
			createMonth({ num: ctx.data.date.getMonth() }),
			createDay({ num: ctx.data.date.getDate() }),

			{
				tag: 'h3',
				style: {
					padding: 10
				},
				children: [
					createLeft({
						text: 'FORGET',
						onClick: () => {
							ctx.data.show = false;
							b.invalidate();
						}
					}),
					createRight({
						text: 'SET',
						onClick: () => {
							ctx.data.show = false;
							b.invalidate();
						}
					})
				]
			}
		];
	}
});

interface INumData {
	num: number;
}

interface INumCtx extends b.IBobrilCtx {
	data: INumData;
}

let createYear = b.createComponent<INumData>({
	render(ctx: INumCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			padding: 10,
			textAlign: 'center'
		};
		// Seems like no need to validate year.
		me.children = [
			createLeft({
				text: 'Back',
				onClick: () => {
					ctx.data.num--;
					b.invalidate(ctx);
				}
			}),
			{ tag: 'b', children: ctx.data.num.toString() },
			createRight({
				text: 'Next',
				onClick: () => {
					ctx.data.num++;
					b.invalidate(ctx);
				}
			})
		];
	}
});

let createMonth = b.createComponent<INumData>({
	render(ctx: INumCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			padding: 10,
			textAlign: 'center'
		};
		if (ctx.data.num < 0)
			ctx.data.num = 11;
		if (ctx.data.num > 11)
			ctx.data.num = 0;
		let month = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		me.children = [
			createLeft({
				text: 'Back',
				onClick: () => {
					ctx.data.num--;
					b.invalidate(ctx);
				}
			}),
			{ tag: 'b', children: month[ctx.data.num] },
			createRight({
				text: 'Next',
				onClick: () => {
					ctx.data.num++;
					b.invalidate(ctx);
				}
			})
		];
	}
});

let createDay = b.createComponent<INumData>({
	render(ctx: INumCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			padding: 10,
			textAlign: 'center'
		};
		if (ctx.data.num < 0)
			ctx.data.num = 11;
		if (ctx.data.num > 11)
			ctx.data.num = 0;
		let day = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		me.children = [
			createLeft({
				text: 'Back',
				onClick: () => {
					ctx.data.num--;
					b.invalidate(ctx);
				}
			}),
			{ tag: 'b', children: day[ctx.data.num] },
			createRight({
				text: 'Next',
				onClick: () => {
					ctx.data.num++;
					b.invalidate(ctx);
				}
			})
		];
	}
});

interface IGoData {
	text: string;
	onClick: () => void;
}

interface IGoCtx extends b.IBobrilCtx {
	data: IGoData;
}

let createLeft = b.createComponent<IGoData>({
	render(ctx: IGoCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			cursor: 'pointer',
			display: 'inline-block',
			cssFloat: 'left'
		};
		me.children = ctx.data.text;
	},
	onClick(ctx: IGoCtx, ev: b.IBobrilMouseEvent): boolean {
		ctx.data.onClick();
		return true;
	}
});

let createRight = b.createComponent<IGoData>({
	render(ctx: IGoCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			cursor: 'pointer',
			display: 'inline-block',
			cssFloat: 'right'
		};
		me.children = ctx.data.text;
	},
	onClick(ctx: IGoCtx, ev: b.IBobrilMouseEvent): boolean {
		ctx.data.onClick();
		return true;
	}
});

interface IDisplayData {
	date: Date;
	onClick: () => void;
}

interface IDisplayCtx extends b.IBobrilCtx {
	data: IDisplayData;
}

let createDisplay = b.createComponent<IDisplayData>({
	render(ctx: IDisplayCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.style = {
			cursor: 'pointer',
			display: 'inline-block',
			padding: 6
		};
		if (!ctx.data.date)
			ctx.data.date = new Date();
		me.children = ctx.data.date.toDateString();
	},
	onClick(ctx: IDisplayCtx, ev: b.IBobrilMouseEvent): boolean {
		ctx.data.onClick();
		return true;
	}
});
