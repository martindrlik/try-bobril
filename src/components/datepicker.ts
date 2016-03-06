import * as b from 'bobril';

interface IData {
	date: Date;
	show: boolean;
}

interface IDataCtx extends b.IBobrilCtx {
	data: IData;
}

export let createDatePicker = b.createComponent<IData>({
	render(ctx: IDataCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.tag = 'div';
		me.children = [
			createDisplay({
				date: ctx.data.date,
				onClick: () => { ctx.data.show = true; b.invalidate(ctx) }
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
			}
		];
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
