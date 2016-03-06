import * as b from 'bobril';
import { createDatePicker } from './components/datepicker';

let page = b.createComponent({
	render(ctx: b.IBobrilCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
		me.children = [
			{ tag: 'h1', children: 'DatePicker component' },
			createDatePicker({ date: new Date(), show: false })
		];
	}
});

b.routes(
	b.route({ handler: page })
);
