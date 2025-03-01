
define([
    'jquery',
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/model/sidebar'
], function ($, Component, quote, stepNavigator, sidebarModel) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Trunkrs_Carrier/shipping-information'
        },

        /**
         * @return {Boolean}
         */
        isVisible: function () {
            return !quote.isVirtual() && stepNavigator.isProcessed('shipping');
        },

        /**
         * @return {String}
         */
        getShippingMethodTitle: function () {
            var shippingMethod = quote.shippingMethod();

            return shippingMethod ? shippingMethod['carrier_title'] + ' - ' + shippingMethod['method_title'] : '';
        },
        /**
         * @return {String}
         */
        getTrunkrsDeliveryTimeslot: function () {
            var trunkrs_delivery_time = null;
            var shippingMethod = quote.shippingMethod().method_code+'_'+quote.shippingMethod().carrier_code;
            if(shippingMethod === "trunkrsShipping_trunkrsShipping") {
                trunkrs_delivery_time = jQuery('[name="trunkrs_shipping_field[trunkrs_delivery_time]"]').val();

            }
            return trunkrs_delivery_time ? trunkrs_delivery_time : '';
        },

        /**
         * Back step.
         */
        back: function () {
            sidebarModel.hide();
            stepNavigator.navigateTo('shipping');
        },

        /**
         * Back to shipping method.
         */
        backToShippingMethod: function () {
            sidebarModel.hide();
            stepNavigator.navigateTo('shipping', 'opc-shipping_method');
        }
    });
});
