import * as escapeStringNs from 'escape-string-regexp';
import { Directive, TemplateRef, Input, Output, ViewChild, Component, EventEmitter, forwardRef, HostListener, IterableDiffers, ChangeDetectorRef, ContentChild, Optional, Inject, InjectionToken, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as lodashNs from 'lodash';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const escapeString = escapeStringNs;
class NgxSelectOption {
    /**
     * @param {?} value
     * @param {?} text
     * @param {?} disabled
     * @param {?} data
     * @param {?=} _parent
     */
    constructor(value, text, disabled, data, _parent = null) {
        this.value = value;
        this.text = text;
        this.disabled = disabled;
        this.data = data;
        this._parent = _parent;
        this.type = 'option';
        this.cacheRenderedText = null;
    }
    /**
     * @return {?}
     */
    get parent() {
        return this._parent;
    }
    /**
     * @param {?} sanitizer
     * @param {?} highlightText
     * @return {?}
     */
    renderText(sanitizer, highlightText) {
        if (this.cacheHighlightText !== highlightText || this.cacheRenderedText === null) {
            this.cacheHighlightText = highlightText;
            if (this.cacheHighlightText) {
                this.cacheRenderedText = sanitizer.bypassSecurityTrustHtml((this.text + '').replace(new RegExp(escapeString(this.cacheHighlightText), 'gi'), '<strong>$&</strong>'));
            }
            else {
                this.cacheRenderedText = sanitizer.bypassSecurityTrustHtml(this.text);
            }
        }
        return this.cacheRenderedText;
    }
}
class NgxSelectOptGroup {
    /**
     * @param {?} label
     * @param {?=} options
     */
    constructor(label, options = []) {
        this.label = label;
        this.options = options;
        this.type = 'optgroup';
        this.filter(() => true);
    }
    /**
     * @param {?} callbackFn
     * @return {?}
     */
    filter(callbackFn) {
        this.optionsFiltered = this.options.filter((option) => callbackFn(option));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSelectOptionDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option]' },] },
];
/** @nocollapse */
NgxSelectOptionDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
class NgxSelectOptionSelectedDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionSelectedDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-selected]' },] },
];
/** @nocollapse */
NgxSelectOptionSelectedDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
class NgxSelectOptionNotFoundDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionNotFoundDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-not-found]' },] },
];
/** @nocollapse */
NgxSelectOptionNotFoundDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const _ = lodashNs;
const escapeString$1 = escapeStringNs;
const NGX_SELECT_OPTIONS = new InjectionToken('NGX_SELECT_OPTIONS');
/**
 * @record
 */

/** @enum {number} */
const ENavigation = {
    first: 0,
    previous: 1,
    next: 2,
    last: 3,
    firstSelected: 4,
    firstIfOptionActiveInvisible: 5,
};
ENavigation[ENavigation.first] = "first";
ENavigation[ENavigation.previous] = "previous";
ENavigation[ENavigation.next] = "next";
ENavigation[ENavigation.last] = "last";
ENavigation[ENavigation.firstSelected] = "firstSelected";
ENavigation[ENavigation.firstIfOptionActiveInvisible] = "firstIfOptionActiveInvisible";
/**
 * @param {?} obj
 * @param {?} propertyName
 * @return {?}
 */
