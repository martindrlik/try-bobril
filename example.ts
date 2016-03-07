import * as b from 'bobril';
import DatePicker from './index';

b.init(() => {
	return b.styledDiv(
		DatePicker({ onChange: (value) => alert(value.toDateString()) }),
		{ padding: 10 });
});
