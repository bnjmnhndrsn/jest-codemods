// Dependencies
var _ = require('underscore');
var Marionette = require('backbone.marionette');

// App
var EnterSubmitInput = require('app/common/behaviors/enter-submit-input');

// Fixtures
var fixtures = require('test/utils/fixtures');
var BaseRegionsFixt = require('test/fixtures/base-regions.html');
var EnterSubmitFixt = require('test/fixtures/enter-submit-input.html');


describe('Behaviors', function(){
    describe('EnterSubmitInput', function(){
        var keydownCallback = sinon.spy();
        var keyupCallback = sinon.spy();

        before(function(){
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

        beforeEach(function(){
            this.view = new this.View;
            this.region.show(this.view);

            this.keydownEvent = jQuery.Event('keydown', {keyCode: 13});
            this.keyupEvent = jQuery.Event('keyup', {keyCode: 13});
        });

        afterEach(function(){
            this.region.empty();
            keydownCallback.reset();
            keyupCallback.reset();
        });

        after(function(){
            fixtures.cleanup();
        });

        describe('Key Down', function(){
            it('adds active class to submit button on keydown event if keyCode is enter (13)', function(){
                assert.notOk(this.view.ui.submitButton.hasClass('active'));
                this.view.ui.inputField.trigger(this.keydownEvent);
                assert(this.view.ui.submitButton.hasClass('active'));
            });

            it('calls keydownCallback if keydown event keyCode is enter (13)', function(){
                this.view.ui.inputField.trigger(this.keydownEvent);
                assert(keydownCallback.calledOnce);
            });

            it('does not fire callback or change submit button class if keyCode is not enter (13)', function(){
                this.view.ui.inputField.trigger(jQuery.Event('keydown', {keyCode: 69}));
                assert.notOk(keydownCallback.called);
            });
        });

        describe('Key Up', function(){
            it('removes active class to submit button on keyup event if keyCode is enter (13)', function(){
                it('adds active class to submit button on keydown event if keyCode is enter (13)', function(){
                    this.view.ui.submitButton.addClass('active');
                    this.view.ui.inputField.trigger(keyupEvent);
                    assert.notOk(this.view.ui.submitButton.hasClass('active'));
                });
            });

            it('calls keyupCallback if keyup event keyCode is enter (13)', function(){
                this.view.ui.inputField.trigger(this.keyupEvent);
                assert(keyupCallback.calledOnce);
            });

            it('does not fire callback or change submit button class if keyCode is not enter (13)', function(){
                this.view.ui.inputField.trigger(jQuery.Event('keyup', {keyCode: 69}));
                assert.notOk(keyupCallback.called);
            });
        });
    });
});
