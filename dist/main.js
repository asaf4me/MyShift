(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-shift/add-shift.component.html":
/*!****************************************************!*\
  !*** ./src/app/add-shift/add-shift.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card style=\"padding: 10px\">\n    <mat-card-title style=\"text-align: center;\">Punch Now</mat-card-title>\n    <button mat-raised-button style=\"width: 50%; background-color: firebrick; left: 25%\" (click)=\"autoPunch()\">PUNCH</button>\n    <p></p>\n    <mat-error *ngIf=\"punchShiftTrue\" style=\"color:green;\">{{punchShiftRes}}</mat-error>\n    <mat-error *ngIf=\"punchShiftFalse\">{{punchShiftRes}}</mat-error>\n</mat-card>\n<p></p>\n<mat-card style=\"padding: 10px\">\n    <mat-card-title style=\"text-align: center\">Generate Shift</mat-card-title>\n    <mat-form-field class=\"example-full-width\">\n        <input #g_date matInput [min]=\"minDate\" [max]=\"maxDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\"\n            [formControl]=\"dateFormControl\" [errorStateMatcher]=\"matcherDate\" />\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n        <mat-datepicker #picker></mat-datepicker>\n        <mat-error *ngIf=\"dateFormControl.hasError('required')\">Date is <strong>required</strong></mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n        <input #g_start matInput placeholder=\"Choose the start time\" [formControl]=\"startTimeFormControl\"\n            [errorStateMatcher]=\"matcherSTime\" />\n        <mat-error *ngIf=\"startTimeFormControl.hasError('required')\">Start time is <strong>required</strong></mat-error>\n    </mat-form-field>:\n\n    <mat-form-field class=\"example-full-width\">\n        <input #g_end matInput placeholder=\"Choose the end time\" [formControl]=\"endTimeFormControl\" [errorStateMatcher]=\"matcherETime\" />\n        <mat-error *ngIf=\"endTimeFormControl.hasError('required')\">End time is <strong>required</strong></mat-error>\n    </mat-form-field>\n    <p></p>\n    <button mat-raised-button style=\"width: 20%; background-color: firebrick;\" (click)=generatePunch(g_date.value,g_start.value,g_end.value)>PUNCH</button>\n    <mat-error>{{generateShiftRes}}</mat-error>\n</mat-card>\n\n<p></p>\n<mat-card style=\"padding: 10px\">\n    <mat-card-title style=\"text-align: center\">Your Shift Status</mat-card-title><p></p>\n    <mat-card-title style=\"text-align: center\">{{shiftStatus}}</mat-card-title>\n</mat-card>"

/***/ }),

/***/ "./src/app/add-shift/add-shift.component.ts":
/*!**************************************************!*\
  !*** ./src/app/add-shift/add-shift.component.ts ***!
  \**************************************************/
/*! exports provided: MyErrorStateMatcher, AddShiftComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyErrorStateMatcher", function() { return MyErrorStateMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddShiftComponent", function() { return AddShiftComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shifts_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shifts.service */ "./src/app/shifts.service.ts");
/* harmony import */ var _state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state.service */ "./src/app/state.service.ts");


var dateFormat = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");



var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        return !!(control && control.invalid && (control.dirty || control.touched));
    };
    return MyErrorStateMatcher;
}());

