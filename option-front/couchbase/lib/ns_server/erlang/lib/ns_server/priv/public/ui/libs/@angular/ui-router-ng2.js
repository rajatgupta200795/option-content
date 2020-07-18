/**
 * State-based routing for Angular
 * @version v2.0.1
 * @link https://ui-router.github.io/angular
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@uirouter/core'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/router'), require('@uirouter/rx')) :
    typeof define === 'function' && define.amd ? define(['exports', '@uirouter/core', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/router', '@uirouter/rx'], factory) :
    (factory((global['@uirouter/angular'] = {}),global['@uirouter/core'],global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng.router,global['@uirouter/rx']));
}(this, (function (exports,core,core$1,rxjs,operators,common,router,rx) { 'use strict';

    /**
     * This is a [[StateBuilder.builder]] function for Angular `views`.
     *
     * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
     * handles the `views` property with logic specific to @uirouter/angular.
     *
     * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object and
     * applies the state-level configuration to a view named `$default`.
     */
    function ng2ViewsBuilder(state) {
        var views = {}, viewsObject = state.views || { $default: core.pick(state, ['component', 'bindings']) };
        core.forEach(viewsObject, function (config, name) {
            name = name || '$default'; // Account for views: { "": { template... } }
            if (core.isFunction(config))
                config = { component: config };
            if (Object.keys(config).length === 0)
                return;
            config.$type = 'ng2';
            config.$context = state;
            config.$name = name;
            var normalized = core.ViewService.normalizeUIViewTarget(config.$context, config.$name);
            config.$uiViewName = normalized.uiViewName;
            config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
            views[name] = config;
        });
        return views;
    }
    var id = 0;
    var Ng2ViewConfig = /** @class */ (function () {
        function Ng2ViewConfig(path, viewDecl) {
            this.path = path;
            this.viewDecl = viewDecl;
            this.$id = id++;
            this.loaded = true;
        }
        Ng2ViewConfig.prototype.load = function () {
            return core.services.$q.when(this);
        };
        return Ng2ViewConfig;
    }());

    /**
     * Merge two injectors
     *
     * This class implements the Injector ng2 interface but delegates
     * to the Injectors provided in the constructor.
     */
    var MergeInjector = /** @class */ (function () {
        function MergeInjector() {
            var injectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injectors[_i] = arguments[_i];
            }
            if (injectors.length < 2)
                throw new Error('pass at least two injectors');
            this.injectors = injectors;
        }
        /**
         * Get the token from the first injector which contains it.
         *
         * Delegates to the first Injector.get().
         * If not found, then delegates to the second Injector (and so forth).
         * If no Injector contains the token, return the `notFoundValue`, or throw.
         *
         * @param token the DI token
         * @param notFoundValue the value to return if none of the Injectors contains the token.
         * @returns {any} the DI value
         */
        /**
           * Get the token from the first injector which contains it.
           *
           * Delegates to the first Injector.get().
           * If not found, then delegates to the second Injector (and so forth).
           * If no Injector contains the token, return the `notFoundValue`, or throw.
           *
           * @param token the DI token
           * @param notFoundValue the value to return if none of the Injectors contains the token.
           * @returns {any} the DI value
           */
        MergeInjector.prototype.get = /**
           * Get the token from the first injector which contains it.
           *
           * Delegates to the first Injector.get().
           * If not found, then delegates to the second Injector (and so forth).
           * If no Injector contains the token, return the `notFoundValue`, or throw.
           *
           * @param token the DI token
           * @param notFoundValue the value to return if none of the Injectors contains the token.
           * @returns {any} the DI value
           */
        function (token, notFoundValue) {
            for (var i = 0; i < this.injectors.length; i++) {
                var val = this.injectors[i].get(token, MergeInjector.NOT_FOUND);
                if (val !== MergeInjector.NOT_FOUND)
                    return val;
            }
            if (arguments.length >= 2)
                return notFoundValue;
            // This will throw the DI Injector error
            this.injectors[0].get(token);
        };
        MergeInjector.NOT_FOUND = {};
        return MergeInjector;
    }());

    /** @hidden */
    var id$1 = 0;
    /**
     * Given a component class, gets the inputs of styles:
     *
     * - @Input('foo') _foo
     * - `inputs: ['foo']`
     *
     * @internalapi
     */
    var ng2ComponentInputs = function (factory) {
        return factory.inputs.map(function (input) { return ({ prop: input.propName, token: input.templateName }); });
    };
    var ɵ0 = ng2ComponentInputs;
    /**
     * A UI-Router viewport directive, which is filled in by a view (component) on a state.
     *
     * ### Selector
     *
     * A `ui-view` directive can be created as an element: `<ui-view></ui-view>` or as an attribute: `<div ui-view></div>`.
     *
     * ### Purpose
     *
     * This directive is used in a Component template (or as the root component) to create a viewport.  The viewport
     * is filled in by a view (as defined by a [[Ng2ViewDeclaration]] inside a [[Ng2StateDeclaration]]) when the view's
     * state has been activated.
     *
     * #### Example:
     * ```js
     * // This app has two states, 'foo' and 'bar'
     * stateRegistry.register({ name: 'foo', url: '/foo', component: FooComponent });
     * stateRegistry.register({ name: 'bar', url: '/bar', component: BarComponent });
     * ```
     * ```html
     * <!-- This ui-view will be filled in by the foo state's component or
     *      the bar state's component when the foo or bar state is activated -->
     * <ui-view></ui-view>
     * ```
     *
     * ### Named ui-views
     *
     * A `ui-view` may optionally be given a name via the attribute value: `<div ui-view='header'></div>`.  *Note:
     * an unnamed `ui-view` is internally named `$default`*.   When a `ui-view` has a name, it will be filled in
     * by a matching named view.
     *
     * #### Example:
     * ```js
     * stateRegistry.register({
     *   name: 'foo',
     *   url: '/foo',
     *   views: { header: HeaderComponent, $default: FooComponent });
     * ```
     * ```html
     * <!-- When 'foo' state is active, filled by HeaderComponent -->
     * <div ui-view="header"></div>
     *
     * <!-- When 'foo' state is active, filled by FooComponent -->
     * <ui-view></ui-view>
     * ```
     */
    var UIView = /** @class */ (function () {
        function UIView(router$$1, parent, viewContainerRef) {
            this.router = router$$1;
            this.viewContainerRef = viewContainerRef;
            /** Data about the this UIView */
            this._uiViewData = {};
            this._parent = parent;
        }
        Object.defineProperty(UIView.prototype, "_name", {
            set: function (val) {
                this.name = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIView.prototype, "state", {
            /**
             * @returns the UI-Router `state` that is filling this uiView, or `undefined`.
             */
            get: /**
               * @returns the UI-Router `state` that is filling this uiView, or `undefined`.
               */
            function () {
                return core.parse('_uiViewData.config.viewDecl.$context.self')(this);
            },
            enumerable: true,
            configurable: true
        });
        UIView.prototype.ngOnInit = function () {
            var _this = this;
            var router$$1 = this.router;
            var parentFqn = this._parent.fqn;
            var name = this.name || '$default';
            this._uiViewData = {
                $type: 'ng2',
                id: id$1++,
                name: name,
                fqn: parentFqn ? parentFqn + '.' + name : name,
                creationContext: this._parent.context,
                configUpdated: this._viewConfigUpdated.bind(this),
                config: undefined,
            };
            this._deregisterUiCanExitHook = router$$1.transitionService.onBefore({}, function (trans) {
                return _this._invokeUiCanExitHook(trans);
            });
            this._deregisterUiOnParamsChangedHook = router$$1.transitionService.onSuccess({}, function (trans) {
                return _this._invokeUiOnParamsChangedHook(trans);
            });
            this._deregisterUIView = router$$1.viewService.registerUIView(this._uiViewData);
        };
        /**
         * For each transition, checks the component loaded in the ui-view for:
         *
         * - has a uiCanExit() component hook
         * - is being exited
         *
         * If both are true, adds the uiCanExit component function as a hook to that singular Transition.
         */
        /**
           * For each transition, checks the component loaded in the ui-view for:
           *
           * - has a uiCanExit() component hook
           * - is being exited
           *
           * If both are true, adds the uiCanExit component function as a hook to that singular Transition.
           */
        UIView.prototype._invokeUiCanExitHook = /**
           * For each transition, checks the component loaded in the ui-view for:
           *
           * - has a uiCanExit() component hook
           * - is being exited
           *
           * If both are true, adds the uiCanExit component function as a hook to that singular Transition.
           */
        function (trans) {
            var instance = this._componentRef && this._componentRef.instance;
            var uiCanExitFn = instance && instance.uiCanExit;
            if (core.isFunction(uiCanExitFn)) {
                var state = this.state;
                if (trans.exiting().indexOf(state) !== -1) {
                    trans.onStart({}, function () {
                        return uiCanExitFn.call(instance, trans);
                    });
                }
            }
        };
        /**
         * For each transition, checks if any param values changed and notify component
         */
        /**
           * For each transition, checks if any param values changed and notify component
           */
        UIView.prototype._invokeUiOnParamsChangedHook = /**
           * For each transition, checks if any param values changed and notify component
           */
        function ($transition$) {
            var instance = this._componentRef && this._componentRef.instance;
            var uiOnParamsChanged = instance && instance.uiOnParamsChanged;
            if (core.isFunction(uiOnParamsChanged)) {
                var viewState = this.state;
                var resolveContext = new core.ResolveContext(this._uiViewData.config.path);
                var viewCreationTrans = resolveContext.getResolvable('$transition$').data;
                // Exit early if the $transition$ is the same as the view was created within.
                // Exit early if the $transition$ will exit the state the view is for.
                if ($transition$ === viewCreationTrans || $transition$.exiting().indexOf(viewState) !== -1)
                    return;
                var toParams_1 = $transition$.params('to');
                var fromParams_1 = $transition$.params('from');
                var getNodeSchema = function (node) { return node.paramSchema; };
                var toSchema = $transition$
                    .treeChanges('to')
                    .map(getNodeSchema)
                    .reduce(core.unnestR, []);
                var fromSchema_1 = $transition$
                    .treeChanges('from')
                    .map(getNodeSchema)
                    .reduce(core.unnestR, []);
                // Find the to params that have different values than the from params
                var changedToParams = toSchema.filter(function (param) {
                    var idx = fromSchema_1.indexOf(param);
                    return idx === -1 || !fromSchema_1[idx].type.equals(toParams_1[param.id], fromParams_1[param.id]);
                });
                // Only trigger callback if a to param has changed or is new
                if (changedToParams.length) {
                    var changedKeys_1 = changedToParams.map(function (x) { return x.id; });
                    // Filter the params to only changed/new to params.  `$transition$.params()` may be used to get all params.
                    var newValues = core.filter(toParams_1, function (val, key) { return changedKeys_1.indexOf(key) !== -1; });
                    instance.uiOnParamsChanged(newValues, $transition$);
                }
            }
        };
        UIView.prototype._disposeLast = function () {
            if (this._componentRef)
                this._componentRef.destroy();
            this._componentRef = null;
        };
        UIView.prototype.ngOnDestroy = function () {
            if (this._deregisterUIView)
                this._deregisterUIView();
            if (this._deregisterUiCanExitHook)
                this._deregisterUiCanExitHook();
            if (this._deregisterUiOnParamsChangedHook)
                this._deregisterUiOnParamsChangedHook();
            this._deregisterUIView = this._deregisterUiCanExitHook = this._deregisterUiOnParamsChangedHook = null;
            this._disposeLast();
        };
        /**
         * The view service is informing us of an updated ViewConfig
         * (usually because a transition activated some state and its views)
         */
        /**
           * The view service is informing us of an updated ViewConfig
           * (usually because a transition activated some state and its views)
           */
        UIView.prototype._viewConfigUpdated = /**
           * The view service is informing us of an updated ViewConfig
           * (usually because a transition activated some state and its views)
           */
        function (config) {
            // The config may be undefined if there is nothing currently targeting this UIView.
            // Dispose the current component, if there is one
            if (!config)
                return this._disposeLast();
            // Only care about Ng2 configs
            if (!(config instanceof Ng2ViewConfig))
                return;
            // The "new" viewconfig is already applied, so exit early
            if (this._uiViewData.config === config)
                return;
            // This is a new ViewConfig.  Dispose the previous component
            this._disposeLast();
            core.trace.traceUIViewConfigUpdated(this._uiViewData, config && config.viewDecl.$context);
            this._applyUpdatedConfig(config);
            // Initiate change detection for the newly created component
            this._componentRef.changeDetectorRef.markForCheck();
        };
        UIView.prototype._applyUpdatedConfig = function (config) {
            this._uiViewData.config = config;
            // Create the Injector for the routed component
            var context = new core.ResolveContext(config.path);
            var componentInjector = this._getComponentInjector(context);
            // Get the component class from the view declaration. TODO: allow promises?
            var componentClass = config.viewDecl.component;
            // Create the component
            var compFactoryResolver = componentInjector.get(core$1.ComponentFactoryResolver);
            var compFactory = compFactoryResolver.resolveComponentFactory(componentClass);
            this._componentRef = this._componentTarget.createComponent(compFactory, undefined, componentInjector);
            // Wire resolves to @Input()s
            this._applyInputBindings(compFactory, this._componentRef.instance, context, componentClass);
        };
        /**
         * Creates a new Injector for a routed component.
         *
         * Adds resolve values to the Injector
         * Adds providers from the NgModule for the state
         * Adds providers from the parent Component in the component tree
         * Adds a PARENT_INJECT view context object
         *
         * @returns an Injector
         */
        /**
           * Creates a new Injector for a routed component.
           *
           * Adds resolve values to the Injector
           * Adds providers from the NgModule for the state
           * Adds providers from the parent Component in the component tree
           * Adds a PARENT_INJECT view context object
           *
           * @returns an Injector
           */
        UIView.prototype._getComponentInjector = /**
           * Creates a new Injector for a routed component.
           *
           * Adds resolve values to the Injector
           * Adds providers from the NgModule for the state
           * Adds providers from the parent Component in the component tree
           * Adds a PARENT_INJECT view context object
           *
           * @returns an Injector
           */
        function (context) {
            // Map resolves to "useValue: providers"
            var resolvables = context
                .getTokens()
                .map(function (token) { return context.getResolvable(token); })
                .filter(function (r) { return r.resolved; });
            var newProviders = resolvables.map(function (r) { return ({ provide: r.token, useValue: context.injector().get(r.token) }); });
            var parentInject = { context: this._uiViewData.config.viewDecl.$context, fqn: this._uiViewData.fqn };
            newProviders.push({ provide: UIView.PARENT_INJECT, useValue: parentInject });
            var parentComponentInjector = this.viewContainerRef.injector;
            var moduleInjector = context.getResolvable(core.NATIVE_INJECTOR_TOKEN).data;
            var mergedParentInjector = new MergeInjector(moduleInjector, parentComponentInjector);
            return core$1.ReflectiveInjector.resolveAndCreate(newProviders, mergedParentInjector);
        };
        /**
         * Supplies component inputs with resolve data
         *
         * Finds component inputs which match resolves (by name) and sets the input value
         * to the resolve data.
         */
        /**
           * Supplies component inputs with resolve data
           *
           * Finds component inputs which match resolves (by name) and sets the input value
           * to the resolve data.
           */
        UIView.prototype._applyInputBindings = /**
           * Supplies component inputs with resolve data
           *
           * Finds component inputs which match resolves (by name) and sets the input value
           * to the resolve data.
           */
        function (factory, component, context, componentClass) {
            var bindings = this._uiViewData.config.viewDecl['bindings'] || {};
            var explicitBoundProps = Object.keys(bindings);
            // Returns the actual component property for a renamed an input renamed using `@Input('foo') _foo`.
            // return the `_foo` property
            var renamedInputProp = function (prop) {
                var input = factory.inputs.find(function (i) { return i.templateName === prop; });
                return (input && input.propName) || prop;
            };
            // Supply resolve data to component as specified in the state's `bindings: {}`
            var explicitInputTuples = explicitBoundProps.reduce(function (acc, key) { return acc.concat([{ prop: renamedInputProp(key), token: bindings[key] }]); }, []);
            // Supply resolve data to matching @Input('prop') or inputs: ['prop']
            var implicitInputTuples = ng2ComponentInputs(factory).filter(function (tuple) { return !core.inArray(explicitBoundProps, tuple.prop); });
            var addResolvable = function (tuple) {
                return ({
                    prop: tuple.prop,
                    resolvable: context.getResolvable(tuple.token),
                });
            };
            var injector = context.injector();
            explicitInputTuples
                .concat(implicitInputTuples)
                .map(addResolvable)
                .filter(function (tuple) { return tuple.resolvable && tuple.resolvable.resolved; })
                .forEach(function (tuple) {
                component[tuple.prop] = injector.get(tuple.resolvable.token);
            });
        };
        UIView.PARENT_INJECT = 'UIView.PARENT_INJECT';
        UIView.decorators = [
            { type: core$1.Component, args: [{
                        selector: 'ui-view, [ui-view]',
                        exportAs: 'uiView',
                        template: "\n    <ng-template #componentTarget></ng-template>\n    <ng-content *ngIf=\"!_componentRef\"></ng-content>\n  ",
                    },] },
        ];
        /** @nocollapse */
        UIView.ctorParameters = function () { return [
            { type: core.UIRouter, },
            { type: undefined, decorators: [{ type: core$1.Inject, args: [UIView.PARENT_INJECT,] },] },
            { type: core$1.ViewContainerRef, },
        ]; };
        UIView.propDecorators = {
            "_componentTarget": [{ type: core$1.ViewChild, args: ['componentTarget', { read: core$1.ViewContainerRef },] },],
            "name": [{ type: core$1.Input, args: ['name',] },],
            "_name": [{ type: core$1.Input, args: ['ui-view',] },],
        };
        return UIView;
    }());

    function applyModuleConfig(uiRouter, injector, module) {
        if (module === void 0) { module = {}; }
        if (core.isFunction(module.config)) {
            module.config(uiRouter, injector, module);
        }
        var states = module.states || [];
        return states.map(function (state) { return uiRouter.stateRegistry.register(state); });
    }
    function applyRootModuleConfig(uiRouter, injector, module) {
        core.isDefined(module.deferIntercept) && uiRouter.urlService.deferIntercept(module.deferIntercept);
        core.isDefined(module.otherwise) && uiRouter.urlService.rules.otherwise(module.otherwise);
        core.isDefined(module.initial) && uiRouter.urlService.rules.initial(module.initial);
    }

    /**
     * @internalapi
     * # blah blah blah
     */
    var AnchorUISref = /** @class */ (function () {
        function AnchorUISref(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
        }
        AnchorUISref.prototype.openInNewTab = function () {
            return this._el.nativeElement.target === '_blank';
        };
        AnchorUISref.prototype.update = function (href) {
            if (href && href !== '') {
                this._renderer.setProperty(this._el.nativeElement, 'href', href);
            }
            else {
                this._renderer.removeAttribute(this._el.nativeElement, 'href');
            }
        };
        AnchorUISref.decorators = [
            { type: core$1.Directive, args: [{ selector: 'a[uiSref]' },] },
        ];
        /** @nocollapse */
        AnchorUISref.ctorParameters = function () { return [
            { type: core$1.ElementRef, },
            { type: core$1.Renderer2, },
        ]; };
        return AnchorUISref;
    }());
    /**
     * A directive when clicked, initiates a [[Transition]] to a [[TargetState]].
     *
     * ### Purpose
     *
     * This directive is applied to anchor tags (`<a>`) or any other clickable element.  It is a state reference (or sref --
     * similar to an href).  When clicked, the directive will transition to that state by calling [[StateService.go]],
     * and optionally supply state parameter values and transition options.
     *
     * When this directive is on an anchor tag, it will also add an `href` attribute to the anchor.
     *
     * ### Selector
     *
     * - `[uiSref]`: The directive is created as an attribute on an element, e.g., `<a uiSref></a>`
     *
     * ### Inputs
     *
     * - `uiSref`: the target state's name, e.g., `uiSref="foostate"`.  If a component template uses a relative `uiSref`,
     * e.g., `uiSref=".child"`, the reference is relative to that component's state.
     *
     * - `uiParams`: any target state parameter values, as an object, e.g., `[uiParams]="{ fooId: bar.fooId }"`
     *
     * - `uiOptions`: [[TransitionOptions]], e.g., `[uiOptions]="{ inherit: false }"`
     *
     * @example
     * ```html
     *
     * <!-- Targets bar state' -->
     * <a uiSref="bar">Bar</a>
     *
     * <!-- Assume this component's state is "foo".
     *      Relatively targets "foo.child" -->
     * <a uiSref=".child">Foo Child</a>
     *
     * <!-- Targets "bar" state and supplies parameter value -->
     * <a uiSref="bar" [uiParams]="{ barId: foo.barId }">Bar {{foo.barId}}</a>
     *
     * <!-- Targets "bar" state and parameter, doesn't inherit existing parameters-->
     * <a uiSref="bar" [uiParams]="{ barId: foo.barId }" [uiOptions]="{ inherit: false }">Bar {{foo.barId}}</a>
     * ```
     */
    var UISref = /** @class */ (function () {
        function UISref(_router, _anchorUISref, parent) {
            var _this = this;
            /**
               * An observable (ReplaySubject) of the state this UISref is targeting.
               * When the UISref is clicked, it will transition to this [[TargetState]].
               */
            this.targetState$ = new rxjs.ReplaySubject(1);
            /** @internalapi */ this._emit = false;
            this._router = _router;
            this._anchorUISref = _anchorUISref;
            this._parent = parent;
            this._statesSub = _router.globals.states$.subscribe(function () { return _this.update(); });
        }
        Object.defineProperty(UISref.prototype, "uiSref", {
            /** @internalapi */
            set: /** @internalapi */
            function (val) {
                this.state = val;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISref.prototype, "uiParams", {
            /** @internalapi */
            set: /** @internalapi */
            function (val) {
                this.params = val;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISref.prototype, "uiOptions", {
            /** @internalapi */
            set: /** @internalapi */
            function (val) {
                this.options = val;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        UISref.prototype.ngOnInit = function () {
            this._emit = true;
            this.update();
        };
        UISref.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        UISref.prototype.ngOnDestroy = function () {
            this._emit = false;
            this._statesSub.unsubscribe();
            this.targetState$.unsubscribe();
        };
        UISref.prototype.update = function () {
            var $state = this._router.stateService;
            if (this._emit) {
                var newTarget = $state.target(this.state, this.params, this.getOptions());
                this.targetState$.next(newTarget);
            }
            if (this._anchorUISref) {
                var href = $state.href(this.state, this.params, this.getOptions());
                this._anchorUISref.update(href);
            }
        };
        UISref.prototype.getOptions = function () {
            var defaultOpts = {
                relative: this._parent && this._parent.context && this._parent.context.name,
                inherit: true,
                source: 'sref',
            };
            return core.extend(defaultOpts, this.options || {});
        };
        /** When triggered by a (click) event, this function transitions to the UISref's target state */
        UISref.prototype.go = /** When triggered by a (click) event, this function transitions to the UISref's target state */
        function (button, ctrlKey, metaKey) {
            if ((this._anchorUISref &&
                (this._anchorUISref.openInNewTab() || button || !core.isNumber(button) || ctrlKey || metaKey)) ||
                !this.state) {
                return;
            }
            this._router.stateService.go(this.state, this.params, this.getOptions());
            return false;
        };
        UISref.decorators = [
            { type: core$1.Directive, args: [{
                        selector: '[uiSref]',
                        exportAs: 'uiSref',
                    },] },
        ];
        /** @nocollapse */
        UISref.ctorParameters = function () { return [
            { type: core.UIRouter, },
            { type: AnchorUISref, decorators: [{ type: core$1.Optional },] },
            { type: undefined, decorators: [{ type: core$1.Inject, args: [UIView.PARENT_INJECT,] },] },
        ]; };
        UISref.propDecorators = {
            "state": [{ type: core$1.Input, args: ['uiSref',] },],
            "params": [{ type: core$1.Input, args: ['uiParams',] },],
            "options": [{ type: core$1.Input, args: ['uiOptions',] },],
            "go": [{ type: core$1.HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey'],] },],
        };
        return UISref;
    }());

    /** @internalapi */
    var inactiveStatus = {
        active: false,
        exact: false,
        entering: false,
        exiting: false,
        targetStates: [],
    };
    /**
     * Returns a Predicate<PathNode[]>
     *
     * The predicate returns true when the target state (and param values)
     * match the (tail of) the path, and the path's param values
     *
     * @internalapi
     */
    var pathMatches = function (target) {
        if (!target.exists())
            return function () { return false; };
        var state = target.$state();
        var targetParamVals = target.params();
        var targetPath = core.PathUtils.buildPath(target);
        var paramSchema = targetPath
            .map(function (node) { return node.paramSchema; })
            .reduce(core.unnestR, [])
            .filter(function (param) { return targetParamVals.hasOwnProperty(param.id); });
        return function (path) {
            var tailNode = core.tail(path);
            if (!tailNode || tailNode.state !== state)
                return false;
            var paramValues = core.PathUtils.paramValues(path);
            return core.Param.equals(paramSchema, paramValues, targetParamVals);
        };
    };
    /**
     * Given basePath: [a, b], appendPath: [c, d]),
     * Expands the path to [c], [c, d]
     * Then appends each to [a,b,] and returns: [a, b, c], [a, b, c, d]
     *
     * @internalapi
     */
    function spreadToSubPaths(basePath, appendPath) {
        return appendPath.map(function (node) { return basePath.concat(core.PathUtils.subPath(appendPath, function (n) { return n.state === node.state; })); });
    }
    /**
     * Given a TransEvt (Transition event: started, success, error)
     * and a UISref Target State, return a SrefStatus object
     * which represents the current status of that Sref:
     * active, activeEq (exact match), entering, exiting
     *
     * @internalapi
     */
    function getSrefStatus(event, srefTarget) {
        var pathMatchesTarget = pathMatches(srefTarget);
        var tc = event.trans.treeChanges();
        var isStartEvent = event.evt === 'start';
        var isSuccessEvent = event.evt === 'success';
        var activePath = isSuccessEvent ? tc.to : tc.from;
        var isActive = function () {
            return spreadToSubPaths([], activePath)
                .map(pathMatchesTarget)
                .reduce(core.anyTrueR, false);
        };
        var isExact = function () { return pathMatchesTarget(activePath); };
        var isEntering = function () {
            return spreadToSubPaths(tc.retained, tc.entering)
                .map(pathMatchesTarget)
                .reduce(core.anyTrueR, false);
        };
        var isExiting = function () {
            return spreadToSubPaths(tc.retained, tc.exiting)
                .map(pathMatchesTarget)
                .reduce(core.anyTrueR, false);
        };
        return {
            active: isActive(),
            exact: isExact(),
            entering: isStartEvent ? isEntering() : false,
            exiting: isStartEvent ? isExiting() : false,
            targetStates: [srefTarget],
        };
    }
    /** @internalapi */
    function mergeSrefStatus(left, right) {
        return {
            active: left.active || right.active,
            exact: left.exact || right.exact,
            entering: left.entering || right.entering,
            exiting: left.exiting || right.exiting,
            targetStates: left.targetStates.concat(right.targetStates),
        };
    }
    /**
     * A directive which emits events when a paired [[UISref]] status changes.
     *
     * This directive is primarily used by the [[UISrefActive]] directives to monitor `UISref`(s).
     *
     * This directive shares two attribute selectors with `UISrefActive`:
     *
     * - `[uiSrefActive]`
     * - `[uiSrefActiveEq]`.
     *
     * Thus, whenever a `UISrefActive` directive is created, a `UISrefStatus` directive is also created.
     *
     * Most apps should simply use `UISrefActive`, but some advanced components may want to process the
     * [[SrefStatus]] events directly.
     *
     * ```js
     * <li (uiSrefStatus)="onSrefStatusChanged($event)">
     *   <a uiSref="book" [uiParams]="{ bookId: book.id }">Book {{ book.name }}</a>
     * </li>
     * ```
     *
     * The `uiSrefStatus` event is emitted whenever an enclosed `uiSref`'s status changes.
     * The event emitted is of type [[SrefStatus]], and has boolean values for `active`, `exact`, `entering`, and `exiting`; also has a [[StateOrName]] `identifier`value.
     *
     * The values from this event can be captured and stored on a component (then applied, e.g., using ngClass).
     *
     * ---
     *
     * A single `uiSrefStatus` can enclose multiple `uiSref`.
     * Each status boolean (`active`, `exact`, `entering`, `exiting`) will be true if *any of the enclosed `uiSref` status is true*.
     * In other words, all enclosed `uiSref` statuses  are merged to a single status using `||` (logical or).
     *
     * ```js
     * <li (uiSrefStatus)="onSrefStatus($event)" uiSref="admin">
     *   Home
     *   <ul>
     *     <li> <a uiSref="admin.users">Users</a> </li>
     *     <li> <a uiSref="admin.groups">Groups</a> </li>
     *   </ul>
     * </li>
     * ```
     *
     * In the above example, `$event.active === true` when either `admin.users` or `admin.groups` is active.
     *
     * ---
     *
     * This API is subject to change.
     */
    var UISrefStatus = /** @class */ (function () {
        function UISrefStatus(_globals) {
            /** current statuses of the state/params the uiSref directive is linking to */
            this.uiSrefStatus = new core$1.EventEmitter(false);
            this._globals = _globals;
            this.status = Object.assign({}, inactiveStatus);
        }
        UISrefStatus.prototype.ngAfterContentInit = function () {
            var _this = this;
            // Map each transition start event to a stream of:
            // start -> (success|error)
            var transEvents$ = this._globals.start$.pipe(operators.switchMap(function (trans) {
                var event = function (evt) { return ({ evt: evt, trans: trans }); };
                var transStart$ = rxjs.of(event('start'));
                var transResult = trans.promise.then(function () { return event('success'); }, function () { return event('error'); });
                var transFinish$ = rxjs.from(transResult);
                return rxjs.concat(transStart$, transFinish$);
            }));
            // Watch the @ContentChildren UISref[] components and get their target states
            // let srefs$: Observable<UISref[]> = of(this.srefs.toArray()).concat(this.srefs.changes);
            this._srefs$ = new rxjs.BehaviorSubject(this._srefs.toArray());
            this._srefChangesSub = this._srefs.changes.subscribe(function (srefs) { return _this._srefs$.next(srefs); });
            var targetStates$ = this._srefs$.pipe(operators.switchMap(function (srefs) { return rxjs.combineLatest(srefs.map(function (sref) { return sref.targetState$; })); }));
            // Calculate the status of each UISref based on the transition event.
            // Reduce the statuses (if multiple) by or-ing each flag.
            this._subscription = transEvents$
                .pipe(operators.switchMap(function (evt) {
                return targetStates$.pipe(operators.map(function (targets) {
                    var statuses = targets.map(function (target) { return getSrefStatus(evt, target); });
                    return statuses.reduce(mergeSrefStatus);
                }));
            }))
                .subscribe(this._setStatus.bind(this));
        };
        UISrefStatus.prototype.ngOnDestroy = function () {
            if (this._subscription)
                this._subscription.unsubscribe();
            if (this._srefChangesSub)
                this._srefChangesSub.unsubscribe();
            if (this._srefs$)
                this._srefs$.unsubscribe();
            this._subscription = this._srefChangesSub = this._srefs$ = undefined;
        };
        UISrefStatus.prototype._setStatus = function (status) {
            this.status = status;
            this.uiSrefStatus.emit(status);
        };
        UISrefStatus.decorators = [
            { type: core$1.Directive, args: [{
                        selector: '[uiSrefStatus],[uiSrefActive],[uiSrefActiveEq]',
                        exportAs: 'uiSrefStatus',
                    },] },
        ];
        /** @nocollapse */
        UISrefStatus.ctorParameters = function () { return [
            { type: core.UIRouterGlobals, },
        ]; };
        UISrefStatus.propDecorators = {
            "uiSrefStatus": [{ type: core$1.Output, args: ['uiSrefStatus',] },],
            "_srefs": [{ type: core$1.ContentChildren, args: [UISref, { descendants: true },] },],
        };
        return UISrefStatus;
    }());

    /**
     * A directive that adds a CSS class when its associated `uiSref` link is active.
     *
     * ### Purpose
     *
     * This directive should be paired with one (or more) [[UISref]] directives.
     * It will apply a CSS class to its element when the state the `uiSref` targets is activated.
     *
     * This can be used to create navigation UI where the active link is highlighted.
     *
     * ### Selectors
     *
     * - `[uiSrefActive]`: When this selector is used, the class is added when the target state or any
     * child of the target state is active
     * - `[uiSrefActiveEq]`: When this selector is used, the class is added when the target state is
     * exactly active (the class is not added if a child of the target state is active).
     *
     * ### Inputs
     *
     * - `uiSrefActive`/`uiSrefActiveEq`: one or more CSS classes to add to the element, when the `uiSref` is active
     *
     * #### Example:
     * The anchor tag has the `active` class added when the `foo` state is active.
     * ```html
     * <a uiSref="foo" uiSrefActive="active">Foo</a>
     * ```
     *
     * ### Matching parameters
     *
     * If the `uiSref` includes parameters, the current state must be active, *and* the parameter values must match.
     *
     * #### Example:
     * The first anchor tag has the `active` class added when the `foo.bar` state is active and the `id` parameter
     * equals 25.
     * The second anchor tag has the `active` class added when the `foo.bar` state is active and the `id` parameter
     * equals 32.
     * ```html
     * <a uiSref="foo.bar" [uiParams]="{ id: 25 }" uiSrefActive="active">Bar #25</a>
     * <a uiSref="foo.bar" [uiParams]="{ id: 32 }" uiSrefActive="active">Bar #32</a>
     * ```
     *
     * #### Example:
     * A list of anchor tags are created for a list of `bar` objects.
     * An anchor tag will have the `active` class when `foo.bar` state is active and the `id` parameter matches
     * that object's `id`.
     * ```html
     * <li *ngFor="let bar of bars">
     *   <a uiSref="foo.bar" [uiParams]="{ id: bar.id }" uiSrefActive="active">Bar #{{ bar.id }}</a>
     * </li>
     * ```
     *
     * ### Multiple uiSrefs
     *
     * A single `uiSrefActive` can be used for multiple `uiSref` links.
     * This can be used to create (for example) a drop down navigation menu, where the menui is highlighted
     * if *any* of its inner links are active.
     *
     * The `uiSrefActive` should be placed on an ancestor element of the `uiSref` list.
     * If anyof the `uiSref` links are activated, the class will be added to the ancestor element.
     *
     * #### Example:
     * This is a dropdown nagivation menu for "Admin" states.
     * When any of `admin.users`, `admin.groups`, `admin.settings` are active, the `<li>` for the dropdown
     * has the `dropdown-child-active` class applied.
     * Additionally, the active anchor tag has the `active` class applied.
     * ```html
     * <ul class="dropdown-menu">
     *   <li uiSrefActive="dropdown-child-active" class="dropdown admin">
     *     Admin
     *     <ul>
     *       <li><a uiSref="admin.users" uiSrefActive="active">Users</a></li>
     *       <li><a uiSref="admin.groups" uiSrefActive="active">Groups</a></li>
     *       <li><a uiSref="admin.settings" uiSrefActive="active">Settings</a></li>
     *     </ul>
     *   </li>
     * </ul>
     * ```
     */
    var UISrefActive = /** @class */ (function () {
        function UISrefActive(uiSrefStatus, rnd, host) {
            var _this = this;
            this._classes = [];
            this._classesEq = [];
            this._subscription = uiSrefStatus.uiSrefStatus.subscribe(function (next) {
                _this._classes.forEach(function (cls) {
                    if (next.active) {
                        rnd.addClass(host.nativeElement, cls);
                    }
                    else {
                        rnd.removeClass(host.nativeElement, cls);
                    }
                });
                _this._classesEq.forEach(function (cls) {
                    if (next.exact) {
                        rnd.addClass(host.nativeElement, cls);
                    }
                    else {
                        rnd.removeClass(host.nativeElement, cls);
                    }
                });
            });
        }
        Object.defineProperty(UISrefActive.prototype, "active", {
            set: function (val) {
                this._classes = val.split(/\s+/);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISrefActive.prototype, "activeEq", {
            set: function (val) {
                this._classesEq = val.split(/\s+/);
            },
            enumerable: true,
            configurable: true
        });
        UISrefActive.prototype.ngOnDestroy = function () {
            this._subscription.unsubscribe();
        };
        UISrefActive.decorators = [
            { type: core$1.Directive, args: [{
                        selector: '[uiSrefActive],[uiSrefActiveEq]',
                    },] },
        ];
        /** @nocollapse */
        UISrefActive.ctorParameters = function () { return [
            { type: UISrefStatus, },
            { type: core$1.Renderer2, },
            { type: core$1.ElementRef, decorators: [{ type: core$1.Host },] },
        ]; };
        UISrefActive.propDecorators = {
            "active": [{ type: core$1.Input, args: ['uiSrefActive',] },],
            "activeEq": [{ type: core$1.Input, args: ['uiSrefActiveEq',] },],
        };
        return UISrefActive;
    }());

    /** @internalapi */
    var _UIROUTER_DIRECTIVES = [UISref, AnchorUISref, UIView, UISrefActive, UISrefStatus];
    /**
     * References to the UI-Router directive classes, for use within a @Component's `directives:` property
     * @deprecated use [[UIRouterModule]]
     * @internalapi
     */
    var UIROUTER_DIRECTIVES = _UIROUTER_DIRECTIVES;

    /** @hidden */ var UIROUTER_ROOT_MODULE = new core$1.InjectionToken('UIRouter Root Module');
    /** @hidden */ var UIROUTER_MODULE_TOKEN = new core$1.InjectionToken('UIRouter Module');
    /** @hidden */ var UIROUTER_STATES = new core$1.InjectionToken('UIRouter States');
    // /** @hidden */ export const ROUTES = UIROUTER_STATES;
    // Delay angular bootstrap until first transition is successful, for SSR.
    // See https://github.com/ui-router/angular/pull/127
    function onTransitionReady(transitionService, root) {
        var mod = root[0];
        if (!mod || !mod.deferInitialRender) {
            return function () { return Promise.resolve(); };
        }
        return function () {
            return new Promise(function (resolve) {
                var hook = function (trans) {
                    trans.promise.then(resolve, resolve);
                };
                transitionService.onStart({}, hook, { invokeLimit: 1 });
            });
        };
    }
    function makeRootProviders(module) {
        return [
            { provide: UIROUTER_ROOT_MODULE, useValue: module, multi: true },
            { provide: UIROUTER_MODULE_TOKEN, useValue: module, multi: true },
            { provide: router.ROUTES, useValue: module.states || [], multi: true },
            { provide: core$1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
            {
                provide: core$1.APP_INITIALIZER,
                useFactory: onTransitionReady,
                deps: [core.TransitionService, UIROUTER_ROOT_MODULE],
                multi: true,
            },
        ];
    }
    function makeChildProviders(module) {
        return [
            { provide: UIROUTER_MODULE_TOKEN, useValue: module, multi: true },
            { provide: router.ROUTES, useValue: module.states || [], multi: true },
            { provide: core$1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
        ];
    }
    function locationStrategy(useHash) {
        return { provide: common.LocationStrategy, useClass: useHash ? common.HashLocationStrategy : common.PathLocationStrategy };
    }
    /**
     * Creates UI-Router Modules
     *
     * This class has two static factory methods which create UIRouter Modules.
     * A UI-Router Module is an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
     * with support for UI-Router.
     *
     * ### UIRouter Directives
     *
     * When a UI-Router Module is imported into a `NgModule`, that module's components
     * can use the UIRouter Directives such as [[UIView]], [[UISref]], [[UISrefActive]].
     *
     * ### State Definitions
     *
     * State definitions found in the `states:` property are provided to the Dependency Injector.
     * This enables UI-Router to automatically register the states with the [[StateRegistry]] at bootstrap (and during lazy load).
     *
     * ### Entry Components
     *
     * Any routed components are added as `entryComponents:` so they will get compiled.
     */
    var UIRouterModule = /** @class */ (function () {
        function UIRouterModule() {
        }
        /**
         * Creates a UI-Router Module for the root (bootstrapped) application module to import
         *
         * This factory function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
         * with UI-Router support.
         *
         * The `forRoot` module should be added to the `imports:` of the `NgModule` being bootstrapped.
         * An application should only create and import a single `NgModule` using `forRoot()`.
         * All other modules should be created using [[UIRouterModule.forChild]].
         *
         * Unlike `forChild`, an `NgModule` returned by this factory provides the [[UIRouter]] singleton object.
         * This factory also accepts root-level router configuration.
         * These are the only differences between `forRoot` and `forChild`.
         *
         * Example:
         * ```js
         * let routerConfig = {
         *   otherwise: '/home',
         *   states: [homeState, aboutState]
         * };
         *
         * @ NgModule({
         *   imports: [
         *     BrowserModule,
         *     UIRouterModule.forRoot(routerConfig),
         *     FeatureModule1
         *   ]
         * })
         * class MyRootAppModule {}
         *
         * browserPlatformDynamic.bootstrapModule(MyRootAppModule);
         * ```
         *
         * @param config declarative UI-Router configuration
         * @returns an `NgModule` which provides the [[UIRouter]] singleton instance
         */
        /**
           * Creates a UI-Router Module for the root (bootstrapped) application module to import
           *
           * This factory function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
           * with UI-Router support.
           *
           * The `forRoot` module should be added to the `imports:` of the `NgModule` being bootstrapped.
           * An application should only create and import a single `NgModule` using `forRoot()`.
           * All other modules should be created using [[UIRouterModule.forChild]].
           *
           * Unlike `forChild`, an `NgModule` returned by this factory provides the [[UIRouter]] singleton object.
           * This factory also accepts root-level router configuration.
           * These are the only differences between `forRoot` and `forChild`.
           *
           * Example:
           * ```js
           * let routerConfig = {
           *   otherwise: '/home',
           *   states: [homeState, aboutState]
           * };
           *
           * @ NgModule({
           *   imports: [
           *     BrowserModule,
           *     UIRouterModule.forRoot(routerConfig),
           *     FeatureModule1
           *   ]
           * })
           * class MyRootAppModule {}
           *
           * browserPlatformDynamic.bootstrapModule(MyRootAppModule);
           * ```
           *
           * @param config declarative UI-Router configuration
           * @returns an `NgModule` which provides the [[UIRouter]] singleton instance
           */
        UIRouterModule.forRoot = /**
           * Creates a UI-Router Module for the root (bootstrapped) application module to import
           *
           * This factory function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
           * with UI-Router support.
           *
           * The `forRoot` module should be added to the `imports:` of the `NgModule` being bootstrapped.
           * An application should only create and import a single `NgModule` using `forRoot()`.
           * All other modules should be created using [[UIRouterModule.forChild]].
           *
           * Unlike `forChild`, an `NgModule` returned by this factory provides the [[UIRouter]] singleton object.
           * This factory also accepts root-level router configuration.
           * These are the only differences between `forRoot` and `forChild`.
           *
           * Example:
           * ```js
           * let routerConfig = {
           *   otherwise: '/home',
           *   states: [homeState, aboutState]
           * };
           *
           * @ NgModule({
           *   imports: [
           *     BrowserModule,
           *     UIRouterModule.forRoot(routerConfig),
           *     FeatureModule1
           *   ]
           * })
           * class MyRootAppModule {}
           *
           * browserPlatformDynamic.bootstrapModule(MyRootAppModule);
           * ```
           *
           * @param config declarative UI-Router configuration
           * @returns an `NgModule` which provides the [[UIRouter]] singleton instance
           */
        function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: UIRouterModule,
                providers: [
                    _UIROUTER_INSTANCE_PROVIDERS,
                    _UIROUTER_SERVICE_PROVIDERS,
                    locationStrategy(config.useHash)
                ].concat(makeRootProviders(config)),
            };
        };
        /**
         * Creates an `NgModule` for a UIRouter module
         *
         * This function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
         * with UI-Router support.
         *
         * #### Example:
         * ```js
         * var homeState = { name: 'home', url: '/home', component: Home };
         * var aboutState = { name: 'about', url: '/about', component: About };
         *
         * @ NgModule({
         *   imports: [
         *     UIRouterModule.forChild({ states: [ homeState, aboutState ] }),
         *     SharedModule,
         *   ],
         *   declarations: [ Home, About ],
         * })
         * export class AppModule {};
         * ```
         *
         * @param module UI-Router module options
         * @returns an `NgModule`
         */
        /**
           * Creates an `NgModule` for a UIRouter module
           *
           * This function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
           * with UI-Router support.
           *
           * #### Example:
           * ```js
           * var homeState = { name: 'home', url: '/home', component: Home };
           * var aboutState = { name: 'about', url: '/about', component: About };
           *
           * @ NgModule({
           *   imports: [
           *     UIRouterModule.forChild({ states: [ homeState, aboutState ] }),
           *     SharedModule,
           *   ],
           *   declarations: [ Home, About ],
           * })
           * export class AppModule {};
           * ```
           *
           * @param module UI-Router module options
           * @returns an `NgModule`
           */
        UIRouterModule.forChild = /**
           * Creates an `NgModule` for a UIRouter module
           *
           * This function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
           * with UI-Router support.
           *
           * #### Example:
           * ```js
           * var homeState = { name: 'home', url: '/home', component: Home };
           * var aboutState = { name: 'about', url: '/about', component: About };
           *
           * @ NgModule({
           *   imports: [
           *     UIRouterModule.forChild({ states: [ homeState, aboutState ] }),
           *     SharedModule,
           *   ],
           *   declarations: [ Home, About ],
           * })
           * export class AppModule {};
           * ```
           *
           * @param module UI-Router module options
           * @returns an `NgModule`
           */
        function (module) {
            if (module === void 0) { module = {}; }
            return {
                ngModule: UIRouterModule,
                providers: makeChildProviders(module),
            };
        };
        UIRouterModule.decorators = [
            { type: core$1.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [_UIROUTER_DIRECTIVES],
                        exports: [_UIROUTER_DIRECTIVES],
                        entryComponents: [UIView],
                    },] },
        ];
        return UIRouterModule;
    }());

    /**
     * Returns a function which lazy loads a nested module
     *
     * This is primarily used by the [[ng2LazyLoadBuilder]] when processing [[Ng2StateDeclaration.loadChildren]].
     *
     * It could also be used manually as a [[StateDeclaration.lazyLoad]] property to lazy load an `NgModule` and its state(s).
     *
     * #### Example:
     * Using `System.import()` and named export of `HomeModule`
     * ```js
     * declare var System;
     * var futureState = {
     *   name: 'home.**',
     *   url: '/home',
     *   lazyLoad: loadNgModule(() => System.import('./home/home.module').then(result => result.HomeModule))
     * }
     * ```
     *
     * #### Example:
     * Using a path (string) to the module
     * ```js
     * var futureState = {
     *   name: 'home.**',
     *   url: '/home',
     *   lazyLoad: loadNgModule('./home/home.module#HomeModule')
     * }
     * ```
     *
     *
     * @param moduleToLoad a path (string) to the NgModule to load.
     *    Or a function which loads the NgModule code which should
     *    return a reference to  the `NgModule` class being loaded (or a `Promise` for it).
     *
     * @returns A function which takes a transition, which:
     * - Gets the Injector (scoped properly for the destination state)
     * - Loads and creates the NgModule
     * - Finds the "replacement state" for the target state, and adds the new NgModule Injector to it (as a resolve)
     * - Returns the new states array
     */
    function loadNgModule(moduleToLoad) {
        return function (transition, stateObject) {
            var ng2Injector = transition.injector().get(core.NATIVE_INJECTOR_TOKEN);
            var createModule = function (factory) { return factory.create(ng2Injector); };
            var applyModule = function (moduleRef) { return applyNgModule(transition, moduleRef, ng2Injector, stateObject); };
            return loadModuleFactory(moduleToLoad, ng2Injector)
                .then(createModule)
                .then(applyModule);
        };
    }
    /**
     * Returns the module factory that can be used to instantiate a module
     *
     * For strings this:
     * - Finds the correct NgModuleFactoryLoader
     * - Loads the new NgModuleFactory from the path string (async)
     *
     * For a Type<any> or Promise<Type<any>> this:
     * - Compiles the component type (if not running with AOT)
     * - Returns the NgModuleFactory resulting from compilation (or direct loading if using AOT) as a Promise
     *
     * @internalapi
     */
    function loadModuleFactory(moduleToLoad, ng2Injector) {
        if (core.isString(moduleToLoad)) {
            return ng2Injector.get(core$1.NgModuleFactoryLoader).load(moduleToLoad);
        }
        var compiler = ng2Injector.get(core$1.Compiler);
        var offlineMode = compiler instanceof core$1.Compiler;
        var unwrapEsModuleDefault = function (x) { return (x && x.__esModule && x['default'] ? x['default'] : x); };
        var compileAsync = function (moduleType) { return compiler.compileModuleAsync(moduleType); };
        var loadChildrenPromise = Promise.resolve(moduleToLoad()).then(unwrapEsModuleDefault);
        return offlineMode ? loadChildrenPromise : loadChildrenPromise.then(compileAsync);
    }
    /**
     * Apply the UI-Router Modules found in the lazy loaded module.
     *
     * Apply the Lazy Loaded NgModule's newly created Injector to the right state in the state tree.
     *
     * Lazy loading uses a placeholder state which is removed (and replaced) after the module is loaded.
     * The NgModule should include a state with the same name as the placeholder.
     *
     * Find the *newly loaded state* with the same name as the *placeholder state*.
     * The NgModule's Injector (and ComponentFactoryResolver) will be added to that state.
     * The Injector/Factory are used when creating Components for the `replacement` state and all its children.
     *
     * @internalapi
     */
    function applyNgModule(transition, ng2Module, parentInjector, lazyLoadState) {
        var injector = ng2Module.injector;
        var uiRouter = injector.get(core.UIRouter);
        var registry = uiRouter.stateRegistry;
        var originalName = lazyLoadState.name;
        var originalState = registry.get(originalName);
        // Check if it's a future state (ends with .**)
        var isFuture = /^(.*)\.\*\*$/.exec(originalName);
        // Final name (without the .**)
        var replacementName = isFuture && isFuture[1];
        var newRootModules = multiProviderParentChildDelta(parentInjector, injector, UIROUTER_ROOT_MODULE).reduce(core.uniqR, []);
        var newChildModules = multiProviderParentChildDelta(parentInjector, injector, UIROUTER_MODULE_TOKEN).reduce(core.uniqR, []);
        if (newRootModules.length) {
            console.log(newRootModules); // tslint:disable-line:no-console
            throw new Error('Lazy loaded modules should not contain a UIRouterModule.forRoot() module');
        }
        var newStateObjects = newChildModules
            .map(function (module) { return applyModuleConfig(uiRouter, injector, module); })
            .reduce(core.unnestR, [])
            .reduce(core.uniqR, []);
        if (isFuture) {
            var replacementState = registry.get(replacementName);
            if (!replacementState || replacementState === originalState) {
                throw new Error("The Future State named '" + originalName + "' lazy loaded an NgModule. " +
                    ("The lazy loaded NgModule must have a state named '" + replacementName + "' ") +
                    ("which replaces the (placeholder) '" + originalName + "' Future State. ") +
                    ("Add a '" + replacementName + "' state to the lazy loaded NgModule ") +
                    "using UIRouterModule.forChild({ states: CHILD_STATES }).");
            }
        }
        // Supply the newly loaded states with the Injector from the lazy loaded NgModule.
        // If a tree of states is lazy loaded, only add the injector to the root of the lazy loaded tree.
        // The children will get the injector by resolve inheritance.
        var newParentStates = newStateObjects.filter(function (state) { return !core.inArray(newStateObjects, state.parent); });
        // Add the Injector to the top of the lazy loaded state tree as a resolve
        newParentStates.forEach(function (state) { return state.resolvables.push(core.Resolvable.fromData(core.NATIVE_INJECTOR_TOKEN, injector)); });
        return {};
    }
    /**
     * Returns the new dependency injection values from the Child Injector
     *
     * When a DI token is defined as multi: true, the child injector
     * can add new values for the token.
     *
     * This function returns the values added by the child injector,  and excludes all values from the parent injector.
     *
     * @internalapi
     */
    function multiProviderParentChildDelta(parent, child, token) {
        var childVals = child.get(token, []);
        var parentVals = parent.get(token, []);
        return childVals.filter(function (val) { return parentVals.indexOf(val) === -1; });
    }

    /**
     * This is a [[StateBuilder.builder]] function for ngModule lazy loading in Angular.
     *
     * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
     * decorates the `lazyLoad` property for states that have a [[Ng2StateDeclaration.ngModule]] declaration.
     *
     * If the state has a [[Ng2StateDeclaration.ngModule]], it will create a `lazyLoad` function
     * that in turn calls `loadNgModule(loadNgModuleFn)`.
     *
     * #### Example:
     * A state that has a `ngModule`
     * ```js
     * var decl = {
     *   ngModule: () => System.import('./childModule.ts')
     * }
     * ```
     * would build a state with a `lazyLoad` function like:
     * ```js
     * import { loadNgModule } from "@uirouter/angular";
     * var decl = {
     *   lazyLoad: loadNgModule(() => System.import('./childModule.ts')
     * }
     * ```
     *
     * If the state has both a `ngModule:` *and* a `lazyLoad`, then the `lazyLoad` is run first.
     *
     * #### Example:
     * ```js
     * var decl = {
     *   lazyLoad: () => System.import('third-party-library'),
     *   ngModule: () => System.import('./childModule.ts')
     * }
     * ```
     * would build a state with a `lazyLoad` function like:
     * ```js
     * import { loadNgModule } from "@uirouter/angular";
     * var decl = {
     *   lazyLoad: () => System.import('third-party-library')
     *       .then(() => loadNgModule(() => System.import('./childModule.ts'))
     * }
     * ```
     *
     */
    function ng2LazyLoadBuilder(state, parent) {
        var loadNgModuleFn = state['loadChildren'];
        return loadNgModuleFn ? loadNgModule(loadNgModuleFn) : state.lazyLoad;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /** A `LocationServices` that delegates to the Angular LocationStrategy */
    var /** A `LocationServices` that delegates to the Angular LocationStrategy */
    Ng2LocationServices = /** @class */ (function (_super) {
        __extends(Ng2LocationServices, _super);
        function Ng2LocationServices(router$$1, _locationStrategy, isBrowser) {
            var _this = _super.call(this, router$$1, isBrowser) || this;
            _this._locationStrategy = _locationStrategy;
            _this._locationStrategy.onPopState(function (evt) {
                if (evt.type !== 'hashchange') {
                    _this._listener(evt);
                }
            });
            return _this;
        }
        Ng2LocationServices.prototype._get = function () {
            return this._locationStrategy.path(true).replace(this._locationStrategy.getBaseHref().replace(/\/$/, ''), '');
        };
        Ng2LocationServices.prototype._set = function (state, title, url, replace) {
            var _a = core.parseUrl(url), path = _a.path, search = _a.search, hash = _a.hash;
            var urlWithHash = path + (hash ? '#' + hash : '');
            if (replace) {
                this._locationStrategy.replaceState(state, title, urlWithHash, search);
            }
            else {
                this._locationStrategy.pushState(state, title, urlWithHash, search);
            }
        };
        Ng2LocationServices.prototype.dispose = function (router$$1) {
            _super.prototype.dispose.call(this, router$$1);
        };
        return Ng2LocationServices;
    }(core.BaseLocationServices));

    /** @module ng2 */
    var Ng2LocationConfig = /** @class */ (function (_super) {
        __extends(Ng2LocationConfig, _super);
        function Ng2LocationConfig(router$$1, _locationStrategy) {
            var _this = _super.call(this, router$$1, core.is(common.PathLocationStrategy)(_locationStrategy)) || this;
            _this._locationStrategy = _locationStrategy;
            return _this;
        }
        Ng2LocationConfig.prototype.baseHref = function (href) {
            return this._locationStrategy.getBaseHref();
        };
        return Ng2LocationConfig;
    }(core.BrowserLocationConfig));

    /**
     * This is a factory function for a UIRouter instance
     *
     * Creates a UIRouter instance and configures it for Angular, then invokes router bootstrap.
     * This function is used as an Angular `useFactory` Provider.
     */
    function uiRouterFactory(locationStrategy$$1, rootModules, modules, injector) {
        if (rootModules.length !== 1) {
            throw new Error("Exactly one UIRouterModule.forRoot() should be in the bootstrapped app module's imports: []");
        }
        // ----------------- Create router -----------------
        // Create a new ng2 UIRouter and configure it for ng2
        var router$$1 = new core.UIRouter();
        // Add RxJS plugin
        router$$1.plugin(rx.UIRouterRx);
        // Add $q-like and $injector-like service APIs
        router$$1.plugin(core.servicesPlugin);
        // ----------------- Monkey Patches ----------------
        // Monkey patch the services.$injector to use the root ng2 Injector
        core.services.$injector.get = injector.get.bind(injector);
        // ----------------- Configure for ng2 -------------
        router$$1.locationService = new Ng2LocationServices(router$$1, locationStrategy$$1, common.isPlatformBrowser(injector.get(core$1.PLATFORM_ID)));
        router$$1.locationConfig = new Ng2LocationConfig(router$$1, locationStrategy$$1);
        // Apply ng2 ui-view handling code
        var viewConfigFactory = function (path, config) { return new Ng2ViewConfig(path, config); };
        router$$1.viewService._pluginapi._viewConfigFactory('ng2', viewConfigFactory);
        // Apply statebuilder decorator for ng2 NgModule registration
        var registry = router$$1.stateRegistry;
        registry.decorator('views', ng2ViewsBuilder);
        registry.decorator('lazyLoad', ng2LazyLoadBuilder);
        // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
        var ng2InjectorResolvable = core.Resolvable.fromData(core.NATIVE_INJECTOR_TOKEN, injector);
        registry.root().resolvables.push(ng2InjectorResolvable);
        // Auto-flush the parameter type queue
        router$$1.urlMatcherFactory.$get();
        // ----------------- Initialize router -------------
        rootModules.forEach(function (moduleConfig) { return applyRootModuleConfig(router$$1, injector, moduleConfig); });
        modules.forEach(function (moduleConfig) { return applyModuleConfig(router$$1, injector, moduleConfig); });
        return router$$1;
    }
    // Start monitoring the URL when the app starts
    function appInitializer(router$$1) {
        return function () {
            if (!router$$1.urlRouter.interceptDeferred) {
                router$$1.urlService.listen();
                router$$1.urlService.sync();
            }
        };
    }
    function parentUIViewInjectFactory(r) {
        return { fqn: null, context: r.root() };
    }
    var _UIROUTER_INSTANCE_PROVIDERS = [
        {
            provide: core.UIRouter,
            useFactory: uiRouterFactory,
            deps: [common.LocationStrategy, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN, core$1.Injector],
        },
        { provide: UIView.PARENT_INJECT, useFactory: parentUIViewInjectFactory, deps: [core.StateRegistry] },
        { provide: core$1.APP_INITIALIZER, useFactory: appInitializer, deps: [core.UIRouter], multi: true },
    ];
    function fnStateService(r) {
        return r.stateService;
    }
    function fnTransitionService(r) {
        return r.transitionService;
    }
    function fnUrlMatcherFactory(r) {
        return r.urlMatcherFactory;
    }
    function fnUrlRouter(r) {
        return r.urlRouter;
    }
    function fnUrlService(r) {
        return r.urlService;
    }
    function fnViewService(r) {
        return r.viewService;
    }
    function fnStateRegistry(r) {
        return r.stateRegistry;
    }
    function fnGlobals(r) {
        return r.globals;
    }
    var _UIROUTER_SERVICE_PROVIDERS = [
        { provide: core.StateService, useFactory: fnStateService, deps: [core.UIRouter] },
        { provide: core.TransitionService, useFactory: fnTransitionService, deps: [core.UIRouter] },
        { provide: core.UrlMatcherFactory, useFactory: fnUrlMatcherFactory, deps: [core.UIRouter] },
        { provide: core.UrlRouter, useFactory: fnUrlRouter, deps: [core.UIRouter] },
        { provide: core.UrlService, useFactory: fnUrlService, deps: [core.UIRouter] },
        { provide: core.ViewService, useFactory: fnViewService, deps: [core.UIRouter] },
        { provide: core.StateRegistry, useFactory: fnStateRegistry, deps: [core.UIRouter] },
        { provide: core.UIRouterGlobals, useFactory: fnGlobals, deps: [core.UIRouter] },
    ];
    /**
     * The UI-Router providers, for use in your application bootstrap
     *
     * @deprecated use [[UIRouterModule.forRoot]]
     */
    var UIROUTER_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS.concat(_UIROUTER_SERVICE_PROVIDERS);

    /** @ng2api @module ng2 */ /** for typedoc */

    Object.keys(core).forEach(function (key) { exports[key] = core[key]; });
    exports.uiRouterFactory = uiRouterFactory;
    exports.appInitializer = appInitializer;
    exports.parentUIViewInjectFactory = parentUIViewInjectFactory;
    exports._UIROUTER_INSTANCE_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS;
    exports.fnStateService = fnStateService;
    exports.fnTransitionService = fnTransitionService;
    exports.fnUrlMatcherFactory = fnUrlMatcherFactory;
    exports.fnUrlRouter = fnUrlRouter;
    exports.fnUrlService = fnUrlService;
    exports.fnViewService = fnViewService;
    exports.fnStateRegistry = fnStateRegistry;
    exports.fnGlobals = fnGlobals;
    exports._UIROUTER_SERVICE_PROVIDERS = _UIROUTER_SERVICE_PROVIDERS;
    exports.UIROUTER_PROVIDERS = UIROUTER_PROVIDERS;
    exports.UIROUTER_ROOT_MODULE = UIROUTER_ROOT_MODULE;
    exports.UIROUTER_MODULE_TOKEN = UIROUTER_MODULE_TOKEN;
    exports.UIROUTER_STATES = UIROUTER_STATES;
    exports.onTransitionReady = onTransitionReady;
    exports.makeRootProviders = makeRootProviders;
    exports.makeChildProviders = makeChildProviders;
    exports.locationStrategy = locationStrategy;
    exports.UIRouterModule = UIRouterModule;
    exports.applyModuleConfig = applyModuleConfig;
    exports.applyRootModuleConfig = applyRootModuleConfig;
    exports._UIROUTER_DIRECTIVES = _UIROUTER_DIRECTIVES;
    exports.UIROUTER_DIRECTIVES = UIROUTER_DIRECTIVES;
    exports.UIView = UIView;
    exports.ɵ0 = ɵ0;
    exports.AnchorUISref = AnchorUISref;
    exports.UISref = UISref;
    exports.UISrefStatus = UISrefStatus;
    exports.UISrefActive = UISrefActive;
    exports.ng2ViewsBuilder = ng2ViewsBuilder;
    exports.Ng2ViewConfig = Ng2ViewConfig;
    exports.ng2LazyLoadBuilder = ng2LazyLoadBuilder;
    exports.loadNgModule = loadNgModule;
    exports.loadModuleFactory = loadModuleFactory;
    exports.applyNgModule = applyNgModule;
    exports.multiProviderParentChildDelta = multiProviderParentChildDelta;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-router-ng2.js.map
