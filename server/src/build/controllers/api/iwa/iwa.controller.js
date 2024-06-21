"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iwaService_1 = require("../../../services/iwaService");
class IWAController {
    constructor(router) {
        this.service = new iwaService_1.IWAService();
        router.get('/', this.getApplicationInfo.bind(this));
        router.get('/:id', this.getProvincesStates.bind(this));
        router.post('/saveNewsFeed', this.getLanguageCodes.bind(this));
        router.post('/saveNewsFeedList', this.getApplicantBioData.bind(this));
        router.post('/deleteNewsFeed', this.getApplicationInfoAgent.bind(this));
    }
    getApplicationInfo(req, res, next) {
        let newsFeeds = this.service.getApplicationInfo(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getProvincesStates(req, res, next) {
        let newsFeeds = this.service.getProvincesStates(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getLanguageCodes(req, res, next) {
        let newsFeeds = this.service.getLanguageCodes(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getApplicantBioData(req, res, next) {
        let newsFeeds = this.service.getApplicantBioData(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getApplicationInfoAgent(req, res, next) {
        let newsFeeds = this.service.getApplicationInfoAgent(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
}
module.exports = IWAController;
//# sourceMappingURL=iwa.controller.js.map