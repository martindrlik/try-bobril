import * as b from 'bobril';

export interface IData {
	value?: Date;
	onChange(value: Date);
	style?: b.IBobrilStyle;
}

interface ICtx extends b.IBobrilCtx {
	data: IData;
	show: boolean;
}

export default b.createVirtualComponent<IData>({
	render(ctx: ICtx, me: b.IBobrilNode) {
		let v = ctx.data.value;
		if (!v)
			v = new Date();
		var cancel: () => void = () => {
			ctx.show = false;
			b.invalidate(ctx);
		};
		var advance = (year: number, month: number, day: number): void => {
			var y = v.getFullYear();
			var m = v.getMonth();
			var d = v.getDate();
			ctx.data.value = new Date(y+year, m+month, d+day);
			b.invalidate(ctx);
		};
		var month = (): string => {
			switch (v.getMonth()) {
			case 0: return 'January';
			case 1: return 'February';
			case 2: return 'March';
			case 3: return 'April';
			case 4: return 'May';
			case 5: return 'June';
			case 6: return 'July';
			case 7: return 'August';
			case 8: return 'September';
			case 9: return 'October';
			case 10: return 'November';
			default: return 'December';
			}
		};
		var day = (): string => {
			switch (v.getDay()) {
			case 0: return v.getDate() + ' Sunday';
			case 1: return v.getDate() + ' Monday';
			case 2: return v.getDate() + ' Tuesday';
			case 3: return v.getDate() + ' Wednesday';
			case 4: return v.getDate() + ' Thursday';
			case 5: return v.getDate() + ' Friday';
			default: return v.getDate() + ' Saturday';
			}
		};
		me.children = [
			{
				tag: 'button',
				children: v.toDateString()
			},
			{
				tag: 'div',
				style: {
					background: 'rgba(255,255,255,0.8)',
					display: ctx.show ? 'block' : 'none',
					height: window.innerHeight,
					left: 0,
					position: 'fixed',
					top: 0,
					width: '100%'
				}
			},
			{
				tag: 'div',
				style: {
					background: '#fff',
					border: '1px solid #abc',
					display: ctx.show ? 'block' : 'none',
					left: '50%',
					margin: '0 0 0 -125px',
					padding: 6,
					position: 'fixed',
					top: 50,
					width: 250
				},
				children: [
					{
						tag: 'button',
						style: {
							cssFloat: 'right'
						},
						children: 'Done',
						component: {
							onClick: (ctx: ICtx): boolean => {
								cancel();
								return true;
							}
						}
					},
					{
						tag: 'div',
						style: {
							clear: 'right',
							padding: 5
						},
						children: [
							{
								tag: 'button',
								children: '<',
								component: {
									onClick: (): boolean => {
										advance(-1, 0, 0);
										return true;
									}
								}
							},
							{
								tag: 'button',
								children: '>',
								component: {
									onClick: (): boolean => {
										advance(1, 0, 0);
										return true;
									}
								}
							},
							{ tag: 'h3', children: v.getFullYear().toString() }
						]
					},
					{
						tag: 'div',
						style: {
							padding: 5
						},
						children: [
							{
								tag: 'button',
								children: '<',
								component: {
									onClick: (): boolean => {
										advance(0, -1, 0);
										return true;
									}
								}
							},
							{
								tag: 'button',
								children: '>',
								component: {
									onClick: (): boolean => {
										advance(0, 1, 0);
										return true;
									}
								}
							},
							{ tag: 'h3', children: month() }
						]
					},
					{
						tag: 'div',
						style: {
							padding: 5
						},
						children: [
							{
								tag: 'button',
								children: '<',
								component: {
									onClick: (): boolean => {
										advance(0, 0, -1);
										return true;
									}
								}
							},
							{
								tag: 'button',
								children: '>',
								component: {
									onClick: (): boolean => {
										advance(0, 0, 1);
										return true;
									}
								}
							},
							{ tag: 'h3', children: day() }
						]
					}
				]
			}
		];
		b.style(me, ctx.data.style);
	},
	onClick(ctx: ICtx): boolean {
		ctx.show = true;
		b.invalidate(ctx);
		return false;
	}
});