var AddShiftComponent = /** @class */ (function () {
    function AddShiftComponent(addShiftService, stateService) {
        this.addShiftService = addShiftService;
        this.stateService = stateService;
        this.dateFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
        ]);
        this.startTimeFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
        ]);
        this.endTimeFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
        ]);
        this.matcherDate = new MyErrorStateMatcher();
        this.matcherSTime = new MyErrorStateMatcher();
        this.matcherETime = new MyErrorStateMatcher();
    }
    AddShiftComponent.prototype.autoPunch = function () {
        var now = new Date();
        var autoShift = dateFormat(now, 'dddd mmmm yyyy h:MM TT');
        var res = this.addShiftService.setShift({ autoShift: autoShift }); // fetch the data to electron using ipcRenderer
        if (res === true) {
            this.punchShiftRes = 'PUNCH SUCCESS: ' + autoShift;
            this.punchShiftTrue = true;
            this.punchShiftFalse = false;
            this.stateService.setState(!this.stateStatus);
            return;
        }
        this.punchShiftRes = 'Punch FAILED, TRY AGAIN';
        this.punchShiftFalse = true;
        this.punchShiftTrue = false;
    };
    AddShiftComponent.prototype.generatePunch = function (date, start, end) {
        if (date === '' || start === '' || end === '') {
            this.generateShiftRes = 'Invalid input, Please try again';
            return;
        }
        this.generateShiftRes = '';
    };
    AddShiftComponent.prototype.updtateStateStatus = function () {
        if (this.stateStatus === true) {
            this.shiftStatus = 'On Shift';
        }
        else {
            this.shiftStatus = 'Off Shift';
        }
    };
    AddShiftComponent.prototype.ngOnInit = function () {
        this.stateStatus = this.stateService.getState();
        this.updtateStateStatus();
    };
    AddShiftComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-shift',
            template: __webpack_require__(/*! ./add-shift.component.html */ "./src/app/add-shift/add-shift.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shifts_service__WEBPACK_IMPORTED_MODULE_3__["ShiftsService"], _state_service__WEBPACK_IMPORTED_MODULE_4__["StateService"]])
    ], AddShiftComponent);
    return AddShiftComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n    width: 100%;\n    height: 100%;\n    border: 1px solid rgba(0, 0, 0, 0.5);\n}\n\n/* .example-sidenav-content{\n    position: relative;\n    bottom: 50%;\n} */\n\n.example-sidenav {\n    padding: 30px;\n    width: 25%;\n}\n\n.main-toolbar{\n    height: 10%;\n}\n\n.example-container-main-window{\n    padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG9DQUFvQztBQUN4Qzs7QUFFQTs7O0dBR0c7O0FBRUg7SUFDSSxhQUFhO0lBQ2IsVUFBVTtBQUNkOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4vKiAuZXhhbXBsZS1zaWRlbmF2LWNvbnRlbnR7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvdHRvbTogNTAlO1xufSAqL1xuXG4uZXhhbXBsZS1zaWRlbmF2IHtcbiAgICBwYWRkaW5nOiAzMHB4O1xuICAgIHdpZHRoOiAyNSU7XG59XG5cbi5tYWluLXRvb2xiYXJ7XG4gICAgaGVpZ2h0OiAxMCU7XG59XG5cbi5leGFtcGxlLWNvbnRhaW5lci1tYWluLXdpbmRvd3tcbiAgICBwYWRkaW5nOiAyMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"main-toolbar\" style=\"padding: 5px\">\n    <mat-toolbar-row>\n        <div class=\"example-sidenav-content\">\n            <button type=\"button\" class=\"main-menu-button\" mat-raised-button (click)=\"drawer.toggle()\" style=\"background-color:brown\">\n                Toggle Main Menu\n            </button>\n            <span style=\"left:45%; position: absolute\">My Shifts</span>\n        </div>\n    </mat-toolbar-row>\n</mat-toolbar>\n<mat-drawer-container class=\"example-container\" autosize>\n    <mat-drawer #drawer class=\"example-sidenav\" mode=\"side\">\n        <button (click)=\"toggleComponent(0)\" mat-raised-button style=\"width: 100%; background-color: peru\">\n            Home\n        </button>\n        <p></p>\n        <button (click)=\"toggleComponent(1)\" mat-raised-button style=\"width: 100%; background-color: peru\">\n            Add Shift\n        </button>\n        <p></p>\n        <button (click)=\"toggleComponent(2)\" mat-raised-button style=\"width: 100%; background-color: peru\">\n            Edit Shifts\n        </button>\n        <p></p>\n        <button (click)=\"toggleComponent(3)\" mat-raised-button style=\"width: 100%; background-color: peru\">\n            Generate Report\n        </button>\n        <p></p>\n        <button (click)=\"toggleComponent(4)\" mat-raised-button style=\"width: 100%; background-color: peru\">\n            Statitstics\n        </button>\n    </mat-drawer>\n    <mat-drawer-container class=\"example-container-main-window\" autosize>\n        <app-main-window *ngIf=\"isMainWindow\"></app-main-window>\n        <app-add-shift *ngIf=\"isAdd\"></app-add-shift>\n        <app-eddit-shifts *ngIf=\"isEddit\"></app-eddit-shifts>\n    </mat-drawer-container>\n</mat-drawer-container>\n\n<!-- <router-outlet></router-outlet> -->"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'my-shifts';
        this.isAdd = false;
        this.isMainWindow = true;
        this.isEddit = false;
    }
    AppComponent.prototype.toggleComponent = function (e) {
        if (e === 0) // Home button clicked
         {
            this.isMainWindow = true;
            this.isAdd = false;
            this.isEddit = false;
        }
        else if (e === 1) // Add shift button clicked
         {
            this.isAdd = true;
            this.isMainWindow = false;
            this.isEddit = false;
        }
        else if (e === 2) // Edit shift button clicked
         {
            this.isAdd = false;
            this.isMainWindow = false;
            this.isEddit = true;
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _main_window_main_window_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main-window/main-window.component */ "./src/app/main-window/main-window.component.ts");
/* harmony import */ var _add_shift_add_shift_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-shift/add-shift.component */ "./src/app/add-shift/add-shift.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shifts_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shifts.service */ "./src/app/shifts.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _eddit_shifts_eddit_shifts_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./eddit-shifts/eddit-shifts.component */ "./src/app/eddit-shifts/eddit-shifts.component.ts");



