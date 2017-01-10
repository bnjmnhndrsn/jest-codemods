import React from 'react';
import { shallow } from 'enzyme';
import LayoutPriceRanges from 'app/apps/buildings/components/LayoutPriceRanges';
import ConstantsTestAPI from 'test/utils/constants-test-api';

describe('Buildings', function() {
    describe('LayoutPriceRanges', function() {
        before(function() {
            this.constantsAPI = new ConstantsTestAPI;
        });
        
        after(function() {
            this.constantsAPI.destroy();
        });

        const layoutPriceRanges = [
            {layout: 20, min_price: 1000, max_price: 2000},
            {layout: 10, min_price: 1500, max_price: 2500},
            {layout: 30, min_price: 1500, max_price: 2500},
        ];

        it('renders props.layoutPriceRanges', function() {
            const wrapper = shallow(<LayoutPriceRanges layoutPriceRanges={layoutPriceRanges} />);

            expect(wrapper.find('.layout-price-range').length).toEqual(layoutPriceRanges.length);
            wrapper.setProps({layoutPriceRanges: []});
            expect(wrapper.find('.layout-price-range').length).toEqual(0);
        });

        it('renders props.title if given', function() {
            const title = 'THIS IS A CUSTOM TITLE';
            const wrapper = shallow(<LayoutPriceRanges layoutPriceRanges={layoutPriceRanges} />);

            expect(wrapper.text()).to.not.contain(title);
            wrapper.setProps({ title });
            expect(wrapper.text()).to.contain(title);
        });
    });
});