function propertyExists(obj, propertyName) {
    return propertyName in obj;
}
class NgxSelectComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} sanitizer
     * @param {?} cd
     * @param {?} defaultOptions
     */
    constructor(iterableDiffers, sanitizer, cd, defaultOptions) {
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.optionValueField = 'id';
        this.optionTextField = 'text';
        this.optGroupLabelField = 'label';
        this.optGroupOptionsField = 'options';
        this.multiple = false;
        this.allowClear = false;
        this.placeholder = '';
        this.noAutoComplete = false;
        this.disabled = false;
        this.defaultValue = [];
        this.autoSelectSingleOption = false;
        this.autoClearSearch = false;
        this.noResultsFound = 'No results found';
        this.size = 'default';
        this.keyCodeToRemoveSelected = 'Delete';
        this.keyCodeToOptionsOpen = 'Enter';
        this.keyCodeToOptionsClose = 'Escape';
        this.keyCodeToOptionsSelect = 'Enter';
        this.keyCodeToNavigateFirst = 'ArrowLeft';
        this.keyCodeToNavigatePrevious = 'ArrowUp';
        this.keyCodeToNavigateNext = 'ArrowDown';
        this.keyCodeToNavigateLast = 'ArrowRight';
        this.typed = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.select = new EventEmitter();
        this.remove = new EventEmitter();
        this.navigated = new EventEmitter();
        this.selectionChanges = new EventEmitter();
        this.optionsOpened = false;
        this.actualValue = [];
        this.subjOptions = new BehaviorSubject([]);
        this.subjSearchText = new BehaviorSubject('');
        this.subjOptionsSelected = new BehaviorSubject([]);
        this.subjExternalValue = new BehaviorSubject([]);
        this.subjDefaultValue = new BehaviorSubject([]);
        this.subjRegisterOnChange = new Subject();
        this._focusToInput = false;
        this.isFocused = false;
        this.onChange = (v) => v;
        this.onTouched = () => null;
        Object.assign(this, defaultOptions);
        // differs
        this.itemsDiffer = iterableDiffers.find([]).create(null);
        this.defaultValueDiffer = iterableDiffers.find([]).create(null);
        // observers
        this.typed.subscribe((text) => this.subjSearchText.next(text));
        this.subjOptionsSelected.subscribe((options) => this.selectionChanges.emit(options));
        let /** @type {?} */ cacheExternalValue;
        const /** @type {?} */ subjActualValue = this.subjExternalValue
            .map((v) => cacheExternalValue = v === null ? [] : [].concat(v))
            .merge(this.subjOptionsSelected.map((options) => options.map((o) => o.value)))
            .combineLatest(this.subjDefaultValue, (eVal, dVal) => {
            const /** @type {?} */ newVal = _.isEqual(eVal, dVal) ? [] : eVal;
            return newVal.length ? newVal : dVal;
        })
            .distinctUntilChanged((x, y) => _.isEqual(x, y))
            .share();
        subjActualValue
            .combineLatest(this.subjRegisterOnChange, (actualValue) => actualValue)
            .subscribe((actualValue) => {
            this.actualValue = actualValue;
            if (!_.isEqual(actualValue, cacheExternalValue)) {
                cacheExternalValue = actualValue;
                if (this.multiple) {
                    this.onChange(actualValue);
                }
                else {
                    this.onChange(actualValue.length ? actualValue[0] : null);
                }
            }
        });
        this.subjOptions
            .flatMap((options) => Observable
            .from(options)
            .flatMap((option) => option instanceof NgxSelectOption
            ? Observable.of(option)
            : (option instanceof NgxSelectOptGroup ? Observable.from(option.options) : Observable.empty()))
            .toArray())
            .combineLatest(subjActualValue, (optionsFlat, actualValue) => {
            Observable.from(optionsFlat)
                .filter((option) => actualValue.indexOf(option.value) !== -1)
                .toArray()
                .filter((options) => !_.isEqual(options, this.subjOptionsSelected.value))
                .subscribe((options) => this.subjOptionsSelected.next(options));
        })
            .subscribe();
        this.subjOptions
            .combineLatest(this.subjOptionsSelected, this.subjSearchText, (options, selectedOptions, search) => {
            this.optionsFiltered = this.filterOptions(search, options, selectedOptions);
            this.cacheOptionsFilteredFlat = null;
            this.navigateOption(ENavigation.firstIfOptionActiveInvisible);
            return selectedOptions;
        })
            .flatMap((selectedOptions) => {
            return this.optionsFilteredFlat().filter((flatOptions) => this.autoSelectSingleOption && flatOptions.length === 1 && !selectedOptions.length);
        })
            .subscribe((flatOptions) => this.subjOptionsSelected.next(flatOptions));
    }
    /**
     * \@internal
     * @return {?}
     */
    get inputText() {
        if (this.inputElRef && this.inputElRef.nativeElement) {
            return this.inputElRef.nativeElement.value;
        }
        return '';
    }
    /**
     * @param {?=} otherClassNames
     * @param {?=} useFormControl
     * @return {?}
     */
    setFormControlSize(otherClassNames = {}, useFormControl = true) {
        const /** @type {?} */ formControlExtraClasses = useFormControl ? {
            'form-control-sm input-sm': this.size === 'small',
            'form-control-lg input-lg': this.size === 'large'
        } : {};
        return Object.assign(formControlExtraClasses, otherClassNames);
    }
    /**
     * @return {?}
     */
    setBtnSize() {
        return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' };
    }
    /**
     * @return {?}
     */
    get optionsSelected() {
        return this.subjOptionsSelected.value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mainClicked(event) {
        event.clickedSelectComponent = this;
        if (!this.isFocused) {
            this.isFocused = true;
            this.focus.emit();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    documentClick(event) {
        if (event.clickedSelectComponent !== this) {
            if (this.optionsOpened) {
                this.optionsClose();
                this.cd.detectChanges(); // fix error because of delay between different events
            }
            if (this.isFocused) {
                this.isFocused = false;
                this.blur.emit();
            }
        }
    }
    /**
     * @return {?}
     */
    optionsFilteredFlat() {
        if (this.cacheOptionsFilteredFlat) {
            return Observable.of(this.cacheOptionsFilteredFlat);
        }
        return Observable.from(this.optionsFiltered)
            .flatMap((option) => option instanceof NgxSelectOption ? Observable.of(option) :
            (option instanceof NgxSelectOptGroup ? Observable.from(option.optionsFiltered) : Observable.empty()))
            .filter((optionsFilteredFlat) => !optionsFilteredFlat.disabled)
            .toArray()
            .do((optionsFilteredFlat) => this.cacheOptionsFilteredFlat = optionsFilteredFlat);
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    navigateOption(navigation) {
        this.optionsFilteredFlat()
            .map((options) => {
            const /** @type {?} */ navigated = { index: -1, activeOption: null, filteredOptionList: options };
            let /** @type {?} */ newActiveIdx;
            switch (navigation) {
                case ENavigation.first:
                    navigated.index = 0;
                    break;
                case ENavigation.previous:
                    newActiveIdx = options.indexOf(this.optionActive) - 1;
                    navigated.index = newActiveIdx >= 0 ? newActiveIdx : options.length - 1;
                    break;
                case ENavigation.next:
                    newActiveIdx = options.indexOf(this.optionActive) + 1;
                    navigated.index = newActiveIdx < options.length ? newActiveIdx : 0;
                    break;
                case ENavigation.last:
                    navigated.index = options.length - 1;
                    break;
                case ENavigation.firstSelected:
                    if (this.subjOptionsSelected.value.length) {
                        navigated.index = options.indexOf(this.subjOptionsSelected.value[0]);
                    }
                    break;
                case ENavigation.firstIfOptionActiveInvisible:
                    const /** @type {?} */ idxOfOptionActive = options.indexOf(this.optionActive);
                    navigated.index = idxOfOptionActive > 0 ? idxOfOptionActive : 0;
                    break;
            }
            navigated.activeOption = options[navigated.index];
            return navigated;
        })
            .subscribe((newNavigated) => this.optionActivate(newNavigated));
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.itemsDiffer.diff(this.items)) {
            this.subjOptions.next(this.buildOptions(this.items));
        }
        const /** @type {?} */ defVal = this.defaultValue ? [].concat(this.defaultValue) : [];
        if (this.defaultValueDiffer.diff(defVal)) {
            this.subjDefaultValue.next(defVal);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._focusToInput && this.checkInputVisibility() && this.inputElRef &&
            this.inputElRef.nativeElement !== document.activeElement) {
            this._focusToInput = false;
            this.inputElRef.nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    canClearNotMultiple() {
        return this.allowClear && !!this.subjOptionsSelected.value.length &&
            (!this.subjDefaultValue.value.length || this.subjDefaultValue.value[0] !== this.actualValue[0]);
    }
    /**
     * @return {?}
     */
    focusToInput() {
        this._focusToInput = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputKeyDown(event) {
        const /** @type {?} */ keysForOpenedState = [
            this.keyCodeToOptionsSelect,
            this.keyCodeToNavigateFirst,
            this.keyCodeToNavigatePrevious,
            this.keyCodeToNavigateNext,
            this.keyCodeToNavigateLast,
        ];
        const /** @type {?} */ keysForClosedState = [this.keyCodeToOptionsOpen, this.keyCodeToRemoveSelected];
        if (this.optionsOpened && keysForOpenedState.indexOf(event.code) !== -1) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.code) {
                case this.keyCodeToOptionsSelect:
                    this.optionSelect(this.optionActive);
                    this.navigateOption(ENavigation.next);
                    break;
                case this.keyCodeToNavigateFirst:
                    this.navigateOption(ENavigation.first);
                    break;
                case this.keyCodeToNavigatePrevious:
                    this.navigateOption(ENavigation.previous);
                    break;
                case this.keyCodeToNavigateLast:
                    this.navigateOption(ENavigation.last);
                    break;
                case this.keyCodeToNavigateNext:
                    this.navigateOption(ENavigation.next);
                    break;
            }
        }
        else if (!this.optionsOpened && keysForClosedState.indexOf(event.code) !== -1) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.code) {
                case this.keyCodeToOptionsOpen:
                    this.optionsOpen();
                    break;
                case this.keyCodeToRemoveSelected:
                    this.optionRemove(this.subjOptionsSelected.value[this.subjOptionsSelected.value.length - 1], event);
                    break;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mainKeyUp(event) {
        if (event.code === this.keyCodeToOptionsClose) {
            this.optionsClose();
        }
    }
    /**
     * @param {?} index
     * @param {?} option
     * @return {?}
     */
    trackByOption(index, option) {
        return option instanceof NgxSelectOption ? option.value :
            (option instanceof NgxSelectOptGroup ? option.label : option);
    }
    /**
     * @return {?}
     */
    checkInputVisibility() {
        return (this.multiple === true) || (this.optionsOpened && !this.noAutoComplete);
    }
    /**
     * \@internal
     * @param {?=} value
     * @return {?}
     */
    inputKeyUp(value = '') {
        if (!this.optionsOpened && value) {
            this.optionsOpen(value);
        }
    }
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    doInputText(value) {
        if (this.optionsOpened) {
            this.typed.emit(value);
        }
    }
    /**
     * \@internal
     * @param {?=} value
     * @return {?}
     */
    inputClick(value = '') {
        if (!this.optionsOpened) {
            this.optionsOpen(value);
        }
    }
    /**
     * \@internal
     * @param {?} html
     * @return {?}
     */
    sanitize(html) {
        return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
    }
    /**
     * \@internal
     * @param {?} option
     * @return {?}
     */
    highlightOption(option) {
        if (this.inputElRef) {
            return option.renderText(this.sanitizer, this.inputElRef.nativeElement.value);
        }
        return option.renderText(this.sanitizer, '');
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?=} event
     * @return {?}
     */
    optionSelect(option, event = null) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (option && !option.disabled) {
            this.subjOptionsSelected.next((this.multiple ? this.subjOptionsSelected.value : []).concat([option]));
            this.select.emit(option.value);
            this.optionsClose();
            this.onTouched();
        }
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    optionRemove(option, event) {
        if (!this.disabled && option) {
            event.stopPropagation();
            this.subjOptionsSelected.next((this.multiple ? this.subjOptionsSelected.value : []).filter(o => o !== option));
            this.remove.emit(option.value);
        }
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?} element
     * @return {?}
     */
    isOptionActive(option, element) {
        if (this.optionActive === option) {
            this.ensureVisibleElement(element);
            return true;
        }
        return false;
    }
    /**
     * \@internal
     * @param {?} navigated
     * @return {?}
     */
    optionActivate(navigated) {
        if ((this.optionActive !== navigated.activeOption) &&
            (!navigated.activeOption || !navigated.activeOption.disabled)) {
            this.optionActive = navigated.activeOption;
            this.navigated.emit(navigated);
        }
    }
    /**
     * @param {?} search
     * @param {?} options
     * @param {?} selectedOptions
     * @return {?}
     */
    filterOptions(search, options, selectedOptions) {
        const /** @type {?} */ regExp = new RegExp(escapeString$1(search), 'i'), /** @type {?} */
        filterOption = (option) => {
            if (this.searchCallback) {
                return this.searchCallback(search, option);
            }
            return (!search || regExp.test(option.text)) && (!this.multiple || selectedOptions.indexOf(option) === -1);
        };
        return options.filter((option) => {
            if (option instanceof NgxSelectOption) {
                return filterOption(/** @type {?} */ (option));
            }
            else if (option instanceof NgxSelectOptGroup) {
                const /** @type {?} */ subOp = /** @type {?} */ (option);
                subOp.filter((subOption) => filterOption(subOption));
                return subOp.optionsFiltered.length;
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    ensureVisibleElement(element) {
        if (this.choiceMenuElRef && this.cacheElementOffsetTop !== element.offsetTop) {
            this.cacheElementOffsetTop = element.offsetTop;
            const /** @type {?} */ container = this.choiceMenuElRef.nativeElement;
            if (this.cacheElementOffsetTop < container.scrollTop) {
                container.scrollTop = this.cacheElementOffsetTop;
            }
            else if (this.cacheElementOffsetTop + element.offsetHeight > container.scrollTop + container.clientHeight) {
                container.scrollTop = this.cacheElementOffsetTop + element.offsetHeight - container.clientHeight;
            }
        }
    }
    /**
     * @param {?=} search
     * @return {?}
     */
    optionsOpen(search = '') {
        if (!this.disabled) {
            this.optionsOpened = true;
            this.subjSearchText.next(search);
            if (!this.multiple && this.subjOptionsSelected.value.length) {
                this.navigateOption(ENavigation.firstSelected);
            }
            else {
                this.navigateOption(ENavigation.first);
            }
            this.focusToInput();
            this.open.emit();
        }
    }
    /**
     * @return {?}
     */
    optionsClose() {
        this.optionsOpened = false;
        // if (focusToHost) {
        //     const x = window.scrollX, y = window.scrollY;
        //     this.mainElRef.nativeElement.focus();
        //     window.scrollTo(x, y);
        // }
        this.close.emit();
        if (this.autoClearSearch && this.multiple && this.inputElRef) {
            this.inputElRef.nativeElement.value = null;
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    buildOptions(data) {
        const /** @type {?} */ result = [];
        if (Array.isArray(data)) {
            let /** @type {?} */ option;
            data.forEach((item) => {
                const /** @type {?} */ isOptGroup = typeof item === 'object' && item !== null &&
                    propertyExists(item, this.optGroupLabelField) && propertyExists(item, this.optGroupOptionsField) &&
                    Array.isArray(item[this.optGroupOptionsField]);
                if (isOptGroup) {
                    const /** @type {?} */ optGroup = new NgxSelectOptGroup(item[this.optGroupLabelField]);
                    item[this.optGroupOptionsField].forEach((subOption) => {
                        if (option = this.buildOption(subOption, optGroup)) {
                            optGroup.options.push(option);
                        }
                    });
                    result.push(optGroup);
                }
                else if (option = this.buildOption(item, null)) {
                    result.push(option);
                }
            });
        }
        return result;
    }
    /**
     * @param {?} data
     * @param {?} parent
     * @return {?}
     */
    buildOption(data, parent) {
        let /** @type {?} */ value, /** @type {?} */ text, /** @type {?} */ disabled;
        if (typeof data === 'string' || typeof data === 'number') {
            value = text = data;
            disabled = false;
        }
        else if (typeof data === 'object' && data !== null &&
            (propertyExists(data, this.optionValueField) || propertyExists(data, this.optionTextField))) {
            value = propertyExists(data, this.optionValueField) ? data[this.optionValueField] : data[this.optionTextField];
            text = propertyExists(data, this.optionTextField) ? data[this.optionTextField] : data[this.optionValueField];
            disabled = propertyExists(data, 'disabled') ? data['disabled'] : false;
        }
        else {
            return null;
        }
        return new NgxSelectOption(value, text, disabled, data, parent);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.subjExternalValue.next(obj);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this.subjRegisterOnChange.next();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NgxSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-select',
                template: `<div #main [tabindex]="disabled? -1: 0" class="ngx-select dropdown"
     [ngClass]="setFormControlSize({
        'ngx-select_multiple form-control': multiple === true,
        'open show': optionsOpened && optionsFiltered.length
     }, multiple === true)"
     (click)="mainClicked($event)" (focusin)="mainClicked($event)"
     (focus)="focusToInput()" (keydown)="inputKeyDown($event)"
     (keyup)="mainKeyUp($event)">
    <div [ngClass]="{ 'ngx-select__disabled': disabled}"></div>

    <!-- single selected item -->
    <div class="ngx-select__selected"
         *ngIf="(multiple === false) && (!optionsOpened || noAutoComplete)">
        <div class="ngx-select__toggle btn form-control" [ngClass]="setFormControlSize(setBtnSize())"
             (click)="optionsOpen()">

            <span *ngIf="!optionsSelected.length" class="ngx-select__placeholder text-muted">
                <span [innerHtml]="placeholder"></span>
            </span>
            <span *ngIf="optionsSelected.length"
                  class="ngx-select__selected-single pull-left float-left"
                  [ngClass]="{'ngx-select__allow-clear': allowClear}">
                <ng-container [ngTemplateOutlet]="templateSelectedOption || defaultTemplateOption"
                              [ngTemplateOutletContext]="{$implicit: optionsSelected[0], index: 0,
                                                          text: sanitize(optionsSelected[0].text)}">
                </ng-container>
            </span>
            <span class="ngx-select__toggle-buttons">
                <a class="ngx-select__clear btn btn-sm btn-link" *ngIf="canClearNotMultiple()"
                   [ngClass]="setBtnSize()"
                   (click)="optionRemove(optionsSelected[0], $event)">
                    <i class="ngx-select__clear-icon"></i>
                </a>
                <i class="dropdown-toggle"></i>
                <i class="ngx-select__toggle-caret caret"></i>
            </span>
        </div>
    </div>

    <!-- multiple selected items -->
    <div class="ngx-select__selected" *ngIf="multiple === true">
        <span *ngFor="let option of optionsSelected; trackBy: trackByOption; let idx = index">
            <span tabindex="-1" [ngClass]="setBtnSize()"
                  class="ngx-select__selected-plural btn btn-default btn-secondary btn-xs">

                <ng-container [ngTemplateOutlet]="templateSelectedOption || defaultTemplateOption"
                              [ngTemplateOutletContext]="{$implicit: option, index: idx, text: sanitize(option.text)}">
                </ng-container>

                <a class="ngx-select__clear btn btn-sm btn-link pull-right float-right" [ngClass]="setBtnSize()"
                   (click)="optionRemove(option, $event)">
                    <i class="ngx-select__clear-icon"></i>
                </a>
            </span>
        </span>
    </div>

    <!-- live search an item from the list -->
    <input #input type="text" class="ngx-select__search form-control" [ngClass]="setFormControlSize()"
           *ngIf="checkInputVisibility()"
           [tabindex]="multiple === false? -1: 0"
           (keydown)="inputKeyDown($event)"
           (keyup)="inputKeyUp(input.value)"
           (input)="doInputText(input.value)"
           [disabled]="disabled"
           [placeholder]="optionsSelected.length? '': placeholder"
           (click)="inputClick(input.value)"
           autocomplete="off"
           autocorrect="off"
           autocapitalize="off"
           spellcheck="false"
           role="combobox">

    <!-- options template -->
    <ul #choiceMenu role="menu" *ngIf="isFocused" class="ngx-select__choices dropdown-menu"
        [class.show]="optionsOpened">
        <li class="ngx-select__item-group" role="menuitem"
            *ngFor="let opt of optionsFiltered; trackBy: trackByOption; let idxGroup=index">
            <div class="divider dropdown-divider" *ngIf="opt.type === 'optgroup' && (idxGroup > 0)"></div>
            <div class="dropdown-header" *ngIf="opt.type === 'optgroup'">{{opt.label}}</div>

            <a href="#" #choiceItem class="ngx-select__item dropdown-item"
               *ngFor="let option of (opt.optionsFiltered || [opt]); trackBy: trackByOption; let idxOption = index"
               [ngClass]="{
                    'ngx-select__item_active active': isOptionActive(option, choiceItem),
                    'ngx-select__item_disabled disabled': option.disabled
               }"
               (mouseenter)="optionActivate({
                    activeOption: option,
                    filteredOptionList: optionsFiltered,
                    index: optionsFiltered.indexOf(option)
               })"
               (click)="optionSelect(option, $event)">
                <ng-container [ngTemplateOutlet]="templateOption || defaultTemplateOption"
                              [ngTemplateOutletContext]="{$implicit: option, text: highlightOption(option),
                              index: idxGroup, subIndex: idxOption}"></ng-container>
            </a>
        </li>
        <li class="ngx-select__item ngx-select__item_no-found dropdown-header" *ngIf="!optionsFiltered.length">
            <ng-container [ngTemplateOutlet]="templateOptionNotFound || defaultTemplateOptionNotFound"
                          [ngTemplateOutletContext]="{$implicit: inputText}"></ng-container>
        </li>
    </ul>

    <!--Default templates-->
    <ng-template #defaultTemplateOption let-text="text">
        <span [innerHtml]="text"></span>
    </ng-template>

    <ng-template #defaultTemplateOptionNotFound>
        {{noResultsFound}}
    </ng-template>

</div>
`,
                styles: [`.ngx-select_multiple{height:auto;padding:3px 3px 0}.ngx-select_multiple .ngx-select__search{background-color:transparent!important;border:none;outline:0;-webkit-box-shadow:none;box-shadow:none;height:1.6666em;padding:0;margin-bottom:3px}.ngx-select__disabled{background-color:#eceeef;border-radius:4px;position:absolute;width:100%;height:100%;z-index:5;opacity:.6;top:0;left:0;cursor:not-allowed}.ngx-select__toggle{outline:0;position:relative;text-align:left!important;color:#333;background-color:#fff;border-color:#ccc;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.ngx-select__toggle:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.ngx-select__toggle-buttons{-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ngx-select__toggle-caret{position:absolute;height:10px;top:50%;right:10px;margin-top:-2px}.ngx-select__placeholder{float:left}.ngx-select__clear{margin-right:10px;padding:0;border:none}.ngx-select_multiple .ngx-select__clear{line-height:initial;margin-left:5px;margin-right:0;color:#000;opacity:.5}.ngx-select__clear-icon{display:inline-block;font-size:inherit;cursor:pointer;position:relative;width:1em;height:.75em;padding:0}.ngx-select__clear-icon:after,.ngx-select__clear-icon:before{content:'';position:absolute;border-top:3px solid;width:100%;top:50%;left:0;margin-top:-1px}.ngx-select__clear-icon:before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ngx-select__clear-icon:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngx-select__choices{width:100%;height:auto;max-height:200px;overflow-x:hidden;margin-top:0;position:absolute}.ngx-select_multiple .ngx-select__choices{margin-top:1px}.ngx-select__item{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;white-space:nowrap;cursor:pointer;text-decoration:none}.ngx-select__item_disabled,.ngx-select__item_no-found{cursor:default}.ngx-select__item_active{color:#fff;outline:0;background-color:#428bca}.ngx-select__selected-plural,.ngx-select__selected-single{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden}.ngx-select__selected-plural span,.ngx-select__selected-single span{overflow:hidden;text-overflow:ellipsis}.ngx-select__selected-plural{outline:0;margin:0 3px 3px 0}.input-group>.dropdown{position:static}`],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxSelectComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
NgxSelectComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: DomSanitizer, },
    { type: ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: Inject, args: [NGX_SELECT_OPTIONS,] }, { type: Optional },] },
];
NgxSelectComponent.propDecorators = {
    "items": [{ type: Input },],
    "optionValueField": [{ type: Input },],
    "optionTextField": [{ type: Input },],
    "optGroupLabelField": [{ type: Input },],
    "optGroupOptionsField": [{ type: Input },],
    "multiple": [{ type: Input },],
    "allowClear": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "noAutoComplete": [{ type: Input },],
    "disabled": [{ type: Input },],
    "defaultValue": [{ type: Input },],
    "autoSelectSingleOption": [{ type: Input },],
    "autoClearSearch": [{ type: Input },],
    "noResultsFound": [{ type: Input },],
    "size": [{ type: Input },],
    "searchCallback": [{ type: Input },],
    "typed": [{ type: Output },],
    "focus": [{ type: Output },],
    "blur": [{ type: Output },],
    "open": [{ type: Output },],
    "close": [{ type: Output },],
    "select": [{ type: Output },],
    "remove": [{ type: Output },],
    "navigated": [{ type: Output },],
    "selectionChanges": [{ type: Output },],
    "mainElRef": [{ type: ViewChild, args: ['main',] },],
    "inputElRef": [{ type: ViewChild, args: ['input',] },],
    "choiceMenuElRef": [{ type: ViewChild, args: ['choiceMenu',] },],
    "templateOption": [{ type: ContentChild, args: [NgxSelectOptionDirective, { read: TemplateRef },] },],
    "templateSelectedOption": [{ type: ContentChild, args: [NgxSelectOptionSelectedDirective, { read: TemplateRef },] },],
    "templateOptionNotFound": [{ type: ContentChild, args: [NgxSelectOptionNotFoundDirective, { read: TemplateRef },] },],
    "documentClick": [{ type: HostListener, args: ['document:focusin', ['$event'],] }, { type: HostListener, args: ['document:click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSelectModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static forRoot(options) {
        return {
            ngModule: NgxSelectModule,
            providers: [{ provide: NGX_SELECT_OPTIONS, useValue: options }]
        };
    }
}
NgxSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NgxSelectComponent,
                    NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective
                ],
                exports: [NgxSelectComponent,
                    NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxSelectModule, NGX_SELECT_OPTIONS, NgxSelectComponent, NgxSelectOption, NgxSelectOptGroup, NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective };
//# sourceMappingURL=ngx-select-ex.js.map
