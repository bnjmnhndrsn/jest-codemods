// Dependencies
var _ = require('underscore');
var Marionette = require('backbone.marionette');

// App
var EnterSubmitInput = require('app/common/behaviors/enter-submit-input');

// Fixtures
var fixtures = require('test/utils/fixtures');
var BaseRegionsFixt = require('test/fixtures/base-regions.html');
var EnterSubmitFixt = require('test/fixtures/enter-submit-input.html');


describe('Behaviors', () => {
    describe('EnterSubmitInput', () => {
        var keydownCallback = sinon.spy();
        var keyupCallback = sinon.spy();

        beforeAll(function(){
            fixtures.append(BaseRegionsFixt);
            this.region = new Marionette.Region({
                el: '#main-region'
            });

            this.View = Marionette.ItemView.extend({
                template: _.template(EnterSubmitFixt),
                ui: {
                    'submitButton': '[data-ui="enterSubmitButton"]',
                    'inputField': '[data-ui="enterSubmitInput"]'
                },
                behaviors: {
                    EnterSubmitInput: {
                        keydownCallback: keydownCallback,
                        keyupCallback: keyupCallback,
                        submitButton: '[data-ui="enterSubmitButton"]',
                        targetInput: '[data-ui="enterSubmitInput"]',
                        behaviorClass: EnterSubmitInput
                    }
                }
            });
        });

        beforeEach(() => {
            this.view = new this.View;
            this.region.show(this.view);

            this.keydownEvent = jQuery.Event('keydown', {keyCode: 13});
            this.keyupEvent = jQuery.Event('keyup', {keyCode: 13});
        });

        afterEach(() => {
            this.region.empty();
            keydownCallback.reset();
            keyupCallback.reset();
        });

        afterAll(function(){
            fixtures.cleanup();
        });

        describe('Key Down', () => {
            it('adds active class to submit button on keydown event if keyCode is enter (13)', () => {
                expect(this.view.ui.submitButton.hasClass('active')).toBeFalsy();
                this.view.ui.inputField.trigger(this.keydownEvent);
                expect(this.view.ui.submitButton.hasClass('active')).toBeTruthy();
            });

            it('calls keydownCallback if keydown event keyCode is enter (13)', () => {
                this.view.ui.inputField.trigger(this.keydownEvent);
                expect(keydownCallback.calledOnce).toBeTruthy();
            });

            it('does not fire callback or change submit button class if keyCode is not enter (13)', () => {
                this.view.ui.inputField.trigger(jQuery.Event('keydown', {keyCode: 69}));
                expect(keydownCallback.called).toBeFalsy();
            });
        });

        describe('Key Up', () => {
            it('removes active class to submit button on keyup event if keyCode is enter (13)', () => {
                it('adds active class to submit button on keydown event if keyCode is enter (13)', () => {
                    this.view.ui.submitButton.addClass('active');
                    this.view.ui.inputField.trigger(keyupEvent);
                    expect(this.view.ui.submitButton.hasClass('active')).toBeFalsy();
                });
            });

            it('calls keyupCallback if keyup event keyCode is enter (13)', () => {
                this.view.ui.inputField.trigger(this.keyupEvent);
                expect(keyupCallback.calledOnce).toBeTruthy();
            });

            it('does not fire callback or change submit button class if keyCode is not enter (13)', () => {
                this.view.ui.inputField.trigger(jQuery.Event('keyup', {keyCode: 69}));
                expect(keyupCallback.called).toBeFalsy();
            });
        });
    });
});
