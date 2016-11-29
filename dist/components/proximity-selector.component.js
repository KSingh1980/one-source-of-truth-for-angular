"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var ProximitySelector = (function () {
    function ProximitySelector() {
        this.active = false;
    }
    ProximitySelector.prototype.onLocation = function ($event) {
        var _this = this;
        if ($event.target.checked) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.active = true;
                _this.store.dispatch({
                    type: ProximitySelector.StoreEvents.position,
                    payload: {
                        position: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }
                });
            }, function (error) {
                _this.disabled = true;
                _this.active = false;
                _this.store.dispatch({
                    type: ProximitySelector.StoreEvents.error,
                    payload: {
                        message: error.message
                    }
                });
            });
        }
        else {
            this.active = false;
            this.store.dispatch({
                type: ProximitySelector.StoreEvents.off,
                payload: {}
            });
        }
    };
    ProximitySelector.prototype.onRadius = function ($event) {
        var radius = parseInt($event.target.value, 10);
        this.store.dispatch({
            type: ProximitySelector.StoreEvents.radius,
            payload: {
                radius: radius
            }
        });
    };
    return ProximitySelector;
}());
ProximitySelector.StoreEvents = {
    position: 'ProximitySelector:POSITION',
    radius: 'ProximitySelector:RADIUS',
    off: 'ProximitySelector:OFF',
    error: 'ProximitySelector:ERROR'
};
__decorate([
    core_1.Input(),
    __metadata("design:type", store_1.Store)
], ProximitySelector.prototype, "store", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ProximitySelector.prototype, "disabled", void 0);
ProximitySelector = __decorate([
    core_1.Component({
        selector: 'proximity-selector',
        template: "\n    <div class=\"input-group\">\n        <label for=\"useLocation\"\n            [ngClass]=\"{'disabled': disabled}\">\n            Use current location\n        </label>\n        <input type=\"checkbox\"\n            id=\"useLocation\"\n            [disabled]=\"disabled\"\n            (change)=\"onLocation($event)\">\n    </div>\n    <div class=\"input-group\">\n        <label for=\"locationRadius\"\n            [ngClass]=\"{'disabled': !active || disabled}\">\n            Radius\n        </label>\n        <input type=\"range\" min=\"1\" max=\"100\" value=\"50\"\n            id=\"locationRadius\"\n            [disabled]=\"!active || disabled\"\n            (change)=\"onRadius($event)\">\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], ProximitySelector);
exports.ProximitySelector = ProximitySelector;
//# sourceMappingURL=proximity-selector.component.js.map