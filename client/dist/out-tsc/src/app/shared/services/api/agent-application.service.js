import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
var AgentApplicationService = /** @class */ (function () {
    function AgentApplicationService(http) {
        var _this = this;
        this.http = http;
        this.loadAgentApplications = function () {
            return _this.http.get(environment.apiUrl + "/getAgentApplications");
        };
    }
    AgentApplicationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AgentApplicationService);
    return AgentApplicationService;
}());
export { AgentApplicationService };
//# sourceMappingURL=agent-application.service.js.map