// import { AppRoutingModule, routingComponents } from './app-routing.module';





// Angular Material Components
































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _main_window_main_window_component__WEBPACK_IMPORTED_MODULE_4__["MainWindowComponent"],
                _add_shift_add_shift_component__WEBPACK_IMPORTED_MODULE_5__["AddShiftComponent"],
                _eddit_shifts_eddit_shifts_component__WEBPACK_IMPORTED_MODULE_38__["EdditShiftsComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatNativeDateModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormFieldModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__["MatRadioModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_15__["MatSliderModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_16__["MatSlideToggleModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__["MatToolbarModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__["MatGridListModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_22__["MatCardModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_23__["MatStepperModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_24__["MatTabsModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_25__["MatExpansionModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_26__["MatButtonToggleModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_27__["MatChipsModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__["MatIconModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__["MatProgressSpinnerModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__["MatProgressBarModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_31__["MatDialogModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_32__["MatTooltipModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_33__["MatSnackBarModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_34__["MatTableModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_35__["MatSortModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_36__["MatPaginatorModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_37__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            ],
            providers: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"], _shifts_service__WEBPACK_IMPORTED_MODULE_7__["ShiftsService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/eddit-shifts/eddit-shifts.component.ts":
/*!********************************************************!*\
  !*** ./src/app/eddit-shifts/eddit-shifts.component.ts ***!
  \********************************************************/
/*! exports provided: EdditShiftsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdditShiftsComponent", function() { return EdditShiftsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EdditShiftsComponent = /** @class */ (function () {
    function EdditShiftsComponent() {
    }
    EdditShiftsComponent.prototype.ngOnInit = function () {
    };
    EdditShiftsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-eddit-shifts',
            template: "\n    <p>\n      edit-shifts works!\n    </p>\n  "
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EdditShiftsComponent);
    return EdditShiftsComponent;
}());



/***/ }),

/***/ "./src/app/main-window/main-window.component.html":
/*!********************************************************!*\
  !*** ./src/app/main-window/main-window.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"font-size: 90%;\">Welcome to My Shift {{title}}, The best place to manage your shifts.<p style=\"font-size: 90%;\">\n    Toggle main menu to Add a new shift or Edit an exciting one.<p style=\"font-size: 90%;\">\n    At the end for the month you can press generate report to create a monthly report of your shifts.\n</p>"

/***/ }),

/***/ "./src/app/main-window/main-window.component.ts":
/*!******************************************************!*\
  !*** ./src/app/main-window/main-window.component.ts ***!
  \******************************************************/
/*! exports provided: MainWindowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainWindowComponent", function() { return MainWindowComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MainWindowComponent = /** @class */ (function () {
    function MainWindowComponent() {
    }
    MainWindowComponent.prototype.ngOnInit = function () {
    };
    MainWindowComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main-window',
            template: __webpack_require__(/*! ./main-window.component.html */ "./src/app/main-window/main-window.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MainWindowComponent);
    return MainWindowComponent;
}());



/***/ }),

/***/ "./src/app/shifts.service.ts":
/*!***********************************!*\
  !*** ./src/app/shifts.service.ts ***!
  \***********************************/
/*! exports provided: ShiftsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftsService", function() { return ShiftsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


window.require = window.require || {};
var ShiftsService = /** @class */ (function () {
    function ShiftsService() {
        this.ipc = void 0;
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }
    ShiftsService.prototype.setShift = function (shift) {
        return this.ipc.sendSync('setShift', shift);
    };
    ShiftsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ShiftsService);
    return ShiftsService;
}());



/***/ }),

/***/ "./src/app/state.service.ts":
/*!**********************************!*\
  !*** ./src/app/state.service.ts ***!
  \**********************************/
/*! exports provided: StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateService", function() { return StateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


window.require = window.require || {};
var StateService = /** @class */ (function () {
    function StateService() {
        this.ipc = void 0;
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }
    StateService.prototype.getState = function () {
        this.state = this.ipc.sendSync('getState');
        return this.state;
    };
    StateService.prototype.setState = function (state) {
        console.log(state);
        this.state = this.ipc.sendSync('setState', state);
    };
    StateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], StateService);
    return StateService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/asaf/Desktop/Programming/Angular/shifts/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map